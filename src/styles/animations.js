// Enhanced animation utilities and keyframes

export const ANIMATIONS = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popIn {
    0% {
      transform: scale(0.75);
      opacity: 0;
    }
    80% {
      transform: scale(1.04);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(110%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-5px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(5px);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-14px);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px currentColor;
    }
    50% {
      box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes zoomIn {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes zoomOut {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  @keyframes rotateIn {
    from {
      transform: rotate(-180deg);
      opacity: 0;
    }
    to {
      transform: rotate(0);
      opacity: 1;
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(400px) rotateY(0);
    }
    100% {
      transform: perspective(400px) rotateY(360deg);
    }
  }

  @keyframes elastic {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.25);
    }
    40% {
      transform: scale(0.75);
    }
    50% {
      transform: scale(1.15);
    }
    65% {
      transform: scale(0.95);
    }
    75% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    14% {
      transform: scale(1.3);
    }
    28% {
      transform: scale(1);
    }
    42% {
      transform: scale(1.3);
    }
    70% {
      transform: scale(1);
    }
  }

  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
`;

export const animationClasses = {
  fadeUp: 'animation: fadeUp 0.5s ease forwards',
  fadeIn: 'animation: fadeIn 0.3s ease forwards',
  popIn: 'animation: popIn 0.3s ease forwards',
  slideIn: 'animation: slideIn 0.35s ease forwards',
  slideDown: 'animation: slideDown 0.3s ease forwards',
  slideUp: 'animation: slideUp 0.3s ease forwards',
  pulse: 'animation: pulse 1.2s ease-in-out infinite',
  spin: 'animation: spin 1s linear infinite',
  bounce: 'animation: bounce 1s ease-in-out infinite',
  shake: 'animation: shake 0.5s ease-in-out',
  float: 'animation: float 3s ease-in-out infinite',
  glow: 'animation: glow 2s ease-in-out infinite',
  zoomIn: 'animation: zoomIn 0.3s ease forwards',
  zoomOut: 'animation: zoomOut 0.3s ease forwards',
  elastic: 'animation: elastic 1s ease forwards',
  heartbeat: 'animation: heartbeat 1.5s ease-in-out infinite'
};

export const getAnimation = (name, duration = '0.3s', easing = 'ease', delay = '0s') => {
  return `animation: ${name} ${duration} ${easing} ${delay} forwards`;
};

export const staggeredAnimation = (baseDelay = 0.1) => {
  return (index) => ({
    animationDelay: `${index * baseDelay}s`
  });
};

export default ANIMATIONS;
