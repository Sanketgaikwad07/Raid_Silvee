import React from 'react';
import {
  FiPackage,
  FiAlertTriangle,
  FiDollarSign,
  FiArchive,
  FiPlus,
  FiDownload,
  FiFilter,
  FiSearch,
  FiEye,
  FiEdit2,
  FiClock,
  FiTrash2,
} from 'react-icons/fi';
import './ModulePages.css';

const stockItems = [
  { code: 'ITM-001', name: 'CZ Ring (Premium)', category: 'Rings', unit: 'Pcs', current: 450, min: 100, max: 1000, rate: '₹ 545', value: '₹ 2,45,250', status: 'In Stock' },
  { code: 'ITM-002', name: 'Silver Chain 22 inch', category: 'Chains', unit: 'Pcs', current: 320, min: 50, max: 800, rate: '₹ 625', value: '₹ 2,00,000', status: 'In Stock' },
  { code: 'ITM-003', name: 'Heart Pendant Gold', category: 'Pendants', unit: 'Pcs', current: 85, min: 100, max: 500, rate: '₹ 1,720', value: '₹ 1,46,200', status: 'Low Stock' },
  { code: 'ITM-004', name: 'Bali Earrings Silver', category: 'Earrings', unit: 'Pair', current: 210, min: 50, max: 600, rate: '₹ 890', value: '₹ 1,86,900', status: 'In Stock' },
  { code: 'ITM-005', name: 'Casting Ring Platinum', category: 'Rings', unit: 'Pcs', current: 0, min: 50, max: 300, rate: '₹ 2,450', value: '₹ 0', status: 'Out of Stock' },
  { code: 'ITM-006', name: 'Nose Pin Diamond', category: 'Others', unit: 'Pcs', current: 540, min: 100, max: 1000, rate: '₹ 380', value: '₹ 2,05,200', status: 'In Stock' },
  { code: 'ITM-007', name: 'Mangalsutra Chain', category: 'Chains', unit: 'Pcs', current: 12, min: 50, max: 400, rate: '₹ 1,850', value: '₹ 22,200', status: 'Low Stock' },
  { code: 'ITM-008', name: 'Temple Pendant', category: 'Pendants', unit: 'Pcs', current: 178, min: 40, max: 500, rate: '₹ 1,200', value: '₹ 2,13,600', status: 'In Stock' },
  { code: 'ITM-009', name: 'Jhumka Earrings', category: 'Earrings', unit: 'Pair', current: 0, min: 30, max: 300, rate: '₹ 950', value: '₹ 0', status: 'Out of Stock' },
  { code: 'ITM-010', name: 'Cocktail Ring CZ', category: 'Rings', unit: 'Pcs', current: 95, min: 100, max: 500, rate: '₹ 780', value: '₹ 74,100', status: 'Low Stock' },
];

const statusBadge = (status) => {
  const map = {
    'In Stock': 'badge--active',
    'Low Stock': 'badge--pending',
    'Out of Stock': 'badge--inactive',
  };
  return map[status] || '';
};

const Inventory = () => {
  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Inventory</span>
        <span className="sep">›</span>
        <span className="current">Stock Items</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Inventory Management</h2>
          <p className="module-header__desc">Track stock levels, reorder points & inventory valuation</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline"><FiDownload size={14} /> Export</button>
          <button className="btn btn--primary"><FiPlus size={14} /> Add Item</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FiPackage size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Items</span>
            <span className="module-summary-card__value">3,247</span>
            <span className="module-summary-card__sub">In Stock</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <FiAlertTriangle size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Low Stock Items</span>
            <span className="module-summary-card__value">48</span>
            <span className="module-summary-card__sub">Need Reorder</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <FiDollarSign size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Stock Value</span>
            <span className="module-summary-card__value">₹ 2,74,52,600</span>
            <span className="module-summary-card__sub">At Cost</span>
          </div>
        </div>

        <div className="module-summary-card">
          <div className="module-summary-card__icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <FiArchive size={22} />
          </div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Dead Stock</span>
            <span className="module-summary-card__value">23</span>
            <span className="module-summary-card__sub">No Movement 90+ Days</span>
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
              <input type="text" placeholder="Search items..." />
            </div>
            <button className="btn btn--outline btn--sm"><FiFilter size={14} /> Filter</button>
          </div>
        </div>

        {/* Table */}
        <table className="module-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Category</th>
              <th className="text-center">Unit</th>
              <th className="text-right">Current Stock</th>
              <th className="text-right">Min Stock</th>
              <th className="text-right">Max Stock</th>
              <th className="text-right">Rate (₹)</th>
              <th className="text-right">Stock Value (₹)</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item, i) => (
              <tr key={i}>
                <td className="font-medium text-blue">{item.code}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td className="text-center">{item.unit}</td>
                <td className={`text-right font-medium ${item.current === 0 ? 'text-red' : ''}`}>{item.current.toLocaleString('en-IN')}</td>
                <td className="text-right">{item.min.toLocaleString('en-IN')}</td>
                <td className="text-right">{item.max.toLocaleString('en-IN')}</td>
                <td className="text-right">{item.rate}</td>
                <td className="text-right font-medium">{item.value}</td>
                <td className="text-center">
                  <span className={`badge ${statusBadge(item.status)}`}>{item.status}</span>
                </td>
                <td>
                  <div className="module-actions">
                    <button className="module-action-btn" title="View"><FiEye size={14} /></button>
                    <button className="module-action-btn" title="Edit"><FiEdit2 size={14} /></button>
                    <button className="module-action-btn" title="History"><FiClock size={14} /></button>
                    <button className="module-action-btn delete" title="Delete"><FiTrash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer / Pagination */}
        <div className="module-table-footer">
          <span>Showing 1 to 10 of 3,247 entries</span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled>Previous</button>
            <button className="module-page-btn active">1</button>
            <button className="module-page-btn">2</button>
            <button className="module-page-btn">3</button>
            <button className="module-page-btn">...</button>
            <button className="module-page-btn">325</button>
            <button className="module-page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
