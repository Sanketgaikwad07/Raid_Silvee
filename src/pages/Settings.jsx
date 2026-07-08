import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiSettings, FiGlobe, FiCalendar, FiUsers, FiLock,
  FiHardDrive, FiHash, FiPrinter, FiSave, FiX, FiStar
} from 'react-icons/fi';
import { financialYearsApi, usersApi } from '../lib/mastersApi';
import { PERMISSION_MODULE_OPTIONS, PERMISSION_ACTION_OPTIONS } from '../lib/masterOptions';
import { ApiError } from '../lib/apiClient';
import './ModulePages.css';
import './Settings.css';

const tabsList = [
  { key: 'company', label: 'Company Settings', icon: FiSettings, segment: 'company' },
  { key: 'general', label: 'General Settings', icon: FiGlobe, segment: 'general' },
  { key: 'financial', label: 'Financial Year', icon: FiCalendar, segment: 'financial-year' },
  { key: 'users', label: 'Users & Roles', icon: FiUsers, segment: 'users-roles' },
  { key: 'permissions', label: 'Permissions', icon: FiLock, segment: 'permissions' },
  { key: 'backup', label: 'Backup', icon: FiHardDrive, segment: 'backup' },
  { key: 'numbering', label: 'Document Numbering', icon: FiHash, segment: 'document-numbering' },
  { key: 'print', label: 'Print Settings', icon: FiPrinter, segment: 'print' },
];

