import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const taxes = [
  { name: 'GST 18%', code: 'GST18', status: 'Active' },
  { name: 'GST 5%', code: 'GST5', status: 'Active' },
];

const TaxMaster = () => (
  <MasterPageTemplate
    title="Tax Master"
    description="Manage tax schemes"
    addButtonText="Add Tax"
    columns={[
      { key: 'name', label: 'Tax Name' },
      { key: 'code', label: 'Code' },
      { key: 'status', label: 'Status' },
    ]}
    data={taxes}
  />
);

export default TaxMaster;
