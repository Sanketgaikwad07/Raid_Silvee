import React from 'react';
import { FiStar } from 'react-icons/fi';
import MasterPageTemplate from './MasterPageTemplate';
import { warehousesApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'warehouseCode', label: 'Warehouse Code', required: true },
  { name: 'name', label: 'Warehouse Name', required: true },
  { name: 'location', label: 'Location' },
  { name: 'capacity', label: 'Capacity', type: 'number' },
  { name: 'defaultWarehouse', label: 'Set as Default Warehouse', type: 'checkbox' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'warehouseCode', label: 'Code' },
  { key: 'name', label: 'Warehouse Name' },
  { key: 'location', label: 'Location' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'status', label: 'Status' },
  {
    key: 'defaultWarehouse',
    label: 'Default',
    render: (row) => (row.defaultWarehouse ? <FiStar size={14} color="#f59e0b" /> : null),
  },
];

const WarehouseMaster = () => (
  <MasterPageTemplate
    title="Warehouse Master"
    description="Manage your warehouse locations"
    addButtonText="Add Warehouse"
    columns={columns}
    formFields={formFields}
    api={warehousesApi}
    rowActions={[
      {
        key: 'set-default',
        label: 'Set as Default',
        icon: <FiStar size={14} />,
        show: (row) => !row.defaultWarehouse,
        onClick: (row) => warehousesApi.setDefault(row.id),
      },
    ]}
  />
);

export default WarehouseMaster;
