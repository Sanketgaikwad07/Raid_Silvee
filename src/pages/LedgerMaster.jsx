import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const ledgers = [
  { name: 'Sales Ledger', type: 'Sales', status: 'Active' },
  { name: 'Purchase Ledger', type: 'Purchase', status: 'Active' },
];

const LedgerMaster = () => (
  <MasterPageTemplate
    title="Ledger Master"
    description="Manage ledger accounts"
    addButtonText="Add Ledger"
    columns={[
      { key: 'name', label: 'Ledger Name' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status' },
    ]}
    data={ledgers}
  />
);

export default LedgerMaster;
