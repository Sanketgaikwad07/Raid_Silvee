import React from 'react';
import { FiActivity, FiBox, FiCheckCircle } from 'react-icons/fi';
import StatsCardRow from '../components/dashboard/StatsCardRow';
import SalesOverviewChart from '../components/dashboard/SalesOverviewChart';
import SalesByCategoryChart from '../components/dashboard/SalesByCategoryChart';
import InventorySummary from '../components/dashboard/InventorySummary';
import NotificationsPanel from '../components/dashboard/NotificationsPanel';
import TasksPanel from '../components/dashboard/TasksPanel';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-brand">
          <div className="dashboard-brand__mark">
            <span className="dashboard-brand__spark">✦</span>
            <span className="dashboard-brand__name">Silvee<span>TM</span></span>
            <span className="dashboard-brand__tagline">925 Sterling Silver Jewellery</span>
          </div>
          <div>
            <p className="dashboard-hero__eyebrow">Executive overview</p>
            <h2 className="dashboard-hero__title">Simple, clear, and ready for today</h2>
            <p className="dashboard-hero__text">A calm view of sales, stock health, and work that needs attention.</p>
          </div>
        </div>
        <div className="dashboard-hero__metrics">
          <div className="dashboard-hero__metric">
            <FiActivity size={18} />
            <span>Business</span>
            <strong>On Track</strong>
          </div>
          <div className="dashboard-hero__metric">
            <FiBox size={18} />
            <span>Inventory</span>
            <strong>Stable</strong>
          </div>
          <div className="dashboard-hero__metric">
            <FiCheckCircle size={18} />
            <span>Priority</span>
            <strong>Review 4</strong>
          </div>
        </div>
      </div>

      <StatsCardRow />

      <div className="dashboard__focus-row">
        <SalesOverviewChart />
        <div className="dashboard__right-panels">
          <NotificationsPanel />
          <TasksPanel />
        </div>
      </div>

      <div className="dashboard__calm-row">
        <SalesByCategoryChart />
        <InventorySummary />
      </div>
    </div>
  );
};

export default Dashboard;
