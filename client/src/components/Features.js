import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Convert files in seconds with our optimized processing engine',
      color: 'var(--color-accent)'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your files are automatically deleted after processing',
      color: 'var(--color-success)'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices and screen sizes',
      color: 'var(--color-primary)'
    },
    {
      icon: '🎯',
      title: 'High Quality',
      description: 'Maintain original quality while converting formats',
      color: 'var(--color-accent)'
    },
    {
      icon: '🌐',
      title: 'No Registration',
      description: 'Start converting immediately without any signup required',
      color: 'var(--color-success)'
    },
    {
      icon: '💾',
      title: 'Multiple Formats',
      description: 'Support for all popular image, video, and audio formats',
      color: 'var(--color-primary)'
    }
  ];

  return (
    <section style={{
      padding: '4rem 0',
      background: 'var(--color-bg)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Why Choose ConvertX?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Experience the most advanced file conversion platform with cutting-edge features designed for modern users.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px)';
              e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
              e.target.style.borderColor = feature.color;
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = 'var(--color-border)';
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '1rem'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                fontSize: '0.95rem'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 