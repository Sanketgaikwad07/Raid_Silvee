import React from 'react';
import { topItemsData } from '../../data/mockData';
import './Tables.css';

const TopItemsTable = () => {
  return (
    <div className="chart-card table-card">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Top 5 Items by Sales</h3>
        <select className="chart-card__select">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>
      <div className="table-card__body">
        <table className="mini-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Weight</th>
              <th>Sales (₹)</th>
            </tr>
          </thead>
          <tbody>
            {topItemsData.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.weight}</td>
                <td className="text-right">{item.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-card__footer">
          <a href="#" className="view-all-link">View All Items <span>→</span></a>
        </div>
      </div>
    </div>
  );
};

export default TopItemsTable;
