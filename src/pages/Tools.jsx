import React from 'react';
import {
  FiHome, FiCode, FiUpload, FiDownload, FiEdit3, FiPackage,
  FiPercent, FiPrinter, FiHardDrive, FiActivity, FiArrowRight
} from 'react-icons/fi';
import './ModulePages.css';

const tools = [
  {
    icon: FiCode,
    title: 'Barcode Generator',
    desc: 'Generate and print barcodes for items',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    icon: FiUpload,
    title: 'Data Import',
    desc: 'Import data from Excel/CSV files',
    color: '#22c55e',
    bg: '#f0fdf4',
  },
  {
    icon: FiDownload,
    title: 'Data Export',
    desc: 'Export data to Excel/CSV/PDF',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    icon: FiEdit3,
    title: 'Bulk Update',
    desc: 'Update prices, categories in bulk',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    icon: FiPackage,
    title: 'Stock Adjustment',
    desc: 'Adjust stock quantities manually',
    color: '#ef4444',
    bg: '#fef2f2',
  },
  {
    icon: FiPercent,
    title: 'Rate Calculator',
    desc: 'Calculate rates with tax, margins',
    color: '#06b6d4',
    bg: '#ecfeff',
  },
  {
    icon: FiPrinter,
    title: 'Label Printer',
    desc: 'Print item labels and price tags',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    icon: FiHardDrive,
    title: 'Database Backup',
    desc: 'Backup and restore database',
    color: '#22c55e',
    bg: '#f0fdf4',
  },
  {
    icon: FiActivity,
    title: 'Audit Log',
    desc: 'View system activity and user actions',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
];

const toolCardStyle = {
  background: 'var(--card-bg)',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  border: '1px solid transparent',
};

const Tools = () => {
  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <FiHome size={14} />
        <span className="sep">›</span>
        <span className="current">Tools & Utilities</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Tools & Utilities</h2>
          <p className="module-header__desc">Quick access to system tools, imports, exports, and maintenance utilities</p>
        </div>
      </div>

      {/* Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={i}
              style={toolCardStyle}
              className="tools-card-hover"
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: tool.bg,
                color: tool.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}>
                  {tool.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  margin: 0,
                }}>
                  {tool.desc}
                </p>
              </div>
              <button
                className="btn btn--outline btn--sm"
                style={{ alignSelf: 'flex-start' }}
              >
                Open <FiArrowRight size={13} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Inline hover style */}
      <style>{`
        .tools-card-hover:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
          border-color: var(--accent-blue) !important;
        }
        @media (max-width: 1200px) {
          .tools-card-hover { /* handled by parent grid */ }
        }
      `}</style>
    </div>
  );
};

export default Tools;
