import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || window.location.origin;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${backendBaseUrl}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      description: "Get help via email",
      contact: "your-support-email@example.com",
      action: "mailto:your-support-email@example.com"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available 24/7",
      action: "#chat"
    },
    {
      icon: "📞",
      title: "Phone Support",
      description: "Call us directly",
      contact: "+91 9483197470",
      action: "tel:+919483197470"
    },
    {
      icon: "📸",
      title: "Instagram",
      description: "Follow us for updates",
      contact: "@mohan__25_",
      action: "https://www.instagram.com/mohan__25_/"
    }
  ];

  return (
    <div className={`contact-bg theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📧</div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Contact Us
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Have questions, feedback, or need help? We're here to assist you. Get in touch with our support team.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              style={{
                background: 'var(--color-card)',
                border: '2px solid var(--color-primary)',
                borderRadius: '12px',
                padding: '2rem',
                textDecoration: 'none',
                color: 'var(--color-text)',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 25px rgba(127, 92, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
                             <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{method.icon}</div>
               <h3 style={{ 
                 marginBottom: '0.5rem',
                 fontFamily: method.title === 'Instagram' ? '"Instagram Sans", "Helvetica Neue", Arial, sans-serif' : 'inherit'
               }}>{method.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {method.description}
              </p>
              <div style={{ 
                color: 'var(--color-accent)', 
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                {method.contact}
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Form */}
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
              Send us a Message
            </h2>
            
            {submitStatus === 'success' && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid #22c55e',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#22c55e'
              }}>
                ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#ef4444'
              }}>
                ❌ Failed to send message. Please try again later or contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text)',
                  fontWeight: 500
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text)',
                  fontWeight: 500
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text)',
                  fontWeight: 500
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: 'var(--color-text)',
                  fontWeight: 500
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="neon-btn"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 600, 
              color: 'var(--color-text)',
              marginBottom: '1.5rem'
            }}>
              Get in Touch
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: 'var(--color-text)',
                marginBottom: '1rem'
              }}>
                Why Contact Us?
              </h3>
              <ul style={{ 
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                paddingLeft: '1.5rem'
              }}>
                <li>Technical support with conversions</li>
                <li>Feature requests and feedback</li>
                <li>Bug reports and issues</li>
                <li>Partnership opportunities</li>
                <li>General inquiries</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: 'var(--color-text)',
                marginBottom: '1rem'
              }}>
                Response Time
              </h3>
              <p style={{ 
                color: 'var(--color-text-muted)',
                lineHeight: 1.6
              }}>
                We typically respond within 24 hours during business days. For urgent issues, please use our live chat or phone support.
              </p>
            </div>

            <div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: 'var(--color-text)',
                marginBottom: '1rem'
              }}>
                Business Hours
              </h3>
              <p style={{ 
                color: 'var(--color-text-muted)',
                lineHeight: 1.6
              }}>
                Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                Saturday: 10:00 AM - 4:00 PM EST<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div style={{ 
          background: 'var(--color-card)', 
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 600, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Quick Help
          </h2>
          <p style={{ 
            color: 'var(--color-text-muted)',
            marginBottom: '1.5rem'
          }}>
            Check our help resources before contacting support
          </p>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <Link to="/help" className="neon-btn" style={{ 
              display: 'inline-block',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem'
            }}>
              Help Center
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
                         <Link to="/contact-status" className="neon-btn" style={{ 
               display: 'inline-block',
               padding: '0.8rem 1.5rem',
               fontSize: '1rem'
             }}>
               Check Status
             </Link>
             <Link to="/privacy" className="neon-btn" style={{ 
               display: 'inline-block',
               padding: '0.8rem 1.5rem',
               fontSize: '1rem',
               background: 'var(--color-card)',
               border: '2px solid var(--color-primary)',
               color: 'var(--color-text)'
             }}>
               Privacy Policy
             </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact; 