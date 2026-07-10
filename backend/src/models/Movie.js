const mongoose = require('mongoose');

const educationalMovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  synopsis: {
    type: String,
    required: true,
    maxlength: 1000
  },
  genre: {
    type: String,
    required: true,
    enum: ['Documentary', 'Drama', 'Biography', 'History', 'Science', 'Technology', 'Nature', 'Animation', 'Adventure']
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 5
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  director: {
    type: String,
    trim: true
  },
  cast: [{
    type: String,
    trim: true
  }],
  // EduFlix specific fields
  subject: {
    type: String,
    required: true,
    enum: ['Science', 'Mathematics', 'History', 'Literature', 'Technology', 'Arts', 'Geography', 'Philosophy', 'Economics', 'Psychology', 'Health', 'Environment']
  },
  topics: [{
    type: String,
    trim: true
  }],
  learningLevel: {
    type: String,
    required: true,
    enum: ['Elementary', 'Middle School', 'High School', 'College', 'Professional', 'Lifelong Learner']
  },
  format: {
    type: String,
    required: true,
    enum: ['Documentary', 'Movie', 'TV Series', 'Mini-Series', 'Lecture', 'Animation']
  },
  educationalTags: [{
    type: String,
    trim: true
  }],
  // Educational metadata
  learningObjectives: [{
    type: String
  }],
  keyConcepts: [{
    type: String
  }],
  discussionQuestions: [{
    type: String
  }],
  vocabulary: [{
    term: String,
    definition: String
  }],
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }],
  summary: {
    type: String
  },
  streaming: [{
    type: String,
    enum: ['Netflix', 'Hulu', 'Disney+', 'Amazon Prime', 'HBO Max', 'YouTube', 'Kanopy', 'CuriosityStream', 'PBS', 'BBC']
  }],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  poster: {
    type: String,
    default: ''
  },
  trailer: {
    type: String,
    default: ''
  },
  popularity: {
    type: Number,
    default: 0,
    min: 0
  },
  releaseDate: {
    type: Date,
    required: true
  },
  tmdbId: {
    type: String,
    unique: true,
    sparse: true
  },
  imdbId: {
    type: String,
    unique: true,
    sparse: true
  },
  youtubeId: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for performance
educationalMovieSchema.index({ subject: 1, learningLevel: 1 });
educationalMovieSchema.index({ title: 'text', synopsis: 'text' });
educationalMovieSchema.index({ popularity: -1 });
educationalMovieSchema.index({ topics: 1 });
educationalMovieSchema.index({ format: 1 });

module.exports = mongoose.model('EducationalMovie', educationalMovieSchema);
