import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { salesmenApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'salesmanCode', label: 'Salesman Code', required: true },
  { name: 'name', label: 'Name', required: true },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'territory', label: 'Territory' },
  { name: 'monthlyTarget', label: 'Monthly Target', type: 'number', step: '0.01' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'salesmanCode', label: 'Code' },
  { key: 'name', label: 'Salesman Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'territory', label: 'Territory' },
  { key: 'monthlyTarget', label: 'Monthly Target' },
  { key: 'status', label: 'Status' },
];

const SalesmanMaster = () => (
  <MasterPageTemplate
    title="Salesman Master"
    description="Manage your salesman team"
    addButtonText="Add Salesman"
    columns={columns}
    formFields={formFields}
    api={salesmenApi}
  />
);

export default SalesmanMaster;
