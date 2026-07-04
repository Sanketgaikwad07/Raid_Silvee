import React from 'react';
import {
  FiFileText,
  FiCalendar,
  FiClock,
  FiDownload,
  FiTrendingUp,
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiTruck,
  FiUserCheck,
  FiAlertCircle,
  FiCreditCard,
  FiRepeat,
  FiPercent,
  FiFilter,
  FiSearch,
} from 'react-icons/fi';
import './ModulePages.css';

const accentColors = [
  { bg: '#eff6ff', color: '#3b82f6' },   // blue
  { bg: '#f0fdf4', color: '#22c55e' },   // green
  { bg: '#f5f3ff', color: '#8b5cf6' },   // purple
  { bg: '#fffbeb', color: '#f59e0b' },   // orange
  { bg: '#fef2f2', color: '#ef4444' },   // red
  { bg: '#ecfeff', color: '#06b6d4' },   // cyan
];

const reportCards = [
  { title: 'Sales Report', desc: 'View detailed sales analytics and trends', icon: FiTrendingUp },
  { title: 'Purchase Report', desc: 'Track purchase orders and supplier payments', icon: FiShoppingCart },
  { title: 'Profit & Loss', desc: 'Monthly/Yearly P&L statement', icon: FiDollarSign },
  { title: 'Stock Report', desc: 'Current stock levels and valuation', icon: FiPackage },
  { title: 'Customer Ledger', desc: 'Customer-wise transaction history', icon: FiUsers },
  { title: 'Supplier Ledger', desc: 'Supplier-wise payment records', icon: FiTruck },
  { title: 'GST Report', desc: 'GSTR-1, GSTR-3B, and GST summaries', icon: FiFileText },
  { title: 'Salesman Report', desc: 'Salesman performance and collection', icon: FiUserCheck },
  { title: 'Outstanding Report', desc: 'Receivable and payable analysis', icon: FiAlertCircle },
  { title: 'Cash & Bank Report', desc: 'Cash flow and bank transactions', icon: FiCreditCard },
  { title: 'Inventory Movement', desc: 'Stock in/out movement analysis', icon: FiRepeat },
  { title: 'Tax Report', desc: 'Tax collected and paid summary', icon: FiPercent },
];

/* ---- inline styles for the report-cards grid (keeps everything in one file) ---- */
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
};

const cardStyle = {
  background: 'var(--card-bg)',
  borderRadius: 12,
  padding: '20px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
};

const cardHoverHandlers = {
  onMouseEnter: (e) => {
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
  },
};

const iconBoxStyle = (bg, color) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  background: bg,
  color,
});

const Reports = () => {
  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span className="current">Reports</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Reports</h2>
          <p className="module-header__desc">
            Generate, schedule, and export business reports
          </p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline">
            <FiDownload size={14} /> Export All
          </button>
          <button className="btn btn--primary">
            <FiCalendar size={14} /> Schedule Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="module-summary">
        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#eff6ff', color: '#3b82f6' }}
          >
            <FiFileText size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Reports</span>
            <span className="module-summary-card__value">24</span>
            <span className="module-summary-card__sub">Available</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#f5f3ff', color: '#8b5cf6' }}
          >
            <FiCalendar size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Scheduled Reports</span>
            <span className="module-summary-card__value">5</span>
            <span className="module-summary-card__sub">Auto-Generated</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#dcfce7', color: '#16a34a' }}
          >
            <FiClock size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Last Generated</span>
            <span className="module-summary-card__value module-summary-card__value--text">
              Today
            </span>
            <span className="module-summary-card__sub">17/05/2024</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#fffbeb', color: '#f59e0b' }}
          >
            <FiDownload size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Exported Reports</span>
            <span className="module-summary-card__value">12</span>
            <span className="module-summary-card__sub">This Month</span>
          </div>
        </div>
      </div>

      {/* Search / Filter Bar */}
      <div className="module-table-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
              All Reports
            </span>
            <span
              style={{
                fontSize: 12,
                background: '#eff6ff',
                color: '#3b82f6',
                padding: '2px 10px',
                borderRadius: 20,
                fontWeight: 600,
              }}
            >
              12
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="module-toolbar__search">
              <FiSearch size={14} />
              <input type="text" placeholder="Search reports..." />
            </div>
            <button className="btn btn--outline btn--sm">
              <FiFilter size={14} /> Category
            </button>
          </div>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div style={gridStyle}>
        {reportCards.map((report, i) => {
          const accent = accentColors[i % accentColors.length];
          const Icon = report.icon;
          return (
            <div key={i} style={cardStyle} {...cardHoverHandlers}>
              <div style={iconBoxStyle(accent.bg, accent.color)}>
                <Icon size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 3,
                  }}
                >
                  {report.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {report.desc}
                </div>
              </div>
              <button
                className="btn btn--outline btn--sm"
                style={{ flexShrink: 0 }}
              >
                Generate
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;
