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

// 4.1 Health check endpoint
app.get('/api/health', (_, res) => {
  res.status(200).json({ status: 'OK' })
});

// 4.2 : 404 handeler
app.use((_, res) => {
  res.status(404).json({ message: 'Route not found'})
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!'})
});

// 5. Start Srver
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`))
}).catch(err => {
  console.error('Database connection failed', err);
  process.exit(1);
});

