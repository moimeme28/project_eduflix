import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard({ user, onLogout }) {
  const [stats, setStats] = useState({
    totalWatched: 0,
    totalWatchlist: 0,
    favoriteMood: 'Melancholic',
    recentlyWatched: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate user stats from localStorage
    try {
      const watched = JSON.parse(localStorage.getItem('watched') || '[]');
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
      
      const favoriteMood = moodHistory.length > 0 
        ? moodHistory.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {})
        : 'Melancholic';

      setStats({
        totalWatched: watched.length,
        totalWatchlist: watchlist.length,
        favoriteMood: moodHistory.length > 0 ? Object.keys(favoriteMood).reduce((a, b) => favoriteMood[a] > favoriteMood[b] ? a : b) : 'Melancholic',
        recentlyWatched: watched.slice(-3).reverse()
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      // Set default values if localStorage parsing fails
      setStats({
        totalWatched: 0,
        totalWatchlist: 0,
        favoriteMood: 'Melancholic',
        recentlyWatched: []
      });
    }
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const moodColors = {
    Melancholic: '#8b5cf6',
    Thrilled: '#ef4444',
    Curious: '#3b82f6',
    Playful: '#10b981',
    Romantic: '#ec4899',
    Inspired: '#f59e0b',
    Cozy: '#06b6d4',
    Dark: '#1f2937'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          color: '#374151',
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f3f4f6';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}
      >
        ← Back
      </button>
      
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px 30px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '50%',
              border: '3px solid #667eea'
            }}
          />
          <div>
            <h2 style={{ margin: 0, color: '#1a202c', fontSize: '24px' }}>Welcome, {user.name}!</h2>
            <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>Member since {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            to="/"
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
          >
            Browse Content
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📚</div>
          <h3 style={{ margin: 0, color: '#1a202c', fontSize: '32px' }}>{stats.totalWatched}</h3>
          <p style={{ margin: 0, color: '#718096', fontSize: '16px' }}>Items Watched</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📝</div>
          <h3 style={{ margin: 0, color: '#1a202c', fontSize: '32px' }}>{stats.totalWatchlist}</h3>
          <p style={{ margin: 0, color: '#718096', fontSize: '16px' }}>Watchlist Items</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎭</div>
          <h3 style={{ 
            margin: 0, 
            color: moodColors[stats.favoriteMood] || '#667eea', 
            fontSize: '24px',
            textTransform: 'capitalize'
          }}>
            {stats.favoriteMood}
          </h3>
          <p style={{ margin: 0, color: '#718096', fontSize: '16px' }}>Favorite Mood</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#1a202c', fontSize: '20px' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <Link
            to="/"
            style={{
              padding: '15px',
              background: '#f7fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#4a5568',
              textAlign: 'center',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            🎬 Browse Movies
          </Link>
          <Link
            to="/"
            style={{
              padding: '15px',
              background: '#f7fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#4a5568',
              textAlign: 'center',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            📚 Browse Books
          </Link>
          <Link
            to="/profile"
            style={{
              padding: '15px',
              background: '#f7fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#4a5568',
              textAlign: 'center',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            👤 Edit Profile
          </Link>
          <Link
            to="/"
            style={{
              padding: '15px',
              background: '#f7fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#4a5568',
              textAlign: 'center',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            📊 View Stats
          </Link>
        </div>
      </div>

      {/* Recently Watched */}
      {stats.recentlyWatched.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1a202c', fontSize: '20px' }}>Recently Watched</h3>
          <div style={{ display: 'flex', gap: '15px', overflowX: 'auto' }}>
            {stats.recentlyWatched.map(itemId => (
              <div
                key={itemId}
                style={{
                  minWidth: '150px',
                  padding: '15px',
                  background: '#f7fafc',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📽️</div>
                <p style={{ margin: 0, color: '#4a5568', fontSize: '14px' }}>Item {itemId}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
