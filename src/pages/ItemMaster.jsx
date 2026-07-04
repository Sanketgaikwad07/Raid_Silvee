import React from 'react';
import MasterPageTemplate from './MasterPageTemplate';

const items = [
  { name: 'CZ Ring (Premium)', category: 'Rings', unit: 'Piece', price: '₹ 2,450', stock: '54', status: 'Active' },
  { name: 'Silver Chain (22 inch)', category: 'Chains', unit: 'Piece', price: '₹ 1,280', stock: '120', status: 'Active' },
  { name: 'Heart Pendant', category: 'Pendants', unit: 'Piece', price: '₹ 1,450', stock: '34', status: 'Inactive' },
];

const ItemMaster = () => (
  <MasterPageTemplate
    title="Item Master"
    description="Manage your inventory items"
    addButtonText="Add Item"
    columns={[
      { key: 'name', label: 'Item Name' },
      { key: 'category', label: 'Category' },
      { key: 'unit', label: 'Unit' },
      { key: 'price', label: 'Price' },
      { key: 'stock', label: 'Stock' },
      { key: 'status', label: 'Status' },
    ]}
    data={items}
  />
);

export default ItemMaster;
