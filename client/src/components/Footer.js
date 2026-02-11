import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)',
      padding: '3rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🔥</span>
              <h3 style={{
                color: 'var(--color-accent)',
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 700
              }}>
                ConvertX
              </h3>
            </div>
            <p style={{
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              marginBottom: '1rem'
            }}>
              The ultimate file conversion platform. Convert images, videos, and audio files with ease, speed, and security.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: 'var(--color-text-muted)',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                📧
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: 'var(--color-text-muted)',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                🐦
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: 'var(--color-text-muted)',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                📘
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              color: 'var(--color-text)',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'HEIC to JPG', path: '/dashboard?tool=heic2jpg' },
                { name: 'Video Converter', path: '/dashboard?tool=hevc' },
                { name: 'Audio Extractor', path: '/dashboard?tool=mp3' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link to={link.path} style={{
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    fontSize: '0.9rem'
                  }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 style={{
              color: 'var(--color-text)',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              Tools
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Image Converters', path: '/dashboard?tool=heic2jpg' },
                { name: 'Video Converters', path: '/dashboard?tool=hevc' },
                { name: 'Audio Extractors', path: '/dashboard?tool=mp3' },
                { name: 'YouTube Downloader', path: '/dashboard?tool=ytdl' }
              ].map((tool, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link to={tool.path} style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{
              color: 'var(--color-text)',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              Support
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Support', path: '/support' },
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link to={item.path} style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem'
          }}>
            © {currentYear} ConvertX. All rights reserved.
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.9rem'
          }}>
            <span style={{ color: 'var(--color-text-muted)' }}>
              Made with ❤️ for the community
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 