import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { banksApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'bankName', label: 'Bank Name', required: true },
  { name: 'branch', label: 'Branch', required: true },
  { name: 'accountHolderName', label: 'Account Holder Name', required: true },
  { name: 'accountNo', label: 'Account No.', required: true },
  { name: 'ifscCode', label: 'IFSC Code', required: true, placeholder: 'SBIN0001234' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'bankName', label: 'Bank Name' },
  { key: 'branch', label: 'Branch' },
  { key: 'accountNo', label: 'Account No' },
  { key: 'ifscCode', label: 'IFSC' },
  { key: 'status', label: 'Status' },
];

const BankMaster = () => (
  <MasterPageTemplate
    title="Bank Master"
    description="Manage bank account details"
    addButtonText="Add Bank"
    columns={columns}
    formFields={formFields}
    api={banksApi}
  />
);

export default BankMaster;
