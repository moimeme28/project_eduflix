import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import './index.css';
import { SUBJECT_CATEGORIES, LEARNING_LEVELS, LEARNING_FORMATS } from './data/subjects';
import eduflixService from './services/eduflixService';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import SubjectSelection from './components/SubjectSelection';
import TopicSelection from './components/TopicSelection';
import Recommendations from './components/Recommendations';
import MovieDetails from './components/MovieDetails';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AIAssistant from './components/AIAssistant';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [selectedFormat, setSelectedFormat] = useState('documentary');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('eduflix_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    loadRecommendations();
  };

  const loadRecommendations = async () => {
    if (!selectedSubject) return;
    
    setLoading(true);
    try {
      const movies = await eduflixService.getEducationalMovies(
        selectedSubject.id,
        selectedTopic?.id,
        selectedLevel,
        selectedFormat
      );
      setRecommendations(movies);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reload recommendations when level or format changes
  useEffect(() => {
    if (selectedSubject) {
      loadRecommendations();
    }
  }, [selectedLevel, selectedFormat]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('eduflix_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('eduflix_user');
  };

  // Wrapper component to handle URL parameters
  const TopicSelectionWrapper = () => {
    const { subjectId } = useParams();
    const subject = SUBJECT_CATEGORIES.find(cat => cat.id === subjectId);
    
    useEffect(() => {
      if (subject) {
        setSelectedSubject(subject);
      }
    }, [subject]);
    
    return <TopicSelection subject={subject} onSelect={handleTopicSelect} />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-white">
        <Navbar user={user} onLogout={handleLogout} onAI={() => setShowAI(true)} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<SubjectSelection 
            categories={SUBJECT_CATEGORIES}
            onSelect={handleSubjectSelect}
          />} />
          <Route path="/topics/:subjectId" element={<TopicSelectionWrapper />} />
          <Route path="/recommendations" element={<Recommendations
            subject={selectedSubject}
            topic={selectedTopic}
            level={selectedLevel}
            format={selectedFormat}
            movies={recommendations}
            loading={loading}
            onLevelChange={setSelectedLevel}
            onFormatChange={setSelectedFormat}
          />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/dashboard" element={user?.role === 'teacher' ? 
            <TeacherDashboard user={user} /> : 
            <StudentDashboard user={user} />
          } />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
      </div>
    </Router>
  );
}

export default App;
