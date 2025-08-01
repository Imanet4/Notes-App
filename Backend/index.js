import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

// 1. Loading environment variables
dotenv.config();

// 2. Creating Express app
const app = express();
const PORT = process.env.PORT || 8000;

// 3. Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(rateLimiter);

// 4. Routes
app.use("/api/notes", notesRoutes);

// 5. Start Srver
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`))
})

