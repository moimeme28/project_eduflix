import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, TrendingUp, Plus, Share2, Calendar, CheckCircle, Clock } from 'lucide-react';

const TeacherDashboard = ({ user }) => {
  const navigate = useNavigate();
  const classStats = {
    totalStudents: 45,
    activeStudents: 38,
    averageProgress: 72,
    completedAssignments: 156
  };

  const classes = [
    { name: 'Biology 101', students: 25, progress: 68, nextAssignment: 'Cell Structure' },
    { name: 'World History', students: 20, progress: 75, nextAssignment: 'World War II' }
  ];

  const assignments = [
    { title: 'Watch: The Science of Cells', class: 'Biology 101', due: '2024-01-15', completed: 18, total: 25 },
    { title: 'Documentary: Ancient Rome', class: 'World History', due: '2024-01-18', completed: 12, total: 20 },
    { title: 'Video: Climate Change Basics', class: 'Environmental Science', due: '2024-01-20', completed: 8, total: 15 }
  ];

  const studentProgress = [
    { name: 'Alice Johnson', class: 'Biology 101', progress: 92, streak: 12 },
    { name: 'Bob Smith', class: 'World History', progress: 85, streak: 8 },
    { name: 'Carol Davis', class: 'Biology 101', progress: 78, streak: 5 },
    { name: 'David Wilson', class: 'World History', progress: 95, streak: 15 }
  ];

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Teacher Dashboard</h1>
            <p className="text-gray-400">Manage your classes and track student progress</p>
          </div>
          <button 
            onClick={() => navigate('/subjects')}
            className="px-6 py-3 rounded-xl bg-gradient-primary font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Create Assignment
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{classStats.totalStudents}</div>
            <div className="text-sm text-gray-400">Total Students</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{classStats.activeStudents}</div>
            <div className="text-sm text-gray-400">Active Now</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{classStats.averageProgress}%</div>
            <div className="text-sm text-gray-400">Avg Progress</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gradient">{classStats.completedAssignments}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Classes */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Your Classes</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {classes.map((cls, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold">{cls.name}</h3>
                      <span className="text-sm text-gray-400">{cls.students} students</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Class Progress</span>
                        <span>{cls.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-primary" style={{ width: `${cls.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Next: {cls.nextAssignment}</span>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => navigate('/subjects')}
                  className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-primary-500/50 transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-white"
                >
                  <Plus className="w-5 h-5" />
                  Add New Class
                </button>
              </div>
            </div>

            {/* Assignments */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Active Assignments</h2>
              <div className="space-y-4">
                {assignments.map((assignment, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-gray-400">{assignment.class}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{assignment.due}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm">{assignment.completed}/{assignment.total} completed</span>
                        </div>
                        <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-primary"
                            style={{ width: `${(assignment.completed / assignment.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-lg glass-button text-sm flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Remind
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Progress */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Top Performers</h2>
              <div className="space-y-3">
                {studentProgress.map((student, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-gray-400">{student.class}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{student.progress}%</div>
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        🔥 {student.streak} day streak
                      </div>
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
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/subjects')}
                  className="w-full py-3 px-4 rounded-xl glass-button text-left flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Assignment</span>
                </button>
                <button 
                  onClick={() => navigate('/subjects')}
                  className="w-full py-3 px-4 rounded-xl glass-button text-left flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Browse Content</span>
                </button>
                <button 
                  onClick={() => navigate('/subjects')}
                  className="w-full py-3 px-4 rounded-xl glass-button text-left flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Playlist</span>
                </button>
                <button 
                  onClick={() => navigate('/subjects')}
                  className="w-full py-3 px-4 rounded-xl glass-button text-left flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  <span>Manage Students</span>
                </button>
              </div>
            </div>

            {/* Upcoming */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Upcoming</h2>
              <div className="space-y-3">
                {[
                  { event: 'Biology Quiz', date: 'Tomorrow', class: 'Biology 101' },
                  { event: 'History Discussion', date: 'Jan 18', class: 'World History' },
                  { event: 'Progress Review', date: 'Jan 20', class: 'All Classes' }
                ].map((item, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{item.event}</span>
                      <span className="text-xs text-primary-400">{item.date}</span>
                    </div>
                    <p className="text-xs text-gray-400">{item.class}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold font-display mb-4">Teacher Resources</h2>
              <div className="space-y-3">
                {[
                  { title: 'Getting Started Guide', type: 'PDF' },
                  { title: 'Assignment Templates', type: 'DOC' },
                  { title: 'Best Practices', type: 'Video' }
                ].map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{resource.title}</h3>
                      <p className="text-xs text-gray-400">{resource.type}</p>
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

export default TeacherDashboard;
