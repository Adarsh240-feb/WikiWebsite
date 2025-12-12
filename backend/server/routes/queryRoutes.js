// server/routes/queryRoutes.js
import express from 'express';
import { body, validationResult } from 'express-validator';
// Note the .js extension is required for local imports in ES Modules
import Query from '../models/Query.js'; 

const router = express.Router(); 

// Validation middleware for the query form
const validateQuery = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('question').trim().notEmpty().withMessage('Question is required'),
];

// @route POST /api/queries
// @desc Create a new visitor query and save to MongoDB
router.post('/', validateQuery, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  const { name, email, question } = req.body;

  try {
    const newQuery = await Query.create({ name, email, question });
    return res.status(201).json({ ok: true, message: '✅ Your query has been submitted successfully!', data: newQuery });
  } catch (err) {
    console.error('Database save error:', err);
    return res.status(500).json({ ok: false, message: '❌ Server error: Could not save query.' });
  }
});

export default router;