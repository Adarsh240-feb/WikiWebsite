// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    // This is the crucial part for connecting client and server
    proxy: {
      '/api': {
        // During development we can proxy API calls to the deployed backend
        // so CORS isn't a problem. Use your Vercel backend URL below.
        target: 'https://wikiwebsite-backend.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      // optional: keep if you use @ as src alias
      '@': '/src',
    },
  },
});