import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactStatus = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkStatus = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setContactData(null);

    try {
      const response = await fetch(`http://localhost:5000/api/contact/check-status?email=${encodeURIComponent(email)}`);
      const data = await response.json();

             if (data.success) {
         setContactData(data.data);
       } else {
         setError(data.message || 'No contact submission found');
       }
    } catch (error) {
      console.error('Error checking status:', error);
      setError('Failed to check status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#3b82f6';
      case 'read': return '#f59e0b';
      case 'replied': return '#10b981';
      case 'resolved': return '#059669';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'New';
      case 'read': return 'Read';
      case 'replied': return 'Replied';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  return (
    <div className={`contact-status theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <Header />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📧</div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Check Contact Status
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Enter your email address to check the status of your contact submission and view any admin replies.
          </p>
        </div>

        {/* Status Check Form */}
        <div style={{
          background: 'var(--color-card)',
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1.5rem'
          }}>
            Check Your Submission
          </h2>

          <form onSubmit={checkStatus}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: 'var(--color-text)',
                fontWeight: 500
              }}>
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email you used to submit your message"
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: '1rem'
                }}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#ef4444'
              }}>
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="neon-btn"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>
        </div>

        {/* Contact Status Display */}
        {contactData && (
          <div style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1.5rem'
            }}>
              Your Contact Submission
            </h2>

            {/* Status Badge */}
            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                background: getStatusColor(contactData.status),
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 600
              }}>
                {getStatusText(contactData.status)}
              </span>
            </div>

            {/* Submission Details */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 600, 
                color: 'var(--color-text)',
                marginBottom: '1rem'
              }}>
                Your Message
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Subject:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{contactData.subject}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Message:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem', lineHeight: 1.6 }}>{contactData.message}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Submitted:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{formatDate(contactData.submittedAt)}</p>
              </div>
            </div>

                                      {/* Admin Reply */}
             {contactData.adminReply && (
                 <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: '8px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 600, 
                  color: '#10b981',
                  marginBottom: '1rem'
                }}>
                  ✅ Admin Reply
                </h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--color-text)' }}>Reply:</strong>
                  <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem', lineHeight: 1.6 }}>{contactData.adminReply.message}</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--color-text)' }}>Replied by:</strong>
                  <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{contactData.adminReply.repliedBy}</p>
                </div>

                <div>
                  <strong style={{ color: 'var(--color-text)' }}>Replied on:</strong>
                  <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{formatDate(contactData.adminReply.repliedAt)}</p>
                </div>
              </div>
             )}

            {!contactData.adminReply && contactData.status === 'replied' && (
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid #3b82f6',
                borderRadius: '8px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 600, 
                  color: '#3b82f6',
                  marginBottom: '1rem'
                }}>
                  📧 Reply Sent
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  We have replied to your message via email. Please check your inbox (and spam folder) for our response.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Back to Contact */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/contact" style={{
            color: 'var(--color-accent)',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            ← Back to Contact Us
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactStatus; 