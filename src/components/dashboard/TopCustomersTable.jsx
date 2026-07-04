import React from 'react';
import { topCustomersData } from '../../data/mockData';
import './Tables.css';

const TopCustomersTable = () => {
  return (
    <div className="chart-card table-card">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Top 5 Customers</h3>
        <select className="chart-card__select">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>
      <div className="table-card__body">
        <table className="mini-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Sales (₹)</th>
              <th>Outstanding (₹)</th>
            </tr>
          </thead>
          <tbody>
            {topCustomersData.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.sales}</td>
                <td className="text-right">{item.outstanding}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-card__footer">
          <a href="#" className="view-all-link">View All Customers <span>→</span></a>
        </div>
      </div>
    </div>
  );
};

export default TopCustomersTable;
