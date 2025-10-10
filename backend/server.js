import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();


const app = express();

// Capture raw request body for debugging (helpful to see why Vercel reports Bad Request)
app.use(express.json({ limit: '100kb', verify: (req, res, buf) => { try { req.rawBody = buf && buf.toString(); } catch (e) { req.rawBody = undefined; } } }));

// Simple request logger for debugging on the server side
app.use((req, res, next) => {
  console.debug(`[req] ${req.method} ${req.path} origin=${req.get('origin') || '-'} content-length=${req.get('content-length') || 0}`);
  next();
});

// Configure CORS to allow the production frontend and local dev origin.
// You can override the allowed frontend origin by setting FRONTEND_URL in backend/.env
const FRONTEND_URL = (process.env.FRONTEND_URL || 'https://wikiclubtechuit.org').replace(/\/$/, '');

// Build a small, forgiving origin checker that accepts the configured
// frontend origin, localhost dev servers, and vercel subdomains.
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like server-to-server or curl)
    if (!origin) {
      console.debug('CORS: no origin (server or non-browser request) — allowing');
      return callback(null, true);
    }

    const normalized = origin.replace(/\/$/, '');
    const allowedLocal = normalized.startsWith('http://localhost');
    const allowedVercel = normalized.endsWith('.vercel.app');
    const allowedFrontend = normalized === FRONTEND_URL || normalized === (`https://www.${FRONTEND_URL.replace(/^https?:\/\//, '')}`);

    if (allowedLocal || allowedVercel || allowedFrontend) {
      console.debug('CORS: allowing origin', origin);
      return callback(null, true);
    }

    console.warn('CORS: blocking origin', origin);
    // Deny by returning false rather than throwing an error — this keeps
    // the middleware from producing responses without CORS headers.
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
// Ensure preflight OPTIONS requests are handled with the same CORS policy.
// Use a RegExp route to avoid path-to-regexp parsing issues with a literal '*'.
app.options(/.*/, cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;
// Record start time so we can ignore stray early signals that would kill
// the process immediately after startup (helps in some dev environments
// where parent processes briefly send SIGTERM/SIGINT). If a signal comes
// during the first few seconds, we'll log and ignore it.
const serverStartTime = Date.now();
const STARTUP_SIGNAL_IGNORE_MS = 3000; // increased from 1000ms for more tolerance

// ===== NEW: MongoDB connection logic with helpful logs =====
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const MONGODB_DBNAME = process.env.MONGODB_DBNAME || 'wiki_local';
let mongoClient = null;
let mongoDb = null;
let dbConnected = false;

async function connectWithRetry(retries = 7, delayMs = 1000) {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI not set — skipping DB connection.');
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      mongoClient = new MongoClient(MONGODB_URI, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
      });
      await mongoClient.connect();
      mongoDb = mongoClient.db(MONGODB_DBNAME);
      dbConnected = true;
      console.log(`MongoDB connected (db: ${MONGODB_DBNAME})`);
      return;
    } catch (err) {
      dbConnected = false;
      const msg = (err && err.message) ? err.message : String(err);
      console.error(`MongoDB connection attempt ${attempt} failed: ${msg}`);

      // Detect common causes and give actionable hints
      if (msg.includes('ECONNREFUSED') || msg.includes('failed to connect to server')) {
        console.error('Connection refused to MongoDB. Possible fixes:');
        console.error('- Start a local MongoDB server (install/enable service) OR');
        console.error('- Run a temporary Mongo container: docker run -d -p 27017:27017 --name wikimongo mongo:6.0');
        console.error('- Or set MONGODB_URI in backend/.env to a reachable Atlas URI.');
      }

      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs * attempt));
      } else {
        console.error('MongoDB connection failed after retries.');
      }
    }
  }
}


// Start connection but do not block server startup
// In serverless environments the process may be started per-request; provide
// a helper that returns a cached connection or creates one on demand. This
// pattern works both for long-running servers and serverless platforms.
async function getMongoDb() {
  if (dbConnected && mongoDb) return mongoDb;
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set');

  try {
    // Reuse a promise stored on globalThis so multiple warm invocations
    // share the same connection attempt.
    if (!globalThis._mongoClientPromise) {
      const client = new MongoClient(MONGODB_URI, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
        // keep a small pool to work well on serverless platforms
        maxPoolSize: 10,
      });
      globalThis._mongoClientPromise = client.connect();
    }
    mongoClient = await globalThis._mongoClientPromise;
    mongoDb = mongoClient.db(MONGODB_DBNAME);
    dbConnected = true;
    console.log(`MongoDB connected (db: ${MONGODB_DBNAME})`);
    return mongoDb;
  } catch (err) {
    dbConnected = false;
    throw err;
  }
}

