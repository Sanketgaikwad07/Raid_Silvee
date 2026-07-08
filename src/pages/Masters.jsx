import React, { useState } from 'react';
import { FiPlus, FiDownload, FiUpload, FiFilter, FiSearch, FiEye, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { companiesData } from '../data/mockData';
import './Masters.css';

const Masters = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const tabs = ['General', 'Address', 'Finance', 'Settings', 'Bank Details', 'GST Details', 'Other Details', 'Logo'];

  return (
    <div className="masters-page">
      {/* Breadcrumb */}
      <div className="masters-breadcrumb">
        <span>Masters</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Company Master</span>
      </div>

      {/* Page Header */}
      <div className="masters-header">
        <div>
          <h2 className="masters-header__title">Company Master</h2>
          <p className="masters-header__desc">Manage your company details</p>
        </div>
        <div className="masters-header__actions">
          <button className="btn btn--outline"><FiUpload size={14} /> Import</button>
          <button className="btn btn--outline"><FiDownload size={14} /> Export</button>
          <button className="btn btn--primary" onClick={() => setIsDetailsVisible(true)}>
            <FiPlus size={14} /> Add Company
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="masters-summary">
        <div className="summary-card">
          <div className="summary-card__icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FiFilter size={20} />
          </div>
          <div>
            <span className="summary-card__label">Total Companies</span>
            <span className="summary-card__value">2</span>
            <span className="summary-card__sub">Active Companies</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card__icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <FiCheck size={20} />
          </div>
          <div>
            <span className="summary-card__label">Active Companies</span>
            <span className="summary-card__value">2</span>
            <span className="summary-card__sub">Running</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card__icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <FiX size={20} />
          </div>
          <div>
            <span className="summary-card__label">Inactive Companies</span>
            <span className="summary-card__value">0</span>
            <span className="summary-card__sub">Not in use</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card__icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            <FiFilter size={20} />
          </div>
          <div>
            <span className="summary-card__label">Default Company</span>
            <span className="summary-card__value-text">Silvee925 Jewels Pvt. Ltd.</span>
            <span className="summary-card__sub">Current Default</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="masters-table-card">
        <div className="masters-table-toolbar">
          <div className="toolbar-left">
            <select className="toolbar-select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="toolbar-label">Entries Per Page</span>
          </div>
          <div className="toolbar-right">
            <div className="toolbar-search">
              <FiSearch size={14} />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="btn btn--outline btn--sm"><FiFilter size={14} /> Filter</button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Company Code</th>
              <th>Company Name</th>
              <th>GST No.</th>
              <th>Phone</th>
              <th>Email</th>
              <th>State</th>
              <th>Status</th>
              <th>Default</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companiesData.map((company, i) => (
              <tr key={i}>
                <td className="font-mono">{company.code}</td>
                <td>
                  {company.name}
                  {company.isDefault && <span className="default-badge">Default</span>}
                </td>
                <td>{company.gstNo}</td>
                <td>{company.phone}</td>
                <td>{company.email}</td>
                <td>{company.state}</td>
                <td>
                  <span className={`status-badge ${company.status.toLowerCase()}`}>{company.status}</span>
                </td>
                <td>
                  {company.isDefault ? (
                    <span className="default-check"><FiCheck size={16} /></span>
                  ) : (
                    <span className="default-minus">−</span>
                  )}
                </td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn" onClick={() => setIsDetailsVisible(true)}><FiEye size={14} /></button>
                    <button className="action-btn" onClick={() => setIsDetailsVisible(true)}><FiEdit2 size={14} /></button>
                    <button className="action-btn delete"><FiTrash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Showing 1 to 2 of 2 entries</span>
          <div className="pagination">
            <button className="page-btn" disabled>Previous</button>
            <button className="page-btn active">1</button>
            <button className="page-btn" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Company Details Form */}
      {isDetailsVisible && (
        <div className="masters-detail-card">
          <h3 className="detail-title">Company Details (Silvee925 Jewels Pvt. Ltd.)</h3>
          <div className="detail-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`detail-tab ${activeTab === tab.toLowerCase().replace(/ /g, '-') ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(/ /g, '-'))}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="detail-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Company Code*</label>
                <input type="text" value="SILVEE925" readOnly />
              </div>
              <div className="form-group">
                <label>Phone No.*</label>
                <input type="text" value="+91 88888 92525" readOnly />
              </div>
              <div className="form-group">
                <label>Alternate Phone</label>
                <input type="text" value="+91 77770 92525" readOnly />
              </div>
              <div className="form-group">
                <label>Company Name*</label>
                <input type="text" value="Silvee925 Jewels Pvt. Ltd." readOnly />
              </div>
              <div className="form-group">
                <label>State*</label>
                <select><option>Maharashtra</option></select>
              </div>
              <div className="form-group">
                <label>State Code*</label>
                <input type="text" value="27" readOnly />
              </div>
              <div className="form-group">
                <label>GST No.*</label>
                <input type="text" value="27ABCDE1234F1Z5" readOnly />
              </div>
              <div className="form-group">
                <label>Country*</label>
                <select><option>India</option></select>
              </div>
              <div className="form-group">
                <label>Currency*</label>
                <select><option>INR - Indian Rupee</option></select>
              </div>
              <div className="form-group">
                <label>PAN No.</label>
                <input type="text" value="ABCDE1234F" readOnly />
              </div>
              <div className="form-group">
                <label>Default Company</label>
                <div className="toggle-switch">
                  <div className="toggle active"></div>
                  <span>Yes</span>
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select><option>Active</option></select>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="text" value="info@silvee925.com" readOnly />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input type="text" value="www.silvee925.com" readOnly />
              </div>
            </div>

            {/* Company Logo Section */}
            <div className="company-logo-section">
              <h4>Company Logo</h4>
              <div className="logo-placeholder">
                <div className="logo-text">
                  <span className="logo-silvee">Silvee</span>
                  <span className="logo-925">925</span>
                  <span className="logo-tm">™</span>
                </div>
              </div>
              <div className="logo-actions">
                <button className="btn btn--outline btn--sm">Upload Logo</button>
                <button className="btn btn--danger btn--sm">✕ Remove</button>
              </div>
            </div>
          </div>

          <div className="detail-footer">
            <button className="btn btn--outline" onClick={() => setIsDetailsVisible(false)}>Cancel</button>
            <button className="btn btn--primary" onClick={() => setIsDetailsVisible(false)}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Masters;
