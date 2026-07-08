import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { subCategoriesApi, categoriesApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const loadCategoryOptions = async () => {
  const data = await categoriesApi.list({ size: 200 });
  return data.content.map((c) => ({ value: String(c.id), label: c.name }));
};

const formFields = [
  { name: 'name', label: 'Sub Category Name', required: true },
  { name: 'categoryId', label: 'Category', type: 'select', required: true, numeric: true, loadOptions: loadCategoryOptions },
  { name: 'description', label: 'Description', fullWidth: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'categoryName', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
];

const SubCategoryMaster = () => (
  <MasterPageTemplate
    title="Sub Category Master"
    description="Manage sub categories for items"
    addButtonText="Add Sub Category"
    columns={columns}
    formFields={formFields}
    api={subCategoriesApi}
  />
);

export default SubCategoryMaster;
