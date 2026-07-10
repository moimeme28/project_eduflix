import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SocialProvider, useSocial } from './contexts/SocialContext';
import ThemeToggle from "./components/ThemeToggle";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import SocialHub from "./components/SocialHub";
import EnhancedAIChat from './components/EnhancedAIChat';
import tmdbService from './services/tmdbService';

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
  const [selectedMood, setSelectedMood] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const accent = selectedMood ? MOODS.find(m => m.label === selectedMood)?.color || "#4a90d9" : "#4a90d9";

  useEffect(() => {
    if (!selectedMood) return;
    
    const loadMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await tmdbService.getMoviesByMood(selectedMood);
        setMovies(moviesData);
      } catch (err) {
        console.error('TMDB Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovies();
  }, [selectedMood]);

  const toggleWatchlist = (id) => setWatchlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const toggleWatched = (id) => setWatched(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

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
            <button onClick={() => {localStorage.removeItem('user'); window.location.reload();}} style={{
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
            
            {loading && <div style={{textAlign: "center", padding: 40, color: currentTheme.text}}>Loading recommendations...</div>}
            
            {!loading && movies.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: 20
              }}>
                {movies.map(movie => (
                  <div key={movie.id} style={{
                    background: currentTheme.surface,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: 16,
                    padding: 20,
                    transition: "all .3s ease"
                  }}>
                    <h3 style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 16,
                      color: currentTheme.text,
                      marginBottom: 8
                    }}>{movie.title}</h3>
                    <p style={{
                      color: currentTheme.textSecondary,
                      fontSize: 12,
                      marginBottom: 12
                    }}>{movie.overview?.substring(0, 100)}...</p>
                    <div style={{display: "flex", gap: 8}}>
                      <button
                        onClick={() => toggleWatchlist(movie.id)}
                        style={{
                          background: watchlist.includes(movie.id) ? accent : "transparent",
                          color: watchlist.includes(movie.id) ? "#fff" : accent,
                          border: `1px solid ${accent}`,
                          borderRadius: 6,
                          padding: "4px 8px",
                          fontSize: 10,
                          cursor: "pointer"
                        }}
                      >
                        {watchlist.includes(movie.id) ? "✓ Saved" : "Save"}
                      </button>
                      <button
                        onClick={() => toggleWatched(movie.id)}
                        style={{
                          background: watched.includes(movie.id) ? accent : "transparent",
                          color: watched.includes(movie.id) ? "#fff" : accent,
                          border: `1px solid ${accent}`,
                          borderRadius: 6,
                          padding: "4px 8px",
                          fontSize: 10,
                          cursor: "pointer"
                        }}
                      >
                        {watched.includes(movie.id) ? "✓ Watched" : "Mark"}
                      </button>
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
          zIndex: 999,
          animation: "fadeIn .2s ease"
        }} onClick={() => setShowChat(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "fixed",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            width: 380,
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 12px 40px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 999,
            animation: "popIn .3s ease"
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
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
            <div style={{padding: 20}}>
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
            right: "20px",
            transform: "translateY(-50%)",
            width: 380,
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 12px 40px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease"
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
            }}>
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: currentTheme.text
                }}>📊 Dashboard</div>
                <div style={{fontSize: 11, color: accent}}>
                  Your statistics & activity
                </div>
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
            <div style={{padding: 20}}>
              <div style={{color: currentTheme.text, marginBottom: 16}}>
                <h3 style={{marginBottom: 8}}>Welcome to your Dashboard!</h3>
                <p style={{color: currentTheme.textSecondary, fontSize: 14}}>
                  Here you can view your watchlist, watched items, and personalized statistics.
                </p>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12
              }}>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: accent
                  }}>{watchlist.length}</div>
                  <div style={{fontSize: 12, color: currentTheme.textSecondary}}>
                    Watchlist
                  </div>
                </div>
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: accent
                  }}>{watched.length}</div>
                  <div style={{fontSize: 12, color: currentTheme.textSecondary}}>
                    Watched
                  </div>
                </div>
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
            right: "20px",
            transform: "translateY(-50%)",
            width: 380,
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 12px 40px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease"
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
            }}>
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: currentTheme.text
                }}>👤 Profile</div>
                <div style={{fontSize: 11, color: accent}}>
                  Your account settings
                </div>
              </div>
              <button
                onClick={() => setProfileOpen(false)}
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
            <div style={{padding: 20}}>
              <div style={{color: currentTheme.text, marginBottom: 16}}>
                <h3 style={{marginBottom: 8}}>Your Profile</h3>
                <p style={{color: currentTheme.textSecondary, fontSize: 14}}>
                  Manage your account preferences and settings.
                </p>
              </div>
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16
              }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: currentTheme.text,
                  marginBottom: 4
                }}>Account Information</div>
                <div style={{fontSize: 12, color: currentTheme.textSecondary}}>
                  Email: user@example.com
                </div>
                <div style={{fontSize: 12, color: currentTheme.textSecondary}}>
                  Member since: 2024
                </div>
              </div>
              <button style={{
                width: "100%",
                padding: 12,
                background: accent,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer"
              }}>Edit Profile</button>
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
            right: "20px",
            transform: "translateY(-50%)",
            width: 380,
            background: currentTheme.background,
            border: `2px solid ${accent}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 12px 40px ${accent}40, 0 0 0 1px ${accent}`,
            zIndex: 99999,
            animation: "popIn .3s ease"
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: currentTheme.surface
            }}>
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: currentTheme.text
                }}>💬 Social Hub</div>
                <div style={{fontSize: 11, color: accent}}>
                  Connect with friends
                </div>
              </div>
              <button
                onClick={() => setSocialOpen(false)}
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
            <div style={{padding: 20}}>
              <div style={{color: currentTheme.text, marginBottom: 16}}>
                <h3 style={{marginBottom: 8}}>Social Hub</h3>
                <p style={{color: currentTheme.textSecondary, fontSize: 14}}>
                  Share recommendations and connect with other movie lovers.
                </p>
              </div>
              <div style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16
              }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: currentTheme.text,
                  marginBottom: 4
                }}>Activity Feed</div>
                <div style={{fontSize: 12, color: currentTheme.textSecondary}}>
                  No new messages
                </div>
              </div>
              <button style={{
                width: "100%",
                padding: 12,
                background: accent,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer"
              }}>View Social Features</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main App with Authentication
function App() {
  const [user, setUser] = useState({ name: 'Test User', email: 'test@example.com' });
  
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const handleUpdateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  return (
    <ThemeProvider>
      <SocialProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
            <Route path="/profile" element={<Profile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />} />
            <Route path="/social" element={<SocialHub user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </SocialProvider>
    </ThemeProvider>
  );
}

export default App;
