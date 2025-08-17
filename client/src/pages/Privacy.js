import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = ({ theme }) => {
  const lastUpdated = "December 2024";

  return (
    <div className={`privacy-bg theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <Header />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Privacy Policy
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Your privacy is important to us. Learn how we protect your data and maintain your trust.
          </p>
          <p style={{ 
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            marginTop: '1rem'
          }}>
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Table of Contents */}
        <div style={{ 
          background: 'var(--color-card)', 
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Table of Contents
          </h2>
          <ul style={{ 
            color: 'var(--color-text-muted)',
            lineHeight: 1.8,
            paddingLeft: '1.5rem'
          }}>
            <li><a href="#information" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Information We Collect</a></li>
            <li><a href="#usage" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>How We Use Your Information</a></li>
            <li><a href="#sharing" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Information Sharing</a></li>
            <li><a href="#security" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Data Security</a></li>
            <li><a href="#retention" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Data Retention</a></li>
            <li><a href="#cookies" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Cookies and Tracking</a></li>
            <li><a href="#rights" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Your Rights</a></li>
            <li><a href="#children" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Children's Privacy</a></li>
            <li><a href="#changes" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Changes to This Policy</a></li>
            <li><a href="#contact" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </div>

        {/* Policy Content */}
        <div style={{ lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
          
          <section id="information" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We collect information you provide directly to us when using our conversion services:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li><strong>Files you upload:</strong> We temporarily process your files for conversion purposes only</li>
              <li><strong>Usage data:</strong> Information about how you use our services</li>
              <li><strong>Device information:</strong> Browser type, IP address, and device identifiers</li>
              <li><strong>Contact information:</strong> If you contact us for support (name, email, message)</li>
            </ul>
            <p>
              <strong>Important:</strong> We do not store your uploaded files permanently. All files are automatically deleted after conversion or within 24 hours, whichever comes first.
            </p>
          </section>

          <section id="usage" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              2. How We Use Your Information
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We use the information we collect to:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>Provide and maintain our conversion services</li>
              <li>Process your file conversions</li>
              <li>Improve our services and user experience</li>
              <li>Respond to your support requests</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section id="sharing" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              3. Information Sharing
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li><strong>Service providers:</strong> We may share data with trusted third-party services that help us operate our platform</li>
              <li><strong>Legal requirements:</strong> We may disclose information if required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In the event of a merger or acquisition, user information may be transferred</li>
            </ul>
            <p>
              <strong>File content:</strong> Your uploaded files are never shared with third parties and are only used for the conversion process you requested.
            </p>
          </section>

          <section id="security" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              4. Data Security
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We implement appropriate security measures to protect your information:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>SSL encryption for all data transmission</li>
              <li>Secure servers with regular security updates</li>
              <li>Automatic file deletion after processing</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits and monitoring</li>
            </ul>
            <p>
              While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section id="retention" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              5. Data Retention
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Our data retention practices:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li><strong>Uploaded files:</strong> Automatically deleted within 24 hours or immediately after conversion</li>
              <li><strong>Conversion logs:</strong> Retained for 30 days for service improvement</li>
              <li><strong>Support communications:</strong> Retained for 2 years for customer service</li>
              <li><strong>Analytics data:</strong> Retained for 1 year for service optimization</li>
            </ul>
          </section>

          <section id="cookies" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              6. Cookies and Tracking
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We use cookies and similar technologies to:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>Remember your preferences and settings</li>
              <li>Analyze how our services are used</li>
              <li>Improve our website performance</li>
              <li>Provide personalized content</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences. Disabling cookies may affect some features of our service.
            </p>
          </section>

          <section id="rights" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              7. Your Rights
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Depending on your location, you may have the following rights:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li><strong>Access:</strong> Request information about the data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Objection:</strong> Object to certain types of processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section id="children" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              8. Children's Privacy
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section id="changes" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              9. Changes to This Policy
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending you an email notification for significant changes</li>
            </ul>
            <p>
              We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section id="contact" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              10. Contact Us
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div style={{ 
              background: 'var(--color-card)', 
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Email:</strong> privacy@convertx.com
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Address:</strong> 123 Privacy Street, Data City, DC 12345
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>
        </div>

        {/* Quick Links */}
        <div style={{ 
          background: 'var(--color-card)', 
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          marginTop: '3rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Related Information
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <Link to="/terms" className="neon-btn" style={{ 
              display: 'inline-block',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem'
            }}>
              Terms of Service
            </Link>
            <Link to="/contact" className="neon-btn" style={{ 
              display: 'inline-block',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              background: 'var(--color-card)',
              border: '2px solid var(--color-primary)',
              color: 'var(--color-text)'
            }}>
              Contact Us
            </Link>
            <Link to="/support" className="neon-btn" style={{ 
              display: 'inline-block',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              background: 'var(--color-card)',
              border: '2px solid var(--color-primary)',
              color: 'var(--color-text)'
            }}>
              Support Center
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy; 