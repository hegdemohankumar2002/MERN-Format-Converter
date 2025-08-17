import React, { useEffect, useState } from 'react';

const Notification = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose, 
  position = 'top-right' 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getStyles = () => {
    const baseStyles = {
      position: 'fixed',
      zIndex: 10000,
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '400px',
      minWidth: '300px',
      backdropFilter: 'blur(10px)',
      border: '1px solid',
      transition: 'all 0.3s ease',
      transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
      opacity: isExiting ? 0 : 1,
    };

    const typeStyles = {
      success: {
        background: 'rgba(0, 255, 179, 0.1)',
        borderColor: 'var(--color-success)',
        color: 'var(--color-success)',
      },
      error: {
        background: 'rgba(255, 56, 96, 0.1)',
        borderColor: 'var(--color-error)',
        color: 'var(--color-error)',
      },
      warning: {
        background: 'rgba(255, 224, 102, 0.1)',
        borderColor: '#ffb366',
        color: '#ffb366',
      },
      info: {
        background: 'rgba(127, 92, 255, 0.1)',
        borderColor: 'var(--color-primary)',
        color: 'var(--color-primary)',
      },
    };

    const positionStyles = {
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
    };

    return {
      ...baseStyles,
      ...typeStyles[type],
      ...positionStyles[position],
    };
  };

  if (!isVisible) return null;

  return (
    <div style={getStyles()} role="alert" aria-live="polite">
      <span style={{ fontSize: '1.2rem' }}>{getIcon()}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: '4px' }}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
          {message}
        </div>
      </div>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '4px',
          borderRadius: '4px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Notification; 