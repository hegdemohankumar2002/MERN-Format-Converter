import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Support = ({ theme }) => {
  const faqs = [
    {
      question: "How do I convert HEIC files to JPG?",
      answer: "Upload your HEIC file, select the JPG format, and click convert. The process is automatic and secure."
    },
    {
      question: "What file formats are supported?",
      answer: "We support HEIC, RAW, PNG, JPG, SVG for images, HEVC, MP4 for videos, and MP3 for audio extraction."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! All files are processed securely and automatically deleted after conversion. We don't store your personal data."
    },
    {
      question: "How long does conversion take?",
      answer: "Most conversions complete within 30 seconds. Larger files may take up to 2 minutes."
    },
    {
      question: "Can I convert multiple files at once?",
      answer: "Currently, we support single file conversions. Batch processing is coming soon!"
    },
    {
      question: "What's the maximum file size?",
      answer: "We support files up to 100MB. For larger files, please contact our support team."
    }
  ];

  return (
    <div className={`support-bg theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛠️</div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Support Center
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Get help with our conversion tools, find answers to common questions, and learn how to make the most of our platform.
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          <Link to="/contact" style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '2rem',
            textDecoration: 'none',
            color: 'var(--color-text)',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 25px rgba(127, 92, 255, 0.2)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Contact Us</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Get in touch with our support team
            </p>
          </Link>

          <Link to="/help" style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '2rem',
            textDecoration: 'none',
            color: 'var(--color-text)',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 25px rgba(127, 92, 255, 0.2)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❓</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Help Center</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Detailed guides and tutorials
            </p>
          </Link>

          <Link to="/privacy" style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '2rem',
            textDecoration: 'none',
            color: 'var(--color-text)',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 25px rgba(127, 92, 255, 0.2)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Privacy Policy</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Learn about data protection
            </p>
          </Link>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1rem',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.transform = 'translateY(-2px)';
              }} onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.transform = 'translateY(0)';
              }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  color: 'var(--color-text)',
                  marginBottom: '0.5rem'
                }}>
                  {faq.question}
                </h3>
                <p style={{ 
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div style={{ 
          background: 'var(--color-card)', 
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Getting Started
          </h2>
          <p style={{ 
            color: 'var(--color-text-muted)',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            New to ConvertX? Here's how to get started with your first conversion:
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1️⃣</div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Choose Tool</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Select the conversion tool you need
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>2️⃣</div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Upload File</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Drag and drop or click to upload
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>3️⃣</div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Download</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Get your converted file instantly
              </p>
            </div>
          </div>
          
          <Link to="/" className="neon-btn" style={{ 
            display: 'inline-block',
            padding: '1rem 2rem',
            fontSize: '1.1rem'
          }}>
            Start Converting Now
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Support; 