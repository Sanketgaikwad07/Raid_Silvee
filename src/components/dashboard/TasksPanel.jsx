import React from 'react';
import { tasksData } from '../../data/mockData';
import './SidePanel.css';

const TasksPanel = () => {
  return (
    <div className="chart-card side-panel tasks-panel">
      <div className="side-panel__header">
        <h3 className="chart-card__title">Priority Work</h3>
        <a href="#" className="side-panel__view-all">View All</a>
      </div>
      <div className="side-panel__list">
        {tasksData.slice(0, 3).map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-item__checkbox"></div>
            <span className="task-item__title">{task.title}</span>
            <span className="task-item__badge" style={{ background: `${task.color}15`, color: task.color }}>
              {task.count} Pending
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPanel;
