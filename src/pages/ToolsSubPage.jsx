import React from 'react';
import { FiCode, FiUpload, FiDownload, FiEdit3, FiPackage, FiPercent, FiPrinter, FiHardDrive, FiActivity } from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  barcode: FiCode,
  import: FiUpload,
  export: FiDownload,
  bulkUpdate: FiEdit3,
  adjustment: FiPackage,
  rateCalculator: FiPercent,
  labelPrinter: FiPrinter,
  backup: FiHardDrive,
  audit: FiActivity,
};

const ToolsSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiCode;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Tools</span>
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
            <span className="module-summary-card__label">Tool Submodule</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Utility workflow placeholder</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiDownload size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Actions</span>
            <span className="module-summary-card__value">Ready</span>
            <span className="module-summary-card__sub">Configure tool behavior</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiHardDrive size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Maintenance</span>
            <span className="module-summary-card__value">Planned</span>
            <span className="module-summary-card__sub">Requires workflow wiring</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">This placeholder page represents the {title.toLowerCase()} tool.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Help</button>
            <button className="btn btn--outline btn--sm">Export</button>
          </div>
        </div>
        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Add the tool capabilities here for import, export, barcode generation, bulk updates, stock adjustment, printing, backups, and audit logs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsSubPage;
