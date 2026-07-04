import React, { useState } from 'react';
import {
  FiPlus, FiDownload, FiUpload, FiSearch, FiFilter,
  FiEye, FiEdit2, FiRefreshCw, FiTrash2,
  FiUsers, FiTrendingUp, FiAward, FiClock
} from 'react-icons/fi';
import './ModulePages.css';

const salesmenData = [
  { code: 'SM-001', name: 'Mahesh Patil', phone: '+91 98765 43210', area: 'Pune West', totalSales: '₹ 3,25,600', collection: '₹ 2,80,000', outstanding: '₹ 45,600', target: '₹ 3,00,000', achievement: 108.5, status: 'Active' },
  { code: 'SM-002', name: 'Rajesh Kumar', phone: '+91 98765 43211', area: 'Pune East', totalSales: '₹ 2,85,400', collection: '₹ 2,50,000', outstanding: '₹ 35,400', target: '₹ 3,00,000', achievement: 95.1, status: 'Active' },
  { code: 'SM-003', name: 'Sunil Sharma', phone: '+91 98765 43212', area: 'Mumbai', totalSales: '₹ 2,15,300', collection: '₹ 1,90,000', outstanding: '₹ 25,300', target: '₹ 2,50,000', achievement: 86.1, status: 'Active' },
  { code: 'SM-004', name: 'Amit Joshi', phone: '+91 98765 43213', area: 'Nashik', totalSales: '₹ 1,45,200', collection: '₹ 1,20,000', outstanding: '₹ 25,200', target: '₹ 2,00,000', achievement: 72.6, status: 'Active' },
  { code: 'SM-005', name: 'Vikram Singh', phone: '+91 98765 43214', area: 'Nagpur', totalSales: '₹ 1,12,800', collection: '₹ 95,000', outstanding: '₹ 17,800', target: '₹ 2,00,000', achievement: 56.4, status: 'Active' },
  { code: 'SM-006', name: 'Pradeep More', phone: '+91 98765 43215', area: 'Aurangabad', totalSales: '₹ 89,450', collection: '₹ 75,000', outstanding: '₹ 14,450', target: '₹ 1,50,000', achievement: 59.6, status: 'Active' },
  { code: 'SM-007', name: 'Sachin Deshmukh', phone: '+91 98765 43216', area: 'Kolhapur', totalSales: '₹ 45,200', collection: '₹ 40,000', outstanding: '₹ 5,200', target: '₹ 1,50,000', achievement: 30.1, status: 'Inactive' },
  { code: 'SM-008', name: 'Ravi Deshpande', phone: '+91 98765 43217', area: 'Solapur', totalSales: '₹ 26,850', collection: '₹ 20,000', outstanding: '₹ 6,850', target: '₹ 1,00,000', achievement: 26.8, status: 'Active' },
];

const achievementColor = (pct) => {
  if (pct >= 80) return 'text-green';
  if (pct >= 50) return 'text-orange';
  return 'text-red';
};

const statusClass = (status) => {
  return status === 'Active' ? 'badge--active' : 'badge--inactive';
};

const Salesman = () => {
  const [search, setSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const filtered = salesmenData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Sales</span>
        <span className="sep">›</span>
        <span className="current">Salesman Management</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Salesman Management</h2>
          <p className="module-header__desc">Monitor salesman performance, targets, and collections</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline"><FiUpload size={14} /> Import</button>
          <button className="btn btn--outline"><FiDownload size={14} /> Export</button>
          <button className="btn btn--primary"><FiPlus size={14} /> Add Salesman</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FiUsers size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Salesmen</span>
            <span className="module-summary-card__value">12</span>
            <span className="module-summary-card__sub">Active</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <FiTrendingUp size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Monthly Sales</span>
            <span className="module-summary-card__value">₹ 12,45,800</span>
            <span className="module-summary-card__sub">Target: ₹ 15,00,000</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <FiAward size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Top Performer</span>
            <span className="module-summary-card__value module-summary-card__value--text">Mahesh Patil</span>
            <span className="module-summary-card__sub">₹ 3,25,600</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <FiClock size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Pending Reconciliation</span>
            <span className="module-summary-card__value">5</span>
            <span className="module-summary-card__sub">Salesmen</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="module-table-card">
        {/* Toolbar */}
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <select
              className="module-toolbar__select"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="module-toolbar__label">Entries Per Page</span>
          </div>
          <div className="module-toolbar__right">
            <div className="module-toolbar__search">
              <FiSearch size={14} />
              <input
                type="text"
                placeholder="Search salesmen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn--outline btn--sm"><FiFilter size={14} /> Filter</button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="module-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Salesman Name</th>
                <th>Phone</th>
                <th>Area</th>
                <th className="text-right">Total Sales (₹)</th>
                <th className="text-right">Collection (₹)</th>
                <th className="text-right">Outstanding (₹)</th>
                <th className="text-right">Targets (₹)</th>
                <th className="text-center">Achievement %</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sm, i) => (
                <tr key={i}>
                  <td className="font-medium">{sm.code}</td>
                  <td className="font-medium">{sm.name}</td>
                  <td>{sm.phone}</td>
                  <td>{sm.area}</td>
                  <td className="text-right font-medium">{sm.totalSales}</td>
                  <td className="text-right text-green">{sm.collection}</td>
                  <td className="text-right text-red">{sm.outstanding}</td>
                  <td className="text-right">{sm.target}</td>
                  <td className={`text-center font-medium ${achievementColor(sm.achievement)}`}>
                    {sm.achievement}%
                  </td>
                  <td className="text-center">
                    <span className={`badge ${statusClass(sm.status)}`}>{sm.status}</span>
                  </td>
                  <td>
                    <div className="module-actions">
                      <button className="module-action-btn" title="View"><FiEye size={14} /></button>
                      <button className="module-action-btn" title="Edit"><FiEdit2 size={14} /></button>
                      <button className="module-action-btn" title="Reconcile"><FiRefreshCw size={14} /></button>
                      <button className="module-action-btn delete" title="Delete"><FiTrash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="module-table-footer">
          <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled>Previous</button>
            <button className="module-page-btn active">1</button>
            <button className="module-page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salesman;
