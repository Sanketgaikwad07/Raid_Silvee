import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { unitsApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'name', label: 'Unit Name', required: true },
  { name: 'abbreviation', label: 'Abbreviation', required: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'name', label: 'Unit Name' },
  { key: 'abbreviation', label: 'Abbreviation' },
  { key: 'status', label: 'Status' },
];

const UnitMaster = () => (
  <MasterPageTemplate
    title="Unit Master"
    description="Manage your measurement units"
    addButtonText="Add Unit"
    columns={columns}
    formFields={formFields}
    api={unitsApi}
  />
);

export default UnitMaster;
