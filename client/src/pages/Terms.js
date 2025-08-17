import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = ({ theme }) => {
  const lastUpdated = "December 2024";

  return (
    <div className={`terms-bg theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <Header />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Terms of Service
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Please read these terms carefully before using our conversion services.
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
            <li><a href="#acceptance" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Acceptance of Terms</a></li>
            <li><a href="#services" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Description of Services</a></li>
            <li><a href="#usage" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Acceptable Use</a></li>
            <li><a href="#prohibited" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Prohibited Activities</a></li>
            <li><a href="#intellectual" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Intellectual Property</a></li>
            <li><a href="#privacy" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Privacy and Data</a></li>
            <li><a href="#disclaimers" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Disclaimers</a></li>
            <li><a href="#limitations" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Limitations of Liability</a></li>
            <li><a href="#termination" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Termination</a></li>
            <li><a href="#changes" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Changes to Terms</a></li>
            <li><a href="#governing" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Governing Law</a></li>
            <li><a href="#contact" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Contact Information</a></li>
          </ul>
        </div>

        {/* Terms Content */}
        <div style={{ lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
          
          <section id="acceptance" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              By accessing and using ConvertX ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p>
              These Terms of Service ("Terms") govern your use of our website and services. By using our services, you agree to these terms in full.
            </p>
          </section>

          <section id="services" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              2. Description of Services
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              ConvertX provides online file conversion services, including but not limited to:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>Image format conversion (HEIC, RAW, PNG, JPG, SVG)</li>
              <li>Video format conversion (HEVC to MP4)</li>
              <li>Audio extraction from video files</li>
              <li>YouTube video downloading</li>
              <li>Related file processing services</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
            </p>
          </section>

          <section id="usage" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              3. Acceptable Use
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>Upload files that violate any applicable laws or regulations</li>
              <li>Upload files that infringe on intellectual property rights</li>
              <li>Upload files containing malware, viruses, or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our services for any commercial purpose without permission</li>
              <li>Interfere with or disrupt the service or servers</li>
            </ul>
          </section>

          <section id="prohibited" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              4. Prohibited Activities
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              The following activities are strictly prohibited:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>Uploading copyrighted material without permission</li>
              <li>Uploading files containing personal information of others</li>
              <li>Using automated tools to access our services</li>
              <li>Attempting to reverse engineer our services</li>
              <li>Sharing access credentials with others</li>
              <li>Using our services for illegal activities</li>
            </ul>
            <p>
              Violation of these prohibitions may result in immediate termination of your access to our services.
            </p>
          </section>

          <section id="intellectual" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              5. Intellectual Property
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              The Service and its original content, features, and functionality are and will remain the exclusive property of ConvertX and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              You retain ownership of any content you upload to our service. However, you grant us a limited license to process your files for the purpose of providing our conversion services.
            </p>
            <p>
              You are responsible for ensuring you have the necessary rights to upload and convert any files you submit to our service.
            </p>
          </section>

          <section id="privacy" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              6. Privacy and Data
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              By using our services, you acknowledge that:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>We temporarily process your files for conversion purposes</li>
              <li>Files are automatically deleted after processing</li>
              <li>We do not store your files permanently</li>
              <li>We may collect usage data to improve our services</li>
            </ul>
          </section>

          <section id="disclaimers" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              7. Disclaimers
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. CONVERTX MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS AND NEGATES ALL OTHER WARRANTIES, INCLUDING WITHOUT LIMITATION:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li>Implied warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the service will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy or reliability of conversions</li>
              <li>Warranties that defects will be corrected</li>
            </ul>
            <p>
              We do not guarantee that our services will be available at all times or that conversions will be 100% accurate.
            </p>
          </section>

          <section id="limitations" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              8. Limitations of Liability
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              IN NO EVENT SHALL CONVERTX BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Our total liability to you for any claims arising from the use of our services shall not exceed the amount you paid us, if any, in the twelve (12) months preceding the claim.
            </p>
            <p>
              You agree to indemnify and hold harmless ConvertX from any claims arising from your use of our services or violation of these Terms.
            </p>
          </section>

          <section id="termination" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              9. Termination
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section id="changes" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              10. Changes to Terms
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p>
              What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section id="governing" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              11. Governing Law
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which ConvertX operates, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          <section id="contact" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1rem'
            }}>
              12. Contact Information
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div style={{ 
              background: 'var(--color-card)', 
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Email:</strong> legal@convertx.com
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Address:</strong> 123 Legal Street, Terms City, TC 12345
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
            <Link to="/privacy" className="neon-btn" style={{ 
              display: 'inline-block',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem'
            }}>
              Privacy Policy
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

export default Terms; 