import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const salesmen = [
  { name: 'Mahesh', email: 'mahesh@example.com', territory: 'Pune', status: 'Active' },
  { name: 'Rahul', email: 'rahul@example.com', territory: 'Mumbai', status: 'Active' },
];

const SalesmanMaster = () => (
  <MasterPageTemplate
    title="Salesman Master"
    description="Manage your salesman team"
    addButtonText="Add Salesman"
    columns={[
      { key: 'name', label: 'Salesman Name' },
      { key: 'email', label: 'Email' },
      { key: 'territory', label: 'Territory' },
      { key: 'status', label: 'Status' },
    ]}
    data={salesmen}
  />
);

export default SalesmanMaster;
