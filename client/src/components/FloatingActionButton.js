import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FloatingActionButton = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: '🌄',
      label: 'HEIC to JPG',
      path: '/dashboard?tool=heic2jpg',
      color: 'var(--color-primary)'
    },
    {
      icon: '🎬',
      label: 'Video Converter',
      path: '/dashboard?tool=hevc',
      color: 'var(--color-accent)'
    },
    {
      icon: '🎵',
      label: 'Audio Extractor',
      path: '/dashboard?tool=mp3',
      color: 'var(--color-success)'
    },
    {
      icon: '📁',
      label: 'All Tools',
      path: '/',
      color: 'var(--color-anime-pink)'
    }
  ];

  return (
    <>
      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 32,
          left: 32,
          zIndex: 20000,
          background: 'var(--color-primary)',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(127, 92, 255, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          color: 'var(--color-btn-text)',
          fontSize: '24px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(127, 92, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(127, 92, 255, 0.3)';
        }}
        aria-label="Quick actions"
      >
        {isOpen ? '✕' : '⚡'}
      </button>

      {/* Action buttons */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: 100,
          left: 32,
          zIndex: 19999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: 'all 0.3s ease'
        }}>
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              onClick={() => setIsOpen(false)}
              style={{
                background: action.color,
                color: 'var(--color-btn-text)',
                border: 'none',
                borderRadius: '50%',
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                fontSize: '18px',
                transform: `translateY(${index * 60}px)`,
                animation: `slideIn 0.3s ease ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = `translateY(${index * 60}px) scale(1.1)`;
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = `translateY(${index * 60}px) scale(1)`;
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
              aria-label={action.label}
            >
              {action.icon}
            </Link>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 19998,
            backdropFilter: 'blur(2px)',
            transition: 'all 0.3s ease'
          }}
        />
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default FloatingActionButton; 