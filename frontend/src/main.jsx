import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './setupApi.js'; // ensure this runs before components that call /api
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={4000} />
    <Analytics />
  </React.StrictMode>
);