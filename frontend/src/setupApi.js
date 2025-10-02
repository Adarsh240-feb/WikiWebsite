import API_BASE from './config.js';

// expose for debugging
if (typeof window !== 'undefined') window.API_BASE = API_BASE;

// try to configure axios if used
try {
  // eslint-disable-next-line node/no-extraneous-require
  const axios = require('axios');
  if (axios && API_BASE) axios.defaults.baseURL = API_BASE;
} catch (e) {
  // axios not present — ignore
}

// monkey-patch fetch so calls to "/api/..." are forwarded to API_BASE
if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    try {
      if (input instanceof Request) {
        if (input.url && input.url.startsWith('/api')) {
          const url = (API_BASE || '').replace(/\/$/, '') + input.url;
          return originalFetch(new Request(url, input), init);
        }
        return originalFetch(input, init);
      }
      if (typeof input === 'string' && input.startsWith('/api')) {
        const url = (API_BASE || '').replace(/\/$/, '') + input;
        return originalFetch(url, init);
      }
    } catch (err) {
      // fallback
      console.warn('fetch wrapper error', err);
    }
    return originalFetch(input, init);
  };
}
