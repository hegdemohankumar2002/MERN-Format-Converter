import React, { useState, useEffect } from 'react';

const Stats = () => {
  const [stats, setStats] = useState({
    totalConversions: 0,
    activeUsers: 0,
    filesProcessed: 0,
    uptime: 0
  });

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalConversions: 15420,
        activeUsers: 892,
        filesProcessed: 45678,
        uptime: 99.9
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      label: 'Total Conversions',
      value: stats.totalConversions.toLocaleString(),
      icon: '🔄',
      color: 'var(--color-primary)'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: '👥',
      color: 'var(--color-accent)'
    },
    {
      label: 'Files Processed',
      value: stats.filesProcessed.toLocaleString(),
      icon: '📁',
      color: 'var(--color-success)'
    },
    {
      label: 'Uptime',
      value: `${stats.uptime}%`,
      icon: '⚡',
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div style={{
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
      padding: '2rem',
      margin: '2rem 0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: 'var(--color-text)',
        fontSize: '1.5rem',
        fontWeight: 600
      }}>
        Platform Statistics
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {statItems.map((item, index) => (
          <div key={index} style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: 'var(--color-bg)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>
              {item.icon}
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: item.color,
              marginBottom: '0.5rem'
            }}>
              {item.value}
            </div>
            <div style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats; 