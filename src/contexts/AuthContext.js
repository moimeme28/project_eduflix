import React, { createContext, useContext, useState, useEffect } from 'react';
import storage from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = storage.get('user');
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    try {
      // Check if storage is available
      if (!storage.isAvailable()) {
        return { success: false, error: 'Local storage is not available. Please enable cookies and local storage in your browser settings.' };
      }

      const success = storage.set('user', userData);
      if (!success) {
        return { success: false, error: 'Failed to save user data. Your browser may have storage disabled or quota exceeded.' };
      }
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: `Failed to login: ${error.message}` };
    }
  };

  const signup = (userData) => {
    try {
      // Check if storage is available
      if (!storage.isAvailable()) {
        return { success: false, error: 'Local storage is not available. Please enable cookies and local storage in your browser settings.' };
      }

      const success = storage.set('user', userData);
      if (!success) {
        return { success: false, error: 'Failed to save user data. Your browser may have storage disabled or quota exceeded.' };
      }
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: `Failed to create account: ${error.message}` };
    }
  };

  const logout = () => {
    try {
      setUser(null);
      storage.remove('user');
      storage.remove('theme');
      storage.remove('watchlist');
      storage.remove('watched');
      storage.remove('mood_history');
      storage.remove('friends');
      storage.remove('friend_requests');
      storage.remove('watchlists');
      storage.remove('notifications');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Failed to logout' };
    }
  };

  const updateUser = (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      storage.set('user', updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Failed to update user' };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
