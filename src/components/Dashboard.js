import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Flame, Award, TrendingUp, PlayCircle, ChevronRight, LayoutDashboard } from 'lucide-react';

function Dashboard({ user, onLogout }) {
  const [stats, setStats] = useState({
    totalWatched: 0,
    totalWatchlist: 0,
    favoriteMood: 'Curious',
    recentlyWatched: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const watched = JSON.parse(localStorage.getItem('watched') || '[]');
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');

      let favoriteMood = 'Curious';
      if (moodHistory.length > 0) {
        const counts = moodHistory.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {});
        favoriteMood = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      }

      setStats({
        totalWatched: watched.length,
        totalWatchlist: watchlist.length,
        favoriteMood,
        recentlyWatched: watched.slice(-3).reverse()
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
    }
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const statCards = [
    {
      icon: <PlayCircle className="w-6 h-6 text-blue-400" />,
      bg: 'bg-blue-500/20',
      value: stats.totalWatched,
      label: 'Items Watched'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-400" />,
      bg: 'bg-green-500/20',
      value: stats.totalWatchlist,
      label: 'Watchlist'
    },
    {
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      bg: 'bg-orange-500/20',
      value: '7',
      label: 'Day Streak'
    },
    {
      icon: <Award className="w-6 h-6 text-purple-400" />,
      bg: 'bg-purple-500/20',
      value: stats.favoriteMood,
      label: 'Favorite Mood',
      isText: true
    }
  ];

  const quickActions = [
    { icon: '🎬', label: 'Browse Movies', to: '/subjects' },
    { icon: '📚', label: 'Browse Books', to: '/subjects' },
    { icon: '👤', label: 'Edit Profile', to: '/profile' },
    { icon: '📊', label: 'My Progress', to: '/dashboard' },
  ];

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-primary-500/50"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h1 className="text-2xl font-bold font-display">
                Welcome back, <span className="text-gradient">{user?.name || 'User'}!</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Member since {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recently'}
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              to="/"
              className="px-5 py-2 rounded-xl bg-gradient-primary font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Browse Content
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl glass-button text-sm font-semibold hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mx-auto mb-3`}>
                {card.icon}
              </div>
              <div className={`font-bold mb-1 text-gradient ${card.isText ? 'text-lg' : 'text-3xl'}`}>
                {card.value}
              </div>
              <div className="text-sm text-gray-400">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions + Progress */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="glass-button p-4 rounded-xl text-center hover:bg-white/10 transition-all hover:scale-105 flex flex-col items-center gap-2"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Learning Progress
              </h2>
              <div className="space-y-4">
                {[
                  { subject: 'Science', progress: 78, color: 'bg-blue-500' },
                  { subject: 'Technology', progress: 62, color: 'bg-purple-500' },
                  { subject: 'History', progress: 91, color: 'bg-green-500' },
                ].map((item) => (
                  <div key={item.subject}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-medium">{item.subject}</span>
                      <span className="text-gray-400">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-700`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recently Watched */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recently Watched
              </h2>
              {stats.recentlyWatched.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentlyWatched.map((itemId) => (
                    <div
                      key={itemId}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0">
                        📽️
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Content #{itemId}</p>
                        <p className="text-xs text-gray-400">Recently watched</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <PlayCircle className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                  <p className="text-gray-400 text-sm">No content watched yet</p>
                  <Link to="/subjects" className="text-primary-400 text-sm hover:text-primary-300 mt-1 inline-block">
                    Start Browsing
                  </Link>
                </div>
              )}
            </div>

            {/* Full Dashboard Link */}
            <Link
              to="/dashboard"
              className="glass-card p-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div>
                <h3 className="font-bold mb-1">Full Dashboard</h3>
                <p className="text-sm text-gray-400">Detailed stats & analytics</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Achievements */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </h2>
              <div className="space-y-2">
                {[
                  { icon: '🎯', title: 'First Steps', unlocked: true },
                  { icon: '🔥', title: 'On Fire', unlocked: true },
                  { icon: '📚', title: 'Bookworm', unlocked: false },
                  { icon: '🏆', title: 'Master', unlocked: false },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      a.unlocked
                        ? 'bg-primary-500/10 border-primary-500/30'
                        : 'bg-white/5 border-white/10 opacity-40'
                    }`}
                  >
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-sm font-medium">{a.title}</span>
                    {a.unlocked && <span className="ml-auto text-xs text-primary-400">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
