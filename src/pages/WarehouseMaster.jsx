import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const warehouses = [
  { name: 'Main Warehouse', location: 'Pune', capacity: '1200', status: 'Active' },
  { name: 'Export Warehouse', location: 'Mumbai', capacity: '800', status: 'Active' },
];

const WarehouseMaster = () => (
  <MasterPageTemplate
    title="Warehouse Master"
    description="Manage your warehouse locations"
    addButtonText="Add Warehouse"
    columns={[
      { key: 'name', label: 'Warehouse Name' },
      { key: 'location', label: 'Location' },
      { key: 'capacity', label: 'Capacity' },
      { key: 'status', label: 'Status' },
    ]}
    data={warehouses}
  />
);

export default WarehouseMaster;
