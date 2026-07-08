import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { suppliersApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'supplierCode', label: 'Supplier Code', required: true },
  { name: 'name', label: 'Supplier Name', required: true },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'gstNo', label: 'GST No.' },
  { name: 'addressLine1', label: 'Address', fullWidth: true },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State' },
  { name: 'pincode', label: 'Pincode' },
  { name: 'openingBalance', label: 'Opening Balance', type: 'number', step: '0.01', required: true, defaultValue: 0 },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'supplierCode', label: 'Code' },
  { key: 'name', label: 'Supplier Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
];

const SupplierMaster = () => (
  <MasterPageTemplate
    title="Supplier Master"
    description="Manage your supplier list"
    addButtonText="Add Supplier"
    columns={columns}
    formFields={formFields}
    api={suppliersApi}
  />
);

export default SupplierMaster;
