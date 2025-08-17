import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section style={{
      padding: '4rem 0',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        animation: 'rotate 20s linear infinite'
      }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Ready to Start Converting?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6
          }}>
            Join thousands of users who trust ConvertX for their file conversion needs. 
            No registration required - start converting immediately!
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/dashboard?tool=heic2jpg" style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(0)';
            }}>
              Try HEIC to JPG
            </Link>
            
            <Link to="/dashboard" style={{
              background: 'transparent',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
              border: '2px solid rgba(255,255,255,0.5)',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              Explore All Tools
            </Link>
          </div>
          
          <div style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            ⚡ Free • 🔒 Secure • 📱 Mobile Friendly
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default CTA; 