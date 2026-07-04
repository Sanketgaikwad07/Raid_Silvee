import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const suppliers = [
  { name: 'Shree Silver Suppliers', phone: '+91 98888 12345', email: 'shree.supplier@example.com', status: 'Active' },
  { name: 'Om Silver World', phone: '+91 97777 12345', email: 'om.supplier@example.com', status: 'Active' },
  { name: 'Silver Star Suppliers', phone: '+91 96666 12345', email: 'silver.star@example.com', status: 'Inactive' },
];

const SupplierMaster = () => (
  <MasterPageTemplate
    title="Supplier Master"
    description="Manage your supplier list"
    addButtonText="Add Supplier"
    columns={[
      { key: 'name', label: 'Supplier Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' },
    ]}
    data={suppliers}
  />
);

export default SupplierMaster;
