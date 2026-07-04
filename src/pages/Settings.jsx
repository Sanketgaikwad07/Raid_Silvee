import React, { useState } from 'react';
import {
  FiHome, FiSettings, FiGlobe, FiCalendar, FiUsers, FiLock,
  FiHardDrive, FiHash, FiPrinter, FiSave, FiX
} from 'react-icons/fi';
import './ModulePages.css';
import './Settings.css';

const tabsList = [
  { key: 'company', label: 'Company Settings', icon: FiSettings },
  { key: 'general', label: 'General Settings', icon: FiGlobe },
  { key: 'financial', label: 'Financial Year', icon: FiCalendar },
  { key: 'users', label: 'Users & Roles', icon: FiUsers },
  { key: 'permissions', label: 'Permissions', icon: FiLock },
  
  { key: 'backup', label: 'Backup', icon: FiHardDrive },
  { key: 'numbering', label: 'Document Numbering', icon: FiHash },
  { key: 'print', label: 'Print Settings', icon: FiPrinter },
];

const formFieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const labelStyle = {
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
};

const inputStyle = {
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  fontSize: '13px',
  fontFamily: 'var(--font-family)',
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  width: '100%',
  boxSizing: 'border-box',
};

const sectionTitleStyle = {
  fontSize: '15px',
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: '1px solid var(--border-color)',
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const renderCompanySettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Company Information */}
      <div>
        <h3 style={sectionTitleStyle}>Company Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Company Name</label>
            <input style={inputStyle} type="text" defaultValue="Silvee925" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Legal Name</label>
            <input style={inputStyle} type="text" defaultValue="Silvee925 Jewels Private Limited" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Company Type</label>
            <select style={inputStyle} className="settings-input" defaultValue="Private Limited">
              <option>Private Limited</option>
              <option>Public Limited</option>
              <option>LLP</option>
              <option>Partnership</option>
              <option>Sole Proprietorship</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>GSTIN</label>
            <input style={inputStyle} type="text" defaultValue="27ABCDE1234F1Z5" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>PAN No</label>
            <input style={inputStyle} type="text" defaultValue="ABCDE1234F" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Phone No</label>
            <input style={inputStyle} type="text" defaultValue="+91 88888 92525" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Email ID</label>
            <input style={inputStyle} type="email" defaultValue="info@silvee925.com" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Website</label>
            <input style={inputStyle} type="text" defaultValue="www.silvee925.com" className="settings-input" />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 style={sectionTitleStyle}>Address</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Address Line 1</label>
            <input style={inputStyle} type="text" defaultValue="3A, 3B, 2nd Floor, SB Road" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Address Line 2</label>
            <input style={inputStyle} type="text" defaultValue="Above Dominos Pizza" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>City</label>
            <input style={inputStyle} type="text" defaultValue="Pune" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>State</label>
            <select style={inputStyle} className="settings-input" defaultValue="Maharashtra">
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Gujarat</option>
              <option>Tamil Nadu</option>
              <option>Delhi</option>
              <option>Rajasthan</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Pin Code</label>
            <input style={inputStyle} type="text" defaultValue="411016" className="settings-input" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Country</label>
            <select style={inputStyle} className="settings-input" defaultValue="India">
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>UAE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Other Settings */}
      <div>
        <h3 style={sectionTitleStyle}>Other Settings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Currency</label>
            <select style={inputStyle} className="settings-input" defaultValue="INR - Indian Rupee">
              <option>INR - Indian Rupee</option>
              <option>USD - US Dollar</option>
              <option>GBP - British Pound</option>
              <option>AED - UAE Dirham</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Date Format</label>
            <select style={inputStyle} className="settings-input" defaultValue="DD/MM/YYYY">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Financial Year Start</label>
            <select style={inputStyle} className="settings-input" defaultValue="April">
              <option>January</option>
              <option>April</option>
              <option>July</option>
              <option>October</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Timezone</label>
            <select style={inputStyle} className="settings-input" defaultValue="UTC+05:30 Asia/Kolkata">
              <option>UTC+05:30 Asia/Kolkata</option>
              <option>UTC+00:00 GMT</option>
              <option>UTC-05:00 US/Eastern</option>
              <option>UTC+04:00 Asia/Dubai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-color)',
      }}>
        <button className="btn btn--outline"><FiX size={14} /> Cancel</button>
        <button className="btn btn--primary"><FiSave size={14} /> Save Changes</button>
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={sectionTitleStyle}>Localization & Defaults</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Default Currency</label>
            <select style={inputStyle} defaultValue="INR - Indian Rupee">
              <option>INR - Indian Rupee</option>
              <option>USD - US Dollar</option>
              <option>GBP - British Pound</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Date Format</label>
            <select style={inputStyle} defaultValue="DD/MM/YYYY">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Timezone</label>
            <select style={inputStyle} defaultValue="UTC+05:30 Asia/Kolkata">
              <option>UTC+05:30 Asia/Kolkata</option>
              <option>UTC+00:00 GMT</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 style={sectionTitleStyle}>Defaults for Transactions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Default Warehouse</label>
            <input style={inputStyle} defaultValue="Main Warehouse" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Default Payment Terms (days)</label>
            <input style={inputStyle} defaultValue="30" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Default Tax Scheme</label>
            <select style={inputStyle} defaultValue="GST 18%">
              <option>GST 0%</option>
              <option>GST 5%</option>
              <option>GST 12%</option>
              <option>GST 18%</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button className="btn btn--outline"><FiX size={14} /> Cancel</button>
        <button className="btn btn--primary"><FiSave size={14} /> Save</button>
      </div>
    </div>
  );

  const financialYears = [
    { id: 1, name: 'FY 2023-24', start: '01/04/2023', end: '31/03/2024', active: false },
    { id: 2, name: 'FY 2024-25', start: '01/04/2024', end: '31/03/2025', active: true },
  ];

  const renderFinancialYear = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={sectionTitleStyle}>Financial Years</h3>
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Start</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>End</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {financialYears.map((fy) => (
                <tr key={fy.id}>
                  <td style={{ padding: '8px' }}>{fy.name}</td>
                  <td style={{ padding: '8px' }}>{fy.start}</td>
                  <td style={{ padding: '8px' }}>{fy.end}</td>
                  <td style={{ padding: '8px' }}>{fy.active ? 'Active' : 'Inactive'}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    <button className="btn btn--outline">Set Active</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 style={sectionTitleStyle}>Create Financial Year</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Name</label>
            <input style={inputStyle} />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Start Date</label>
            <input style={inputStyle} type="date" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>End Date</label>
            <input style={inputStyle} type="date" />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button className="btn btn--primary">Create</button>
      </div>
    </div>
  );

  const mockUsers = [
    { id: 1, name: 'Admin', email: 'admin@silvee925.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Mahesh', email: 'mahesh@silvee925.com', role: 'Salesman', status: 'Active' },
  ];

  const renderUsersRoles = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={sectionTitleStyle}>Users</h3>
        <div className="card">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Role</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Status</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: 8 }}>{u.name}</td>
                  <td style={{ padding: 8 }}>{u.email}</td>
                  <td style={{ padding: 8 }}>{u.role}</td>
                  <td style={{ padding: 8 }}>{u.status}</td>
                  <td style={{ padding: 8, textAlign: 'right' }}>
                    <button className="btn btn--outline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 style={sectionTitleStyle}>Add User</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Full Name</label>
            <input style={inputStyle} />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Role</label>
            <select style={inputStyle}>
              <option>Salesman</option>
              <option>Manager</option>
              <option>Accountant</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <button className="btn btn--primary">Add User</button>
        </div>
      </div>
    </div>
  );

  const renderPermissions = () => (
    <div>
      <h3 style={sectionTitleStyle}>Role Permissions</h3>
      <div className="card">
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>Role</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Can Create</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Can Edit</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Can Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 8 }}>Super Admin</td>
              <td style={{ padding: 8 }}><input type="checkbox" defaultChecked /></td>
              <td style={{ padding: 8 }}><input type="checkbox" defaultChecked /></td>
              <td style={{ padding: 8 }}><input type="checkbox" defaultChecked /></td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>Salesman</td>
              <td style={{ padding: 8 }}><input type="checkbox" defaultChecked /></td>
              <td style={{ padding: 8 }}><input type="checkbox" defaultChecked /></td>
              <td style={{ padding: 8 }}><input type="checkbox" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  

  const renderBackup = () => (
    <div>
      <h3 style={sectionTitleStyle}>Backup</h3>
      <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 600 }}>Last Backup</div>
          <div style={{ color: 'var(--text-secondary)' }}>02 July 2026, 02:15 AM</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn--outline">Download</button>
          <button className="btn btn--primary">Backup Now</button>
        </div>
      </div>
    </div>
  );

  const renderNumbering = () => (
    <div>
      <h3 style={sectionTitleStyle}>Document Numbering</h3>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Invoice Prefix</label>
            <input style={inputStyle} defaultValue="INV-" />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>PO Prefix</label>
            <input style={inputStyle} defaultValue="PO-" />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn--primary">Save</button>
        </div>
      </div>
    </div>
  );

  const renderPrint = () => (
    <div>
      <h3 style={sectionTitleStyle}>Print Settings</h3>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Default Template</label>
            <select style={inputStyle}>
              <option>Standard</option>
              <option>Compact</option>
            </select>
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Include Company Logo</label>
            <select style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn--primary">Save</button>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (label) => (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: '12px',
      padding: '48px',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        background: '#eff6ff',
        color: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <FiSettings size={24} />
      </div>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '6px',
      }}>
        {label}
      </h3>
      <p style={{
        fontSize: '13px',
        color: 'var(--text-secondary)',
        margin: 0,
      }}>
        {label} configuration will appear here
      </p>
    </div>
  );

  const tabContent = () => {
    switch (activeTab) {
      case 'company':
        return renderCompanySettings();
      case 'general':
        return renderGeneralSettings();
      case 'financial':
        return renderFinancialYear();
      case 'users':
        return renderUsersRoles();
      case 'permissions':
        return renderPermissions();
      case 'backup':
        return renderBackup();
      case 'numbering':
        return renderNumbering();
      case 'print':
        return renderPrint();
      default:
        return renderPlaceholder('Settings');
    }
  };

  return (
    <div className="module-page">
      {/* Breadcrumb */}
      <div className="module-breadcrumb">
        <FiHome size={14} />
        <span className="sep">&rsaquo;</span>
        <span className="current">Settings</span>
      </div>

      {/* Page Header */}
      <div className="module-header">
        <div>
          <h2 className="module-header__title">Settings</h2>
          <p className="module-header__desc">Configure your system preferences and options</p>
        </div>
      </div>

      <div className="settings-overview">
        <div className="settings-overview__item">
          <span className="settings-overview__label">Active Company</span>
          <strong>Silvee925</strong>
        </div>
        <div className="settings-overview__item">
          <span className="settings-overview__label">Financial Year</span>
          <strong>FY 2024-25</strong>
        </div>
        <div className="settings-overview__item">
          <span className="settings-overview__label">Last Backup</span>
          <strong>02 Jul 2026</strong>
        </div>
      </div>

      <div className="settings-shell">
        <aside className="settings-nav">
          {tabsList.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                className={`settings-nav__item ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        <section className="settings-panel">
          {tabContent()}
        </section>
      </div>

      {/* Inline focus styles for inputs */}
      <style>{`
        .settings-input:focus {
          border-color: var(--accent-blue) !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12) !important;
        }
        .settings-input:hover:not(:focus) {
          border-color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
};

export default Settings;
