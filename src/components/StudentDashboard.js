import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, TrendingUp, Award, Flame, Target, Calendar, PlayCircle } from 'lucide-react';

const StudentDashboard = ({ user }) => {
  const navigate = useNavigate();
  const stats = {
    learningStreak: 7,
    hoursWatched: 24,
    subjectsExplored: 5,
    completedPlaylists: 3,
    favoriteSubjects: ['Science', 'Technology', 'History']
  };

  const recentActivity = [
    { title: 'The Science of Everything', subject: 'Science', progress: 75, time: '2h ago' },
    { title: 'World War II Documentary', subject: 'History', progress: 100, time: '1d ago' },
    { title: 'AI: The Future', subject: 'Technology', progress: 45, time: '2d ago' }
  ];

  const achievements = [
    { icon: '🎯', title: 'First Steps', description: 'Complete your first lesson', unlocked: true },
    { icon: '🔥', title: 'On Fire', description: '7-day learning streak', unlocked: true },
    { icon: '📚', title: 'Bookworm', description: 'Watch 50 hours of content', unlocked: false },
    { icon: '🏆', title: 'Master', description: 'Complete a subject', unlocked: false }
  ];

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">Welcome back, {user?.name || 'Student'}!</h1>
          <p className="text-gray-400">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{stats.learningStreak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{stats.hoursWatched}h</div>
            <div className="text-sm text-gray-400">Hours Watched</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{stats.subjectsExplored}</div>
            <div className="text-sm text-gray-400">Subjects</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{stats.completedPlaylists}</div>
            <div className="text-sm text-gray-400">Playlists</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Watching */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Continue Watching
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-20 h-12 rounded-lg bg-gradient-to-br from-primary-500/30 to-purple-500/30 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{activity.title}</h3>
                      <p className="text-sm text-gray-400">{activity.subject} • {activity.time}</p>
                      <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary"
                          style={{ width: `${activity.progress}%` }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/subjects')}
                      className="px-4 py-2 rounded-lg bg-gradient-primary text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      {activity.progress === 100 ? 'Rewatch' : 'Continue'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Chart */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Learning Progress
              </h2>
              <div className="space-y-4">
                {stats.favoriteSubjects.map((subject) => (
                  <div key={subject}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{subject}</span>
                      <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary transition-all"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Week's Activity
              </h2>
              <div className="flex items-end justify-between gap-2 h-40">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-white/10 rounded-t-lg relative" style={{ height: `${Math.random() * 80 + 20}%` }}>
                      <div className="absolute inset-0 bg-gradient-primary rounded-t-lg opacity-80" />
                    </div>
                    <span className="text-xs text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      achievement.unlocked
                        ? 'bg-primary-500/10 border-primary-500/30'
                        : 'bg-white/5 border-white/10 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-medium text-sm">{achievement.title}</h3>
                        <p className="text-xs text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Goals
              </h2>
              <div className="space-y-3">
                {[
                  { goal: 'Complete Biology Basics', progress: 80 },
                  { goal: 'Watch 5 History Documentaries', progress: 60 },
                  { goal: 'Learn Python Fundamentals', progress: 30 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{item.goal}</span>
                      <span className="text-xs text-gray-400">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 rounded-lg glass-button text-sm font-medium">
                + Add New Goal
              </button>
            </div>

            {/* Recommended */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Recommended for You</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="w-16 h-10 rounded bg-gradient-to-br from-primary-500/30 to-purple-500/30 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">Recommended Content {i}</h3>
                      <p className="text-xs text-gray-400">Subject • Level</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
