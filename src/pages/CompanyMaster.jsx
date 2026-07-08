import React from 'react';
import { FiStar } from 'react-icons/fi';
import MasterPageTemplate from './MasterPageTemplate';
import { companiesApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'companyCode', label: 'Company Code', required: true, placeholder: 'e.g. SIL01' },
  { name: 'companyName', label: 'Company Name', required: true },
  { name: 'legalName', label: 'Legal Name' },
  { name: 'companyType', label: 'Company Type', placeholder: 'e.g. Private Limited' },
  { name: 'gstNo', label: 'GST No.', placeholder: '27ABCDE1234F1Z5' },
  { name: 'panNo', label: 'PAN No.', placeholder: 'ABCDE1234F' },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'alternatePhone', label: 'Alternate Phone' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'website', label: 'Website' },
  { name: 'addressLine1', label: 'Address Line 1', fullWidth: true },
  { name: 'addressLine2', label: 'Address Line 2', fullWidth: true },
  { name: 'city', label: 'City' },
  { name: 'state', label: 'State', required: true },
  { name: 'stateCode', label: 'State Code' },
  { name: 'pincode', label: 'Pincode' },
  { name: 'country', label: 'Country', required: true, defaultValue: 'India' },
  { name: 'currency', label: 'Currency', required: true, placeholder: 'INR', defaultValue: 'INR' },
  { name: 'defaultCompany', label: 'Set as Default Company', type: 'checkbox' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'companyCode', label: 'Company Code' },
  { key: 'companyName', label: 'Company Name' },
  { key: 'gstNo', label: 'GST No.' },
  { key: 'phone', label: 'Phone' },
  { key: 'state', label: 'State' },
  { key: 'status', label: 'Status' },
  {
    key: 'defaultCompany',
    label: 'Default',
    render: (row) => (row.defaultCompany ? <FiStar size={14} color="#f59e0b" /> : null),
  },
];

const CompanyMaster = () => (
  <MasterPageTemplate
    title="Company Master"
    description="Manage your company details"
    addButtonText="Add Company"
    columns={columns}
    formFields={formFields}
    api={companiesApi}
    rowActions={[
      {
        key: 'set-default',
        label: 'Set as Default',
        icon: <FiStar size={14} />,
        show: (row) => !row.defaultCompany,
        onClick: (row) => companiesApi.setDefault(row.id),
      },
    ]}
  />
);

export default CompanyMaster;
