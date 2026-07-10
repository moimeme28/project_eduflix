import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, currentTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: currentTheme.surface,
        border: `1px solid ${currentTheme.border}`,
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        transition: 'all 0.3s ease',
        color: currentTheme.text
      }}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
