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
  }
}, { timestamps: true,
  
  //Auto-expire records after 1 hour
    expireAfterSeconds: 3600
 });

const RateLimit = mongoose.model('RateLimit', rateLimitSchema)

export default RateLimit;