import React from "react";

const NotFound = ({ theme }) => (
  <div className={`notfound theme-${theme}`} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 64, color: 'var(--color-accent)' }}>404</h1>
      <p style={{ color: 'var(--color-text)' }}>Page Not Found</p>
    </div>
  </div>
);

export default NotFound;
