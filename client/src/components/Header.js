import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { token, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={closeMobileMenu}>
          🔥 ConvertX
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {token ? (
            <>
              <div className="user-info">
                <span className="user-greeting">
                  {user?.name ? `Hi, ${user.name}` : "Logged in"}
                </span>
                <button 
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }} 
                  className="neon-btn logout-btn"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {location.pathname !== "/register" && (
                <Link 
                  to="/register" 
                  className="header-link"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              )}
              {location.pathname !== "/login" && (
                <Link 
                  to="/login" 
                  className="header-link"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
