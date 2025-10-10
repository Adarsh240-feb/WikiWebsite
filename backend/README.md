Deployment instructions for backend + serving frontend on Vercel

This backend is configured to optionally serve the built frontend when you enable SERVE_FRONTEND=true in environment variables and allow Vercel to run the `vercel-build` script.

Steps to deploy (Vercel)

1. In the Vercel project for the backend, set the following Environment Variables:
   - SERVE_FRONTEND = true
   - FRONTEND_URL = https://wikiclubtechuit.org   # (or your frontend domain)

2. Ensure Vercel's build command uses the package.json in `backend/` (this is the project root for this deployment). Vercel will run `npm run vercel-build` which will:
   - run `npm ci` and `npm run build` in `../frontend`
   - run `postvercel-build` which copies `frontend/dist` into `backend/frontend_dist`

3. Vercel will then install backend dependencies and start the server.

Notes
- If you prefer to keep frontend and backend separate, set SERVE_FRONTEND=false and host the frontend project independently (recommended in many cases).
- The server will look for `backend/frontend_dist` when SERVE_FRONTEND=true and will serve files from there.

Local testing
- Build and copy locally (quick):
  cd frontend
  npm ci
  npm run build
  cd ../backend
  node ./scripts/copy-dist.js
  # now start server
  node server.js

If anything fails in the Vercel deployment logs during build or runtime, copy the error lines and paste them here and I'll fix them.
