// client/src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/Auth.css";
import { IconUserPlus, IconEye, IconEyeOff } from '@tabler/icons-react';

function Register({ theme }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");

  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Weak";
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd)) return "Strong";
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) return "Medium";
    return "Weak";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
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
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${window.location.protocol}//${window.location.hostname}:5000/api/auth/register`, { name: username, email, password });
      toast.success("✅ Registered successfully! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      toast.error("❌ " + (err.response?.data?.message || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-bg theme-${theme}`}>
      <div className="glass-card enhanced-form" data-aos="fade-up" style={{ boxShadow: '0 4px 32px 0 #7f5cff22', border: '1.5px solid var(--color-primary)', background: 'rgba(35,35,77,0.85)', backdropFilter: 'blur(12px)', position: 'relative' }}>
        {/* Modern Tabler icon visual */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <IconUserPlus size={40} stroke={1.5} color="var(--color-accent)" />
        </div>
        <h2 className="auth-title text-neon" style={{ textShadow: 'none' }}>Create Account</h2>
        {error && <div className="input-error" style={{ marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group floating-label-group">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <label className={username ? "filled" : ""}>Username</label>
          </div>
          <div className="form-group floating-label-group">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <label className={email ? "filled" : ""}>Email</label>
          </div>
          <div className="form-group floating-label-group password-group" style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="new-password"
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
            <div className={`password-strength ${passwordStrength.toLowerCase()}`}>{passwordStrength && `Strength: ${passwordStrength}`}</div>
          </div>
          <div className="form-group floating-label-group password-group" style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <label className={confirmPassword ? "filled" : ""}>Confirm Password</label>
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', right: 12, top: 12, padding: 0 }}
            >
              {showConfirmPassword ? <IconEye size={22} color="var(--color-accent)" /> : <IconEyeOff size={22} color="var(--color-accent)" />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="submit-btn animated-btn">
            {loading ? <span className="spinner-btn" /> : <span>Register →</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
