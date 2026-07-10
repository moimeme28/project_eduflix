import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const DetailedAnalytics = ({ watchlist, watched, userRating, moodHistory, accent }) => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const [timeRange, setTimeRange] = useState('all');
  const [expandedSection, setExpandedSection] = useState('overview');

  const ratings = Object.values(userRating);
  const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "—";
  const moodCounts = moodHistory.reduce((a, m) => { a[m] = (a[m] || 0) + 1; return a; }, {});
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  const maxCount = Math.max(...Object.values(moodCounts), 1);

  // Calculate viewing statistics
  const totalWatched = watched.length;
  const totalSaved = watchlist.length;
  const completionRate = totalSaved ? Math.round((totalWatched / totalSaved) * 100) : 0;
  
  // Time-based statistics
  const getFilteredHistory = () => {
    if (timeRange === 'all') return moodHistory;
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return moodHistory.filter((_, index) => {
      // Simulate dates for demo
      return index >= moodHistory.length - days;
    });
  };

  const filteredHistory = getFilteredHistory();
  const filteredMoodCounts = filteredHistory.reduce((a, m) => { a[m] = (a[m] || 0) + 1; return a; }, {});

  // Genre preferences
  const getGenreStats = () => {
    const genreCounts = {};
    // This would be calculated from actual watched items
    return {
      'Drama': 35,
      'Comedy': 25,
      'Action': 20,
      'Sci-Fi': 15,
      'Thriller': 18,
      'Romance': 12,
      'Documentary': 8
    };
  };

  const genreStats = getGenreStats();

  // Viewing patterns
  const getWeeklyPattern = () => {
    return {
      'Monday': 15,
      'Tuesday': 12,
      'Wednesday': 18,
      'Thursday': 22,
      'Friday': 35,
      'Saturday': 45,
      'Sunday': 38
    };
  };

  const weeklyPattern = getWeeklyPattern();

  // Achievements
  const getAchievements = () => {
    const achievements = [];
    
    if (totalWatched >= 1) achievements.push({ icon: '🎬', title: 'First Watch', desc: 'Watched your first movie/book', earned: true });
    if (totalWatched >= 10) achievements.push({ icon: '⭐', title: 'Binge Watcher', desc: 'Watched 10 items', earned: true });
    if (totalWatched >= 50) achievements.push({ icon: '🏆', title: 'Cinema Expert', desc: 'Watched 50 items', earned: true });
    if (totalWatched >= 100) achievements.push({ icon: '👑', title: 'Marathon Master', desc: 'Watched 100 items', earned: true });
    
    if (avgRating >= 4.5) achievements.push({ icon: '💎', title: 'Quality Critic', desc: 'Average rating 4.5+', earned: true });
    if (completionRate >= 80) achievements.push({ icon: '🎯', title: 'Completionist', desc: '80%+ completion rate', earned: true });
    
    const uniqueMoods = Object.keys(moodCounts).length;
    if (uniqueMoods >= 4) achievements.push({ icon: '🎭', title: 'Mood Explorer', desc: 'Tried 4+ different moods', earned: true });
    if (uniqueMoods >= 8) achievements.push({ icon: '🌈', title: 'Emotional Master', desc: 'Tried all moods', earned: true });
    
    return achievements;
  };

  const achievements = getAchievements();

  const sections = [
    { id: 'overview', title: '📊 Overview', icon: '📈' },
    { id: 'moods', title: '🎭 Mood Analysis', icon: '😊' },
    { id: 'genres', title: '🎬 Genre Preferences', icon: '🎪' },
    { id: 'patterns', title: '⏰ Viewing Patterns', icon: '📅' },
    { id: 'achievements', title: '🏆 Achievements', icon: '⭐' }
  ];

  return (
    <div style={{
      background: currentTheme.background,
      color: currentTheme.text,
      padding: '20px',
      borderRadius: '16px',
      border: `1px solid ${currentTheme.border}`
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              background: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              color: currentTheme.text,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = currentTheme.background;
              e.currentTarget.style.borderColor = currentTheme.border;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = currentTheme.surface;
              e.currentTarget.style.borderColor = currentTheme.border;
            }}
          >
            ← Back
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: currentTheme.text }}>
              📈 Your Analytics Dashboard
            </h2>
            <p style={{ margin: '4px 0 0 0', color: currentTheme.textSecondary, fontSize: 14 }}>
              Deep insights into your viewing habits and preferences
            </p>
          </div>
        </div>
        
        {/* Time Range Selector */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'year', 'month', 'week'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                background: timeRange === range ? accent : currentTheme.surface,
                border: `1px solid ${timeRange === range ? accent : currentTheme.border}`,
                borderRadius: '8px',
                color: timeRange === range ? '#ffffff' : currentTheme.text,
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                textTransform: 'capitalize'
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Section Navigation */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            style={{
              background: expandedSection === section.id ? currentTheme.surface : 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '12px',
              color: currentTheme.text,
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{section.icon}</span>
            <span>{section.title}</span>
            <span style={{ marginLeft: 4, color: currentTheme.textSecondary }}>
              {expandedSection === section.id ? '▼' : '▶'}
            </span>
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {expandedSection === 'overview' && (
        <div style={{
          background: currentTheme.surface,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: accent, marginBottom: 8 }}>
                {totalWatched}
              </div>
              <div style={{ fontSize: 14, color: currentTheme.textSecondary }}>
                Items Watched
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#2ecc71', marginBottom: 8 }}>
                {totalSaved}
              </div>
              <div style={{ fontSize: 14, color: currentTheme.textSecondary }}>
                Items Saved
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#f5a623', marginBottom: 8 }}>
                {avgRating}
              </div>
              <div style={{ fontSize: 14, color: currentTheme.textSecondary }}>
                Average Rating
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#e91e8c', marginBottom: 8 }}>
                {completionRate}%
              </div>
              <div style={{ fontSize: 14, color: currentTheme.textSecondary }}>
                Completion Rate
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Analysis Section */}
      {expandedSection === 'moods' && (
        <div style={{
          background: currentTheme.surface,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: currentTheme.text }}>
            Mood Distribution
          </h3>
          
          {topMood && (
            <div style={{
              background: `${accent}22`,
              border: `1px solid ${accent}33`,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: 20
            }}>
              <div style={{ fontSize: 14, color: currentTheme.textSecondary, marginBottom: 4 }}>
                Your Favorite Mood
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: accent }}>
                {topMood[0]} ({topMood[1]} times)
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(filteredMoodCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([mood, count]) => {
                const moodData = {
                  'Melancholic': { emoji: '😢', color: '#4a90d9' },
                  'Thrilled': { emoji: '😱', color: '#e74c3c' },
                  'Curious': { emoji: '🤔', color: '#2ecc71' },
                  'Playful': { emoji: '😂', color: '#f5a623' },
                  'Romantic': { emoji: '😍', color: '#e91e8c' },
                  'Inspired': { emoji: '🌌', color: '#9b59b6' },
                  'Cozy': { emoji: '😌', color: '#e67e22' },
                  'Dark': { emoji: '💀', color: '#7f8c8d' }
                }[mood] || { emoji: '🎭', color: accent };

                return (
                  <div key={mood} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <span style={{ fontSize: 24 }}>{moodData.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: currentTheme.text }}>
                        {mood}
                      </div>
                      <div style={{
                        background: currentTheme.background,
                        borderRadius: '4px',
                        height: '8px',
                        overflow: 'hidden',
                        marginTop: 4
                      }}>
                        <div style={{
                          width: `${(count / maxCount) * 100}%`,
                          height: '100%',
                          background: moodData.color,
                          borderRadius: '4px',
                          transition: 'width 0.7s ease'
                        }} />
                      </div>
                    </div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: moodData.color,
                      minWidth: '30px',
                      textAlign: 'right'
                    }}>
                      {count}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Genre Preferences Section */}
      {expandedSection === 'genres' && (
        <div style={{
          background: currentTheme.surface,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: currentTheme.text }}>
            Genre Preferences
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {Object.entries(genreStats)
              .sort((a, b) => b[1] - a[1])
              .map(([genre, count]) => (
                <div key={genre} style={{
                  background: currentTheme.background,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: currentTheme.text }}>
                      {genre}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: accent }}>
                      {count}%
                    </span>
                  </div>
                  <div style={{
                    background: currentTheme.textSecondary + '22',
                    borderRadius: '4px',
                    height: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${count}%`,
                      height: '100%',
                      background: accent,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Viewing Patterns Section */}
      {expandedSection === 'patterns' && (
        <div style={{
          background: currentTheme.surface,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: currentTheme.text }}>
            Weekly Viewing Pattern
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {Object.entries(weeklyPattern).map(([day, count]) => (
              <div key={day} style={{
                textAlign: 'center',
                padding: '12px 8px',
                background: count >= 35 ? `${accent}22` : currentTheme.background,
                border: `1px solid ${count >= 35 ? accent : currentTheme.border}`,
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: 12, color: currentTheme.textSecondary, marginBottom: 4 }}>
                  {day.slice(0, 3)}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: count >= 35 ? accent : currentTheme.text }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16,
            padding: 12,
            background: `${accent}11`,
            borderRadius: '8px',
            fontSize: 14,
            color: currentTheme.text
          }}>
            📊 Peak viewing days: <strong>Friday, Saturday, Sunday</strong>
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {expandedSection === 'achievements' && (
        <div style={{
          background: currentTheme.surface,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: currentTheme.text }}>
            🏆 Your Achievements
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16
          }}>
            {achievements.map((achievement, i) => (
              <div key={i} style={{
                background: achievement.earned ? `${accent}22` : currentTheme.background,
                border: `1px solid ${achievement.earned ? accent : currentTheme.border}`,
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: achievement.earned ? 1 : 0.6
              }}>
                <div style={{
                  fontSize: 32,
                  filter: achievement.earned ? 'none' : 'grayscale(1)'
                }}>
                  {achievement.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: achievement.earned ? accent : currentTheme.textSecondary,
                    marginBottom: 4
                  }}>
                    {achievement.title}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: currentTheme.textSecondary
                  }}>
                    {achievement.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedAnalytics;
