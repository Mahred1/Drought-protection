import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  registration_link: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);