import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPlus, FiDownload, FiUpload, FiSearch, FiFilter, FiCalendar,
  FiEye, FiEdit2, FiPrinter, FiTrash2,
  FiDollarSign, FiFileText, FiCheckCircle, FiAlertCircle, FiUsers
} from 'react-icons/fi';
import './ModulePages.css';

const salesInvoices = [
  { id: 'SI-240517-001', date: '17/05/2024', customer: 'Shree Jewellers (Pune)', items: 8, total: '₹ 2,35,600', paid: '₹ 2,35,600', balance: '₹ 0', status: 'Paid' },
  { id: 'SI-240517-002', date: '17/05/2024', customer: 'Mahalaxmi Ornaments', items: 5, total: '₹ 1,85,350', paid: '₹ 1,20,000', balance: '₹ 65,350', status: 'Partial' },
  { id: 'SI-240516-003', date: '16/05/2024', customer: 'Sai Jewellers (Mumbai)', items: 12, total: '₹ 3,45,200', paid: '₹ 3,45,200', balance: '₹ 0', status: 'Paid' },
  { id: 'SI-240516-004', date: '16/05/2024', customer: 'Riddhi Siddhi Jewellers', items: 3, total: '₹ 98,450', paid: '₹ 0', balance: '₹ 98,450', status: 'Unpaid' },
  { id: 'SI-240515-005', date: '15/05/2024', customer: 'Pooja Jewellers (Nashik)', items: 15, total: '₹ 4,12,800', paid: '₹ 4,12,800', balance: '₹ 0', status: 'Paid' },
  { id: 'SI-240515-006', date: '15/05/2024', customer: 'Ganesh Gold & Silver', items: 7, total: '₹ 1,56,900', paid: '₹ 80,000', balance: '₹ 76,900', status: 'Partial' },
  { id: 'SI-240514-007', date: '14/05/2024', customer: 'Krishna Jewellers', items: 10, total: '₹ 2,78,400', paid: '₹ 2,78,400', balance: '₹ 0', status: 'Paid' },
  { id: 'SI-240514-008', date: '14/05/2024', customer: 'Radha Silver Palace', items: 4, total: '₹ 1,12,350', paid: '₹ 0', balance: '₹ 1,12,350', status: 'Unpaid' },
  { id: 'SI-240513-009', date: '13/05/2024', customer: 'Agarwal Jewellers (Delhi)', items: 20, total: '₹ 5,89,600', paid: '₹ 5,89,600', balance: '₹ 0', status: 'Paid' },
  { id: 'SI-240513-010', date: '13/05/2024', customer: 'Bharat Silver House', items: 6, total: '₹ 1,45,700', paid: '₹ 1,00,000', balance: '₹ 45,700', status: 'Partial' },
];

const statusClass = (status) => {
  switch (status) {
    case 'Paid': return 'badge--paid';
    case 'Partial': return 'badge--partial';
    case 'Unpaid': return 'badge--unpaid';
    default: return '';
  }
};

const Sales = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const filtered = salesInvoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Sales</span>
        <span className="sep">›</span>
        <span className="current">Sales Invoices</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Sales Invoices</h2>
          <p className="module-header__desc">Manage and track all sales invoices and payments</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline" onClick={() => navigate('/sales/registered-customers')}>
            <FiUsers size={14} /> Registered Customers
          </button>
          <button className="btn btn--outline"><FiUpload size={14} /> Import</button>
          <button className="btn btn--outline"><FiDownload size={14} /> Export</button>
          <button className="btn btn--primary"><FiPlus size={14} /> New Invoice</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FiDollarSign size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Sales</span>
            <span className="module-summary-card__value">₹ 12,45,800</span>
            <span className="module-summary-card__sub">This Month</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            <FiFileText size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Invoices</span>
            <span className="module-summary-card__value">342</span>
            <span className="module-summary-card__sub">This Month</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <FiCheckCircle size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Collected Amount</span>
            <span className="module-summary-card__value">₹ 9,15,200</span>
            <span className="module-summary-card__sub">73.5%</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <FiAlertCircle size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Outstanding</span>
            <span className="module-summary-card__value">₹ 3,30,600</span>
            <span className="module-summary-card__sub">26.5%</span>
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
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn--outline btn--sm"><FiCalendar size={14} /> Date Filter</button>
            <button className="btn btn--outline btn--sm"><FiFilter size={14} /> Filter</button>
          </div>
        </div>

        {/* Table */}
        <table className="module-table">
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th className="text-center">Items</th>
              <th className="text-right">Total Amount (₹)</th>
              <th className="text-right">Paid (₹)</th>
              <th className="text-right">Balance (₹)</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => (
              <tr key={i}>
                <td className="font-medium text-blue">{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.customer}</td>
                <td className="text-center">{inv.items}</td>
                <td className="text-right font-medium">{inv.total}</td>
                <td className="text-right text-green">{inv.paid}</td>
                <td className="text-right text-red">{inv.balance !== '₹ 0' ? inv.balance : '₹ 0'}</td>
                <td className="text-center">
                  <span className={`badge ${statusClass(inv.status)}`}>{inv.status}</span>
                </td>
                <td>
                  <div className="module-actions">
                    <button className="module-action-btn" title="View"><FiEye size={14} /></button>
                    <button className="module-action-btn" title="Edit"><FiEdit2 size={14} /></button>
                    <button className="module-action-btn" title="Print"><FiPrinter size={14} /></button>
                    <button className="module-action-btn delete" title="Delete"><FiTrash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer / Pagination */}
        <div className="module-table-footer">
          <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled>Previous</button>
            <button className="module-page-btn active">1</button>
            <button className="module-page-btn">2</button>
            <button className="module-page-btn">3</button>
            <button className="module-page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
