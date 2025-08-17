import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Navbar = () => {
  const { token, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <span className="header-logo">🔥 ConvertX</span>
      <nav className="header-nav">
        {token ? (
          <button onClick={logout} className="neon-btn">Logout</button>
        ) : (
          <>
            {location.pathname !== "/register" && (
              <Link to="/register" className="header-link">Register</Link>
            )}
            {location.pathname !== "/login" && (
              <Link to="/login" className="header-link">Login</Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
