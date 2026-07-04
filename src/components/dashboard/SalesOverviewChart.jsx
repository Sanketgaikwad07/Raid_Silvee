import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { salesOverviewData } from '../../data/mockData';
import './SalesOverviewChart.css';

const SalesOverviewChart = () => {
  const formatYAxis = (value) => {
    if (value >= 100000) return `${(value / 100000).toFixed(0)}L`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  return (
    <div className="chart-card sales-overview">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Sales Trend</h3>
        <div className="chart-card__legend">
          <span className="legend-dot" style={{ background: '#3b82f6' }}></span>
          <span className="legend-label">Sales</span>
          <span className="legend-dot" style={{ background: '#93c5fd' }}></span>
          <span className="legend-label">Margin</span>
        </div>
        <select className="chart-card__select">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={salesOverviewData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={formatYAxis} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13 }}
              formatter={(value) => [`INR ${value.toLocaleString('en-IN')}`, '']}
            />
            <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" name="Sales" />
            <Area type="monotone" dataKey="grossProfit" stroke="#93c5fd" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProfit)" name="Gross Profit" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesOverviewChart;
