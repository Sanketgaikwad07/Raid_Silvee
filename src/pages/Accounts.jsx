import React from 'react';
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiDollarSign,
  FiCreditCard,
  FiPlus,
  FiDownload,
  FiUpload,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit2,
  FiPrinter,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import './ModulePages.css';

const transactions = [
  {
    voucher: 'RCP-240517-001',
    date: '17/05/2024',
    type: 'Receipt',
    party: 'Shree Jewellers',
    debit: '₹ 1,25,000',
    credit: '-',
    balance: '₹ 8,45,200',
    narration: 'Cash received against SI-240510-089',
  },
  {
    voucher: 'PMT-240517-002',
    date: '17/05/2024',
    type: 'Payment',
    party: 'Om Silver World',
    debit: '-',
    credit: '₹ 85,000',
    balance: '₹ 5,67,800',
    narration: 'Payment for PO-240512-006',
  },
  {
    voucher: 'SI-240517-003',
    date: '17/05/2024',
    type: 'Sales',
    party: 'Mahalaxmi Ornaments',
    debit: '₹ 1,85,350',
    credit: '-',
    balance: '₹ 10,30,550',
    narration: 'Sales Invoice SI-240517-002',
  },
  {
    voucher: 'PI-240516-004',
    date: '16/05/2024',
    type: 'Purchase',
    party: 'Balaji Silver Pvt. Ltd.',
    debit: '-',
    credit: '₹ 2,45,600',
    balance: '₹ 8,13,400',
    narration: 'Purchase Invoice PI-240516-001',
  },
  {
    voucher: 'RCP-240516-005',
    date: '16/05/2024',
    type: 'Receipt',
    party: 'Sai Jewellers',
    debit: '₹ 2,15,000',
    credit: '-',
    balance: '₹ 10,28,400',
    narration: 'NEFT received',
  },
  {
    voucher: 'JV-240516-006',
    date: '16/05/2024',
    type: 'Journal',
    party: 'Salary Account',
    debit: '-',
    credit: '₹ 3,45,000',
    balance: '₹ 6,83,400',
    narration: 'Monthly salary payment',
  },
  {
    voucher: 'PMT-240515-007',
    date: '15/05/2024',
    type: 'Payment',
    party: 'Silver Star Suppliers',
    debit: '-',
    credit: '₹ 1,20,450',
    balance: '₹ 5,62,950',
    narration: 'Advance payment',
  },
  {
    voucher: 'RCP-240515-008',
    date: '15/05/2024',
    type: 'Receipt',
    party: 'Pooja Jewellers',
    debit: '₹ 98,750',
    credit: '-',
    balance: '₹ 6,61,700',
    narration: 'Cheque received',
  },
  {
    voucher: 'EXP-240515-009',
    date: '15/05/2024',
    type: 'Expense',
    party: 'Office Rent',
    debit: '-',
    credit: '₹ 45,000',
    balance: '₹ 6,16,700',
    narration: 'Monthly rent - May 2024',
  },
  {
    voucher: 'RCP-240514-010',
    date: '14/05/2024',
    type: 'Receipt',
    party: 'Krishna Jewellers',
    debit: '₹ 1,56,000',
    credit: '-',
    balance: '₹ 7,72,700',
    narration: 'UPI payment received',
  },
];

const typeBadgeMap = {
  Receipt: 'badge--paid',
  Payment: 'badge--pending',
  Sales: 'badge--active',
  Purchase: 'badge--dispatched',
  Journal: 'badge--partial',
  Expense: 'badge--inactive',
};

const Accounts = () => {
  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Accounts</span>
        <span className="sep">›</span>
        <span className="current">Ledger</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Accounts &amp; Ledger</h2>
          <p className="module-header__desc">
            Manage receipts, payments, journals, and all financial transactions
          </p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline">
            <FiUpload size={14} /> Import
          </button>
          <button className="btn btn--outline">
            <FiDownload size={14} /> Export
          </button>
          <button className="btn btn--primary">
            <FiPlus size={14} /> New Voucher
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="module-summary">
        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#dcfce7', color: '#16a34a' }}
          >
            <FiArrowDownLeft size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Receivable</span>
            <span className="module-summary-card__value">₹ 8,45,200</span>
            <span className="module-summary-card__sub">From Customers</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#fee2e2', color: '#dc2626' }}
          >
            <FiArrowUpRight size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Payable</span>
            <span className="module-summary-card__value">₹ 5,67,800</span>
            <span className="module-summary-card__sub">To Suppliers</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#f5f3ff', color: '#8b5cf6' }}
          >
            <FiDollarSign size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Cash in Hand</span>
            <span className="module-summary-card__value">₹ 1,25,400</span>
            <span className="module-summary-card__sub">Current</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div
            className="module-summary-card__icon"
            style={{ background: '#eff6ff', color: '#3b82f6' }}
          >
            <FiCreditCard size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Bank Balance</span>
            <span className="module-summary-card__value">₹ 45,78,900</span>
            <span className="module-summary-card__sub">All Accounts</span>
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
            </select>
            <span className="module-toolbar__label">Entries Per Page</span>
          </div>
          <div className="module-toolbar__right">
            <div className="module-toolbar__search">
              <FiSearch size={14} />
              <input type="text" placeholder="Search transactions..." />
            </div>
            <button className="btn btn--outline btn--sm">
              <FiFilter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="module-table">
          <thead>
            <tr>
              <th>Voucher No.</th>
              <th>Date</th>
              <th>Type</th>
              <th>Party Name</th>
              <th className="text-right">Debit (₹)</th>
              <th className="text-right">Credit (₹)</th>
              <th className="text-right">Balance (₹)</th>
              <th>Narration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, i) => (
              <tr key={i}>
                <td className="font-medium text-blue">{txn.voucher}</td>
                <td>{txn.date}</td>
                <td>
                  <span className={`badge ${typeBadgeMap[txn.type]}`}>
                    {txn.type}
                  </span>
                </td>
                <td className="font-medium">{txn.party}</td>
                <td className={`text-right font-medium ${txn.debit !== '-' ? 'text-green' : ''}`}>
                  {txn.debit}
                </td>
                <td className={`text-right font-medium ${txn.credit !== '-' ? 'text-red' : ''}`}>
                  {txn.credit}
                </td>
                <td className="text-right font-medium">{txn.balance}</td>
                <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {txn.narration}
                </td>
                <td>
                  <div className="module-actions">
                    <button className="module-action-btn" title="View">
                      <FiEye size={14} />
                    </button>
                    <button className="module-action-btn" title="Edit">
                      <FiEdit2 size={14} />
                    </button>
                    <button className="module-action-btn" title="Print">
                      <FiPrinter size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="module-table-footer">
          <span>Showing 1 to 10 of 10 entries</span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled>
              <FiChevronLeft size={14} />
            </button>
            <button className="module-page-btn active">1</button>
            <button className="module-page-btn" disabled>
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
