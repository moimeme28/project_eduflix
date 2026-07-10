import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SocialProvider, useSocial } from './contexts/SocialContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ThemeToggle from "./components/ThemeToggle";
import { LoadingSpinner } from './components/SkeletonLoader';
import tmdbService from './services/tmdbService';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const SocialHub = lazy(() => import('./components/SocialHub'));
const EnhancedAIChat = lazy(() => import('./components/EnhancedAIChat'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060810; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #ffffff22; border-radius: 4px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes popIn { 0%{transform:scale(.75);opacity:0;} 80%{transform:scale(1.04);} 100%{transform:scale(1);opacity:1;} }
`;

const MOODS = [
  { emoji:"😢", label:"Melancholic", color:"#4a90d9", desc:"Emotional & reflective" },
  { emoji:"😂", label:"Playful",     color:"#f5a623", desc:"Fun & lighthearted" },
  { emoji:"😱", label:"Thrilled",    color:"#e74c3c", desc:"Edge-of-seat tension" },
  { emoji:"🤔", label:"Curious",     color:"#2ecc71", desc:"Mind-expanding" },
  { emoji:"😍", label:"Romantic",    color:"#e91e8c", desc:"Love & connection" },
  { emoji:"🌌", label:"Inspired",    color:"#9b59b6", desc:"Epic & awe-inspiring" },
  { emoji:"😌", label:"Cozy",        color:"#e67e22", desc:"Warm & comforting" },
  { emoji:"🎯", label:"Focused",     color:"#3498db", desc:"Productive & motivated" },
];

function AppContent() {
  const { currentTheme } = useTheme();
  const { getUnreadCount } = useSocial();
  const { user, logout, updateUser } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [friends, setFriends] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const accent = selectedMood ? MOODS.find(m => m.label === selectedMood)?.color || "#4a90d9" : "#4a90d9";

  useEffect(() => {
    if (!selectedMood) return;
    
    const loadMovies = async () => {
      setLoading(true);
      try {
        // Start with mood-based movies
        const moviesData = await tmdbService.getMoviesByMood(selectedMood);
        
        // Only fetch additional movies if we need more
        let allMovies = [...moviesData];
        
        if (moviesData.length < 10) {
          try {
            // Get popular movies as backup
            const popularMovies = await tmdbService.getPopularMovies();
            const additionalMovies = popularMovies
              .filter(m => !moviesData.find(md => md.id === m.id))
              .slice(0, 10 - moviesData.length);
            allMovies = [...allMovies, ...additionalMovies];
          } catch (popularError) {
            console.warn('Could not fetch popular movies:', popularError);
          }
        }
        
        // Limit to reasonable number and fetch credits for first 10
        const limitedMovies = allMovies.slice(0, 10);
        
        try {
          // Fetch credits for movies (only first 10 to avoid rate limiting)
          const moviesWithCredits = await tmdbService.getMoviesWithCredits(limitedMovies);
          setMovies(moviesWithCredits);
        } catch (creditsError) {
          console.warn('Could not fetch credits, using basic movie data:', creditsError);
          // Fallback to movies without credits
          setMovies(limitedMovies);
        }
      } catch (err) {
        console.error('TMDB Error:', err);
        // Fallback to mock data if API is completely unavailable
        const fallbackMovies = [
          {
            id: 1,
            title: "The Shawshank Redemption",
            overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            release_date: "1994-09-23",
            vote_average: 8.7,
            poster_path: "/q6y0Go1tsGEsmtFrydoJo3dEmqu.jpg",
            genres: [{id: 18, name: "Drama"}],
            runtime: 142,
            credits: {
              crew: [{name: "Frank Darabont", job: "Director"}],
              cast: [{name: "Tim Robbins"}, {name: "Morgan Freeman"}]
            }
          },
          {
            id: 2,
            title: "The Godfather",
            overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            release_date: "1972-03-24",
            vote_average: 8.5,
            poster_path: "/3bhkrj58Vtu7enYsRolD1fZbLpc.jpg",
            genres: [{id: 18, name: "Drama"}, {id: 80, name: "Crime"}],
            runtime: 175,
            credits: {
              crew: [{name: "Francis Ford Coppola", job: "Director"}],
              cast: [{name: "Marlon Brando"}, {name: "Al Pacino"}]
            }
          }
        ];
        setMovies(fallbackMovies);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovies();
  }, [selectedMood]);

  const toggleWatchlist = (id) => setWatchlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const toggleWatched = (id) => setWatched(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  // Load detailed movie information
  const loadMovieDetails = async (movie) => {
    setSelectedMovie(movie);
    setLoadingDetails(true);
    
    try {
      const details = await tmdbService.getMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (error) {
      console.error('Error loading movie details:', error);
      // Use basic movie data if details fail
      setMovieDetails(movie);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Close movie details modal
  const closeMovieDetails = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
    setLoadingDetails(false);
  };

  const handleMoodSelect = mood => {
    setSelectedMood(mood.label);
    // Track mood history
    setMoodHistory(prev => [...prev, {
      mood: mood.label,
      timestamp: new Date().toISOString(),
      emoji: mood.emoji
    }]);
    setSearchQ(""); 
    setActiveTab("movies");
    setScreen("results");
    setSubScreen("recs");
  };

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: currentTheme.background,
      fontFamily: "Inter,sans-serif",
      color: currentTheme.text,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "20px"
    }}>
      <style>{GLOBAL_CSS}</style>
      
      {/* Navigation Header */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 1200,
        marginBottom: "30px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: currentTheme.surface,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: 16,
          padding: "20px 30px"
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              color: currentTheme.text
            }}>MoodC</h1>
            <p style={{
              margin: 0,
              color: currentTheme.textSecondary,
              fontSize: 14
            }}>AI-powered recommendations</p>
          </div>
          
          {/* Desktop Navigation */}
          <div style={{display:"flex",gap:"15px",alignItems:"center"}}>
            <ThemeToggle />
            
            {/* User Display */}
            {user && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px",
                background: currentTheme.background,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: "20px"
              }}>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
                <span style={{
                  color: currentTheme.text,
                  fontSize: 13,
                  fontWeight: 600
                }}>
                  {user.name}
                </span>
              </div>
            )}
            
            <a href="#" onClick={(e) => {e.preventDefault(); setDashboardOpen(true);}} style={{
              color: currentTheme.text,
              textDecoration: "none",
              padding: "8px 16px",
              background: currentTheme.background,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 600
            }}>Dashboard</a>
            <a href="#" onClick={(e) => {e.preventDefault(); setProfileOpen(true);}} style={{
              color: currentTheme.text,
              textDecoration: "none",
              padding: "8px 16px",
              background: currentTheme.background,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 600
            }}>Profile</a>
            <a href="#" onClick={(e) => {e.preventDefault(); setSocialOpen(true);}} style={{
              color: currentTheme.text,
              textDecoration: "none",
              padding: "8px 16px",
              background: currentTheme.background,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 600,
              position: "relative"
            }}>
              Social
              {getUnreadCount() > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "#e74c3c",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>
                  {getUnreadCount()}
                </span>
              )}
            </a>
            <button onClick={() => {logout(); window.location.reload();}} style={{
              color: "#fff",
              textDecoration: "none",
              padding: "8px 16px",
              background: "#ef4444",
              border: "none",
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer"
            }}>Logout</button>
          </div>
        </div>
      </div>

      {/* Mood Selection */}
      {!selectedMood ? (
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 740,
          animation: "fadeUp .5s ease"
        }}>
          <div style={{textAlign: "center", marginBottom: 40}}>
            <h2 style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 32,
              color: currentTheme.text,
              marginBottom: 16
            }}>What's the vibe today?</h2>
            <p style={{
              color: currentTheme.textSecondary,
              fontSize: 16
            }}>Select your current mood to get personalized movie recommendations</p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 16
          }}>
            {MOODS.map(mood => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 16,
                  padding: "24px 16px",
                  cursor: "pointer",
                  transition: "all .3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >
                <div style={{fontSize: 32}}>{mood.emoji}</div>
                <div style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: currentTheme.text
                }}>{mood.label}</div>
                <div style={{
                  fontSize: 11,
                  color: currentTheme.textSecondary
                }}>{mood.desc}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1200,
          animation: "fadeUp .5s ease"
        }}>
          <div style={{
            background: currentTheme.surface,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: 16,
            padding: "24px",
            marginBottom: 24
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20
            }}>
              <div>
                <h2 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: currentTheme.text,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}>
                  <span>{MOODS.find(m => m.label === selectedMood)?.emoji}</span> {selectedMood} Recommendations
                </h2>
                <p style={{
                  color: currentTheme.textSecondary,
                  fontSize: 14,
                  margin: 0
                }}>{MOODS.find(m => m.label === selectedMood)?.desc}</p>
              </div>
              <button
                onClick={() => setSelectedMood(null)}
                style={{
                  background: "transparent",
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 12,
                  cursor: "pointer"
                }}
              >Change Mood</button>
            </div>
            
            {loading && (
              <div style={{
                animation: "fadeIn 0.3s ease"
              }}>
                <div style={{
                  textAlign: "center",
                  padding: "30px",
                  marginBottom: "20px"
                }}>
                  <div style={{
                    display: "inline-flex",
                    gap: "8px",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: accent,
                        animation: `pulse 1.2s ${i * 0.2}s infinite`
                      }} />
                    ))}
                  </div>
                  <p style={{
                    color: currentTheme.text,
                    fontSize: 16,
                    marginTop: 16,
                    fontWeight: 500
                  }}>
                    Finding perfect {selectedMood.toLowerCase()} recommendations...
                  </p>
                </div>
                
                {/* Skeleton Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
                  gap: 24
                }}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{
                      background: currentTheme.surface,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: 16,
                      padding: 0,
                      overflow: "hidden",
                      animation: "pulse 1.5s ease-in-out infinite"
                    }}>
                      <div style={{
                        width: "100%",
                        height: 200,
                        background: "rgba(255, 255, 255, 0.08)",
                        animation: "pulse 1.5s ease-in-out infinite"
                      }} />
                      <div style={{padding: 20}}>
                        <div style={{
                          height: 24,
                          width: "80%",
                          background: "rgba(255, 255, 255, 0.08)",
                          borderRadius: 4,
                          marginBottom: 12,
                          animation: "pulse 1.5s ease-in-out infinite"
                        }} />
                        <div style={{
                          height: 16,
                          width: "60%",
                          background: "rgba(255, 255, 255, 0.06)",
                          borderRadius: 4,
                          marginBottom: 12,
                          animation: "pulse 1.5s ease-in-out infinite"
                        }} />
                        <div style={{
                          height: 14,
                          width: "100%",
                          background: "rgba(255, 255, 255, 0.05)",
                          borderRadius: 4,
                          marginBottom: 8,
                          animation: "pulse 1.5s ease-in-out infinite"
                        }} />
                        <div style={{
                          height: 14,
                          width: "90%",
                          background: "rgba(255, 255, 255, 0.05)",
                          borderRadius: 4,
                          marginBottom: 16,
                          animation: "pulse 1.5s ease-in-out infinite"
                        }} />
                        <div style={{
                          height: 36,
                          width: "100%",
                          background: "rgba(255, 255, 255, 0.06)",
                          borderRadius: 8,
                          animation: "pulse 1.5s ease-in-out infinite"
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!loading && movies.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
                gap: 24
              }}>
                {movies.map(movie => (
                  <div key={movie.id} style={{
                    background: currentTheme.surface,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: 16,
                    padding: 0,
                    transition: "all .3s ease",
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                  onClick={() => loadMovieDetails(movie)}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "none"}
                  >
                    {/* Movie Poster */}
                    {movie.poster_path && (
                      <div style={{
                        width: "100%",
                        height: 200,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative"
                      }}>
                        {/* Rating Badge */}
                        <div style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "rgba(0,0,0,0.8)",
                          color: "#ffd700",
                          padding: "4px 8px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                        </div>
                        
                        {/* Click to View Badge */}
                        <div style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          background: accent,
                          color: "#fff",
                          padding: "4px 8px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "bold"
                        }}>
                          Click for details
                        </div>
                      </div>
                    )}
                    
                    {/* Movie Info */}
                    <div style={{padding: 20}}>
                      <h3 style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 18,
                        color: currentTheme.text,
                        marginBottom: 8,
                        fontWeight: 700
                      }}>{movie.title}</h3>
                      
                      {/* Year and Runtime */}
                      <div style={{
                        color: currentTheme.textSecondary,
                        fontSize: 14,
                        marginBottom: 8
                      }}>
                        {movie.release_date?.split('-')[0] || "N/A"} 
                        {movie.runtime && ` • ${movie.runtime} min`}
                      </div>
                      
                      {/* Genres */}
                      {movie.genres && movie.genres.length > 0 && (
                        <div style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          marginBottom: 12
                        }}>
                          {movie.genres.slice(0, 3).map(genre => (
                            <span key={genre.id} style={{
                              fontSize: 11,
                              color: accent,
                              background: `${accent}15`,
                              padding: "2px 8px",
                              borderRadius: "12px"
                            }}>
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Overview */}
                      <p style={{
                        color: currentTheme.textSecondary,
                        fontSize: 13,
                        lineHeight: 1.4,
                        marginBottom: 16
                      }}>
                        {movie.overview ? movie.overview.substring(0, 120) + "..." : "No description available."}
                      </p>
                      
                      {/* Director and Cast */}
                      {movie.credits && (
                        <div style={{marginBottom: 16}}>
                          {movie.credits.crew && movie.credits.crew.length > 0 && (
                            <div style={{marginBottom: 8}}>
                              <div style={{
                                fontSize: 12,
                                color: currentTheme.textSecondary,
                                marginBottom: 4
                              }}>Director:</div>
                              <div style={{
                                fontSize: 13,
                                color: currentTheme.text,
                                fontWeight: 600
                              }}>
                                {movie.credits.crew.find(person => person.job === "Director")?.name || "N/A"}
                              </div>
                            </div>
                          )}
                          
                          {movie.credits.cast && movie.credits.cast.length > 0 && (
                            <div>
                              <div style={{
                                fontSize: 12,
                                color: currentTheme.textSecondary,
                                marginBottom: 4
                              }}>Cast:</div>
                              <div style={{
                                fontSize: 13,
                                color: currentTheme.text
                              }}>
                                {movie.credits.cast.slice(0, 3).map(actor => actor.name).join(", ")}
                                {movie.credits.cast.length > 3 && "..."}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div style={{display: "flex", gap: 8}}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWatchlist(movie.id);
                          }}
                          style={{
                            background: watchlist.includes(movie.id) ? accent : "transparent",
                            color: watchlist.includes(movie.id) ? "#fff" : accent,
                            border: `1px solid ${accent}`,
                            borderRadius: 8,
                            padding: "8px 12px",
                            fontSize: 12,
                            cursor: "pointer",
                            flex: 1,
                            fontWeight: 600
                          }}
                        >
                          {watchlist.includes(movie.id) ? "✓ Saved" : "+ Save"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWatched(movie.id);
                          }}
                          style={{
                            background: watched.includes(movie.id) ? accent : "transparent",
                            color: watched.includes(movie.id) ? "#fff" : accent,
                            border: `1px solid ${accent}`,
                            borderRadius: 8,
                            padding: "8px 12px",
                            fontSize: 12,
                            cursor: "pointer",
                            flex: 1,
                            fontWeight: 600
                          }}
                        >
                          {watched.includes(movie.id) ? "✓ Watched" : "Mark"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        style={{
          position: "fixed",
          right: 24,
          bottom: 28,
          zIndex: 600,
          background: accent,
          border: "none",
          borderRadius: "50%",
          width: 56,
          height: 56,
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transition: "all .3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        🤖
      </button>

      {/* AI Chat Modal */}
      {showChat && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 99998,
          animation: "fadeIn .2s ease"
        }} onClick={() => setShowChat(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
            maxHeight: "80vh",
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 12px 40px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface,
              flexShrink: 0
            }}>
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: currentTheme.text
                }}>🤖 MoodC Assistant</div>
                <div style={{fontSize: 11, color: accent}}>
                  {selectedMood} mode · Enhanced
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  fontSize: 24,
                  cursor: "pointer",
                  padding: 4
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              padding: 20,
              overflowY: "auto",
              flex: 1,
              minHeight: 300
            }}>
              <Suspense fallback={<LoadingSpinner />}>
                <EnhancedAIChat
                  accent={accent}
                  onClose={() => setShowChat(false)}
                  context={{
                    mood: selectedMood,
                    watchlist: watchlist,
                    watched: watched,
                    currentMovies: movies
                  }}
                  user="User"
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Modal */}
      {dashboardOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 99998,
          animation: "fadeIn .2s ease"
        }} onClick={() => setDashboardOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: 1000,
            maxHeight: "90vh",
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 20px 60px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease"
          }}>
            {/* Dashboard Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
            }}>
              <div>
                <h2 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: currentTheme.text,
                  margin: 0,
                  fontWeight: 700
                }}>📊 Dashboard</h2>
                <p style={{margin: 0, color: currentTheme.textSecondary, fontSize: 14}}>
                  Your movie statistics & insights
                </p>
              </div>
              <button
                onClick={() => setDashboardOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  fontSize: 24,
                  cursor: "pointer",
                  padding: 4
                }}
              >
                ×
              </button>
            </div>
            
            {/* Dashboard Content */}
            <div style={{
              padding: 24,
              overflowY: "auto",
              maxHeight: "calc(90vh - 80px)"
            }}>
              {/* Stats Overview */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                marginBottom: 24
              }}>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>{watchlist.length}</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Watchlist
                  </div>
                </div>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>{watched.length}</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Watched
                  </div>
                </div>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>{moodHistory.length}</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Moods Tried
                  </div>
                </div>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>{Math.floor(watched.length * 2.1)}h</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Hours Watched
                  </div>
                </div>
              </div>

              {/* Mood History */}
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 18,
                  color: currentTheme.text,
                  marginBottom: 16
                }}>🎭 Recent Moods</h3>
                <div style={{
                  display: "flex",
                  gap: 12,
                  overflowX: "auto",
                  paddingBottom: 8
                }}>
                  {moodHistory.slice(-10).reverse().map((entry, index) => (
                    <div key={index} style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}`,
                      borderRadius: 8,
                      padding: "8px 12px",
                      textAlign: "center",
                      minWidth: 80
                    }}>
                      <div style={{fontSize: 20, marginBottom: 4}}>{entry.emoji}</div>
                      <div style={{
                        fontSize: 11,
                        color: currentTheme.textSecondary
                      }}>
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 18,
                  color: currentTheme.text,
                  marginBottom: 16
                }}>🎬 Recent Activity</h3>
                <div style={{
                  display: "grid",
                  gap: 12,
                  maxHeight: 200,
                  overflowY: "auto"
                }}>
                  {watched.slice(-5).reverse().map((movie, index) => (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 0",
                      borderBottom: `1px solid ${currentTheme.border}`
                    }}>
                      {movie.poster_path && (
                        <div style={{
                          width: 40,
                          height: 60,
                          backgroundImage: `url(https://image.tmdb.org/t/p/w92${movie.poster_path})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: 6
                        }} />
                      )}
                      <div style={{flex: 1}}>
                        <div style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: currentTheme.text,
                          marginBottom: 4
                        }}>{movie.title}</div>
                        <div style={{
                          fontSize: 12,
                          color: currentTheme.textSecondary
                        }}>
                          {movie.release_date?.split('-')[0]} • {movie.runtime} min
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 16
              }}>
                <button style={{
                  background: accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  📈 View Detailed Analytics
                </button>
                <button style={{
                  background: currentTheme.surface,
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  🎯 Get Recommendations
                </button>
                <button style={{
                  background: currentTheme.surface,
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  📅 Watch History
                </button>
                <button style={{
                  background: currentTheme.surface,
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  🏆 Achievements
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 99998,
          animation: "fadeIn .2s ease"
        }} onClick={() => setProfileOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: 900,
            maxHeight: "90vh",
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 20px 60px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease"
          }}>
            {/* Profile Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
            }}>
              <div>
                <h2 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: currentTheme.text,
                  margin: 0,
                  fontWeight: 700
                }}>👤 Profile</h2>
                <p style={{margin: 0, color: currentTheme.textSecondary, fontSize: 14}}>
                  Manage your account & preferences
                </p>
              </div>
              <button
                onClick={() => setProfileOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  fontSize: 28,
                  cursor: "pointer",
                  padding: 4
                }}
              >
                ×
              </button>
            </div>
            
            {/* Profile Content */}
            <div style={{
              padding: 24,
              overflowY: "auto",
              maxHeight: "calc(90vh - 80px)"
            }}>
              {/* Profile Overview */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 24,
                marginBottom: 24
              }}>
                {/* Avatar Section */}
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <img 
                    src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"}
                    alt={user?.name || "User"}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: 12
                    }}
                  />
                  <button style={{
                    background: currentTheme.background,
                    color: currentTheme.text,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontSize: 12,
                    cursor: "pointer"
                  }}>Change Avatar</button>
                </div>
                
                {/* User Info */}
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20
                }}>
                  <h3 style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: 18,
                    color: currentTheme.text,
                    marginBottom: 16
                  }}>Account Information</h3>
                  
                  <div style={{marginBottom: 16}}>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      color: currentTheme.textSecondary,
                      marginBottom: 4
                    }}>Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name || ""} 
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: currentTheme.background,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: 6,
                        color: currentTheme.text,
                        fontSize: 14
                      }} 
                    />
                  </div>
                  
                  <div style={{marginBottom: 16}}>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      color: currentTheme.textSecondary,
                      marginBottom: 4
                    }}>Email</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email || ""} 
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: currentTheme.background,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: 6,
                        color: currentTheme.text,
                        fontSize: 14
                      }} 
                    />
                  </div>
                  
                  <div style={{marginBottom: 16}}>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      color: currentTheme.textSecondary,
                      marginBottom: 4
                    }}>Bio</label>
                    <textarea 
                      defaultValue={user?.bio || ""} 
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: currentTheme.background,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: 6,
                        color: currentTheme.text,
                        fontSize: 14,
                        minHeight: 80,
                        resize: "vertical"
                      }} 
                    />
                  </div>
                  
                  <div style={{fontSize: 12, color: currentTheme.textSecondary}}>
                    Member since {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 18,
                  color: currentTheme.text,
                  marginBottom: 16
                }}>Preferences</h3>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 16
                }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      color: currentTheme.textSecondary,
                      marginBottom: 4
                    }}>Favorite Genres</label>
                    <div style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap"
                    }}>
                      {["Drama", "Comedy", "Action", "Sci-Fi"].map(genre => (
                        <span key={genre} style={{
                          fontSize: 11,
                          color: accent,
                          background: `${accent}15`,
                          padding: "4px 8px",
                          borderRadius: "12px"
                        }}>{genre}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      color: currentTheme.textSecondary,
                      marginBottom: 4
                    }}>Language</label>
                    <select style={{
                      width: "100%",
                      padding: "10px",
                      background: currentTheme.background,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: 6,
                      color: currentTheme.text,
                      fontSize: 14
                    }}>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      color: currentTheme.textSecondary,
                      marginBottom: 4
                    }}>Email Notifications</label>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      <input type="checkbox" defaultChecked style={{cursor: "pointer"}} />
                      <span style={{fontSize: 14, color: currentTheme.text}}>
                        Receive movie recommendations & updates
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 18,
                  color: currentTheme.text,
                  marginBottom: 16
                }}>🏆 Achievements</h3>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 12
                }}>
                  <div style={{
                    background: `${accent}10`,
                    border: `1px solid ${accent}`,
                    borderRadius: 8,
                    padding: 12,
                    textAlign: "center"
                  }}>
                    <div style={{fontSize: 24, marginBottom: 4}}>🎬</div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: currentTheme.text,
                      marginBottom: 2
                    }}>Movie Buff</div>
                    <div style={{fontSize: 11, color: currentTheme.textSecondary}}>
                      Watch 50 movies
                    </div>
                  </div>
                  
                  <div style={{
                    background: `${accent}10`,
                    border: `1px solid ${accent}`,
                    borderRadius: 8,
                    padding: 12,
                    textAlign: "center"
                  }}>
                    <div style={{fontSize: 24, marginBottom: 4}}>🎭</div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: currentTheme.text,
                      marginBottom: 2
                    }}>Mood Explorer</div>
                    <div style={{fontSize: 11, color: currentTheme.textSecondary}}>
                      Try all moods
                    </div>
                  </div>
                  
                  <div style={{
                    background: `${accent}10`,
                    border: `1px solid ${accent}`,
                    borderRadius: 8,
                    padding: 12,
                    textAlign: "center"
                  }}>
                    <div style={{fontSize: 24, marginBottom: 4}}>⭐</div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: currentTheme.text,
                      marginBottom: 2
                    }}>Critic</div>
                    <div style={{fontSize: 11, color: currentTheme.textSecondary}}>
                      Rate 25 movies
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12
              }}>
                <button style={{
                  background: accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer"
                }}>Save Changes</button>
                
                <button style={{
                  background: currentTheme.surface,
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer"
                }}>Connected Accounts</button>
                
                <button style={{
                  background: "transparent",
                  color: "#ef4444",
                  border: "1px solid #ef4444",
                  borderRadius: 12,
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer"
                }}>Privacy Settings</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Modal */}
      {socialOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 99998,
          animation: "fadeIn .2s ease"
        }} onClick={() => setSocialOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: 1200,
            maxHeight: "90vh",
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 20px 60px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease"
          }}>
            {/* Social Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
            }}>
              <div>
                <h2 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: currentTheme.text,
                  margin: 0,
                  fontWeight: 700
                }}>💬 Social Hub</h2>
                <p style={{margin: 0, color: currentTheme.textSecondary, fontSize: 14}}>
                  Connect with friends & share movie experiences
                </p>
              </div>
              <button
                onClick={() => setSocialOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  fontSize: 28,
                  cursor: "pointer",
                  padding: 4
                }}
              >
                ×
              </button>
            </div>
            
            {/* Social Content */}
            <div style={{
              padding: 24,
              overflowY: "auto",
              maxHeight: "calc(90vh - 80px)"
            }}>
              {/* Social Stats */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                marginBottom: 24
              }}>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>{friends.length}</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Friends
                  </div>
                </div>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>{notifications.length}</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Notifications
                  </div>
                </div>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>12</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Movie Clubs
                  </div>
                </div>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: accent,
                    marginBottom: 8
                  }}>5</div>
                  <div style={{fontSize: 14, color: currentTheme.textSecondary}}>
                    Watch Parties
                  </div>
                </div>
              </div>

              {/* Friends List */}
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 18,
                  color: currentTheme.text,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span>👥 Friends</span>
                  <button style={{
                    background: accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 12,
                    cursor: "pointer",
                    fontWeight: 600
                  }}>+ Add Friend</button>
                </h3>
                
                <div style={{
                  display: "grid",
                  gap: 12,
                  maxHeight: 200,
                  overflowY: "auto"
                }}>
                  {[
                    {name: "Alex Chen", avatar: "👨", status: "online", mood: "Thrilled"},
                    {name: "Sarah Miller", avatar: "👩", status: "watching", mood: "Melancholic"},
                    {name: "Mike Johnson", avatar: "👨", status: "offline", mood: "Playful"},
                    {name: "Emma Davis", avatar: "👩", status: "online", mood: "Romantic"}
                  ].map((friend, index) => (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px",
                      background: `${accent}10`,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: 8
                    }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        background: accent,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20
                      }}>{friend.avatar}</div>
                      <div style={{flex: 1}}>
                        <div style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: currentTheme.text,
                          marginBottom: 2
                        }}>{friend.name}</div>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8
                        }}>
                          <div style={{
                            width: 8,
                            height: 8,
                            background: friend.status === "online" ? "#10b981" : "#6b7280",
                            borderRadius: "50%"
                          }} />
                          <span style={{
                            fontSize: 12,
                            color: currentTheme.textSecondary
                          }}>{friend.status}</span>
                          <span style={{fontSize: 16, marginLeft: 4}}>{friend.mood}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 18,
                  color: currentTheme.text,
                  marginBottom: 16
                }}>📢 Activity Feed</h3>
                
                <div style={{
                  display: "grid",
                  gap: 16,
                  maxHeight: 250,
                  overflowY: "auto"
                }}>
                  {[
                    {
                      user: "Alex Chen",
                      action: "watched",
                      movie: "Inception",
                      time: "2 hours ago",
                      emoji: "🎬"
                    },
                    {
                      user: "Sarah Miller", 
                      action: "rated",
                      movie: "The Shawshank Redemption",
                      rating: "⭐⭐⭐⭐⭐⭐",
                      time: "5 hours ago",
                      emoji: "⭐"
                    },
                    {
                      user: "Mike Johnson",
                      action: "added to watchlist",
                      movie: "The Dark Knight",
                      time: "1 day ago",
                      emoji: "📝"
                    },
                    {
                      user: "Emma Davis",
                      action: "started mood",
                      mood: "Inspired",
                      time: "3 days ago",
                      emoji: "🌌"
                    }
                  ].map((activity, index) => (
                    <div key={index} style={{
                      padding: "12px",
                      background: `${accent}08`,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: 8
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8
                      }}>
                        <span style={{fontSize: 16}}>{activity.emoji}</span>
                        <div style={{flex: 1}}>
                          <div style={{
                            fontSize: 13,
                            color: currentTheme.text,
                            marginBottom: 2
                          }}>
                            <strong>{activity.user}</strong> {activity.action} 
                            {activity.movie && <span style={{color: accent}}>"{activity.movie}"</span>}
                            {activity.rating && <span> {activity.rating}</span>}
                            {activity.mood && <span style={{color: accent}}>{activity.mood} mood</span>}
                          </div>
                          <div style={{
                            fontSize: 11,
                            color: currentTheme.textSecondary
                          }}>{activity.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Movie Clubs */}
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h3 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 18,
                  color: currentTheme.text,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span>🎭 Movie Clubs</span>
                  <button style={{
                    background: accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 12,
                    cursor: "pointer",
                    fontWeight: 600
                  }}>+ Create Club</button>
                </h3>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 16
                }}>
                  {[
                    {
                      name: "Sci-Fi Sundays",
                      members: 245,
                      genre: "Science Fiction",
                      nextMeeting: "Sunday 8PM",
                      emoji: "🚀"
                    },
                    {
                      name: "Horror Nights",
                      members: 189,
                      genre: "Horror",
                      nextMeeting: "Friday 9PM",
                      emoji: "👻"
                    },
                    {
                      name: "Classic Cinema",
                      members: 156,
                      genre: "Classic Films",
                      nextMeeting: "Wednesday 7PM",
                      emoji: "🎬"
                    }
                  ].map((club, index) => (
                    <div key={index} style={{
                      background: `${accent}10`,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: 12,
                      padding: 16
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12
                      }}>
                        <span style={{fontSize: 24}}>{club.emoji}</span>
                        <div style={{flex: 1}}>
                          <div style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: currentTheme.text,
                            marginBottom: 4
                          }}>{club.name}</div>
                          <div style={{
                            fontSize: 12,
                            color: currentTheme.textSecondary
                          }}>{club.members} members</div>
                        </div>
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: currentTheme.textSecondary,
                        marginBottom: 8
                      }}>{club.genre}</div>
                      <div style={{
                        fontSize: 12,
                        color: accent,
                        fontWeight: 600
                      }}>Next: {club.nextMeeting}</div>
                      <button style={{
                        background: "transparent",
                        color: accent,
                        border: `1px solid ${accent}`,
                        borderRadius: 6,
                        padding: "4px 8px",
                        fontSize: 11,
                        cursor: "pointer"
                      }}>Join</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12
              }}>
                <button style={{
                  background: accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  🎉 Find Friends
                </button>
                <button style={{
                  background: currentTheme.surface,
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  📅 Schedule Watch Party
                </button>
                <button style={{
                  background: currentTheme.surface,
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  🏆 View Achievements
                </button>
                <button style={{
                  background: currentTheme.surface,
                  color: currentTheme.text,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left"
                }}>
                  💬 Movie Discussions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          zIndex: 99999,
          animation: "fadeIn .2s ease"
        }} onClick={closeMovieDetails}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 800,
            maxHeight: "90vh",
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 20px 60px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
            }}>
              <div>
                <h2 style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 24,
                  color: currentTheme.text,
                  margin: 0,
                  fontWeight: 700
                }}>{selectedMovie.title}</h2>
                <div style={{
                  color: currentTheme.textSecondary,
                  fontSize: 14,
                  marginTop: 4
                }}>
                  {selectedMovie.release_date?.split('-')[0]} • {selectedMovie.runtime} min
                </div>
              </div>
              <button
                onClick={closeMovieDetails}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  fontSize: 28,
                  cursor: "pointer",
                  padding: 4
                }}
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div style={{
              padding: 24,
              overflowY: "auto",
              flex: 1
            }}>
              {loadingDetails ? (
                <div style={{
                  textAlign: "center",
                  padding: 40,
                  color: currentTheme.text
                }}>Loading movie details...</div>
              ) : movieDetails ? (
                <div>
                  {/* Movie Poster and Basic Info */}
                  <div style={{
                    display: "flex",
                    gap: 24,
                    marginBottom: 24
                  }}>
                    {movieDetails.poster_path && (
                      <div style={{
                        width: 200,
                        height: 300,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 12,
                        flexShrink: 0
                      }} />
                    )}
                    
                    <div style={{flex: 1}}>
                      {/* Rating and Genres */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 16,
                        flexWrap: "wrap"
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: "rgba(255,215,0,0.1)",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          border: "1px solid #ffd700"
                        }}>
                          <span style={{color: "#ffd700", fontSize: 18}}>⭐</span>
                          <span style={{
                            color: "#ffd700",
                            fontSize: 16,
                            fontWeight: "bold"
                          }}>{movieDetails.vote_average?.toFixed(1) || "N/A"}</span>
                          <span style={{
                            color: currentTheme.textSecondary,
                            fontSize: 12
                          }}>/10</span>
                        </div>
                        
                        {movieDetails.genres && movieDetails.genres.length > 0 && (
                          <div style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap"
                          }}>
                            {movieDetails.genres.map(genre => (
                              <span key={genre.id} style={{
                                fontSize: 12,
                                color: accent,
                                background: `${accent}15`,
                                padding: "4px 12px",
                                borderRadius: "16px"
                              }}>
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Overview */}
                      <div style={{marginBottom: 20}}>
                        <h3 style={{
                          fontFamily: "'Cinzel',serif",
                          fontSize: 18,
                          color: currentTheme.text,
                          marginBottom: 8
                        }}>Overview</h3>
                        <p style={{
                          color: currentTheme.textSecondary,
                          fontSize: 14,
                          lineHeight: 1.6
                        }}>
                          {movieDetails.overview || "No overview available."}
                        </p>
                      </div>
                      
                      {/* Director and Cast */}
                      {movieDetails.credits && (
                        <div style={{marginBottom: 20}}>
                          {movieDetails.credits.crew && movieDetails.credits.crew.length > 0 && (
                            <div style={{marginBottom: 12}}>
                              <h4 style={{
                                fontFamily: "'Cinzel',serif",
                                fontSize: 16,
                                color: currentTheme.text,
                                marginBottom: 8
                              }}>Director</h4>
                              <div style={{
                                color: currentTheme.text,
                                fontSize: 14
                              }}>
                                {movieDetails.credits.crew
                                  .filter(person => person.job === "Director")
                                  .map(person => person.name)
                                  .join(", ") || "N/A"}
                              </div>
                            </div>
                          )}
                          
                          {movieDetails.credits.cast && movieDetails.credits.cast.length > 0 && (
                            <div>
                              <h4 style={{
                                fontFamily: "'Cinzel',serif",
                                fontSize: 16,
                                color: currentTheme.text,
                                marginBottom: 8
                              }}>Cast</h4>
                              <div style={{
                                color: currentTheme.text,
                                fontSize: 14
                              }}>
                                {movieDetails.credits.cast.slice(0, 10).map(actor => actor.name).join(", ")}
                                {movieDetails.credits.cast.length > 10 && "..."}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 24
                  }}>
                    <button
                      onClick={() => toggleWatchlist(selectedMovie.id)}
                      style={{
                        background: watchlist.includes(selectedMovie.id) ? accent : "transparent",
                        color: watchlist.includes(selectedMovie.id) ? "#fff" : accent,
                        border: `1px solid ${accent}`,
                        borderRadius: 8,
                        padding: "12px 24px",
                        fontSize: 14,
                        cursor: "pointer",
                        fontWeight: 600,
                        flex: 1
                      }}
                    >
                      {watchlist.includes(selectedMovie.id) ? "✓ In Watchlist" : "+ Add to Watchlist"}
                    </button>
                    <button
                      onClick={() => toggleWatched(selectedMovie.id)}
                      style={{
                        background: watched.includes(selectedMovie.id) ? accent : "transparent",
                        color: watched.includes(selectedMovie.id) ? "#fff" : accent,
                        border: `1px solid ${accent}`,
                        borderRadius: 8,
                        padding: "12px 24px",
                        fontSize: 14,
                        cursor: "pointer",
                        fontWeight: 600,
                        flex: 1
                      }}
                    >
                      {watched.includes(selectedMovie.id) ? "✓ Watched" : "Mark as Watched"}
                    </button>
                  </div>
                  
                  {/* Trailer and Streaming Info */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20
                  }}>
                    {/* Trailer */}
                    <div style={{
                      background: currentTheme.surface,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: 12,
                      padding: 20
                    }}>
                      <h4 style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 16,
                        color: currentTheme.text,
                        marginBottom: 12
                      }}>🎬 Trailer</h4>
                      <button
                        onClick={() => {
                          const trailer = movieDetails.videos?.results?.find(
                            video => video.type === "Trailer" && video.site === "YouTube"
                          );
                          if (trailer) {
                            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
                          } else {
                            alert('Trailer not available');
                          }
                        }}
                        style={{
                          width: "100%",
                          background: accent,
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "12px",
                          fontSize: 14,
                          cursor: "pointer",
                          fontWeight: 600
                        }}
                      >
                        Watch Trailer
                      </button>
                    </div>
                    
                    {/* Streaming Info */}
                    <div style={{
                      background: currentTheme.surface,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: 12,
                      padding: 20
                    }}>
                      <h4 style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 16,
                        color: currentTheme.text,
                        marginBottom: 12
                      }}>📺 Where to Watch</h4>
                      <div style={{
                        color: currentTheme.textSecondary,
                        fontSize: 13,
                        lineHeight: 1.5
                      }}>
                        Streaming information not available in this demo. Check your local streaming services.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: "center",
                  padding: 40,
                  color: currentTheme.text
                }}>Could not load movie details.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main App with Authentication
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SocialProvider>
          <Router>
            <Routes>
              <Route path="/login" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Login />
                </Suspense>
              } />
              <Route path="/signup" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Signup />
                </Suspense>
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <AppContent />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Profile />
                  </Suspense>
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </SocialProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
