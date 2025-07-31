import express from 'express'; // Express framework for building the server
import dotenv from 'dotenv'; // Loading environment variables 
import cors from 'cors'; // Cross-Origin Resource Sharing middleware
import rateLimiter from './middleware/rateLimiter.js'; // Rate limiting middleware
import notesRoutes from './routes/notesRoutes.js'; // Router for notes-related endpoints
import { connectDB } from './config/database.js'; // DB connection function

// Loading environment variables from .env file into process.env
dotenv.config();

// Initialize Express application
const app = express();

// Set the port from environment variables or default to 5001
const PORT = process.env.PORT || 8000;


// ---- MIDDLEWARE SETUP ----//
// Enable CORS with specific origin
app.use(cors({
    origin: "http://localhost:3000", // Only allow requests from this origin
}));


// Parse incoming JSON requests and make them available in req.body
app.use(express.json());


// Apply rate limiting to all routes
app.use(rateLimiter);





// ---- ROUTES ---- //
// Mount the notes routes at the /api/notes base path
app.use("/api/notes", notesRoutes);


// ========== DATABASE & SERVER INITIALIZATION ========== //
// Connect to the DB first, then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}` );
    });
});