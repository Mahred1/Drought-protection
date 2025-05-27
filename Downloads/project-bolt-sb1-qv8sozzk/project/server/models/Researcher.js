import mongoose from 'mongoose';

const researcherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  expertise: [{
    type: String
  }],
  institution: {
    type: String,
    required: true
  },
  profile_image: {
    type: String,
    required: true
  },
  publications: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Researcher', researcherSchema);