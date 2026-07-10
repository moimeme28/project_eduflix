import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, User, LogOut, MessageSquare } from 'lucide-react';

const Navbar = ({ user, onLogout, onAI }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-gradient">EduFlix</h1>
            <p className="text-xs text-gray-400">Learn through entertainment</p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects, topics, movies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/subjects"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Subjects</span>
          </Link>

          {user && (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>

              <button
                onClick={onAI}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">AI Assistant</span>
              </button>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg glass-button text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-gradient-primary text-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-button text-sm font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
