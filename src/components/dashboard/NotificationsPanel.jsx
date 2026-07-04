import React from 'react';
import { FiAlertTriangle, FiDollarSign, FiFileText, FiRefreshCw, FiHardDrive } from 'react-icons/fi';
import { notificationsData } from '../../data/mockData';
import './SidePanel.css';

const iconMap = {
  alert: FiAlertTriangle,
  payment: FiDollarSign,
  invoice: FiFileText,
  return: FiRefreshCw,
  backup: FiHardDrive,
};

const NotificationsPanel = () => {
  return (
    <div className="chart-card side-panel">
      <div className="side-panel__header">
        <h3 className="chart-card__title">Today Alerts</h3>
        <a href="#" className="side-panel__view-all">View All</a>
      </div>
      <div className="side-panel__list">
        {notificationsData.slice(0, 3).map((n, i) => {
          const Icon = iconMap[n.icon];
          return (
            <div key={n.id} className="notification-item" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="notification-item__icon" style={{ background: `${n.color}15`, color: n.color }}>
                <Icon size={16} />
              </div>
              <div className="notification-item__content">
                <span className="notification-item__title">{n.title}</span>
                <span className="notification-item__desc">{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPanel;
