import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, BookOpen, Award, Settings, LogOut, Edit2, Save, X } from 'lucide-react';

function Profile({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Learning enthusiast exploring educational content'
  });
  const navigate = useNavigate();

  const handleSave = () => {
    // In real app, this would update user profile
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('eduflix_user');
    navigate('/');
  };

  const userStats = {
    hoursWatched: 24,
    subjectsExplored: 5,
    completedCourses: 3,
    learningStreak: 7
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
                <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium capitalize">
                  {user?.role || 'Student'}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{formData.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email || 'user@example.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Recently'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="p-3 rounded-xl glass-button hover:bg-white/10 transition-colors"
            >
              {editMode ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Edit Mode */}
          {editMode && (
            <div className="mt-6 p-6 rounded-xl bg-white/5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-gradient-primary font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-primary-400" />
            <div className="text-2xl font-bold">{userStats.hoursWatched}h</div>
            <div className="text-sm text-gray-400">Hours Watched</div>
          </div>
          <div className="glass-card p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <div className="text-2xl font-bold">{userStats.subjectsExplored}</div>
            <div className="text-sm text-gray-400">Subjects</div>
          </div>
          <div className="glass-card p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <div className="text-2xl font-bold">{userStats.completedCourses}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="glass-card p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-3 text-orange-400" />
            <div className="text-2xl font-bold">{userStats.learningStreak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', description: 'Receive updates about new content' },
              { label: 'Learning reminders', description: 'Daily reminders to continue learning' },
              { label: 'Progress reports', description: 'Weekly summary of your progress' },
              { label: 'Public profile', description: 'Allow others to see your progress' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div>
                  <h3 className="font-medium">{setting.label}</h3>
                  <p className="text-sm text-gray-400">{setting.description}</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-primary-500 relative">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 border border-red-500/30">
          <h2 className="text-xl font-bold font-display mb-4 text-red-400">Danger Zone</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/20 transition-colors">
              Reset Progress
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
