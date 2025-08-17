import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IconSun, IconMoon } from '@tabler/icons-react';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ContactStatus from "./pages/ContactStatus";
import FloatingActionButton from "./components/FloatingActionButton";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [theme, setTheme] = useState('dark');
  const location = useLocation();
  const navigate = useNavigate();

  // Add theme class to body
  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  // Show login/register switch only on those pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Global theme toggle */}
      <button
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 20000,
          background: 'var(--color-card)',
          border: '2px solid var(--color-primary)',
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.3s ease',
          color: 'var(--color-text)',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(127, 92, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }}
      >
        {theme === 'dark' ? 
          <IconSun size={24} color="var(--color-accent)" /> : 
          <IconMoon size={24} color="var(--color-primary)" />
        }
      </button>

      {/* Login/Register switch */}
      {isAuthPage && (
        <button
          onClick={() => navigate(location.pathname === '/login' ? '/register' : '/login')}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 100,
            zIndex: 20000,
            background: 'var(--color-card)',
            border: '2px solid var(--color-primary)',
            borderRadius: '2rem',
            padding: '0.7rem 1.6rem',
            color: 'var(--color-text)',
            fontWeight: 600,
            fontSize: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.3s ease',
            minWidth: '120px',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 25px rgba(127, 92, 255, 0.3)';
            e.target.style.background = 'var(--color-primary)';
            e.target.style.color = 'var(--color-btn-text)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            e.target.style.background = 'var(--color-card)';
            e.target.style.color = 'var(--color-text)';
          }}
        >
          {location.pathname === '/login' ? 'Register' : 'Login'}
        </button>
      )}

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Floating Action Button - only show on main pages */}
      {!isAuthPage && (
        <FloatingActionButton theme={theme} />
      )}

      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/dashboard" element={<Dashboard theme={theme} />} />
        <Route path="/login" element={<Login theme={theme} />} />
        <Route path="/register" element={<Register theme={theme} />} />
        <Route path="/support" element={<Support theme={theme} />} />
        <Route path="/help" element={<Help theme={theme} />} />
        <Route path="/contact" element={<Contact theme={theme} />} />
        <Route path="/privacy" element={<Privacy theme={theme} />} />
        <Route path="/terms" element={<Terms theme={theme} />} />
        <Route path="/admin/login" element={<AdminLogin theme={theme} />} />
        <Route path="/admin/contacts" element={<AdminDashboard theme={theme} />} />
        <Route path="/contact-status" element={<ContactStatus theme={theme} />} />
        <Route path="*" element={<NotFound theme={theme} />} />
      </Routes>
      
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        theme={theme}
        toastStyle={{
          background: 'var(--color-card)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
      />
    </>
  );
};

export default App;
