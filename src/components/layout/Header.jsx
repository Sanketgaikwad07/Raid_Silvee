import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiCalendar, FiBell, FiHelpCircle, FiSettings, FiChevronDown, FiClock, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const pageTitles = {
  '/': 'Dashboard',
  '/masters': 'Masters',
  '/purchase': 'Purchase',
  '/inventory': 'Inventory',
  '/sales': 'Sales',
  '/salesman': 'Salesman',
  '/accounts': 'Accounts',
  '/reports': 'Reports',
  '/gst': 'GST',
  '/tools': 'Tools',
  '/settings': 'Settings',
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const dateLabel = useMemo(() => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(now);
  }, [now]);

  const timeLabel = useMemo(() => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(now);
  }, [now]);

  const getTitle = () => {
    for (const [path, title] of Object.entries(pageTitles)) {
      if (location.pathname === path || location.pathname.startsWith(path + '/')) {
        return title;
      }
    }
    return 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleLabel = user?.role === 'admin' ? 'Admin' : 'Salesman';
  const roleBadgeStyle = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '0.65rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    background: user?.role === 'admin'
      ? 'linear-gradient(135deg, rgba(15, 98, 254, 0.12), rgba(139, 92, 246, 0.12))'
      : 'linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(6, 182, 212, 0.12))',
    color: user?.role === 'admin' ? '#3b82f6' : '#22c55e',
  };

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn">
          <FiMenu size={20} />
        </button>
        <h1 className="header__title">{getTitle()}</h1>
      </div>

      <div className="header__center">
        <div className="header__search">
          <FiSearch size={16} className="header__search-icon" />
          <input
            type="text"
            placeholder="Search anything..."
            className="header__search-input"
          />
          <span className="header__search-shortcut">Ctrl + K</span>
        </div>
      </div>

      <div className="header__right">
        <div className="header__date">
          <FiCalendar size={14} />
          <span>{dateLabel}</span>
        </div>

        <div className="header__clock" title="Live time">
          <FiClock size={14} />
          <span>{timeLabel}</span>
        </div>

        <div className="header__fy">
          <span>FY : 2024-25</span>
          <FiChevronDown size={14} />
        </div>

        <button className="header__icon-btn header__notification-btn">
          <FiBell size={18} />
          <span className="header__notification-badge">4</span>
        </button>

        <button className="header__icon-btn">
          <FiHelpCircle size={18} />
        </button>

        <button className="header__icon-btn">
          <FiSettings size={18} />
        </button>

        <div className="header__admin">
          <div className="header__admin-avatar">{user?.avatar || 'U'}</div>
          <div className="header__admin-info">
            <span style={roleBadgeStyle}>{roleLabel}</span>
            <span className="header__admin-name">{user?.name || 'User'}</span>
          </div>
        </div>

        <button
          className="header__icon-btn"
          onClick={handleLogout}
          title="Logout"
          style={{ color: '#ef4444' }}
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
