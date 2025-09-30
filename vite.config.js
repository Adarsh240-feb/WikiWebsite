// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the crucial part for connecting client and server
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // The port your Express server is running on
        changeOrigin: true,
        secure: false,
      },
    },
  },
});