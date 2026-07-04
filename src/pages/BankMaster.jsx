import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const banks = [
  { name: 'State Bank of India', branch: 'Pune', accountNo: '1234567890', status: 'Active' },
  { name: 'HDFC Bank', branch: 'Mumbai', accountNo: '0987654321', status: 'Active' },
];

const BankMaster = () => (
  <MasterPageTemplate
    title="Bank Master"
    description="Manage bank account details"
    addButtonText="Add Bank"
    columns={[
      { key: 'name', label: 'Bank Name' },
      { key: 'branch', label: 'Branch' },
      { key: 'accountNo', label: 'Account No' },
      { key: 'status', label: 'Status' },
    ]}
    data={banks}
  />
);

export default BankMaster;
