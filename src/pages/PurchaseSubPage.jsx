import React from 'react';
import { FiShoppingCart, FiFileText, FiTruck, FiClipboard, FiDollarSign, FiBarChart2, FiDownload } from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  dashboard: FiShoppingCart,
  entry: FiFileText,
  grn: FiTruck,
  bills: FiClipboard,
  returns: FiFileText,
  expense: FiDollarSign,
  order: FiShoppingCart,
  supplierRate: FiBarChart2,
  reports: FiDownload,
};

const PurchaseSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiShoppingCart;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Purchase</span>
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
            <span className="module-summary-card__sub">Purchase workflow segment</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiFileText size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Status</span>
            <span className="module-summary-card__value">Ready</span>
            <span className="module-summary-card__sub">Use this step now</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiDollarSign size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Last updated</span>
            <span className="module-summary-card__value">Today</span>
            <span className="module-summary-card__sub">Live data pending</span>
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
            Build the detailed purchase functionality for this submodule here. It should eventually support the workflows shown in the purchase module screens: dashboard, invoice entry, GRN, bills, returns, expense tracking, orders, supplier rate list, and reports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSubPage;
