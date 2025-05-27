import express from 'express';
import Prediction from '../models/Prediction.js';
import { auth } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';

const router = express.Router();

// Get all predictions (paginated)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    const predictions = await Prediction.find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Prediction.countDocuments();

    res.json({
      predictions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching predictions' });
  }
});

// Get single prediction
router.get('/:id', async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);
    if (!prediction) {
      return res.status(404).json({ message: 'Prediction not found' });
    }
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prediction' });
  }
});

// Create prediction (admin only)
router.post('/', [auth, adminOnly], async (req, res) => {
  try {
    const prediction = new Prediction(req.body);
    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating prediction' });
  }
});

// Update prediction (admin only)
router.put('/:id', [auth, adminOnly], async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!prediction) {
      return res.status(404).json({ message: 'Prediction not found' });
    }
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating prediction' });
  }
});

// Delete prediction (admin only)
router.delete('/:id', [auth, adminOnly], async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndDelete(req.params.id);
    if (!prediction) {
      return res.status(404).json({ message: 'Prediction not found' });
    }
    res.json({ message: 'Prediction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting prediction' });
  }
});

export default router;