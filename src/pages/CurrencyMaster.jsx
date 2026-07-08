import React from 'react';
import { FiStar } from 'react-icons/fi';
import MasterPageTemplate from './MasterPageTemplate';
import { currenciesApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'code', label: 'Currency Code', required: true, placeholder: 'INR' },
  { name: 'name', label: 'Currency Name', required: true },
  { name: 'symbol', label: 'Symbol', required: true, placeholder: '₹' },
  { name: 'decimalPlaces', label: 'Decimal Places', type: 'number', required: true, defaultValue: 2 },
  { name: 'defaultCurrency', label: 'Set as Default Currency', type: 'checkbox' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Currency Name' },
  { key: 'symbol', label: 'Symbol' },
  { key: 'decimalPlaces', label: 'Decimals' },
  { key: 'status', label: 'Status' },
  {
    key: 'defaultCurrency',
    label: 'Default',
    render: (row) => (row.defaultCurrency ? <FiStar size={14} color="#f59e0b" /> : null),
  },
];

const CurrencyMaster = () => (
  <MasterPageTemplate
    title="Currency Master"
    description="Manage currencies"
    addButtonText="Add Currency"
    columns={columns}
    formFields={formFields}
    api={currenciesApi}
    rowActions={[
      {
        key: 'set-default',
        label: 'Set as Default',
        icon: <FiStar size={14} />,
        show: (row) => !row.defaultCurrency,
        onClick: (row) => currenciesApi.setDefault(row.id),
      },
    ]}
  />
);

export default CurrencyMaster;
