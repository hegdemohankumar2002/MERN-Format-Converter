import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminLogin = ({ theme }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${backendBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Check if user is admin
        if (data.user.isAdmin) {
          navigate('/admin/contacts');
        } else {
          setError('Access denied. Admin privileges required.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`admin-login theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <Header />
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'calc(100vh - 200px)',
        padding: '2rem'
      }}>
        <div style={{
          background: 'var(--color-card)',
          border: '2px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '3rem',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: 'var(--color-text)',
            marginBottom: '1rem'
          }}>
            Admin Login
          </h1>
          <p style={{ 
            color: 'var(--color-text-muted)',
            marginBottom: '2rem'
          }}>
            Access the admin dashboard to manage contact submissions
          </p>

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

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: 'var(--color-text)',
                fontWeight: 500,
                textAlign: 'left'
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: 'var(--color-text)',
                fontWeight: 500,
                textAlign: 'left'
              }}>
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
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

            <button
              type="submit"
              disabled={isLoading}
              className="neon-btn"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login as Admin'}
            </button>
          </form>

          <div style={{ 
            marginTop: '2rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)'
          }}>
            <p>Need admin access? Contact the system administrator.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin; 