import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const employees = [
  { name: 'Amit Sharma', role: 'Sales Manager', phone: '+91 99999 11111', status: 'Active' },
  { name: 'Priya Deshmukh', role: 'Accountant', phone: '+91 88888 22222', status: 'Active' },
];

const EmployeeMaster = () => (
  <MasterPageTemplate
    title="Employee Master"
    description="Manage employee records"
    addButtonText="Add Employee"
    columns={[
      { key: 'name', label: 'Employee Name' },
      { key: 'role', label: 'Role' },
      { key: 'phone', label: 'Phone' },
      { key: 'status', label: 'Status' },
    ]}
    data={employees}
  />
);

export default EmployeeMaster;
