import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { customersApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'customerCode', label: 'Customer Code', required: true },
  { name: 'name', label: 'Customer Name', required: true },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'gstNo', label: 'GST No.' },
  { name: 'addressLine1', label: 'Address', fullWidth: true },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'pincode', label: 'Pincode' },
  { name: 'creditLimit', label: 'Credit Limit', type: 'number', step: '0.01', defaultValue: 0 },
  { name: 'openingBalance', label: 'Opening Balance', type: 'number', step: '0.01', required: true, defaultValue: 0 },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'customerCode', label: 'Code' },
  { key: 'name', label: 'Customer Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'creditLimit', label: 'Credit Limit' },
  { key: 'status', label: 'Status' },
];

const CustomerMaster = () => (
  <MasterPageTemplate
    title="Customer Master"
    description="Manage your customer list"
    addButtonText="Add Customer"
    columns={columns}
    formFields={formFields}
    api={customersApi}
  />
);

export default CustomerMaster;
