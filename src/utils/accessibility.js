// Accessibility utilities

export const ARIA_LABELS = {
  moodButton: (mood) => `Select ${mood} mood for recommendations`,
  saveButton: (isSaved, title) => isSaved ? `Remove ${title} from watchlist` : `Save ${title} to watchlist`,
  watchedButton: (isWatched, title) => isWatched ? `Mark ${title} as unwatched` : `Mark ${title} as watched`,
  movieCard: (title) => `View details for ${title}`,
  closeButton: 'Close',
  menuButton: 'Open menu',
  themeToggle: 'Toggle dark/light theme',
  chatButton: 'Open AI assistant chat',
  dashboardButton: 'Open dashboard',
  profileButton: 'Open profile',
  socialButton: 'Open social hub',
  logoutButton: 'Logout',
  loading: 'Loading content',
  error: 'Error occurred',
  search: 'Search movies and books',
  filter: 'Filter results'
};

export const getAriaLabel = (key, ...args) => {
  if (typeof ARIA_LABELS[key] === 'function') {
    return ARIA_LABELS[key](...args);
  }
  return ARIA_LABELS[key] || key;
};

export const handleKeyDown = (event, callback, key = 'Enter') => {
  if (event.key === key || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

export const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const setFocus = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.focus();
  }
};

export const skipToContent = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.position = 'absolute';
  skipLink.style.left = '-9999px';
  skipLink.style.zIndex = '999';
  skipLink.style.padding = '1rem';
  skipLink.style.background = '#000';
  skipLink.style.color = '#fff';
  skipLink.addEventListener('focus', () => {
    skipLink.style.left = '0';
  });
  skipLink.addEventListener('blur', () => {
    skipLink.style.left = '-9999px';
  });
  document.body.prepend(skipLink);
};

export const reduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getAnimationProps = () => {
  const prefersReducedMotion = reduceMotion();
  return {
    animation: prefersReducedMotion ? 'none' : undefined,
    transition: prefersReducedMotion ? 'none' : undefined
  };
};

export const validateColorContrast = (foreground, background) => {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const [R, G, B] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const luminance1 = getLuminance(foreground);
  const luminance2 = getLuminance(background);
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const isAccessibleContrast = (foreground, background, level = 'AA') => {
  const ratio = validateColorContrast(foreground, background);
  const thresholds = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 }
  };
  return ratio >= thresholds[level].normal;
};

export default {
  ARIA_LABELS,
  getAriaLabel,
  handleKeyDown,
  trapFocus,
  announceToScreenReader,
  setFocus,
  skipToContent,
  reduceMotion,
  getAnimationProps,
  validateColorContrast,
  isAccessibleContrast
};
