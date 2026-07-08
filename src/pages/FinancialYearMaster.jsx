import React from 'react';
import { FiStar } from 'react-icons/fi';
import MasterPageTemplate from './MasterPageTemplate';
import { financialYearsApi } from '../lib/mastersApi';
import { STATUS_OPTIONS, formatDate } from '../lib/masterOptions';

const formFields = [
  { name: 'name', label: 'Year Name', required: true, placeholder: 'FY2025-26' },
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'endDate', label: 'End Date', type: 'date', required: true },
  { name: 'activeYear', label: 'Set as Active Year', type: 'checkbox' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'name', label: 'Year Name' },
  { key: 'startDate', label: 'Start Date', render: (row) => formatDate(row.startDate) },
  { key: 'endDate', label: 'End Date', render: (row) => formatDate(row.endDate) },
  { key: 'status', label: 'Status' },
  {
    key: 'activeYear',
    label: 'Active',
    render: (row) => (row.activeYear ? <FiStar size={14} color="#f59e0b" /> : null),
  },
];

const FinancialYearMaster = () => (
  <MasterPageTemplate
    title="Financial Year"
    description="Manage financial year periods"
    addButtonText="Add Financial Year"
    columns={columns}
    formFields={formFields}
    api={financialYearsApi}
    rowActions={[
      {
        key: 'set-active',
        label: 'Set as Active',
        icon: <FiStar size={14} />,
        show: (row) => !row.activeYear,
        onClick: (row) => financialYearsApi.setActive(row.id),
      },
    ]}
  />
);

export default FinancialYearMaster;
