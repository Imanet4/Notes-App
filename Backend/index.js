import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

// 1. Loading environment variables
dotenv.config();

// 2. Creating Express app
const app = express();
const PORT = process.env.PORT || 8000;

// 3. Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(rateLimiter);

// 4. Routes
app.use("/api/notes", notesRoutes);

// 5. MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// 6. Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});