import React from 'react';
import { FiAlertTriangle, FiPackage, FiXCircle } from 'react-icons/fi';
import { LuWeight } from 'react-icons/lu';
import { inventorySummaryData } from '../../data/mockData';
import './InventorySummary.css';

const InventorySummary = () => {
  const items = [
    { label: 'Items', value: inventorySummaryData.totalItems.toLocaleString(), icon: FiPackage, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Weight', value: '125.8 kg', icon: LuWeight, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Low Stock', value: inventorySummaryData.lowStockItems, icon: FiAlertTriangle, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Out of Stock', value: inventorySummaryData.outOfStockItems, icon: FiXCircle, color: '#dc2626', bg: '#fef2f2' },
  ];

  return (
    <div className="chart-card inventory-summary">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Stock Snapshot</h3>
        <select className="chart-card__select">
          <option>All Warehouses</option>
        </select>
      </div>
      <div className="inventory-summary__grid">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="inventory-metric">
              <div className="inventory-metric__icon" style={{ background: item.bg, color: item.color }}>
                <Icon size={18} />
              </div>
              <span className="inventory-metric__label">{item.label}</span>
              <span className="inventory-metric__value" style={{ color: i >= 2 ? item.color : 'var(--text-primary)' }}>{item.value}</span>
            </div>
          );
        })}
      </div>
      <div className="table-card__footer" style={{ padding: '12px 20px' }}>
        <a href="#" className="view-all-link">View Inventory Report <span>&rarr;</span></a>
      </div>
    </div>
  );
};

export default InventorySummary;
