const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    
    await user.save();
    
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user preferences
router.put('/preferences', authMiddleware, async (req, res) => {
  try {
    const { favoriteSubjects, learningLevel, preferredFormat, theme, notifications } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (favoriteSubjects) user.preferences.favoriteSubjects = favoriteSubjects;
    if (learningLevel) user.preferences.learningLevel = learningLevel;
    if (preferredFormat) user.preferences.preferredFormat = preferredFormat;
    if (theme) user.preferences.theme = theme;
    if (notifications) user.preferences.notifications = { ...user.preferences.notifications, ...notifications };
    
    await user.save();
    
    res.json({ message: 'Preferences updated successfully', preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user learning stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.learningStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update learning progress
router.post('/progress', authMiddleware, async (req, res) => {
  try {
    const { hoursWatched, subjectsExplored, completedCourses } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (hoursWatched) user.learningStats.hoursWatched += hoursWatched;
    if (subjectsExplored) user.learningStats.subjectsExplored += subjectsExplored;
    if (completedCourses) user.learningStats.completedCourses += completedCourses;
    
    // Update streak
    const today = new Date();
    const lastActive = user.learningStats.lastActiveDate;
    
    if (lastActive) {
      const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        user.learningStats.learningStreak += 1;
      } else if (diffDays > 1) {
        user.learningStats.learningStreak = 1;
      }
    } else {
      user.learningStats.learningStreak = 1;
    }
    
    user.learningStats.lastActiveDate = today;
    await user.save();
    
    res.json({ message: 'Progress updated successfully', learningStats: user.learningStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user watchlist
router.get('/watchlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('learningStats.watchlist');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.learningStats.watchlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user watched history
router.get('/watched', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('learningStats.watched');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.learningStats.watched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create playlist
router.post('/playlists', authMiddleware, async (req, res) => {
  try {
    const { name, movieIds } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.learningStats.savedPlaylists.push({
      name,
      movies: movieIds || []
    });
    
    await user.save();
    
    res.json({ message: 'Playlist created successfully', playlists: user.learningStats.savedPlaylists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user playlists
router.get('/playlists', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('learningStats.savedPlaylists.movies');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.learningStats.savedPlaylists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Teacher-specific: Get teacher data
router.get('/teacher/data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'teacher') {
      return res.status(403).json({ error: 'Access denied. Teacher role required.' });
    }
    res.json(user.teacherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Teacher-specific: Create class
router.post('/teacher/classes', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'teacher') {
      return res.status(403).json({ error: 'Access denied. Teacher role required.' });
    }
    
    user.teacherData.classes.push({
      name,
      students: [],
      assignments: []
    });
    
    await user.save();
    
    res.json({ message: 'Class created successfully', classes: user.teacherData.classes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
