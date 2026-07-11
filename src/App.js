import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import './index.css';
import { SUBJECT_CATEGORIES } from './data/subjects';
import eduflixService from './services/eduflixService';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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

function AppContent() {
  const { user, logout } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [selectedFormat, setSelectedFormat] = useState('documentary');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const loadRecommendations = useCallback(async (subject, topic, level, format) => {
    if (!subject) return;

    setLoading(true);
    try {
      const movies = await eduflixService.getEducationalMovies(
        subject.id,
        topic?.id,
        level,
        format
      );
      setRecommendations(movies);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setRecommendations([]);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    loadRecommendations(selectedSubject, topic, selectedLevel, selectedFormat);
  };

  // Reload recommendations when level or format changes
  useEffect(() => {
    if (selectedSubject) {
      loadRecommendations(selectedSubject, selectedTopic, selectedLevel, selectedFormat);
    }
  }, [selectedLevel, selectedFormat, selectedSubject, selectedTopic, loadRecommendations]);

  const handleLogout = () => {
    logout();
    setSelectedSubject(null);
    setSelectedTopic(null);
    setRecommendations([]);
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
        <Route
          path="/dashboard"
          element={
            user
              ? (user.role === 'teacher'
                ? <TeacherDashboard user={user} />
                : <StudentDashboard user={user} />)
              : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
