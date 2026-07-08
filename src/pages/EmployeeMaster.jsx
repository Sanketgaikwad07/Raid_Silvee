import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { employeesApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'employeeCode', label: 'Employee Code', required: true },
  { name: 'fullName', label: 'Full Name', required: true },
  { name: 'designation', label: 'Designation' },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'employeeCode', label: 'Code' },
  { key: 'fullName', label: 'Employee Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status' },
  {
    key: 'hasUserAccount',
    label: 'Login Account',
    render: (row) => (row.hasUserAccount ? 'Linked' : '—'),
  },
];

const EmployeeMaster = () => (
  <MasterPageTemplate
    title="Employee Master"
    description="Manage employee records"
    addButtonText="Add Employee"
    columns={columns}
    formFields={formFields}
    api={employeesApi}
  />
);

export default EmployeeMaster;
