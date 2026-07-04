import React from 'react';
import {
  FiShoppingCart,
  FiClock,
  FiDollarSign,
  FiAlertCircle,
  FiPlus,
  FiDownload,
  FiFilter,
  FiSearch,
  FiEye,
  FiEdit2,
  FiPrinter,
  FiTrash2,
} from 'react-icons/fi';
import './ModulePages.css';

const purchaseOrders = [
  { poNo: 'PO-240517-001', date: '17/05/2024', supplier: 'Shree Silver Suppliers', items: 12, total: '₹ 3,45,600', paid: '₹ 3,45,600', balance: '₹ 0', status: 'Paid' },
  { poNo: 'PO-240516-002', date: '16/05/2024', supplier: 'Om Silver World', items: 8, total: '₹ 2,15,400', paid: '₹ 1,50,000', balance: '₹ 65,400', status: 'Partial' },
  { poNo: 'PO-240515-003', date: '15/05/2024', supplier: 'Balaji Silver Pvt. Ltd.', items: 15, total: '₹ 4,85,200', paid: '₹ 4,85,200', balance: '₹ 0', status: 'Paid' },
  { poNo: 'PO-240514-004', date: '14/05/2024', supplier: 'Silver Star Suppliers', items: 6, total: '₹ 1,20,450', paid: '₹ 0', balance: '₹ 1,20,450', status: 'Pending' },
  { poNo: 'PO-240513-005', date: '13/05/2024', supplier: 'M.K. Silver Emporium', items: 20, total: '₹ 5,67,800', paid: '₹ 5,67,800', balance: '₹ 0', status: 'Paid' },
  { poNo: 'PO-240512-006', date: '12/05/2024', supplier: 'Rajesh Silver House', items: 10, total: '₹ 2,89,300', paid: '₹ 2,00,000', balance: '₹ 89,300', status: 'Partial' },
  { poNo: 'PO-240511-007', date: '11/05/2024', supplier: 'Ganesh Metal Works', items: 4, total: '₹ 98,750', paid: '₹ 98,750', balance: '₹ 0', status: 'Paid' },
  { poNo: 'PO-240510-008', date: '10/05/2024', supplier: 'Laxmi Silver Traders', items: 18, total: '₹ 6,12,400', paid: '₹ 0', balance: '₹ 6,12,400', status: 'Pending' },
  { poNo: 'PO-240509-009', date: '09/05/2024', supplier: 'Patel & Sons Suppliers', items: 7, total: '₹ 1,78,600', paid: '₹ 1,78,600', balance: '₹ 0', status: 'Paid' },
  { poNo: 'PO-240508-010', date: '08/05/2024', supplier: 'Mahalaxmi Silver Co.', items: 14, total: '₹ 3,92,100', paid: '₹ 2,50,000', balance: '₹ 1,42,100', status: 'Partial' },
];

const statusBadge = (status) => {
  const map = { Paid: 'badge--paid', Partial: 'badge--partial', Pending: 'badge--pending' };
  return map[status] || '';
};

const Purchase = () => {
  const parseAmount = (amt) => {
    if (!amt) return 0;
    // remove currency symbols, commas and spaces
    const num = String(amt).replace(/[^0-9.\-]/g, '');
    return parseFloat(num) || 0;
  };

  const formatCurrency = (num) => {
    if (isNaN(num)) return '—';
    return '₹ ' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };
  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Purchase</span>
        <span className="sep">›</span>
        <span className="current">Purchase Orders</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Purchase Orders</h2>
          <p className="module-header__desc">Manage purchase orders & supplier bills</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline"><FiDownload size={14} /> Export</button>
          <button className="btn btn--primary"><FiPlus size={14} /> New Purchase</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FiShoppingCart size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Purchase Orders</span>
            <span className="module-summary-card__value">156</span>
            <span className="module-summary-card__sub">This Month</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <FiClock size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Pending Orders</span>
            <span className="module-summary-card__value">23</span>
            <span className="module-summary-card__sub">Awaiting Delivery</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <FiDollarSign size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Purchase Value</span>
            <span className="module-summary-card__value">₹ 45,67,800</span>
            <span className="module-summary-card__sub">This Month</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <FiAlertCircle size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Outstanding Payments</span>
            <span className="module-summary-card__value">₹ 8,45,200</span>
            <span className="module-summary-card__sub">To Suppliers</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="module-table-card">
        {/* Toolbar */}
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <select className="module-toolbar__select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="module-toolbar__label">Entries Per Page</span>
          </div>
          <div className="module-toolbar__right">
            <div className="module-toolbar__search">
              <FiSearch size={14} />
              <input type="text" placeholder="Search orders..." />
            </div>
            <button className="btn btn--outline btn--sm"><FiFilter size={14} /> Filter</button>
          </div>
        </div>

        {/* Table */}
        <table className="module-table">
          <thead>
            <tr>
              <th>PO No.</th>
              <th>Date</th>
              <th>Supplier Name</th>
              <th className="text-center">Items</th>
              <th className="text-right">Avg (₹)</th>
              <th className="text-right">Rate of Silvee (₹)</th>
              <th className="text-right">Total Amount (₹)</th>
              <th className="text-right">Paid Amount (₹)</th>
              <th className="text-right">Balance (₹)</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po, i) => (
              <tr key={i}>
                <td className="font-medium text-blue">{po.poNo}</td>
                <td>{po.date}</td>
                <td>{po.supplier}</td>
                <td className="text-center">{po.items}</td>
                {/* compute avg and rate from total/items */}
                {(() => {
                  const totalNum = parseAmount(po.total);
                  const avg = po.items ? totalNum / po.items : 0;
                  const rate = avg; // placeholder: rate equals avg; adjust logic as needed
                  return (
                    <>
                      <td className="text-right">{formatCurrency(Math.round(avg))}</td>
                      <td className="text-right">{formatCurrency(Math.round(rate))}</td>
                      <td className="text-right font-medium">{po.total}</td>
                    </>
                  );
                })()}
                <td className="text-right text-green">{po.paid}</td>
                <td className="text-right text-red">{po.balance !== '₹ 0' ? po.balance : '—'}</td>
                <td className="text-center">
                  <span className={`badge ${statusBadge(po.status)}`}>{po.status}</span>
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
          <span>Showing 1 to 10 of 156 entries</span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled>Previous</button>
            <button className="module-page-btn active">1</button>
            <button className="module-page-btn">2</button>
            <button className="module-page-btn">3</button>
            <button className="module-page-btn">...</button>
            <button className="module-page-btn">16</button>
            <button className="module-page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
