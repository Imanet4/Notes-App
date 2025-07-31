import RateLimit from '../models/rateLimit.model';

const rateLimiter = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 100; // Max requests per window

  try {
    let record = await RateLimit.findOne({ ip });

    if (!record) {
      // First request from this IP
      record = new RateLimit({ ip });
      await record.save();
      return next();
    }

    const timeSinceLastRequest = Date.now() - record.lastRequest;
    
    if (timeSinceLastRequest > windowMs) {
      // Window expired, reset count
      record.count = 1;
      record.lastRequest = Date.now();
      await record.save();
      return next();
    }

    if (record.count >= maxRequests) {
      // Rate limit exceeded
      return res.status(429).json({
        message: "Too many requests, please try again later."
      });
    }

    // Increment count and allow request
    record.count += 1;
    record.lastRequest = Date.now();
    await record.save();
    next();

  } catch (error) {
    console.error('Rate limit error:', error);
    next(); // Fail open - allow request if rate limiting fails
  }
};

export default rateLimiter;