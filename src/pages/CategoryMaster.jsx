import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const categories = [
  { name: 'Rings', type: 'Product', status: 'Active' },
  { name: 'Pendants', type: 'Product', status: 'Active' },
  { name: 'Chains', type: 'Product', status: 'Active' },
];

const CategoryMaster = () => (
  <MasterPageTemplate
    title="Category Master"
    description="Manage your item categories"
    addButtonText="Add Category"
    columns={[
      { key: 'name', label: 'Category Name' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status' },
    ]}
    data={categories}
  />
);

export default CategoryMaster;
