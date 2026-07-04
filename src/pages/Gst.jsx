import React, { useState } from 'react';
import {
  FiHome, FiFileText, FiDollarSign, FiTrendingUp, FiCheckCircle,
  FiSearch, FiFilter, FiDownload, FiUpload, FiEye, FiCalendar,
  FiPlus
} from 'react-icons/fi';
import './ModulePages.css';

const gstReturns = [
  {
    returnType: 'GSTR-1',
    period: 'April 2024',
    filingDate: '11/05/2024',
    dueDate: '11/05/2024',
    totalSales: '₹ 10,56,800',
    totalTax: '₹ 1,90,224',
    status: 'Filed',
  },
  {
    returnType: 'GSTR-3B',
    period: 'April 2024',
    filingDate: '20/05/2024',
    dueDate: '20/05/2024',
    totalSales: '₹ 10,56,800',
    totalTax: '₹ 66,474',
    status: 'Filed',
  },
  {
    returnType: 'GSTR-1',
    period: 'March 2024',
    filingDate: '10/04/2024',
    dueDate: '11/04/2024',
    totalSales: '₹ 9,85,400',
    totalTax: '₹ 1,77,372',
    status: 'Filed',
  },
  {
    returnType: 'GSTR-3B',
    period: 'March 2024',
    filingDate: '18/04/2024',
    dueDate: '20/04/2024',
    totalSales: '₹ 9,85,400',
    totalTax: '₹ 58,920',
    status: 'Filed',
  },
  {
    returnType: 'GSTR-1',
    period: 'February 2024',
    filingDate: '09/03/2024',
    dueDate: '11/03/2024',
    totalSales: '₹ 8,45,200',
    totalTax: '₹ 1,52,136',
    status: 'Filed',
  },
  {
    returnType: 'GSTR-3B',
    period: 'February 2024',
    filingDate: '19/03/2024',
    dueDate: '20/03/2024',
    totalSales: '₹ 8,45,200',
    totalTax: '₹ 52,340',
    status: 'Filed',
  },
  {
    returnType: 'GSTR-1',
    period: 'May 2024',
    filingDate: '-',
    dueDate: '11/06/2024',
    totalSales: '₹ 12,45,800',
    totalTax: '₹ 2,24,244',
    status: 'Pending',
  },
  {
    returnType: 'GSTR-3B',
    period: 'May 2024',
    filingDate: '-',
    dueDate: '20/06/2024',
    totalSales: '₹ 12,45,800',
    totalTax: '₹ 66,474',
    status: 'Pending',
  },
];

const statusBadgeClass = (status) => {
  switch (status) {
    case 'Filed': return 'badge badge--filed';
    case 'Pending': return 'badge badge--pending';
    case 'Overdue': return 'badge badge--overdue';
    default: return 'badge';
  }
};

const Gst = () => {
  const [search, setSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const filtered = gstReturns.filter(
    (r) =>
      r.returnType.toLowerCase().includes(search.toLowerCase()) ||
      r.period.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <FiHome size={14} />
        <span className="sep">›</span>
        <span>GST</span>
        <span className="sep">›</span>
        <span className="current">Filing & Returns</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">GST Filing & Returns</h2>
          <p className="module-header__desc">Manage GST returns, filings, and tax summaries</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline"><FiDownload size={14} /> Export</button>
          <button className="btn btn--primary"><FiPlus size={14} /> File New Return</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FiDollarSign size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total GST Collected</span>
            <span className="module-summary-card__value">₹ 2,24,244</span>
            <span className="module-summary-card__sub">This Month · CGST + SGST</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <FiTrendingUp size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total GST Paid</span>
            <span className="module-summary-card__value">₹ 1,57,770</span>
            <span className="module-summary-card__sub">On Purchases</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <FiFileText size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Net GST Payable</span>
            <span className="module-summary-card__value">₹ 66,474</span>
            <span className="module-summary-card__sub">This Month</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            <FiCheckCircle size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Returns Filed</span>
            <span className="module-summary-card__value">3 of 4</span>
            <span className="module-summary-card__sub">This Quarter</span>
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
                placeholder="Search returns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn--outline btn--sm"><FiFilter size={14} /> Filter</button>
            <button className="btn btn--outline btn--sm"><FiCalendar size={14} /> Period</button>
          </div>
        </div>

        {/* Table */}
        <table className="module-table">
          <thead>
            <tr>
              <th>Return Type</th>
              <th>Period</th>
              <th>Filing Date</th>
              <th>Due Date</th>
              <th className="text-right">Total Sales (₹)</th>
              <th className="text-right">Total Tax (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                <td className="font-medium">{row.returnType}</td>
                <td>{row.period}</td>
                <td>{row.filingDate}</td>
                <td>{row.dueDate}</td>
                <td className="text-right font-medium">{row.totalSales}</td>
                <td className="text-right font-medium">{row.totalTax}</td>
                <td>
                  <span className={statusBadgeClass(row.status)}>{row.status}</span>
                </td>
                <td>
                  <div className="module-actions">
                    <button className="module-action-btn" title="View"><FiEye size={14} /></button>
                    <button className="module-action-btn" title="Download"><FiDownload size={14} /></button>
                    {row.status === 'Pending' && (
                      <button className="module-action-btn" title="File Return"><FiUpload size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="module-table-footer">
          <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
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

export default Gst;
