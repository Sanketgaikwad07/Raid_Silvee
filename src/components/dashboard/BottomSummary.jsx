import React from 'react';
import { FiShoppingCart, FiDollarSign, FiCreditCard, FiArrowUpRight, FiArrowDownLeft, FiRepeat } from 'react-icons/fi';
import './BottomSummary.css';

const BottomSummary = () => {
  return (
    <div className="bottom-summary">
      {/* Cash & Bank Summary */}
      <div className="chart-card bottom-card">
        <div className="chart-card__header">
          <h3 className="chart-card__title">Cash & Bank Summary</h3>
          <select className="chart-card__select">
            <option>This Month</option>
          </select>
        </div>
        <div className="cash-bank-grid">
          <div className="cash-bank-item">
            <span className="cash-bank-label">Cash in Hand</span>
            <span className="cash-bank-value">₹ 1,25,400</span>
            <span className="cash-bank-change positive">↑ 12.5%</span>
            <span className="cash-bank-vs">vs Last Month: ₹ 1,11,500</span>
          </div>
          <div className="cash-bank-item">
            <span className="cash-bank-label">Bank Balance</span>
            <span className="cash-bank-value">₹ 45,78,900</span>
            <span className="cash-bank-change positive">↑ 8.7%</span>
            <span className="cash-bank-vs">vs Last Month: ₹ 42,12,500</span>
          </div>
        </div>
      </div>

      {/* Profit & Loss Summary */}
      <div className="chart-card bottom-card">
        <div className="chart-card__header">
          <h3 className="chart-card__title">Profit & Loss Summary</h3>
          <select className="chart-card__select">
            <option>This Month</option>
          </select>
        </div>
        <div className="pnl-grid">
          <div className="pnl-item">
            <span className="pnl-label">Total Sales</span>
            <span className="pnl-value">₹ 12,45,800</span>
          </div>
          <div className="pnl-item">
            <span className="pnl-label">Total Purchase</span>
            <span className="pnl-value">₹ 8,76,500</span>
          </div>
          <div className="pnl-item">
            <span className="pnl-label">Gross Profit</span>
            <span className="pnl-value">₹ 3,45,230</span>
            <span className="pnl-percent">27.72%</span>
          </div>
          <div className="pnl-item">
            <span className="pnl-label">Net Profit</span>
            <span className="pnl-value">₹ 2,85,450</span>
            <span className="pnl-percent">22.90%</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="chart-card bottom-card">
        <div className="chart-card__header">
          <h3 className="chart-card__title">Quick Links</h3>
        </div>
        <div className="quick-links-grid">
          {[
            { icon: FiShoppingCart, label: 'New Purchase', color: '#3b82f6' },
            { icon: FiDollarSign, label: 'New Sales', color: '#22c55e' },
            { icon: FiCreditCard, label: 'Add Expense', color: '#ef4444' },
            { icon: FiArrowDownLeft, label: 'Receive Payment', color: '#8b5cf6' },
            { icon: FiArrowUpRight, label: 'Make Payment', color: '#f59e0b' },
            { icon: FiRepeat, label: 'Stock Transfer', color: '#06b6d4' },
          ].map((link, i) => {
            const Icon = link.icon;
            return (
              <button key={i} className="quick-link-btn">
                <div className="quick-link-icon" style={{ background: `${link.color}12`, color: link.color }}>
                  <Icon size={20} />
                </div>
                <span className="quick-link-label">{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomSummary;
