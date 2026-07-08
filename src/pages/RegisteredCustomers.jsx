import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiArrowLeft, FiSearch } from 'react-icons/fi';
import './ModulePages.css';

const registeredCustomers = [
  { id: 'CUST-001', name: 'Shree Jewellers', contact: '+91 98765 43210', email: 'shree@silvee925.com', address: 'MK Theatre Building, Opp. Chiplun Urban Co-op Bank, BazarPeth, Chiplun, Maharashtra - 415605', status: 'Active' },
  { id: 'CUST-002', name: 'Mahalaxmi Ornaments', contact: '+91 91234 56789', email: 'mahadev@silvee925.com', address: 'C/6 Bhavna Park, Karelibaug, Vadodara, Gujarat - 390022', status: 'Active' },
  { id: 'CUST-003', name: 'Sai Jewellers', contact: '+91 99876 54321', email: 'sai@silvee925.com', address: 'Shop No. 8, Silver Market, Kalbadevi, Mumbai, Maharashtra - 400002', status: 'Inactive' },
  { id: 'CUST-004', name: 'Radha Silver Palace', contact: '+91 95678 12345', email: 'radha@silvee925.com', address: '14, Silver Street, Secunderabad, Telangana - 500003', status: 'Active' },
  { id: 'CUST-005', name: 'Agarwal Jewellers', contact: '+91 90123 45678', email: 'agarwal@silvee925.com', address: '35, Silver Lane, Karol Bagh, New Delhi - 110005', status: 'Active' },
];

const exportCsv = (data) => {
  const headers = ['Customer ID', 'Name', 'Contact', 'Email', 'Address', 'Status'];
  const rows = data.map((customer) => [
    customer.id,
    customer.name,
    customer.contact,
    customer.email,
    customer.address,
    customer.status,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'registered-customers.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const RegisteredCustomers = () => {
  const navigate = useNavigate();
  const activeCount = useMemo(() => registeredCustomers.filter((c) => c.status === 'Active').length, []);
  const inactiveCount = registeredCustomers.length - activeCount;

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Home</span>
        <span className="sep">›</span>
        <span>Sales</span>
        <span className="sep">›</span>
        <span className="current">Registered Customers</span>
      </div>

      <div className="module-header">
        <div>
          <h2 className="module-header__title">Registered Customers</h2>
          <p className="module-header__desc">View and export your registered customer list.</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--outline" onClick={() => navigate('/sales')}>
            <FiArrowLeft size={14} /> Back to Sales
          </button>
          <button className="btn btn--success" onClick={() => exportCsv(registeredCustomers)}>
            <FiDownload size={14} /> Export Customers
          </button>
        </div>
      </div>

      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon blue"><FiSearch size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Customers</span>
            <span className="module-summary-card__value">{registeredCustomers.length}</span>
            <span className="module-summary-card__sub">Registered Customers</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiSearch size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Active Customers</span>
            <span className="module-summary-card__value">{activeCount}</span>
            <span className="module-summary-card__sub">Ready to transact</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiSearch size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Inactive Customers</span>
            <span className="module-summary-card__value">{inactiveCount}</span>
            <span className="module-summary-card__sub">Follow-up needed</span>
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
              <input type="text" placeholder="Search customers..." />
            </div>
          </div>
        </div>

        <div className="module-table-wrap">
          <table className="module-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registeredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="font-medium text-blue">{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.contact}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td className="text-center">
                    <span className={`badge badge--${customer.status.toLowerCase()}`}>{customer.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="module-table-footer">
          <span>Showing 1 to {registeredCustomers.length} of {registeredCustomers.length} entries</span>
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

export default RegisteredCustomers;
