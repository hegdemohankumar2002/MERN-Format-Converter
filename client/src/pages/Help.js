import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Help = ({ theme }) => {
  const guides = [
    {
      title: "HEIC to JPG Conversion",
      icon: "🌄",
      description: "Convert iPhone photos to widely compatible JPG format",
      steps: [
        "Upload your HEIC file (drag & drop or click to browse)",
        "The system will automatically detect the HEIC format",
        "Click 'Convert' to start the process",
        "Download your JPG file when conversion is complete"
      ],
      tips: [
        "HEIC files are typically smaller than JPG but less compatible",
        "JPG format is supported by all devices and platforms",
        "Quality is preserved during conversion"
      ]
    },
    {
      title: "RAW to JPG Conversion",
      icon: "📷",
      description: "Convert professional camera RAW files to JPG",
      steps: [
        "Upload your RAW file (supports CR2, NEF, ARW, etc.)",
        "Select your preferred quality settings",
        "Click 'Convert' to process the file",
        "Download the converted JPG image"
      ],
      tips: [
        "RAW files contain more data but are larger",
        "JPG conversion reduces file size significantly",
        "Choose quality based on your needs"
      ]
    },
    {
      title: "PNG to JPG Conversion",
      icon: "🖼️",
      description: "Convert PNG images with transparency to JPG",
      steps: [
        "Upload your PNG file",
        "Select background color (for transparent areas)",
        "Choose JPG quality level",
        "Convert and download your JPG file"
      ],
      tips: [
        "PNG supports transparency, JPG does not",
        "Choose a background color for transparent areas",
        "Higher quality = larger file size"
      ]
    },
    {
      title: "Video Conversion (HEVC to MP4)",
      icon: "🎬",
      description: "Convert HEVC videos to widely supported MP4 format",
      steps: [
        "Upload your HEVC video file",
        "Select output quality and resolution",
        "Click 'Convert' to start processing",
        "Download your MP4 video when ready"
      ],
      tips: [
        "HEVC provides better compression than H.264",
        "MP4 is supported by most devices",
        "Larger files take longer to convert"
      ]
    },
    {
      title: "Audio Extraction (MP4 to MP3)",
      icon: "🎵",
      description: "Extract audio from video files",
      steps: [
        "Upload your MP4 video file",
        "Select audio quality (128kbps, 320kbps, etc.)",
        "Click 'Extract Audio' to begin",
        "Download your MP3 file"
      ],
      tips: [
        "Perfect for creating podcasts from videos",
        "Choose higher bitrate for better quality",
        "Audio-only files are much smaller"
      ]
    },
    {
      title: "YouTube Video Downloader",
      icon: "▶️",
      description: "Download YouTube videos for offline viewing",
      steps: [
        "Paste the YouTube video URL",
        "Select your preferred quality and format",
        "Click 'Download' to start",
        "Save your video file"
      ],
      tips: [
        "Only download content you have permission to use",
        "Higher quality = larger file size",
        "Some videos may have download restrictions"
      ]
    }
  ];

  return (
    <div className={`help-bg theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❓</div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Help Center
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Detailed guides and tutorials for all our conversion tools. Learn how to use each feature effectively.
          </p>
        </div>

        {/* Search Section */}
        <div style={{ 
          background: 'var(--color-card)', 
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '4rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Quick Search
          </h2>
          <p style={{ 
            color: 'var(--color-text-muted)',
            marginBottom: '1.5rem'
          }}>
            Can't find what you're looking for? Contact our support team.
          </p>
          <Link to="/contact" className="neon-btn" style={{ 
            display: 'inline-block',
            padding: '0.8rem 1.5rem'
          }}>
            Contact Support
          </Link>
        </div>

        {/* Guides Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Conversion Guides
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem'
          }}>
            {guides.map((guide, index) => (
              <div key={index} style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '2rem',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 25px rgba(127, 92, 255, 0.1)';
              }} onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '2rem' }}>{guide.icon}</div>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 600, 
                    color: 'var(--color-text)',
                    margin: 0
                  }}>
                    {guide.title}
                  </h3>
                </div>
                
                <p style={{ 
                  color: 'var(--color-text-muted)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  {guide.description}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: 'var(--color-text)',
                    marginBottom: '0.5rem'
                  }}>
                    Steps:
                  </h4>
                  <ol style={{ 
                    color: 'var(--color-text-muted)',
                    paddingLeft: '1.5rem',
                    lineHeight: 1.6
                  }}>
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} style={{ marginBottom: '0.5rem' }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: 'var(--color-text)',
                    marginBottom: '0.5rem'
                  }}>
                    Tips:
                  </h4>
                  <ul style={{ 
                    color: 'var(--color-text-muted)',
                    paddingLeft: '1.5rem',
                    lineHeight: 1.6
                  }}>
                    {guide.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} style={{ marginBottom: '0.5rem' }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting */}
        <div style={{ 
          background: 'var(--color-card)', 
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '4rem'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Troubleshooting
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                File Upload Issues
              </h3>
              <ul style={{ 
                color: 'var(--color-text-muted)',
                paddingLeft: '1.5rem',
                lineHeight: 1.6
              }}>
                <li>Check file size (max 100MB)</li>
                <li>Ensure file format is supported</li>
                <li>Try refreshing the page</li>
                <li>Clear browser cache</li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                Conversion Problems
              </h3>
              <ul style={{ 
                color: 'var(--color-text-muted)',
                paddingLeft: '1.5rem',
                lineHeight: 1.6
              }}>
                <li>Wait for processing to complete</li>
                <li>Check your internet connection</li>
                <li>Try a smaller file size</li>
                <li>Contact support if issues persist</li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                Download Issues
              </h3>
              <ul style={{ 
                color: 'var(--color-text-muted)',
                paddingLeft: '1.5rem',
                lineHeight: 1.6
              }}>
                <li>Check your download folder</li>
                <li>Disable browser popup blockers</li>
                <li>Try a different browser</li>
                <li>Ensure sufficient storage space</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Still Need Help?
          </h2>
          <p style={{ 
            color: 'var(--color-text-muted)',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Our support team is here to help you with any questions or issues.
          </p>
          <Link to="/contact" className="neon-btn" style={{ 
            display: 'inline-block',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            marginRight: '1rem'
          }}>
            Contact Support
          </Link>
          <Link to="/support" className="neon-btn" style={{ 
            display: 'inline-block',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            color: 'var(--color-text)'
          }}>
            Support Center
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Help; 