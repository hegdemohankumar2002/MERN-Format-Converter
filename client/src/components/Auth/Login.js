// client/src/components/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/Auth.css";
import { IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';

function Login({ theme }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Invalid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${backendBaseUrl}/api/auth/login`, {
        email,
        password,
      });
      console.log("Login response:", res.data);
      login(res.data.token, res.data.user);
      toast.success("✅ Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("❌ " + (err.response?.data?.message || "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-bg theme-${theme}`}>
      <div className="glass-card enhanced-form" data-aos="fade-up" style={{ boxShadow: '0 4px 32px 0 #7f5cff22', border: '1.5px solid var(--color-primary)', background: 'rgba(35,35,77,0.85)', backdropFilter: 'blur(12px)', position: 'relative' }}>
        {/* Modern Tabler icon visual */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <IconLock size={40} stroke={1.5} color="var(--color-accent)" />
        </div>
        <h2 className="auth-title text-neon" style={{ textShadow: 'none' }}>Welcome Back!</h2>
        {error && <div className="input-error" style={{ marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group floating-label-group">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <label className={email ? "filled" : ""}>Email</label>
          </div>
          <div className="form-group floating-label-group password-group" style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <label className={password ? "filled" : ""}>Password</label>
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', right: 12, top: 12, padding: 0 }}
            >
              {showPassword ? <IconEye size={22} color="var(--color-accent)" /> : <IconEyeOff size={22} color="var(--color-accent)" />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="submit-btn animated-btn">
            {loading ? <span className="spinner-btn" /> : <span>Login →</span>}
          </button>
          <div className="form-footer">
            <button type="button" className="forgot-link" style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}>Forgot password?</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
