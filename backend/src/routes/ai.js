const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// AI Chat endpoint for the assistant
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // In production, this would call OpenAI, Anthropic, or another AI API
    // For now, return a simulated response
    const response = generateAIResponse(message, context);
    
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate summary for a movie
router.post('/summary/:movieId', authMiddleware, async (req, res) => {
  try {
    const EducationalMovie = require('../models/Movie');
    const movie = await EducationalMovie.findById(req.params.movieId);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    // If summary already exists, return it
    if (movie.summary) {
      return res.json({ summary: movie.summary });
    }
    
    // In production, this would call an AI API to generate summary
    const summary = generateSummary(movie);
    
    // Save the summary
    movie.summary = summary;
    await movie.save();
    
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate quiz for a movie
router.post('/quiz/:movieId', authMiddleware, async (req, res) => {
  try {
    const EducationalMovie = require('../models/Movie');
    const movie = await EducationalMovie.findById(req.params.movieId);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    // If quiz already exists, return it
    if (movie.quiz && movie.quiz.length > 0) {
      return res.json({ quiz: movie.quiz });
    }
    
    // In production, this would call an AI API to generate quiz
    const quiz = generateQuiz(movie);
    
    // Save the quiz
    movie.quiz = quiz;
    await movie.save();
    
    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to generate AI chat response
function generateAIResponse(message, context) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
    return "I can help you find the perfect educational content! Please tell me what subject you're interested in, your current learning level, and preferred format (documentary, movie, series, etc.).";
  }
  
  if (lowerMessage.includes('biology') || lowerMessage.includes('science')) {
    return "For biology and science, I recommend starting with documentaries like 'The Science of Everything' or 'Cosmos: A Spacetime Odyssey'. These cover fundamental concepts in an engaging way. What specific topic interests you most?";
  }
  
  if (lowerMessage.includes('history')) {
    return "History documentaries are a great way to learn! I recommend 'The World at War' for comprehensive coverage, or 'Civilization' for a broader historical perspective. What time period or region interests you?";
  }
  
  if (lowerMessage.includes('study plan') || lowerMessage.includes('learning path')) {
    return "I can create a personalized study plan for you! Please share your learning goals, available time per week, current knowledge level, and preferred learning style.";
  }
  
  return "I'm here to help you with educational content recommendations and learning guidance. Feel free to ask me about subjects, get study tips, or request personalized recommendations!";
}

// Helper function to generate movie summary
function generateSummary(movie) {
  return `This ${movie.format.toLowerCase()} titled "${movie.title}" explores important concepts in ${movie.subject}. 
  It covers topics such as ${movie.topics.slice(0, 3).join(', ')}. 
  The content is designed for ${movie.learningLevel.toLowerCase()} learners and provides valuable insights into the subject matter.
  Key learning objectives include understanding fundamental principles, exploring real-world applications, and developing critical thinking skills.`;
}

// Helper function to generate quiz
function generateQuiz(movie) {
  return [
    {
      question: `What is the main subject of "${movie.title}"?`,
      options: [movie.subject, 'Mathematics', 'Literature', 'Arts'],
      correctAnswer: 0
    },
    {
      question: `Which of the following topics is covered in this ${movie.format.toLowerCase()}?`,
      options: movie.topics.slice(0, 4),
      correctAnswer: 0
    },
    {
      question: `What learning level is this content designed for?`,
      options: ['Elementary', 'Middle School', movie.learningLevel, 'Professional'],
      correctAnswer: 2
    },
    {
      question: `What is a key concept you should learn from this content?`,
      options: movie.keyConcepts.slice(0, 4),
      correctAnswer: 0
    }
  ];
}

module.exports = router;
