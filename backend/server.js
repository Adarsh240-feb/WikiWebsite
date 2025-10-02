import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();

// Configure CORS to allow the production frontend and local dev origin.
// You can override the allowed frontend origin by setting FRONTEND_URL in backend/.env
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://wikiclubtechuit.vercel.app/';
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like server-to-server or curl)
    if (!origin) return callback(null, true);
    // allow the configured frontend, localhost dev server, and any vercel subdomain
    if (
      origin === FRONTEND_URL ||
      origin.startsWith('http://localhost') ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    // otherwise reject
    console.warn('Blocked CORS request from origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

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
  const { name, email, question } = req.body || {};

  // Debug: log incoming payload (trim in prod)
  console.debug('/api/queries payload:', { name, email, question });

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
      // Running without DB configuration (e.g., MONGODB_URI) should return
      // a clear error rather than attempting to write to disk on hosted
      // environments that disallow writes.
      console.error('No MongoDB connection available and fallback disabled on deployed server.');
      return res.status(503).json({ ok: false, message: 'Database not available. Ensure MONGODB_URI is configured.' });
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
    res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
      if (err) res.status(500).send(err);
    });
  });
} else {
  // If frontend isn't built locally, redirect non-API requests to the deployed frontend
  app.get(/.*/, (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    console.warn('Frontend build not found locally. Redirecting to:', FRONTEND_URL);
    // Preserve the path when redirecting so deep links still work
    const redirectTo = (FRONTEND_URL || '').replace(/\/$/, '') + req.path;
    return res.redirect(302, redirectTo);
  });
}

const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

// Graceful shutdown - close MongoDB client if connected
async function shutdown() {
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
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
