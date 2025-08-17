import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ toolName }) => {
  const location = useLocation();
  
  const getBreadcrumbItems = () => {
    const items = [
      { name: 'Home', path: '/', active: location.pathname === '/' }
    ];
    
    if (location.pathname === '/dashboard' && toolName) {
      items.push({ name: toolName, path: location.pathname + location.search, active: true });
    } else if (location.pathname === '/dashboard') {
      items.push({ name: 'Dashboard', path: '/dashboard', active: true });
    } else if (location.pathname === '/login') {
      items.push({ name: 'Login', path: '/login', active: true });
    } else if (location.pathname === '/register') {
      items.push({ name: 'Register', path: '/register', active: true });
    }
    
    return items;
  };

  const items = getBreadcrumbItems();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 24,
      fontSize: 14,
      color: 'var(--color-text-muted)'
    }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span style={{ color: 'var(--color-border)' }}>/</span>
          )}
          {item.active ? (
            <span style={{ 
              color: 'var(--color-accent)', 
              fontWeight: 600 
            }}>
              {item.name}
            </span>
          ) : (
            <Link 
              to={item.path}
              style={{
                color: 'var(--color-text)',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text)'}
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb; 