// Import the rate limit client (configured with Upstash Redis)
import ratelimit from "../config/upstash.js";

/*
 * Rate limiter middleware
 * Enforcing request limits using Upstash Redis to prevent API abuse
 */
const rateLimiter = async (req, res, next) => {
    try {
        // Attempting to limit requests using Upstash
        const { success } = await ratelimit.limit("my-rate-limit");

        // If it is (success = false), block the request
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            });
        }

        next();

    } catch (error) {
        
        // Log and forward any rate limiting errors
        console.log("Rate limit error:", error);
        
        // Pass error to Express error handler
        next(error);
    }
}

export default rateLimiter;