import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiGrid, FiLayers, FiShoppingCart, FiBox, FiDollarSign,
  FiUsers, FiBookOpen, FiBarChart2, FiFileText, FiTool,
  FiSettings, FiChevronDown, FiChevronRight, FiMail, FiPhone
} from 'react-icons/fi';
import { sidebarNavItems } from '../../data/mockData';
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

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState(['masters', 'settings']);

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

      {/* Navigation */}
      <nav className="sidebar__nav">
        {sidebarNavItems.map((item) => {
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
