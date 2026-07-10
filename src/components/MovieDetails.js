import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, Users, Play, Bookmark, Check, BookOpen, Lightbulb, MessageSquare, ArrowLeft } from 'lucide-react';
import eduflixService from '../services/eduflixService';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const loadMovieDetails = async () => {
    setLoading(true);
    try {
      const details = await eduflixService.getMovieDetails(id);
      setMovie(details);
    } catch (error) {
      console.error('Error loading movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="inline-flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="mt-4 text-gray-400">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-gray-400">Movie not found</p>
        </div>
      </div>
    );
  }

  const eduMetadata = movie.educationalMetadata || {};

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/recommendations" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Recommendations
        </Link>

        {/* Hero Section */}
        <div className="glass-card overflow-hidden mb-8">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Poster */}
            <div className="relative h-96 md:h-auto overflow-hidden">
              {movie.poster_path && (
                <img 
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', movie.poster_path);
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = '#667eea';
                    const titleEl = document.createElement('span');
                    titleEl.className = 'absolute inset-0 flex items-center justify-center text-white text-sm text-center px-4';
                    titleEl.textContent = movie.title;
                    e.target.parentElement.appendChild(titleEl);
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', movie.poster_path);
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            </div>

            {/* Info */}
            <div className="md:col-span-2 p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">{movie.title}</h1>
                  {movie.tagline && (
                    <p className="text-gray-400 italic mb-4">{movie.tagline}</p>
                  )}
                </div>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`p-3 rounded-lg transition-all ${
                    saved
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'glass-button text-gray-300'
                  }`}
                >
                  {saved ? <Check className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                </button>
              </div>

              {/* Rating and Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                </div>
                {movie.release_date && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.release_date.split('-')[0]}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <p className="text-gray-300 mb-6 leading-relaxed">{movie.overview}</p>

              {/* Cast and Crew */}
              {movie.credits && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {movie.credits.crew?.find(p => p.job === 'Director') && (
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Director</p>
                      <p className="font-medium">
                        {movie.credits.crew.find(p => p.job === 'Director').name}
                      </p>
                    </div>
                  )}
                  {movie.credits.cast && movie.credits.cast.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Cast</p>
                      <p className="font-medium">
                        {movie.credits.cast.slice(0, 3).map(c => c.name).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => window.open(movie.trailer || `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`, '_blank')}
                  className="flex-1 min-w-[200px] py-3 px-6 rounded-xl bg-gradient-primary font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </button>
                <button 
                  onClick={() => setActiveTab('objectives')}
                  className="flex-1 min-w-[200px] py-3 px-6 rounded-xl glass-button font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </button>
              </div>

              {/* Streaming Platforms */}
              {movie.platforms && movie.platforms.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Available on:</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.platforms.map((platform, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content Tabs */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'trailer', label: 'Trailer', icon: Play },
              { id: 'objectives', label: 'Learning Objectives', icon: Lightbulb },
              { id: 'concepts', label: 'Key Concepts', icon: BookOpen },
              { id: 'discussion', label: 'Discussion', icon: MessageSquare },
              { id: 'quiz', label: 'Quiz', icon: BookOpen }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-white'
                    : 'glass-button text-gray-300 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Educational Value</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary transition-all"
                        style={{ width: `${eduMetadata.educationalValue * 10}%` }}
                      />
                    </div>
                    <span className="font-medium">{eduMetadata.educationalValue || 7}/10</span>
                  </div>
                </div>
                {eduMetadata.subjects && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Subjects Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {eduMetadata.subjects.map((subject) => (
                        <span key={subject} className="px-3 py-1 rounded-lg bg-primary-500/20 text-primary-400">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {eduMetadata.topics && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {eduMetadata.topics.map((topic) => (
                        <span key={topic} className="px-3 py-1 rounded-lg bg-white/10 text-gray-300">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trailer' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Watch Trailer</h3>
                {movie.trailer ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={movie.trailer.replace('watch?v=', 'embed/')}
                        title={`${movie.title} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Play className="w-5 h-5" />
                      Watch on YouTube
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">Trailer not available</p>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Play className="w-5 h-5" />
                      Search on YouTube
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'objectives' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Learning Objectives</h3>
                <ul className="space-y-2">
                  {(eduMetadata.learningObjectives || [
                    'Understand the core concepts presented in this content',
                    'Apply knowledge to real-world scenarios',
                    'Develop critical thinking skills'
                  ]).map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'concepts' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Key Concepts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(eduMetadata.keyConcepts || [
                    'Core principles and theories',
                    'Practical applications',
                    'Historical context',
                    'Modern relevance'
                  ]).map((concept, index) => (
                    <div key={index} className="glass-card p-4">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-primary-400" />
                        <span className="font-medium">{concept}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Discussion Questions</h3>
                <div className="space-y-4">
                  {(eduMetadata.discussionQuestions || [
                    'What are the main takeaways from this content?',
                    'How does this relate to what you already know?',
                    'What questions do you still have?'
                  ]).map((question, index) => (
                    <div key={index} className="glass-card p-4">
                      <p className="text-gray-300">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Knowledge Check</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((q) => (
                    <div key={q} className="glass-card p-4">
                      <p className="font-medium mb-3">{q}. Sample quiz question about the content...</p>
                      <div className="space-y-2">
                        {['A', 'B', 'C', 'D'].map((opt) => (
                          <button
                            key={opt}
                            className="w-full text-left px-4 py-2 rounded-lg glass-button text-sm hover:bg-white/10 transition-colors"
                          >
                            {opt}. Sample answer option
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Recommendations */}
        <div>
          <h2 className="text-2xl font-bold font-display mb-6">Similar Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="glass-card overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-primary-500/20 to-purple-500/20" />
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">Similar Educational Content {i}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
