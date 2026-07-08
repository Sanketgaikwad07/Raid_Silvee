import React from 'react';
import {
  FiBarChart2,
  FiFileText,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiTruck,
  FiPercent,
  FiTrendingUp,
  FiClipboard,
  FiShoppingCart,
  FiCalendar,
} from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  purchase: FiShoppingCart,
  sales: FiTrendingUp,
  gst: FiFileText,
  stockSummary: FiPackage,
  stockAging: FiBarChart2,
  outstanding: FiUsers,
  profitLoss: FiDollarSign,
  trialBalance: FiClipboard,
  topItems: FiTrendingUp,
};

const ReportsSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiFileText;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Reports</span>
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
          <button className="btn btn--primary">Generate</button>
        </div>
      </div>

      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon blue"><Icon size={22} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Report</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Report submodule</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiFileText size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Status</span>
            <span className="module-summary-card__value">Ready</span>
            <span className="module-summary-card__sub">Ready to generate</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiCalendar size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Last Run</span>
            <span className="module-summary-card__value">Today</span>
            <span className="module-summary-card__sub">Auto-refresh enabled</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">Use this page to configure filters and export options for the report.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Filters</button>
            <button className="btn btn--outline btn--sm">Export</button>
          </div>
        </div>
        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            This placeholder page represents the {title} report in the reports submodel. You can wire the actual data view, filters, and export actions here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsSubPage;
