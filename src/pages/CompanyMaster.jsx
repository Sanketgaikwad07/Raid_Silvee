import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const companies = [
  { code: 'SILVEE925', name: 'Silvee925 Jewels Pvt. Ltd.', gstNo: '27ABCDE1234F1Z5', phone: '+91 88888 92525', email: 'info@silvee925.com', state: 'Maharashtra', status: 'Active', defaultValue: 'Yes' },
  { code: 'SILVEE925-2', name: 'Silvee925 Exports Pvt. Ltd.', gstNo: '27ABCDE5678G1Z6', phone: '+91 77770 92525', email: 'exports@silvee925.com', state: 'Maharashtra', status: 'Active', defaultValue: 'No' },
];

const CompanyMaster = () => (
  <MasterPageTemplate
    title="Company Master"
    description="Manage your company details"
    addButtonText="Add Company"
    columns={[
      { key: 'code', label: 'Company Code' },
      { key: 'name', label: 'Company Name' },
      { key: 'gstNo', label: 'GST No.' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'state', label: 'State' },
      { key: 'status', label: 'Status' },
      { key: 'defaultValue', label: 'Default' },
    ]}
    data={companies}
  />
);

export default CompanyMaster;
