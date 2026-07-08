import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { taxesApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'name', label: 'Tax Name', required: true, placeholder: 'GST 18%' },
  { name: 'code', label: 'Tax Code', required: true, placeholder: 'GST18' },
  { name: 'ratePercentage', label: 'Rate Percentage', type: 'number', step: '0.01', required: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'name', label: 'Tax Name' },
  { key: 'code', label: 'Code' },
  { key: 'ratePercentage', label: 'Rate %' },
  { key: 'cgstPercentage', label: 'CGST %' },
  { key: 'sgstPercentage', label: 'SGST %' },
  { key: 'igstPercentage', label: 'IGST %' },
  { key: 'status', label: 'Status' },
];

const TaxMaster = () => (
  <MasterPageTemplate
    title="Tax Master"
    description="Manage tax schemes"
    addButtonText="Add Tax"
    columns={columns}
    formFields={formFields}
    api={taxesApi}
  />
);

export default TaxMaster;
