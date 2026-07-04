import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const units = [
  { name: 'Gram', abbreviation: 'gm', status: 'Active' },
  { name: 'Piece', abbreviation: 'pcs', status: 'Active' },
  { name: 'Set', abbreviation: 'set', status: 'Inactive' },
];

const UnitMaster = () => (
  <MasterPageTemplate
    title="Unit Master"
    description="Manage your measurement units"
    addButtonText="Add Unit"
    columns={[
      { key: 'name', label: 'Unit Name' },
      { key: 'abbreviation', label: 'Abbreviation' },
      { key: 'status', label: 'Status' },
    ]}
    data={units}
  />
);

export default UnitMaster;
