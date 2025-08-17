import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...',
  showText = true 
}) => {
  const sizeMap = {
    small: 20,
    medium: 40,
    large: 60
  };

  const colorMap = {
    primary: 'var(--color-primary)',
    accent: 'var(--color-accent)',
    success: 'var(--color-success)',
    error: 'var(--color-error)'
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;
  const spinnerColor = colorMap[color] || colorMap.primary;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    }}>
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `3px solid var(--color-border)`,
          borderTop: `3px solid ${spinnerColor}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
        role="status"
        aria-label="Loading"
      />
      {showText && text && (
        <span style={{
          color: 'var(--color-text-muted)',
          fontSize: '14px',
          fontWeight: 500
        }}>
          {text}
        </span>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner; 