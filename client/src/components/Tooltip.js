import React, { useState } from 'react';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 200,
  maxWidth = 250 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 1000,
      maxWidth: `${maxWidth}px`,
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '13px',
      lineHeight: 1.4,
      color: 'var(--color-text)',
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'opacity 0.2s ease, visibility 0.2s ease',
      whiteSpace: 'nowrap'
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px'
        };
      case 'left':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px'
        };
      case 'right':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px'
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <div style={getPositionStyles()}>
        {content}
        {/* Arrow */}
        <div style={{
          position: 'absolute',
          width: 0,
          height: 0,
          border: '4px solid transparent',
          ...(position === 'top' && {
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderTopColor: 'var(--color-card)'
          }),
          ...(position === 'bottom' && {
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderBottomColor: 'var(--color-card)'
          }),
          ...(position === 'left' && {
            left: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            borderLeftColor: 'var(--color-card)'
          }),
          ...(position === 'right' && {
            right: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            borderRightColor: 'var(--color-card)'
          })
        }} />
      </div>
    </div>
  );
};

export default Tooltip; 