// server/routes/queryRoutes.js
import express from 'express';
// Note the .js extension is required for local imports in ES Modules
import Query from '../models/Query.js'; 

const router = express.Router(); 

// @route POST /api/queries
// @desc Create a new visitor query and save to MongoDB
router.post('/', async (req, res) => {
  // Extract data sent from the frontend form
  const { name, email, question } = req.body;

  // 1. Validation Check: Ensure all required fields are present
  if (!name || !email || !question) {
    // Send a 400 Bad Request error if data is missing
    return res.status(400).json({ message: '❌ Please provide all fields (Name, Email, Question).' });
  }

  try {
    // 2. Data Saving: Create a new document in the MongoDB 'queries' collection
    const newQuery = await Query.create({
      name,
      email,
      question,
    });

    // 3. Success Response: Send a 201 Created status back to the frontend
    res.status(201).json({ 
        // This message will be displayed as the green success message on the frontend
        message: '✅ Your query has been submitted successfully! We will get back to you through E-mail.', 
        data: newQuery 
    });
  } catch (err) {
    // 4. Error Handling: Log the error and send a 500 status
    console.error("Database save error:", err);
    res.status(500).json({ message: '❌ Server error: Could not save query.' });
  }
});

// Export the router so server.js can use it
export default router;