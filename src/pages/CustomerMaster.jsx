import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const customers = [
  { name: 'Shree Jewellers', phone: '+91 98765 43210', email: 'shree@example.com', status: 'Active' },
  { name: 'Mahalaxmi Ornaments', phone: '+91 91234 56789', email: 'mahalaxmi@example.com', status: 'Active' },
  { name: 'Sai Jewellers', phone: '+91 99876 54321', email: 'sai@example.com', status: 'Inactive' },
];

const CustomerMaster = () => (
  <MasterPageTemplate
    title="Customer Master"
    description="Manage your customer list"
    addButtonText="Add Customer"
    columns={[
      { key: 'name', label: 'Customer Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' },
    ]}
    data={customers}
  />
);

export default CustomerMaster;
