import React from 'react';
import { FiSettings, FiGlobe, FiCalendar, FiUsers, FiLock, FiHardDrive, FiHash, FiPrinter } from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  company: FiSettings,
  general: FiGlobe,
  financial: FiCalendar,
  users: FiUsers,
  permissions: FiLock,
  backup: FiHardDrive,
  numbering: FiHash,
  print: FiPrinter,
};

const SettingsSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiSettings;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Settings</span>
        <span className="sep">›</span>
        <span className="current">{title}</span>
      </div>

      <div className="module-header">
        <div>
          <h2 className="module-header__title">{title}</h2>
          <p className="module-header__desc">{description}</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline">Refresh</button>
          <button className="btn btn--primary">Open</button>
        </div>
      </div>

      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon blue"><Icon size={22} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Settings Submodule</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Configure system behavior</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiLock size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Status</span>
            <span className="module-summary-card__value">Editable</span>
            <span className="module-summary-card__sub">Default values pending</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiPrinter size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Scope</span>
            <span className="module-summary-card__value">System</span>
            <span className="module-summary-card__sub">Apply across app</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">This placeholder is for the {title.toLowerCase()} settings area.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Export</button>
            <button className="btn btn--outline btn--sm">Help</button>
          </div>
        </div>
        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Wire the settings configuration screens here for company, general defaults, financial year, users, permissions, backup, numbering, and print settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsSubPage;
