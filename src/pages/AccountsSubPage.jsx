import React from 'react';
import {
  FiBook,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiArrowDownLeft,
  FiArrowUpRight,
  FiRefreshCcw,
  FiClipboard,
} from 'react-icons/fi';
import './ModulePages.css';

const iconMap = {
  cashBook: FiArrowDownLeft,
  bankBook: FiCreditCard,
  journalEntry: FiFileText,
  receiptEntry: FiArrowUpRight,
  paymentEntry: FiDollarSign,
  contraEntry: FiRefreshCcw,
  ledger: FiBook,
  trialBalance: FiClipboard,
  dayBook: FiBook,
};

const AccountsSubPage = ({ title, description, iconKey }) => {
  const Icon = iconMap[iconKey] || FiBook;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Accounts</span>
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
            <span className="module-summary-card__label">Accounts Submodule</span>
            <span className="module-summary-card__value">{title}</span>
            <span className="module-summary-card__sub">Ready for configuration</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiFileText size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Status</span>
            <span className="module-summary-card__value">Placeholder</span>
            <span className="module-summary-card__sub">Requires data wiring</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiDollarSign size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Last Updated</span>
            <span className="module-summary-card__value">Today</span>
            <span className="module-summary-card__sub">Finance workflow ready</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <span className="module-toolbar__label">This page is a placeholder for the {title.toLowerCase()} section.</span>
          </div>
          <div className="module-toolbar__right">
            <button className="btn btn--outline btn--sm">Filters</button>
            <button className="btn btn--outline btn--sm">Export</button>
          </div>
        </div>
        <div className="module-table-wrap" style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Build the detailed accounts workflow for this section here. Future work should wire the screen elements shown in Accounts module screens: cash book, bank book, journal entry, receipt entry, payment entry, contra entry, ledger, trial balance, and day book.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountsSubPage;
