import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search tools...", tools = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div style={{
      position: 'relative',
      marginBottom: '1.5rem',
      maxWidth: '400px',
      margin: '0 auto 1.5rem auto'
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute',
          left: '12px',
          color: 'var(--color-text-muted)',
          fontSize: '16px',
          zIndex: 1
        }}>
          🔍
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 40px 12px 40px',
            borderRadius: '25px',
            border: `2px solid ${isFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
            background: 'var(--color-card)',
            color: 'var(--color-text)',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          aria-label="Search tools"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '4px',
              borderRadius: '50%',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-error)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      {/* Search suggestions */}
      {searchTerm && tools.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          marginTop: '4px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 10,
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          {tools
            .filter(tool => 
              tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              tool.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5)
            .map((tool, index) => (
              <div
                key={index}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  borderBottom: index < 4 ? '1px solid var(--color-border)' : 'none'
                }}
                onMouseEnter={(e) => e.target.style.background = 'var(--color-bg-alt)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                onClick={() => {
                  handleSearch(tool.name);
                  // You can add navigation logic here
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                  {tool.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {tool.description}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 