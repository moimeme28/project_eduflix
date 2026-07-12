import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, TrendingUp, Plus, Share2, Calendar, CheckCircle, Clock, ChevronRight, Star } from 'lucide-react';

const TeacherDashboard = ({ user }) => {
  const classStats = {
    totalStudents: 45,
    activeStudents: 38,
    averageProgress: 72,
    completedAssignments: 156
  };

  const classes = [
    { name: 'Biology 101', students: 25, progress: 68, nextAssignment: 'Cell Structure', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
    { name: 'World History', students: 20, progress: 75, nextAssignment: 'World War II', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' }
  ];

  const assignments = [
    { title: 'Watch: The Science of Cells', class: 'Biology 101', due: 'Jan 15', completed: 18, total: 25 },
    { title: 'Documentary: Ancient Rome', class: 'World History', due: 'Jan 18', completed: 12, total: 20 },
    { title: 'Video: Climate Change Basics', class: 'Environmental Science', due: 'Jan 20', completed: 8, total: 15 }
  ];

  const studentProgress = [
    { name: 'Alice Johnson', class: 'Biology 101', progress: 92, streak: 12 },
    { name: 'Bob Smith', class: 'World History', progress: 85, streak: 8 },
    { name: 'Carol Davis', class: 'Biology 101', progress: 78, streak: 5 },
    { name: 'David Wilson', class: 'World History', progress: 95, streak: 15 }
  ];

  const getProgressColor = (p) => {
    if (p >= 90) return 'bg-green-500';
    if (p >= 70) return 'bg-blue-500';
    if (p >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display mb-1">
              Welcome, <span className="text-gradient">{user?.name || 'Teacher'}!</span>
            </h1>
            <p className="text-gray-400">Manage your classes and track student progress</p>
          </div>
          <Link
            to="/subjects"
            className="px-6 py-3 rounded-xl bg-gradient-primary font-semibold flex items-center gap-2 hover:opacity-90 transition-all hover:scale-105 flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            Create Assignment
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Users className="w-6 h-6 text-blue-400" />, bg: 'bg-blue-500/20', value: classStats.totalStudents, label: 'Total Students' },
            { icon: <CheckCircle className="w-6 h-6 text-green-400" />, bg: 'bg-green-500/20', value: classStats.activeStudents, label: 'Active Now' },
            { icon: <TrendingUp className="w-6 h-6 text-purple-400" />, bg: 'bg-purple-500/20', value: `${classStats.averageProgress}%`, label: 'Avg Progress' },
            { icon: <BookOpen className="w-6 h-6 text-orange-400" />, bg: 'bg-orange-500/20', value: classStats.completedAssignments, label: 'Completed' },
          ].map((s, i) => (
            <div key={i} className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-3`}>
                {s.icon}
              </div>
              <div className="text-3xl font-bold text-gradient">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Classes */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-display">Your Classes</h2>
                <Link to="/subjects" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  Manage <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {classes.map((cls, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl bg-gradient-to-br ${cls.color} border ${cls.border} hover:scale-105 transition-all cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">{cls.name}</h3>
                      <span className="text-sm text-gray-300 bg-white/10 px-2 py-1 rounded-lg">{cls.students} students</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Class Progress</span>
                        <span className="font-semibold">{cls.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white/70 rounded-full" style={{ width: `${cls.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>Next: {cls.nextAssignment}</span>
                    </div>
                  </div>
                ))}
                <Link
                  to="/subjects"
                  className="p-5 rounded-xl border-2 border-dashed border-white/20 hover:border-primary-500/50 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white group min-h-[140px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-primary-500/20 flex items-center justify-center transition-colors">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Add New Class</span>
                </Link>
              </div>
            </div>

            {/* Assignments */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-display">Active Assignments</h2>
                <span className="text-sm text-gray-400">{assignments.length} active</span>
              </div>
              <div className="space-y-4">
                {assignments.map((assignment, index) => {
                  const pct = Math.round((assignment.completed / assignment.total) * 100);
                  return (
                    <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-3 gap-4">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-gray-400">{assignment.class}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 flex-shrink-0 bg-white/5 px-3 py-1 rounded-lg">
                          <Clock className="w-4 h-4" />
                          <span>{assignment.due}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center gap-1.5 text-sm text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>{assignment.completed}/{assignment.total}</span>
                          </div>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-primary transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{pct}%</span>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg glass-button text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Remind
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Performers */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-display">Top Performers</h2>
                <Link to="/subjects" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {studentProgress.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{student.name}</h3>
                      <p className="text-xs text-gray-400">{student.class}</p>
                      <div className="mt-1.5 h-1.5 bg-white/10 rounded-full overflow-hidden w-full">
                        <div
                          className={`h-full ${getProgressColor(student.progress)} transition-all`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-sm">{student.progress}%</div>
                      <div className="text-xs text-orange-400">🔥 {student.streak}d</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: Plus, label: 'Create Assignment', to: '/subjects' },
                  { icon: BookOpen, label: 'Browse Content', to: '/subjects' },
                  { icon: Share2, label: 'Share Playlist', to: '/subjects' },
                  { icon: Users, label: 'Manage Students', to: '/subjects' },
                ].map(({ icon: Icon, label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="w-full py-3 px-4 rounded-xl glass-button text-left flex items-center gap-3 hover:bg-white/10 transition-all hover:translate-x-1"
                  >
                    <Icon className="w-5 h-5 text-primary-400" />
                    <span className="font-medium text-sm">{label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming
              </h2>
              <div className="space-y-3">
                {[
                  { event: 'Biology Quiz', date: 'Tomorrow', class: 'Biology 101', urgent: true },
                  { event: 'History Discussion', date: 'Jan 18', class: 'World History', urgent: false },
                  { event: 'Progress Review', date: 'Jan 20', class: 'All Classes', urgent: false }
                ].map((item, index) => (
                  <div key={index} className={`p-3 rounded-xl ${item.urgent ? 'bg-primary-500/10 border border-primary-500/30' : 'bg-white/5'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{item.event}</span>
                      <span className={`text-xs font-semibold ${item.urgent ? 'text-primary-400' : 'text-gray-400'}`}>{item.date}</span>
                    </div>
                    <p className="text-xs text-gray-400">{item.class}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Teacher Resources</h2>
              <div className="space-y-2">
                {[
                  { title: 'Getting Started Guide', type: 'Guide', icon: '📖' },
                  { title: 'Assignment Templates', type: 'Template', icon: '📝' },
                  { title: 'Best Practices', type: 'Article', icon: '⭐' }
                ].map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <span className="text-xl">{resource.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate group-hover:text-primary-400 transition-colors">{resource.title}</h3>
                      <p className="text-xs text-gray-400">{resource.type}</p>
                    </div>
                    <Star className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 transition-colors" />
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

export default TeacherDashboard;
