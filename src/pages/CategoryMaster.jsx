import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { categoriesApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const formFields = [
  { name: 'name', label: 'Category Name', required: true },
  { name: 'type', label: 'Type', placeholder: 'e.g. Product' },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'name', label: 'Category Name' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
];

const CategoryMaster = () => (
  <MasterPageTemplate
    title="Category Master"
    description="Manage your item categories"
    addButtonText="Add Category"
    columns={columns}
    formFields={formFields}
    api={categoriesApi}
  />
);

export default CategoryMaster;
