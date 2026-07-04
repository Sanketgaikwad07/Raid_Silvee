import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const financialYears = [
  { name: 'FY 2024-25', start: '01/04/2024', end: '31/03/2025', status: 'Active' },
  { name: 'FY 2023-24', start: '01/04/2023', end: '31/03/2024', status: 'Inactive' },
];

const FinancialYearMaster = () => (
  <MasterPageTemplate
    title="Financial Year"
    description="Manage financial year periods"
    addButtonText="Add Financial Year"
    columns={[
      { key: 'name', label: 'Year Name' },
      { key: 'start', label: 'Start Date' },
      { key: 'end', label: 'End Date' },
      { key: 'status', label: 'Status' },
    ]}
    data={financialYears}
  />
);

export default FinancialYearMaster;
