import React from 'react';

export const SkeletonCard = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 16,
            padding: 0,
            overflow: 'hidden',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        >
          <div
            style={{
              width: '100%',
              height: 200,
              background: 'rgba(255, 255, 255, 0.08)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
          <div style={{ padding: 20 }}>
            <div
              style={{
                height: 24,
                width: '80%',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                marginBottom: 12,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
            <div
              style={{
                height: 16,
                width: '60%',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 4,
                marginBottom: 12,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
            <div
              style={{
                height: 14,
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 4,
                marginBottom: 8,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
            <div
              style={{
                height: 14,
                width: '90%',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 4,
                marginBottom: 16,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
            <div
              style={{
                height: 36,
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 8,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export const SkeletonButton = () => (
  <div
    style={{
      height: 44,
      width: 120,
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 8,
      animation: 'pulse 1.5s ease-in-out infinite'
    }}
  />
);

export const SkeletonText = ({ lines = 3, height = 16 }) => (
  <>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        style={{
          height,
          width: index === lines - 1 ? '60%' : '100%',
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 4,
          marginBottom: 8,
          animation: 'pulse 1.5s ease-in-out infinite'
        }}
      />
    ))}
  </>
);

export const SkeletonAvatar = ({ size = 40 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.08)',
      animation: 'pulse 1.5s ease-in-out infinite'
    }}
  />
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: 24
    }}
  >
    <SkeletonCard count={count} />
  </div>
);

export const LoadingSpinner = ({ size = 40, color = '#4a90d9' }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40
    }}
  >
    <div
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  </div>
);

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}
  >
    <LoadingSpinner size={60} />
    <p
      style={{
        color: '#ffffff',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 500
      }}
    >
      {message}
    </p>
  </div>
);

export default SkeletonCard;
