const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const generateToken = (userId) => {
  return jwt.sign(
    { userId, iat: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user with EduFlix-specific fields
    const user = new User({
      email: email.toLowerCase(),
      password,
      name,
      role: role || 'student',
      joinDate: new Date(),
      preferences: {
        favoriteSubjects: [],
        learningLevel: 'Lifelong Learner',
        preferredFormat: ['Documentary'],
        theme: 'dark',
        notifications: {
          newRecommendations: true,
          learningReminders: false,
          progressReports: true
        }
      },
      learningStats: {
        hoursWatched: 0,
        subjectsExplored: 0,
        completedCourses: 0,
        learningStreak: 0,
        watchlist: [],
        watched: [],
        savedPlaylists: []
      }
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    logger.info(`New user registered: ${email} as ${role || 'student'}`);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        joinDate: user.joinDate,
        preferences: user.preferences,
        learningStats: user.learningStats
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    logger.info(`User logged in: ${email} as ${user.role}`);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        joinDate: user.joinDate,
        preferences: user.preferences,
        learningStats: user.learningStats
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

const logout = async (req, res) => {
  try {
    // In a real app, you might want to invalidate the token
    // For now, just return success
    logger.info(`User logged out: ${req.user?.email}`);
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({ error: 'Server error during logout' });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Find user to ensure they still exist
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    logger.error('Token verification error:', error);
    res.status(500).json({ error: 'Server error during token verification' });
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyToken,
  generateToken
};
