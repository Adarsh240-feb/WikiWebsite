// server/models/Query.js (CORRECTED)
import mongoose from 'mongoose';

const querySchema = mongoose.Schema(
  // 1. First Argument: Define the actual fields/structure
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    question: {
      type: String,
      required: [true, 'Please add a question/query'],
    },
  },
  // 2. Second Argument: Schema Options (like timestamps)
  {
    timestamps: true, // Correctly placed as a schema option
  }
);

export default mongoose.model('Query', querySchema);