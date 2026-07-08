import React from 'react';
import { FiUsers, FiTrendingUp, FiAward, FiRefreshCcw, FiFileText, FiDollarSign } from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  dashboard: FiTrendingUp,
  list: FiUsers,
  performance: FiAward,
  reconciliation: FiRefreshCcw,
  reports: FiFileText,
  commissions: FiDollarSign,
};

const SalesmanSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiUsers;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Salesman</span>
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
            <span className="module-summary-card__label">Salesman Submodule</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Designed for sales team workflows</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiFileText size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Status</span>
            <span className="module-summary-card__value">Placeholder</span>
            <span className="module-summary-card__sub">Ready to wire data</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiDollarSign size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Last Updated</span>
            <span className="module-summary-card__value">Today</span>
            <span className="module-summary-card__sub">Sales metrics pending</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">This placeholder represents the {title.toLowerCase()} screen.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Help</button>
            <button className="btn btn--outline btn--sm">Export</button>
          </div>
        </div>
        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Build the detailed salesman management experience here with the workflows shown in the Salesman module screens.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesmanSubPage;
