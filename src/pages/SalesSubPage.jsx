import React from 'react';
import { FiTrendingUp, FiFileText, FiShoppingCart, FiRefreshCw, FiDollarSign, FiUsers, FiClipboard } from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  dashboard: FiTrendingUp,
  gstInvoice: FiFileText,
  cashInvoice: FiShoppingCart,
  order: FiClipboard,
  returns: FiRefreshCw,
  challan: FiShoppingCart,
  invoiceList: FiFileText,
  ledger: FiUsers,
  reports: FiDollarSign,
};

const SalesSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiTrendingUp;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Sales</span>
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
            <span className="module-summary-card__label">Submodule</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Sales workflow section</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiUsers size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Status</span>
            <span className="module-summary-card__value">Ready</span>
            <span className="module-summary-card__sub">Use this page for the workflow</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiDollarSign size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Last updated</span>
            <span className="module-summary-card__value">Today</span>
            <span className="module-summary-card__sub">Demo inventory data</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">This page is a placeholder for the {title.toLowerCase()} section.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Help</button>
            <button className="btn btn--outline btn--sm">Report</button>
          </div>
        </div>
        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Build the detailed sales functionality for this submodule here. It should reflect the workflows shown in the sales module screens: dashboard, invoice entry, sales order, returns, delivery challan, invoice listings, customer ledger, and reports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesSubPage;
