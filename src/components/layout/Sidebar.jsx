import React, { useState, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiGrid, FiLayers, FiShoppingCart, FiBox, FiDollarSign,
  FiUsers, FiBookOpen, FiBarChart2, FiFileText, FiTool,
  FiSettings, FiChevronDown, FiChevronRight, FiMail, FiPhone, FiLock
} from 'react-icons/fi';
import { sidebarNavItems } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const iconMap = {
  dashboard: FiGrid,
  masters: FiLayers,
  purchase: FiShoppingCart,
  inventory: FiBox,
  sales: FiDollarSign,
  salesman: FiUsers,
  accounts: FiBookOpen,
  reports: FiBarChart2,
  gst: FiFileText,
  tools: FiTool,
  settings: FiSettings,
};

// Map sidebar item IDs to module names for access control
const moduleMap = {
  dashboard: null, // always accessible
  masters: 'masters',
  purchase: 'purchase',
  inventory: 'inventory',
  sales: 'sales',
  salesman: 'salesman',
  accounts: 'accounts',
  reports: 'reports',
  gst: 'gst',
  tools: 'tools',
  settings: 'settings',
};

const Sidebar = () => {
  const location = useLocation();
  const { user, hasAccess } = useAuth();
  const [expandedItems, setExpandedItems] = useState(['masters', 'settings']);

  // Filter nav items based on user role
  const filteredNavItems = useMemo(() => {
    return sidebarNavItems.filter((item) => {
      const module = moduleMap[item.id];
      if (module === null || module === undefined) return true; // dashboard is always visible
      return hasAccess(module);
    });
  }, [user, hasAccess]);

  const toggleExpand = (id) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">S</div>
        <div className="sidebar__logo-text">
          <span className="sidebar__logo-name">Silvee925</span>
          <span className="sidebar__logo-sub">ERP SYSTEM</span>
        </div>
      </div>

      {/* Role Badge */}
      {user && (() => {
        const isAdmin = user.role === 'ADMIN';
        const displayName = user.fullName || 'User';
        return (
          <div className="sidebar__role-badge" style={{
            margin: '0 1rem 0.75rem',
            padding: '0.5rem 0.75rem',
            background: isAdmin
              ? 'linear-gradient(135deg, rgba(15, 98, 254, 0.12), rgba(139, 92, 246, 0.08))'
              : 'linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(6, 182, 212, 0.08))',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: `1px solid ${isAdmin ? 'rgba(15, 98, 254, 0.15)' : 'rgba(34, 197, 94, 0.15)'}`,
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: isAdmin
                ? 'linear-gradient(135deg, #0f62fe, #8b5cf6)'
                : 'linear-gradient(135deg, #22c55e, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
            }}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0' }}>
                {displayName}
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: isAdmin ? '#60a5fa' : '#4ade80',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {isAdmin ? '👑 Admin' : '📊 Salesman'}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Navigation */}
      <nav className="sidebar__nav">
        {filteredNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.id);
          const active = item.path === '/' ? location.pathname === '/' : isActive(item.path);

          return (
            <div key={item.id} className="sidebar__nav-group">
              {hasChildren ? (
                <button
                  className={`sidebar__nav-item ${active ? 'active' : ''}`}
                  onClick={() => toggleExpand(item.id)}
                >
                  <Icon size={18} className="sidebar__nav-icon" />
                  <span className="sidebar__nav-label">{item.label}</span>
                  {isExpanded ? <FiChevronDown size={14} className="sidebar__nav-chevron" /> : <FiChevronRight size={14} className="sidebar__nav-chevron" />}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive: navActive }) => `sidebar__nav-item ${navActive ? 'active' : ''}`}
                  end={item.path === '/'}
                >
                  <Icon size={18} className="sidebar__nav-icon" />
                  <span className="sidebar__nav-label">{item.label}</span>
                </NavLink>
              )}

              {hasChildren && isExpanded && (
                <div className="sidebar__submenu">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.path}
                      className={({ isActive: navActive }) => `sidebar__submenu-item ${navActive ? 'active' : ''}`}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__footer-card">
          <div className="sidebar__footer-company">
            <strong>Silvee925 Jewels Pvt. Ltd.</strong>
            <span>3A 3B, 2nd Floor, SB Road, Pune - 411016</span>
          </div>
          <div className="sidebar__footer-contact">
            <span><FiMail size={12} /> support@silvee925.com</span>
            <span><FiPhone size={12} /> +91 88888 92525</span>
          </div>
        </div>
        <span className="sidebar__footer-version">Version : 2.0.0</span>
      </div>
    </aside>
  );
};

export default Sidebar;
