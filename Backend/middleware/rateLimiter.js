import RateLimit from '../models/rateLimit.model.js';





const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 100; //max requests /window

  try {
    let record = await RateLimit.findOne({ ip });

    if (!record) {
      // First request from this IP
      record = new RateLimit({ ip, count: 1 });
        } else {
            const timeElapsed = Date.now() - record.updatedAt;

            //Reseting count if window has passed
            if (timeElapsed > windowMs) {
                record.count = 1;
            } else if (record.count >= maxRequests) {
                return res.status(429).json({ 
                    message: "Too many requests, please try again later." 
                });
            } else {
                record.count += 1;
            }
        };

        record.updatedAt = Date.now();
        await record.save();
        next();
    } catch (error) {
        console.error("Rate limit error:", error);
        next(); // Fail open - allow request if rate limiting fails
    }
};

export default rateLimiter;