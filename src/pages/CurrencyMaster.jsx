import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const currencies = [
  { name: 'Indian Rupee', code: 'INR', symbol: '₹', status: 'Active' },
  { name: 'US Dollar', code: 'USD', symbol: '$', status: 'Inactive' },
];

const CurrencyMaster = () => (
  <MasterPageTemplate
    title="Currency Master"
    description="Manage currencies"
    addButtonText="Add Currency"
    columns={[
      { key: 'name', label: 'Currency Name' },
      { key: 'code', label: 'Code' },
      { key: 'symbol', label: 'Symbol' },
      { key: 'status', label: 'Status' },
    ]}
    data={currencies}
  />
);

export default CurrencyMaster;
