import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  prediction_date: {
    type: Date,
    required: true
  },
  severity_level: {
    type: String,
    enum: ['low', 'moderate', 'high', 'extreme'],
    required: true
  },
  geospatial_data: {
    type: Object
  },
  attachments: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('Prediction', predictionSchema);