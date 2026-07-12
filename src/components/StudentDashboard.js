import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, TrendingUp, Award, Flame, Target, Calendar, PlayCircle, Star, ChevronRight } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEK_HEIGHTS = [65, 80, 45, 90, 55, 30, 70];

const StudentDashboard = ({ user }) => {
  const stats = {
    learningStreak: 7,
    hoursWatched: 24,
    subjectsExplored: 5,
    completedPlaylists: 3,
    favoriteSubjects: ['Science', 'Technology', 'History']
  };

  const recentActivity = [
    { title: 'The Science of Everything', subject: 'Science', progress: 75, time: '2h ago', color: 'from-blue-500/30 to-cyan-500/30' },
    { title: 'World War II Documentary', subject: 'History', progress: 100, time: '1d ago', color: 'from-green-500/30 to-emerald-500/30' },
    { title: 'AI: The Future', subject: 'Technology', progress: 45, time: '2d ago', color: 'from-purple-500/30 to-pink-500/30' }
  ];

  const achievements = [
    { icon: '🎯', title: 'First Steps', description: 'Complete your first lesson', unlocked: true },
    { icon: '🔥', title: 'On Fire', description: '7-day learning streak', unlocked: true },
    { icon: '📚', title: 'Bookworm', description: 'Watch 50 hours of content', unlocked: false },
    { icon: '🏆', title: 'Master', description: 'Complete a full subject', unlocked: false }
  ];

  const subjectProgress = useMemo(() => ({
    Science: 78,
    Technology: 62,
    History: 91
  }), []);

  const subjectColors = {
    Science: 'bg-blue-500',
    Technology: 'bg-purple-500',
    History: 'bg-green-500',
  };

  const goals = [
    { goal: 'Complete Biology Basics', progress: 80 },
    { goal: 'Watch 5 History Documentaries', progress: 60 },
    { goal: 'Learn Python Fundamentals', progress: 30 }
  ];

  const todayIndex = new Date().getDay();
  // Sunday=0 in JS, our array starts Mon=0
  const adjustedToday = todayIndex === 0 ? 6 : todayIndex - 1;

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display mb-1">
              Welcome back, <span className="text-gradient">{user?.name || 'Student'}!</span>
            </h1>
            <p className="text-gray-400">Continue your learning journey</p>
          </div>
          <Link
            to="/subjects"
            className="px-6 py-3 rounded-xl bg-gradient-primary font-semibold hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 flex-shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            Browse Content
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Flame className="w-6 h-6 text-orange-400" />, bg: 'bg-orange-500/20', value: stats.learningStreak, suffix: '', label: 'Day Streak' },
            { icon: <Clock className="w-6 h-6 text-blue-400" />, bg: 'bg-blue-500/20', value: stats.hoursWatched, suffix: 'h', label: 'Hours Watched' },
            { icon: <BookOpen className="w-6 h-6 text-green-400" />, bg: 'bg-green-500/20', value: stats.subjectsExplored, suffix: '', label: 'Subjects' },
            { icon: <Award className="w-6 h-6 text-purple-400" />, bg: 'bg-purple-500/20', value: stats.completedPlaylists, suffix: '', label: 'Playlists Done' },
          ].map((s, i) => (
            <div key={i} className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-3`}>
                {s.icon}
              </div>
              <div className="text-3xl font-bold text-gradient">{s.value}{s.suffix}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Continue Watching */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-display flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Continue Watching
                </h2>
                <Link to="/subjects" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  See all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className={`w-20 h-14 rounded-xl bg-gradient-to-br ${activity.color} flex-shrink-0 flex items-center justify-center`}>
                      <PlayCircle className="w-6 h-6 text-white/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate group-hover:text-primary-400 transition-colors">{activity.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{activity.subject} · {activity.time}</p>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary transition-all"
                          style={{ width: `${activity.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{activity.progress}% complete</p>
                    </div>
                    <Link
                      to="/subjects"
                      className="px-4 py-2 rounded-lg bg-gradient-primary text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
                    >
                      {activity.progress === 100 ? 'Rewatch' : 'Continue'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Progress */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Subject Progress
              </h2>
              <div className="space-y-5">
                {stats.favoriteSubjects.map((subject) => (
                  <div key={subject}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{subject}</span>
                      <span className="text-gray-400 text-sm font-semibold">{subjectProgress[subject]}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${subjectColors[subject] || 'bg-gradient-primary'} transition-all duration-700 rounded-full`}
                        style={{ width: `${subjectProgress[subject]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Activity Chart */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-5 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Week's Activity
              </h2>
              <div className="flex items-end justify-between gap-2 h-36 mb-2">
                {DAYS.map((day, index) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg relative overflow-hidden"
                      style={{ height: `${WEEK_HEIGHTS[index]}%` }}
                    >
                      <div className={`absolute inset-0 rounded-t-lg transition-opacity ${
                        index === adjustedToday
                          ? 'bg-gradient-primary opacity-100'
                          : 'bg-gradient-primary opacity-50'
                      }`} />
                    </div>
                    <span className={`text-xs ${index === adjustedToday ? 'text-primary-400 font-semibold' : 'text-gray-400'}`}>
                      {day}
                    </span>
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
                    className={`p-4 rounded-xl border transition-all ${
                      achievement.unlocked
                        ? 'bg-primary-500/10 border-primary-500/30 hover:bg-primary-500/20'
                        : 'bg-white/5 border-white/10 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-medium text-sm">{achievement.title}</h3>
                        <p className="text-xs text-gray-400">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-auto flex-shrink-0" />
                      )}
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
              <div className="space-y-4">
                {goals.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.goal}</span>
                      <span className="text-xs text-gray-400 font-semibold">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/subjects"
                className="block w-full mt-5 py-2.5 text-center rounded-xl glass-button text-sm font-medium hover:bg-white/10 transition-colors"
              >
                + Browse More Content
              </Link>
            </div>

            {/* Recommended */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-display">Recommended</h2>
                <Link to="/subjects" className="text-xs text-primary-400 hover:text-primary-300">See all</Link>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Cosmos: A Spacetime Odyssey', subject: 'Science', rating: 9.3 },
                  { title: 'The Imitation Game', subject: 'Technology', rating: 8.0 },
                  { title: "Schindler's List", subject: 'History', rating: 9.0 }
                ].map((item, i) => (
                  <Link
                    key={i}
                    to="/subjects"
                    className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors group"
                  >
                    <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-primary-500/30 to-purple-500/30 flex-shrink-0 flex items-center justify-center">
                      <PlayCircle className="w-4 h-4 text-white/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate group-hover:text-primary-400 transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{item.subject}</span>
                        <span>·</span>
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </Link>
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
