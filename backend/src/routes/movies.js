const express = require('express');
const router = express.Router();
const EducationalMovie = require('../models/Movie');
const { authMiddleware } = require('../middleware/auth');

// Get all movies with optional filters
router.get('/', async (req, res) => {
  try {
    const { subject, learningLevel, format, topic, page = 1, limit = 20 } = req.query;
    
    const filter = {};
    if (subject) filter.subject = subject;
    if (learningLevel) filter.learningLevel = learningLevel;
    if (format) filter.format = format;
    if (topic) filter.topics = { $in: [topic] };
    
    const movies = await EducationalMovie.find(filter)
      .sort({ popularity: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await EducationalMovie.countDocuments(filter);
    
    res.json({
      movies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await EducationalMovie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search movies
router.get('/search/query', async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const movies = await EducationalMovie.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await EducationalMovie.countDocuments({ $text: { $search: q } });
    
    res.json({
      movies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add movie to watchlist
router.post('/:id/watchlist', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    
    const user = await User.findById(userId);
    if (!user.learningStats.watchlist.includes(req.params.id)) {
      user.learningStats.watchlist.push(req.params.id);
      await user.save();
    }
    
    res.json({ message: 'Added to watchlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove movie from watchlist
router.delete('/:id/watchlist', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    
    const user = await User.findById(userId);
    user.learningStats.watchlist = user.learningStats.watchlist.filter(
      id => id.toString() !== req.params.id
    );
    await user.save();
    
    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark movie as watched
router.post('/:id/watched', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    
    const user = await User.findById(userId);
    if (!user.learningStats.watched.includes(req.params.id)) {
      user.learningStats.watched.push(req.params.id);
      user.learningStats.hoursWatched += 2; // Default 2 hours per movie
      await user.save();
    }
    
    res.json({ message: 'Marked as watched' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
