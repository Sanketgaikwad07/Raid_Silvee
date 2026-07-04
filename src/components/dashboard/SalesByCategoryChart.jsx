import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { salesByCategoryData } from '../../data/mockData';
import './SalesByCategoryChart.css';

const SalesByCategoryChart = () => {
  return (
    <div className="chart-card category-chart">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Collection Mix</h3>
        <select className="chart-card__select">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      <div className="category-chart__body">
        <div className="category-chart__donut">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={salesByCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {salesByCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="category-chart__center">
            <span className="category-chart__total-value">12.4L</span>
            <span className="category-chart__total-label">This Month</span>
          </div>
        </div>
        <div className="category-chart__legend">
          {salesByCategoryData.map((item) => (
            <div key={item.name} className="category-legend-item">
              <span className="category-legend-dot" style={{ background: item.color }}></span>
              <span className="category-legend-name">{item.name}</span>
              <span className="category-legend-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesByCategoryChart;
