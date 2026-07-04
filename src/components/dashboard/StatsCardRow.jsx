import React from 'react';
import { FiTrendingUp, FiShoppingBag, FiPackage, FiAlertCircle } from 'react-icons/fi';
import './StatsCardRow.css';

const simpleStats = [
  {
    id: 1,
    title: 'Sales Mood',
    value: 'Healthy',
    note: 'Good movement today',
    icon: FiTrendingUp,
    tone: 'blue',
  },
  {
    id: 2,
    title: 'Orders',
    value: '36',
    note: 'Open invoices',
    icon: FiShoppingBag,
    tone: 'green',
  },
  {
    id: 3,
    title: 'Stock Health',
    value: 'Stable',
    note: '48 need review',
    icon: FiPackage,
    tone: 'amber',
  },
  {
    id: 4,
    title: 'Attention',
    value: '4',
    note: 'Priority tasks',
    icon: FiAlertCircle,
    tone: 'rose',
  },
];

const StatsCardRow = () => {
  return (
    <div className="stats-card-row">
      {simpleStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className={`stats-card stats-card--${stat.tone}`}>
            <div className="stats-card__icon">
              <Icon size={20} />
            </div>
            <div className="stats-card__content">
              <span className="stats-card__title">{stat.title}</span>
              <span className="stats-card__value">{stat.value}</span>
              <span className="stats-card__vs">{stat.note}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCardRow;
