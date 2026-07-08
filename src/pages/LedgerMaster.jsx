import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { ledgersApi } from '../lib/mastersApi';
import { STATUS_OPTIONS, LEDGER_TYPE_OPTIONS, BALANCE_TYPE_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'ledgerCode', label: 'Ledger Code', required: true },
  { name: 'name', label: 'Ledger Name', required: true },
  { name: 'ledgerType', label: 'Ledger Type', type: 'select', required: true, options: LEDGER_TYPE_OPTIONS },
  { name: 'openingBalance', label: 'Opening Balance', type: 'number', step: '0.01', required: true, defaultValue: 0 },
  { name: 'openingBalanceType', label: 'Opening Balance Side', type: 'select', required: true, options: BALANCE_TYPE_OPTIONS },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'ledgerCode', label: 'Code' },
  { key: 'name', label: 'Ledger Name' },
  { key: 'ledgerType', label: 'Type' },
  { key: 'openingBalance', label: 'Opening Balance' },
  { key: 'openingBalanceType', label: 'Side' },
  { key: 'status', label: 'Status' },
];

const LedgerMaster = () => (
  <MasterPageTemplate
    title="Ledger Master"
    description="Manage ledger accounts"
    addButtonText="Add Ledger"
    columns={columns}
    formFields={formFields}
    api={ledgersApi}
  />
);

export default LedgerMaster;
