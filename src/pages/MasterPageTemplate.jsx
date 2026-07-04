import React from 'react';
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiDownload, FiUpload,
  FiFilter, FiEye, FiDatabase, FiCheckCircle, FiXCircle, FiStar
} from 'react-icons/fi';
import './ModulePages.css';

const MasterPageTemplate = ({
  title,
  description,
  breadcrumbLabel,
  addButtonText,
  columns,
  data,
}) => {
  const activeCount = data.filter((row) => String(row.status || '').toLowerCase() === 'active').length;
  const inactiveCount = data.filter((row) => String(row.status || '').toLowerCase() === 'inactive').length;
  const defaultItem = data.find((row) => ['yes', 'default'].includes(String(row.defaultValue || row.default || '').toLowerCase()));
  const primaryLabel = columns[1]?.key || columns[0]?.key;

  const renderCell = (row, col) => {
    const value = row[col.key];
    const valueText = String(value ?? '');
    const normalized = valueText.toLowerCase().replace(/\s+/g, '-');

    if (col.key === 'status') {
      return <span className={`badge badge--${normalized || 'active'}`}>{valueText}</span>;
    }

    if (col.key === 'defaultValue' || col.key === 'default') {
      return valueText.toLowerCase() === 'yes' || valueText.toLowerCase() === 'default'
        ? <span className="module-default-dot is-default"><FiCheckCircle size={16} /></span>
        : <span className="module-default-dot"><FiXCircle size={16} /></span>;
    }

    return value;
  };

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Masters</span>
        <span className="sep">&rsaquo;</span>
        <span className="current">{breadcrumbLabel || title}</span>
      </div>

      <div className="module-header">
        <div>
          <h2 className="module-header__title">{title}</h2>
          <p className="module-header__desc">{description}</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline">
            <FiUpload size={14} /> Import
          </button>
          <button className="btn btn--success">
            <FiDownload size={14} /> Export
          </button>
          <button className="btn btn--primary">
            <FiPlus size={14} /> {addButtonText || `Add ${title}`}
          </button>
        </div>
      </div>

      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon blue"><FiDatabase size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Records</span>
            <span className="module-summary-card__value">{data.length}</span>
            <span className="module-summary-card__sub">{title}</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiCheckCircle size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Active Records</span>
            <span className="module-summary-card__value">{activeCount || data.length}</span>
            <span className="module-summary-card__sub">Ready to use</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiXCircle size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Inactive Records</span>
            <span className="module-summary-card__value">{inactiveCount}</span>
            <span className="module-summary-card__sub">Not in use</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon amber"><FiStar size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Default</span>
            <span className="module-summary-card__value module-summary-card__value--text">
              {defaultItem ? defaultItem[primaryLabel] : data[0]?.[primaryLabel] || 'Not Set'}
            </span>
            <span className="module-summary-card__sub">Current selection</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <select className="module-toolbar__select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="module-toolbar__label">Entries Per Page</span>
          </div>
          <div className="module-toolbar__right">
            <div className="module-toolbar__search">
              <FiSearch size={14} />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="btn btn--outline btn--sm">
              <FiFilter size={14} /> Filter
            </button>
          </div>
        </div>

        <div className="module-table-wrap">
          <table className="module-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        textAlign: col.align || 'left',
                        color: col.color ? col.color(row[col.key], row) : undefined,
                      }}
                    >
                      {renderCell(row, col)}
                    </td>
                  ))}
                  <td className="text-center">
                    <div className="module-actions">
                      <button className="module-action-btn view" title="View"><FiEye size={14} /></button>
                      <button className="module-action-btn" title="Edit"><FiEdit2 size={14} /></button>
                      <button className="module-action-btn delete" title="Delete"><FiTrash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="module-table-footer">
          <span>Showing 1 to {data.length} of {data.length} entries</span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled>Previous</button>
            <button className="module-page-btn active">1</button>
            <button className="module-page-btn" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterPageTemplate;
