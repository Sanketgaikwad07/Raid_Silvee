import React from 'react';
import { FiFileText, FiDollarSign, FiCalendar, FiTrendingUp, FiDownload, FiCheckCircle } from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  dashboard: FiFileText,
  gstr1: FiCalendar,
  gstr3b: FiCalendar,
  summary: FiTrendingUp,
  payment: FiDollarSign,
  reports: FiDownload,
  compliance: FiCheckCircle,
};

const GstSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiFileText;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>GST</span>
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
            <span className="module-summary-card__label">GST Submodule</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Tax compliance and filing</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiCheckCircle size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Compliance</span>
            <span className="module-summary-card__value">Pending</span>
            <span className="module-summary-card__sub">Filing data not connected</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiDownload size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Exports</span>
            <span className="module-summary-card__value">Enabled</span>
            <span className="module-summary-card__sub">Excel & CSV ready</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">This placeholder page is for the {title.toLowerCase()} workflow.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Validate</button>
            <button className="btn btn--outline btn--sm">Export</button>
          </div>
        </div>
        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Wire the GST filing and return flows here, including GSTR-1, GSTR-3B, returns summary, payments, and reports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GstSubPage;
