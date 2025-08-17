import React, { useState, useEffect } from 'react';

const EnhancedNotification = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose, 
  position = 'top-right',
  showIcon = true,
  showProgress = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      const progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }
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
      default: return '📢';
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          borderColor: 'var(--color-success)',
          backgroundColor: 'rgba(0, 255, 179, 0.1)',
          color: 'var(--color-success)'
        };
      case 'error':
        return {
          borderColor: 'var(--color-error)',
          backgroundColor: 'rgba(255, 56, 96, 0.1)',
          color: 'var(--color-error)'
        };
      case 'warning':
        return {
          borderColor: '#ffa726',
          backgroundColor: 'rgba(255, 167, 38, 0.1)',
          color: '#ffa726'
        };
      case 'info':
      default:
        return {
          borderColor: 'var(--color-primary)',
          backgroundColor: 'rgba(127, 92, 255, 0.1)',
          color: 'var(--color-primary)'
        };
    }
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed',
      zIndex: 10000,
      maxWidth: '400px',
      minWidth: '300px',
      padding: '1rem',
      borderRadius: '12px',
      border: '2px solid',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)',
      background: 'var(--color-card)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-main)',
      fontSize: '14px',
      lineHeight: 1.5,
      transition: 'all 0.3s ease',
      transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
      opacity: isExiting ? 0 : 1,
    };

    const typeStyles = getTypeStyles();
    Object.assign(baseStyles, typeStyles);

    switch (position) {
      case 'top-right':
        return { ...baseStyles, top: '20px', right: '20px' };
      case 'top-left':
        return { ...baseStyles, top: '20px', left: '20px' };
      case 'bottom-right':
        return { ...baseStyles, bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { ...baseStyles, bottom: '20px', left: '20px' };
      case 'top-center':
        return { ...baseStyles, top: '20px', left: '50%', transform: isExiting ? 'translateX(-50%) translateY(-100%)' : 'translateX(-50%)' };
      case 'bottom-center':
        return { ...baseStyles, bottom: '20px', left: '50%', transform: isExiting ? 'translateX(-50%) translateY(100%)' : 'translateX(-50%)' };
      default:
        return { ...baseStyles, top: '20px', right: '20px' };
    }
  };

  if (!isVisible) return null;

  return (
    <div style={getPositionStyles()} role="alert" aria-live="polite">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {showIcon && (
          <div style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }}>
            {getIcon()}
          </div>
        )}
        
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontWeight: 600, 
            marginBottom: '4px',
            textTransform: 'capitalize',
            fontSize: '15px'
          }}>
            {type}
          </div>
          <div style={{ fontSize: '13px', lineHeight: 1.4 }}>
            {message}
          </div>
        </div>
        
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '4px',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--color-error)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      
      {showProgress && duration > 0 && (
        <div style={{ 
          marginTop: '12px',
          height: '3px',
          background: 'var(--color-border)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: getTypeStyles().borderColor,
            width: `${progress}%`,
            transition: 'width 0.1s ease'
          }} />
        </div>
      )}
    </div>
  );
};

export default EnhancedNotification; 