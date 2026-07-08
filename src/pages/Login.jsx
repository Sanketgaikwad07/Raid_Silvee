import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiShield, FiTrendingUp, FiMail, FiLock, FiEye, FiEyeOff,
  FiArrowRight, FiAlertCircle, FiCheck
} from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    const result = await login(email.trim(), password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      {/* Floating decorative shapes */}
      <div className="login-decor login-decor--1"></div>
      <div className="login-decor login-decor--2"></div>
      <div className="login-decor login-decor--3"></div>
      <div className="login-decor login-decor--4"></div>

      {/* Sparkle particles */}
      <div className="login-sparkle login-sparkle--1"></div>
      <div className="login-sparkle login-sparkle--2"></div>
      <div className="login-sparkle login-sparkle--3"></div>
      <div className="login-sparkle login-sparkle--4"></div>
      <div className="login-sparkle login-sparkle--5"></div>
      <div className="login-sparkle login-sparkle--6"></div>

      <div className="login-card">
        {/* Gold corner ornaments */}
        <div className="login-card__corner login-card__corner--tl"></div>
        <div className="login-card__corner login-card__corner--tr"></div>
        <div className="login-card__corner login-card__corner--bl"></div>
        <div className="login-card__corner login-card__corner--br"></div>

        {/* Logo with animated rings */}
        <div className="login-card__logo-wrap">
          <div className="login-card__logo-ring"></div>
          <div className="login-card__logo-ring login-card__logo-ring--outer"></div>
          <div className="login-card__logo">S</div>
        </div>

        {/* Brand Header */}
        <div className="login-card__header">
          <h1 className="login-card__brand">Silvee925</h1>
          <p className="login-card__tagline">ERP System</p>
          <hr className="login-card__divider" />
          <h2 className="login-card__title">Sign In</h2>
          <p className="login-card__subtitle">Enter your ERP account credentials</p>
        </div>

        {/* Role indicator (informational; actual role comes from the server) */}
        <div className="login-role-selector">
          <div
            className={`login-role-card ${selectedRole === 'admin' ? 'active' : ''}`}
            onClick={() => setSelectedRole('admin')}
          >
            <div className="login-role-card__check"><FiCheck size={10} /></div>
            <div className="login-role-card__icon">
              <FiShield size={18} />
            </div>
            <div className="login-role-card__label">Admin</div>
            <div className="login-role-card__desc">Full system access</div>
          </div>
          <div
            className={`login-role-card ${selectedRole === 'salesman' ? 'active' : ''}`}
            onClick={() => setSelectedRole('salesman')}
          >
            <div className="login-role-card__check"><FiCheck size={10} /></div>
            <div className="login-role-card__icon">
              <FiTrendingUp size={18} />
            </div>
            <div className="login-role-card__label">Salesman</div>
            <div className="login-role-card__desc">Sales & Reports only</div>
          </div>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-field__label">Email</label>
            <div className="login-field__input-wrap">
              <FiMail size={15} className="login-field__icon" />
              <input
                id="login-email"
                type="email"
                className="login-field__input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-field__label">Password</label>
            <div className="login-field__input-wrap">
              <FiLock size={15} className="login-field__icon" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-field__input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-field__toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error">
              <FiAlertCircle size={15} className="login-error__icon" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className={`login-btn ${isLoading ? 'login-btn--loading' : ''}`}
            disabled={isLoading}
          >
            <span className="login-btn__content">
              Sign In <FiArrowRight size={15} />
            </span>
            {isLoading && <span className="login-btn__spinner"></span>}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer__text">© 2025 Silvee925 Jewels Pvt. Ltd.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
