import React from 'react';
import { FiBox, FiSearch, FiFileText, FiShuffle, FiEdit3, FiCalendar, FiClipboard } from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  overview: FiBox,
  ledger: FiFileText,
  search: FiSearch,
  transfer: FiShuffle,
  adjustment: FiEdit3,
  take: FiCalendar,
  opening: FiClipboard,
  aging: FiFileText,
  itemSummary: FiBox,
};

const InventorySubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiBox;
  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Inventory</span>
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
          <button className="btn btn--primary">View Report</button>
        </div>
      </div>

      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon blue"><Icon size={22} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Module</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Inventory Submodule</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiSearch size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Status</span>
            <span className="module-summary-card__value">Ready</span>
            <span className="module-summary-card__sub">Submodule active</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiCalendar size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Last Updated</span>
            <span className="module-summary-card__value">Today</span>
            <span className="module-summary-card__sub">Live inventory data</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">This page is a starting point for the {title.toLowerCase()} workflow.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Settings</button>
            <button className="btn btn--outline btn--sm">Help</button>
          </div>
        </div>

        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            This section is part of the inventory submodel. Build the actual inventory operations for this page by wiring the relevant stock reports and workflows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventorySubPage;