const segmentToTabKey = Object.fromEntries(tabsList.map((t) => [t.segment, t.key]));
const tabKeyToSegment = Object.fromEntries(tabsList.map((t) => [t.key, t.segment]));

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
  const location = useLocation();
  const navigate = useNavigate();
  const currentSegment = location.pathname.split('/').filter(Boolean).pop();
  const [activeTab, setActiveTabState] = useState(segmentToTabKey[currentSegment] || 'company');

  useEffect(() => {
    const segment = location.pathname.split('/').filter(Boolean).pop();
    setActiveTabState(segmentToTabKey[segment] || 'company');
  }, [location.pathname]);

  const setActiveTab = (tabKey) => {
    setActiveTabState(tabKey);
    navigate(`/settings/${tabKeyToSegment[tabKey] || tabKey}`);
  };

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

  const [financialYears, setFinancialYears] = useState([]);
  const [fyLoading, setFyLoading] = useState(false);
  const [fyError, setFyError] = useState('');
  const [fyForm, setFyForm] = useState({ name: '', startDate: '', endDate: '' });
  const [fySaving, setFySaving] = useState(false);

  const loadFinancialYears = useCallback(async () => {
    setFyLoading(true);
    setFyError('');
    try {
      const data = await financialYearsApi.list({ size: 100 });
      setFinancialYears(data.content ?? []);
    } catch (err) {
      setFyError(err instanceof ApiError ? err.message : 'Failed to load financial years');
    } finally {
      setFyLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'financial') loadFinancialYears();
  }, [activeTab, loadFinancialYears]);

  const handleSetActiveYear = async (id) => {
    try {
      await financialYearsApi.setActive(id);
      await loadFinancialYears();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'Failed to activate financial year');
    }
  };

  const handleCreateFinancialYear = async () => {
    setFySaving(true);
    setFyError('');
    try {
      await financialYearsApi.create({
        name: fyForm.name,
        startDate: fyForm.startDate,
        endDate: fyForm.endDate,
        activeYear: false,
        status: 'ACTIVE',
      });
      setFyForm({ name: '', startDate: '', endDate: '' });
      await loadFinancialYears();
    } catch (err) {
      setFyError(err instanceof ApiError ? err.message : 'Failed to create financial year');
    } finally {
      setFySaving(false);
    }
  };

  const renderFinancialYear = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={sectionTitleStyle}>Financial Years</h3>
        {fyError && <p style={{ color: 'var(--accent-red, #dc2626)', fontSize: 13 }}>{fyError}</p>}
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
              {fyLoading && <tr><td colSpan={5} style={{ padding: 8, textAlign: 'center' }}>Loading...</td></tr>}
              {!fyLoading && financialYears.length === 0 && (
                <tr><td colSpan={5} style={{ padding: 8, textAlign: 'center' }}>No financial years yet</td></tr>
              )}
              {financialYears.map((fy) => (
                <tr key={fy.id}>
                  <td style={{ padding: '8px' }}>{fy.name}</td>
                  <td style={{ padding: '8px' }}>{fy.startDate}</td>
                  <td style={{ padding: '8px' }}>{fy.endDate}</td>
                  <td style={{ padding: '8px' }}>
                    {fy.activeYear ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FiStar size={12} color="#f59e0b" /> Active</span> : 'Inactive'}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    {!fy.activeYear && (
                      <button className="btn btn--outline" onClick={() => handleSetActiveYear(fy.id)}>Set Active</button>
                    )}
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
            <input
              style={inputStyle}
              value={fyForm.name}
              placeholder="FY2025-26"
              onChange={(e) => setFyForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Start Date</label>
            <input
              style={inputStyle}
              type="date"
              value={fyForm.startDate}
              onChange={(e) => setFyForm((prev) => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>End Date</label>
            <input
              style={inputStyle}
              type="date"
              value={fyForm.endDate}
              onChange={(e) => setFyForm((prev) => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button
          className="btn btn--primary"
          disabled={fySaving || !fyForm.name || !fyForm.startDate || !fyForm.endDate}
          onClick={handleCreateFinancialYear}
        >
          {fySaving ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [newUserForm, setNewUserForm] = useState({
    employeeCode: '', fullName: '', email: '', phone: '', designation: '', password: '',
  });
  const [selectedPermissions, setSelectedPermissions] = useState(() => new Set());
  const [creatingUser, setCreatingUser] = useState(false);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const data = await usersApi.list();
      setUsers(data ?? []);
    } catch (err) {
      setUsersError(err instanceof ApiError ? err.message : 'Failed to load users');
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'users') loadUsers();
  }, [activeTab, loadUsers]);

  const toggleUserStatus = async (user) => {
    try {
      await (user.active ? usersApi.deactivate(user.id) : usersApi.activate(user.id));
      await loadUsers();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'Failed to update user status');
    }
  };

  const togglePermission = (module, action) => {
    const key = `${module}:${action}`;
    setSelectedPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const handleCreateUser = async () => {
    setCreatingUser(true);
    setUsersError('');
    try {
      const permissions = Array.from(selectedPermissions).map((key) => {
        const [module, action] = key.split(':');
        return { module, action };
      });
      await usersApi.createEmployeeAccount({ ...newUserForm, permissions });
      setNewUserForm({ employeeCode: '', fullName: '', email: '', phone: '', designation: '', password: '' });
      setSelectedPermissions(new Set());
      await loadUsers();
    } catch (err) {
      setUsersError(err instanceof ApiError ? (err.errors?.join('; ') || err.message) : 'Failed to create user');
    } finally {
      setCreatingUser(false);
    }
  };

  const renderUsersRoles = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={sectionTitleStyle}>Users</h3>
        {usersError && <p style={{ color: 'var(--accent-red, #dc2626)', fontSize: 13 }}>{usersError}</p>}
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
              {usersLoading && <tr><td colSpan={5} style={{ padding: 8, textAlign: 'center' }}>Loading...</td></tr>}
              {!usersLoading && users.length === 0 && (
                <tr><td colSpan={5} style={{ padding: 8, textAlign: 'center' }}>No users yet</td></tr>
              )}
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: 8 }}>{u.fullName}</td>
                  <td style={{ padding: 8 }}>{u.email}</td>
                  <td style={{ padding: 8 }}>{u.role}</td>
                  <td style={{ padding: 8 }}>{u.active ? 'Active' : 'Inactive'}</td>
                  <td style={{ padding: 8, textAlign: 'right' }}>
                    {u.role !== 'ADMIN' && (
                      <button className="btn btn--outline" onClick={() => toggleUserStatus(u)}>
                        {u.active ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 style={sectionTitleStyle}>Add SALES User</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Employee Code</label>
            <input style={inputStyle} value={newUserForm.employeeCode} onChange={(e) => setNewUserForm((p) => ({ ...p, employeeCode: e.target.value }))} />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Full Name</label>
            <input style={inputStyle} value={newUserForm.fullName} onChange={(e) => setNewUserForm((p) => ({ ...p, fullName: e.target.value }))} />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Designation</label>
            <input style={inputStyle} value={newUserForm.designation} onChange={(e) => setNewUserForm((p) => ({ ...p, designation: e.target.value }))} />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Phone</label>
            <input style={inputStyle} value={newUserForm.phone} onChange={(e) => setNewUserForm((p) => ({ ...p, phone: e.target.value }))} />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" value={newUserForm.email} onChange={(e) => setNewUserForm((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div style={formFieldStyle}>
            <label style={labelStyle}>Password</label>
            <input style={inputStyle} type="password" value={newUserForm.password} onChange={(e) => setNewUserForm((p) => ({ ...p, password: e.target.value }))} />
          </div>
        </div>

        <h4 style={{ ...sectionTitleStyle, fontSize: 13, marginTop: 20 }}>Module Permissions</h4>
        <div className="card" style={{ maxHeight: 260, overflowY: 'auto' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8 }}>Module</th>
                {PERMISSION_ACTION_OPTIONS.map((action) => (
                  <th key={action} style={{ textAlign: 'center', padding: 8 }}>{action}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_MODULE_OPTIONS.map((module) => (
                <tr key={module}>
                  <td style={{ padding: 8 }}>{module.replace(/_/g, ' ')}</td>
                  {PERMISSION_ACTION_OPTIONS.map((action) => (
                    <td key={action} style={{ padding: 8, textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedPermissions.has(`${module}:${action}`)}
                        onChange={() => togglePermission(module, action)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <button
            className="btn btn--primary"
            disabled={creatingUser || !newUserForm.employeeCode || !newUserForm.fullName || !newUserForm.email || !newUserForm.password || selectedPermissions.size === 0}
            onClick={handleCreateUser}
          >
            {creatingUser ? 'Creating...' : 'Add User'}
          </button>
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
