const express = require('express');
const router = express.Router();
const EducationalMovie = require('../models/Movie');
const { authMiddleware } = require('../middleware/auth');

// Get personalized recommendations based on user preferences
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { subject, topic, learningLevel, format, limit = 10 } = req.query;
    const userId = req.user.id;
    
    const User = require('../models/User');
    const user = await User.findById(userId);
    
    // Build filter based on query params or user preferences
    const filter = {};
    
    if (subject) {
      filter.subject = subject;
    } else if (user.preferences.favoriteSubjects.length > 0) {
      filter.subject = { $in: user.preferences.favoriteSubjects };
    }
    
    if (learningLevel) {
      filter.learningLevel = learningLevel;
    } else {
      filter.learningLevel = user.preferences.learningLevel;
    }
    
    if (format) {
      filter.format = format;
    } else if (user.preferences.preferredFormat.length > 0) {
      filter.format = { $in: user.preferences.preferredFormat };
    }
    
    if (topic) {
      filter.topics = { $in: [topic] };
    }
    
    // Exclude already watched movies
    if (user.learningStats.watched.length > 0) {
      filter._id = { $nin: user.learningStats.watched };
    }
    
    const recommendations = await EducationalMovie.find(filter)
      .sort({ popularity: -1 })
      .limit(parseInt(limit));
    
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recommendations by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const { learningLevel, limit = 10 } = req.query;
    
    const filter = { subject };
    if (learningLevel) filter.learningLevel = learningLevel;
    
    const recommendations = await EducationalMovie.find(filter)
      .sort({ popularity: -1 })
      .limit(parseInt(limit));
    
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending/popular movies
router.get('/trending/all', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const trending = await EducationalMovie.find()
      .sort({ popularity: -1 })
      .limit(parseInt(limit));
    
    res.json({ trending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get similar movies
router.get('/similar/:id', async (req, res) => {
  try {
    const movie = await EducationalMovie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    const similar = await EducationalMovie.find({
      _id: { $ne: req.params.id },
      $or: [
        { subject: movie.subject },
        { topics: { $in: movie.topics } },
        { learningLevel: movie.learningLevel }
      ]
    })
      .sort({ popularity: -1 })
      .limit(10);
    
    res.json({ similar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
