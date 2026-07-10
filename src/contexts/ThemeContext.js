import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const themes = {
    dark: {
      background: '#060810',
      surface: 'rgba(255,255,255,0.05)',
      surfaceHover: 'rgba(255,255,255,0.08)',
      border: 'rgba(255,255,255,0.1)',
      text: '#ffffff',
      textSecondary: '#888888',
      accent: '#4a90d9',
      gradient: 'linear-gradient(160deg,#06080f,#03040a)'
    },
    light: {
      background: '#ffffff',
      surface: 'rgba(0,0,0,0.05)',
      surfaceHover: 'rgba(0,0,0,0.08)',
      border: 'rgba(0,0,0,0.1)',
      text: '#000000',
      textSecondary: '#666666',
      accent: '#4a90d9',
      gradient: 'linear-gradient(160deg,#ffffff,#f5f5f5)'
    }
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
