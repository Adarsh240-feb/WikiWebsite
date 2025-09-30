// server/server.js (UPDATED)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Must include .js extension
import queryRoutes from './routes/queryRoutes.js'; // Must include .js extension

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware Setup
app.use(cors()); 
app.use(express.json()); 

// Route Mounting
app.use('/api/queries', queryRoutes); 

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));