// Try an initial connection for long-running envs but do not fail startup
connectWithRetry().catch((err) => {
  console.error('Initial MongoDB connect attempt failed (this can be OK on serverless):', err && err.message ? err.message : err);
});
// ===== end MongoDB logic =====

// Updated health endpoint to include DB status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    ts: Date.now(),
    db: {
      connected: dbConnected,
      dbName: dbConnected ? MONGODB_DBNAME : null,
    },
  });
});

// Test endpoint to list collections (returns 503 if DB not connected)
app.get('/api/db-info', async (req, res) => {
  if (!dbConnected || !mongoDb) {
    return res.status(503).json({ ok: false, message: 'DB not connected' });
  }
  try {
    const collections = await mongoDb.listCollections().toArray();
    return res.json({ ok: true, collections: collections.map((c) => c.name) });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// Example endpoint you can extend
app.post('/api/contact', (req, res) => {
  const payload = req.body || {};
  // ... you could validate/store the payload in a DB
  res.json({ received: true, payload });
});

// NEW: Accept query form submissions and store in MongoDB (or fallback file)
app.post('/api/queries', async (req, res) => {
  // Log headers and raw body for troubleshooting (remove in production)
  console.debug('/api/queries headers:', req.headers);
  console.debug('/api/queries rawBody:', String(req.rawBody).slice(0, 1000));

  // Prefer parsed body; fallback to attempting to parse rawBody if parsing failed upstream
  let { name, email, question } = req.body || {};

  if ((!name || !email || !question) && req.rawBody) {
    try {
      const parsed = JSON.parse(String(req.rawBody));
      name = name || parsed.name;
      email = email || parsed.email;
      question = question || parsed.question;
      console.debug('/api/queries payload parsed from rawBody:', { name, email, question });
    } catch (parseErr) {
      console.debug('Could not parse rawBody as JSON:', parseErr && parseErr.message ? parseErr.message : parseErr);
    }
  }

  // Basic validation
  if (!name || !email || !question) {
    return res.status(400).json({ ok: false, message: 'Missing required fields: name, email, question' });
  }

  const doc = {
    name: String(name).trim(),
    email: String(email).trim(),
    question: String(question).trim(),
    createdAt: new Date(),
    userAgent: req.get('User-Agent') || null,
    ip: req.ip || req.connection?.remoteAddress || null
  };

  try {
    // Use getMongoDb helper which will establish a connection on demand.
    const db = await getMongoDb();
    if (!db) {
      // Running without DB configuration (e.g., MONGODB_URI) — try a safe
      // fallback: append the query to a local fallback file so the team can
      // review submissions later. This is better than returning a 5xx to
      // the user and allows the form to appear to work even if DB is not
      // configured in the deployed environment. Note: serverless platforms
      // may have ephemeral storage; this is intended as a short-term fallback.
      console.warn('No MongoDB connection available; saving query to fallback file.');
      try {
        const fallbackDir = path.join(__dirname, '..', 'backend_data');
        if (!fs.existsSync(fallbackDir)) fs.mkdirSync(fallbackDir, { recursive: true });
        const fallbackFile = path.join(fallbackDir, 'queries-fallback.jsonl');
        const record = Object.assign({}, doc, { fallback: true, savedAt: new Date().toISOString() });
        fs.appendFileSync(fallbackFile, JSON.stringify(record) + '\n');
        return res.json({ ok: true, id: 'fallback-' + Date.now(), saved: true });
      } catch (fsErr) {
        // If writing fails (common in serverless envs), log and still return
        // success to the client so users don't see a failure. Team can fetch
        // request body from logs or use other delivery channels.
        console.warn('Failed to save fallback query to file (continuing):', fsErr && fsErr.message ? fsErr.message : fsErr);
        return res.json({ ok: true, id: 'fallback-' + Date.now(), saved: false });
      }
    }
    const result = await db.collection('queries').insertOne(doc);
    console.log(`Saved query id=${result.insertedId} from ${doc.email}`);
    return res.json({ ok: true, id: result.insertedId.toString() });
  } catch (err) {
    console.error('Failed to save query:', err && err.stack ? err.stack : err);
    // Return error.message to help debug client-side (remove in production)
    return res.status(500).json({ ok: false, message: 'Internal server error', error: String(err && err.message) });
  }
});

// Global error handler to ensure JSON errors (avoid Vercel HTML error pages)
app.use((err, req, res, next) => {
  console.error('Unhandled error middleware:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  res.status(err && err.status ? err.status : 500).json({ ok: false, message: 'Server error', error: String(err && err.message) });
});

// Serve frontend static files when built (guarded)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  // Use a RegExp route (/.*/) instead of string '*' or '/*' to avoid path-to-regexp parsing errors
  app.get(/.*/, (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    // send index.html for SPA navigation requests; don't send raw Error
    res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
      if (err) {
        console.error('Error sending index.html:', err && err.message ? err.message : err);
        return res.status(500).json({ error: 'Failed to serve frontend index' });
      }
    });
  });
} else {
  // If frontend isn't built locally, be careful about redirects. We should
  // only redirect navigation requests (requests that accept HTML) to the
  // deployed frontend. Returning HTML for asset requests (css/js/png) will
  // cause the browser to treat them as the wrong MIME type and fail. So:
  // - API paths return 404
  // - Requests that look like assets (contain a file extension) return 404
  // - Requests that accept 'text/html' are redirected to the frontend
  // If frontend isn't deployed with the backend, avoid redirecting or
  // returning HTML for non-API requests. API should return JSON errors; a
  // blank or HTML response for asset requests causes MIME errors in the
  // browser. Returning JSON 404 makes the behavior explicit and safe.
  app.get(/.*/, (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    // For any non-API request when frontend isn't present, return a JSON
    // 404 rather than redirecting or serving HTML. Deploy the frontend at
    // the frontend host (FRONTEND_URL) or copy built assets to the backend
    // if you want the API host to serve the SPA.
    console.warn('Non-API request received but frontend not deployed here:', req.path);
    return res.status(404).json({ error: 'Not found', message: 'Frontend not hosted on this API server' });
  });
}

// Defensive: explicit asset route that returns a clean 404 and logs details
// This helps avoid uncaught sendFile errors turning into 500 responses for
// missing asset requests (some hosts have different fs semantics).
app.get(/^\/assets\/.*$/, (req, res) => {
  const assetPath = path.join(frontendDist, req.path.replace(/^\//, ''));
  try {
    if (!fs.existsSync(assetPath)) {
      console.warn(`Asset not found: ${assetPath}`);
      return res.status(404).end();
    }
    return res.sendFile(assetPath, (err) => {
      if (err) {
        console.error('Error serving asset', assetPath, err && err.message ? err.message : err);
        // Return 404 for common fs errors, otherwise 500
        if (err.code === 'ENOENT') return res.status(404).end();
        return res.status(500).end();
      }
    });
  } catch (e) {
    console.error('Unexpected error serving asset', assetPath, e && e.stack ? e.stack : e);
    return res.status(500).end();
  }
});

const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

// Graceful shutdown - close MongoDB client if connected
async function shutdown() {
  const ageMs = Date.now() - serverStartTime;
  // If shutdown is requested immediately after startup, treat it as a
  // stray signal and ignore (log it). This prevents the server from
  // exiting right after starting in some environments. Use a slightly larger
  // window to avoid false positives on slow starts.
  if (ageMs < STARTUP_SIGNAL_IGNORE_MS) {
    console.warn(`Received shutdown request ${ageMs}ms after start — ignoring stray early signal.`);
    console.warn(`PID=${process.pid} PPID=${process.ppid} — ignoring early signal`);
    // Capture a small stack to help see the call site in logs
    try { throw new Error('Startup guard stack trace'); } catch (e) {
      console.warn(e.stack.split('\n').slice(0,4).join('\n'));
    }
    return;
  }

  console.log('Shutting down server...');
  server.close(async () => {
    try {
      if (mongoClient) {
        await mongoClient.close();
        console.log('MongoDB client closed.');
      }
    } catch (err) {
      console.error('Error closing MongoDB client:', err);
    } finally {
      process.exit(0);
    }
  });
}
// Attach signal handlers but log the incoming signal and stack for
// diagnostics. Keep the graceful shutdown behavior for deliberate
// termination (after the startup guard above).
// Attach signal handlers after a short delay so that stray signals sent
// immediately during process startup don't cause an unexpected shutdown.
setTimeout(() => {
  process.on('SIGINT', () => {
    const now = Date.now();
    const ageMs = now - serverStartTime;
    console.warn(`SIGINT received at ${new Date(now).toISOString()} (age ${ageMs}ms) PID=${process.pid} PPID=${process.ppid}`);
    try { throw new Error('Signal received stack'); } catch (e) { console.warn(e.stack.split('\n').slice(0,6).join('\n')); }
    shutdown('SIGINT');
  });
  process.on('SIGTERM', () => {
    const now = Date.now();
    const ageMs = now - serverStartTime;
    console.warn(`SIGTERM received at ${new Date(now).toISOString()} (age ${ageMs}ms) PID=${process.pid} PPID=${process.ppid}`);
    try { throw new Error('Signal received stack'); } catch (e) { console.warn(e.stack.split('\n').slice(0,6).join('\n')); }
    shutdown('SIGTERM');
  });

  // Log uncaught errors and rejections so we can see root causes in logs
  process.on('uncaughtException', (err) => {
    console.error('uncaughtException:', err && err.stack ? err.stack : err);
  });
  process.on('unhandledRejection', (reason) => {
    console.error('unhandledRejection:', reason && reason.stack ? reason.stack : reason);
  });
}, 1500);
