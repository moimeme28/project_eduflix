const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  // EduFlix specific preferences
  preferences: {
    favoriteSubjects: [{
      type: String,
      enum: ['Science', 'Mathematics', 'History', 'Literature', 'Technology', 'Arts', 'Geography', 'Philosophy', 'Economics', 'Psychology', 'Health', 'Environment']
    }],
    learningLevel: {
      type: String,
      enum: ['Elementary', 'Middle School', 'High School', 'College', 'Professional', 'Lifelong Learner'],
      default: 'Lifelong Learner'
    },
    preferredFormat: [{
      type: String,
      enum: ['Documentary', 'Movie', 'TV Series', 'Mini-Series', 'Lecture', 'Animation']
    }],
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    notifications: {
      newRecommendations: {
        type: Boolean,
        default: true
      },
      learningReminders: {
        type: Boolean,
        default: false
      },
      progressReports: {
        type: Boolean,
        default: true
      }
    }
  },
  // EduFlix learning stats
  learningStats: {
    hoursWatched: {
      type: Number,
      default: 0
    },
    subjectsExplored: {
      type: Number,
      default: 0
    },
    completedCourses: {
      type: Number,
      default: 0
    },
    learningStreak: {
      type: Number,
      default: 0
    },
    lastActiveDate: {
      type: Date
    },
    watchlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EducationalMovie'
    }],
    watched: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EducationalMovie'
    }],
    savedPlaylists: [{
      name: String,
      movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EducationalMovie'
      }]
    }]
  },
  // Teacher-specific fields
  teacherData: {
    classes: [{
      name: String,
      students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
      assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
      }]
    }]
  },
  // Achievements
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  subscription: {
    type: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    expires: {
      type: Date,
      default: null
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get user data without password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
