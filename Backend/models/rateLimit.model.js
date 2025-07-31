import mongoose from 'mongoose';

const rateLimitSchema = new mongoose.Schema({
  ip: { 
    type: String, 
    required: true,
    index: true 
  },
  count: { 
    type: Number, 
    default: 1 
  },
  lastRequest: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

// Auto-expire documents after 1 hour
rateLimitSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.model('RateLimit', rateLimitSchema);