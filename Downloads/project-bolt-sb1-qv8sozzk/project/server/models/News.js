import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  publish_date: {
    type: Date,
    required: true
  },
  featured_image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('News', newsSchema);