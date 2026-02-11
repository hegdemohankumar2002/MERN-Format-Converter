import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminDashboard = ({ theme }) => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all');
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const navigate = useNavigate();
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

  useEffect(() => {
    fetchContacts();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const statusParam = filter !== 'all' ? `&status=${filter}` : '';
      const response = await fetch(`${backendBaseUrl}/api/contact/admin?page=${currentPage}&limit=10${statusParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
        return;
      }

      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendBaseUrl}/api/contact/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateStatus = async (contactId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendBaseUrl}/api/contact/admin/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        fetchContacts();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendBaseUrl}/api/contact/admin/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchContacts();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const sendReply = async (contactId) => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message');
      return;
    }

    setIsReplying(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendBaseUrl}/api/contact/admin/${contactId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ replyMessage })
      });

      const data = await response.json();
      if (data.success) {
        setReplyMessage('');
        setSelectedContact(null);
        fetchContacts();
        fetchStats();
        alert('Reply sent successfully!');
      } else {
        alert('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    } finally {
      setIsReplying(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#3b82f6';
      case 'read': return '#f59e0b';
      case 'replied': return '#10b981';
      case 'resolved': return '#6b7280';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className={`admin-dashboard theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
        <Header />
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '2rem' }}>⏳</div>
          <p>Loading contact submissions...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`admin-dashboard theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Contact Submissions Dashboard
        </h1>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Total</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
              {stats.total || 0}
            </div>
          </div>

          <div style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Today</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
              {stats.today || 0}
            </div>
          </div>

          <div style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🆕</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>New</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
              {stats.byStatus?.new || 0}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: '2rem' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '1rem'
            }}
          >
            <option value="all">All Submissions</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Contact List */}
        <div style={{ marginBottom: '2rem' }}>
          {contacts.map((contact) => (
            <div key={contact._id} style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} onClick={() => setSelectedContact(contact)} onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.transform = 'translateY(-2px)';
            }} onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--color-border)';
              e.target.style.transform = 'translateY(0)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>{contact.name}</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{contact.email}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'white',
                    backgroundColor: getStatusColor(contact.status)
                  }}>
                    {contact.status}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteContact(contact._id);
                    }}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #ef4444',
                      background: 'transparent',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>{contact.subject}</h4>
              <p style={{
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {contact.message}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: currentPage === 1 ? 'var(--color-bg-alt)' : 'var(--color-card)',
                color: 'var(--color-text)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <span style={{ padding: '0.5rem 1rem', color: 'var(--color-text)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: currentPage === totalPages ? 'var(--color-bg-alt)' : 'var(--color-card)',
                color: 'var(--color-text)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* Contact Detail Modal */}
        {selectedContact && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setSelectedContact(null)}>
            <div style={{
              background: 'var(--color-card)',
              border: '2px solid var(--color-primary)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto',
              width: '90%'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: 'var(--color-text)' }}>Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: 'var(--color-text)',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Name:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{selectedContact.name}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Email:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{selectedContact.email}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Subject:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{selectedContact.subject}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Message:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem', lineHeight: 1.6 }}>
                  {selectedContact.message}
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Status:</strong>
                <div style={{ marginTop: '0.5rem' }}>
                  {['new', 'read', 'replied', 'resolved'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedContact._id, status)}
                      style={{
                        padding: '0.5rem 1rem',
                        marginRight: '0.5rem',
                        borderRadius: '20px',
                        border: '1px solid var(--color-border)',
                        background: selectedContact.status === status ? getStatusColor(status) : 'var(--color-card)',
                        color: selectedContact.status === status ? 'white' : 'var(--color-text)',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>Submitted:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>

              {selectedContact.ipAddress && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--color-text)' }}>IP Address:</strong>
                  <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{selectedContact.ipAddress}</p>
                </div>
              )}

              {/* Reply Section */}
              <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>Send Reply</h3>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply message here..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    marginBottom: '1rem'
                  }}
                />
                <button
                  onClick={() => sendReply(selectedContact._id)}
                  disabled={isReplying || !replyMessage.trim()}
                  style={{
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--color-primary)',
                    color: 'var(--color-btn-text)',
                    cursor: isReplying || !replyMessage.trim() ? 'not-allowed' : 'pointer',
                    opacity: isReplying || !replyMessage.trim() ? 0.7 : 1,
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  {isReplying ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard; 