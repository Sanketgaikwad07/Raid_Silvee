import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';
import { itemsApi, categoriesApi, subCategoriesApi, unitsApi } from '../lib/mastersApi';
import { STATUS_OPTIONS } from '../lib/masterOptions';

const loadCategoryOptions = async () => {
  const data = await categoriesApi.list({ size: 200 });
  return data.content.map((c) => ({ value: String(c.id), label: c.name }));
};

const loadUnitOptions = async () => {
  const data = await unitsApi.list({ size: 200 });
  return data.content.map((u) => ({ value: String(u.id), label: `${u.name} (${u.abbreviation})` }));
};

const loadSubCategoryOptions = async (values) => {
  if (!values.categoryId) return [];
  const data = await subCategoriesApi.list({ categoryId: values.categoryId, size: 200 });
  return data.content.map((sc) => ({ value: String(sc.id), label: sc.name }));
};

const formFields = [
  { name: 'itemCode', label: 'Item Code', required: true },
  { name: 'name', label: 'Item Name', required: true },
  { name: 'categoryId', label: 'Category', type: 'select', required: true, numeric: true, loadOptions: loadCategoryOptions },
  {
    name: 'subCategoryId', label: 'Sub Category', type: 'select', numeric: true,
    dependsOn: 'categoryId', dependsOnLabel: 'Category', loadOptions: loadSubCategoryOptions,
  },
  { name: 'unitId', label: 'Unit', type: 'select', required: true, numeric: true, loadOptions: loadUnitOptions },
  { name: 'hsnCode', label: 'HSN Code', placeholder: '4-8 digit code' },
  { name: 'purchasePrice', label: 'Purchase Price', type: 'number', step: '0.01', defaultValue: 0 },
  { name: 'sellingPrice', label: 'Selling Price', type: 'number', step: '0.01', required: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS, defaultValue: 'ACTIVE' },
];

const columns = [
  { key: 'itemCode', label: 'Item Code' },
  { key: 'name', label: 'Item Name' },
  { key: 'categoryName', label: 'Category' },
  { key: 'subCategoryName', label: 'Sub Category' },
  { key: 'unitName', label: 'Unit' },
  { key: 'sellingPrice', label: 'Selling Price' },
  { key: 'status', label: 'Status' },
];

const ItemMaster = () => (
  <MasterPageTemplate
    title="Item Master"
    description="Manage your inventory items"
    addButtonText="Add Item"
    columns={columns}
    formFields={formFields}
    api={itemsApi}
  />
);

export default ItemMaster;
