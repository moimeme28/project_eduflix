import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, BookOpen, Award, Settings, LogOut, Edit2, Save, X, Clock, Flame } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SETTINGS_LIST = [
  { key: 'emailNotifications', label: 'Email notifications', description: 'Receive updates about new content' },
  { key: 'learningReminders', label: 'Learning reminders', description: 'Daily reminders to continue learning' },
  { key: 'progressReports', label: 'Progress reports', description: 'Weekly summary of your progress' },
  { key: 'publicProfile', label: 'Public profile', description: 'Allow others to see your progress' },
];

function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || 'Learning enthusiast exploring educational content',
  });
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: user?.settings?.emailNotifications ?? true,
    learningReminders: user?.settings?.learningReminders ?? true,
    progressReports: user?.settings?.progressReports ?? false,
    publicProfile: user?.settings?.publicProfile ?? false,
  });

  const userStats = {
    hoursWatched: user?.stats?.hoursWatched ?? 24,
    subjectsExplored: user?.stats?.subjectsExplored ?? 5,
    completedCourses: user?.stats?.completedCourses ?? 3,
    learningStreak: user?.stats?.learningStreak ?? 7,
  };

  const handleSave = () => {
    setSaveError('');
    if (!formData.name.trim()) {
      setSaveError('Name cannot be empty.');
      return;
    }
    const result = updateUser({ name: formData.name.trim(), bio: formData.bio.trim() });
    if (result?.success === false) {
      setSaveError(result.error || 'Failed to save.');
    } else {
      setSaveSuccess(true);
      setEditMode(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleToggleSetting = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    updateUser({ settings: updated });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="pt-24 pb-12 px-4 text-center">
        <p className="text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Success Banner */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm text-center animate-fade-in">
            Profile updated successfully!
          </div>
        )}

        {/* Profile Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center text-4xl font-bold flex-shrink-0 overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                user.name?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl font-bold">{user.name || 'User'}</h1>
                <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium capitalize">
                  {user.role || 'Student'}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{formData.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email || 'user@example.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined{' '}
                    {user.joinDate
                      ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                      : 'Recently'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setEditMode((v) => !v); setSaveError(''); }}
              aria-label={editMode ? 'Cancel editing' : 'Edit profile'}
              className="p-3 rounded-xl glass-button hover:bg-white/10 transition-colors flex-shrink-0"
            >
              {editMode ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Edit Form */}
          {editMode && (
            <div className="mt-6 p-6 rounded-xl bg-white/5 space-y-4 animate-fade-in">
              {saveError && (
                <p className="text-red-400 text-sm">{saveError}</p>
              )}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  maxLength={60}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 text-right mt-1">{formData.bio.length}/200</p>
              </div>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-gradient-primary font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
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
            <Clock className="w-8 h-8 mx-auto mb-3 text-blue-400" />
            <div className="text-2xl font-bold text-gradient">{userStats.hoursWatched}h</div>
            <div className="text-sm text-gray-400">Hours Watched</div>
          </div>
          <div className="glass-card p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <div className="text-2xl font-bold text-gradient">{userStats.subjectsExplored}</div>
            <div className="text-sm text-gray-400">Subjects</div>
          </div>
          <div className="glass-card p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <div className="text-2xl font-bold text-gradient">{userStats.completedCourses}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="glass-card p-6 text-center">
            <Flame className="w-8 h-8 mx-auto mb-3 text-orange-400" />
            <div className="text-2xl font-bold text-gradient">{userStats.learningStreak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Preferences
          </h2>
          <div className="space-y-4">
            {SETTINGS_LIST.map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{setting.label}</h3>
                  <p className="text-sm text-gray-400">{setting.description}</p>
                </div>
                {/* Functional toggle */}
                <button
                  onClick={() => handleToggleSetting(setting.key)}
                  aria-label={`Toggle ${setting.label}`}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    settings[setting.key] ? 'bg-primary-500' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      settings[setting.key] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 border border-red-500/30">
          <h2 className="text-xl font-bold font-display mb-4 text-red-400">Danger Zone</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                if (window.confirm('Reset all progress? This cannot be undone.')) {
                  updateUser({ stats: { hoursWatched: 0, subjectsExplored: 0, completedCourses: 0, learningStreak: 0 } });
                }
              }}
              className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/20 transition-colors"
            >
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
