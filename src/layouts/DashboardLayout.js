import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, onViewChange, currentView }) => {
  return (
    <div className="dashboard">
      <Sidebar onViewChange={onViewChange} currentView={currentView} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
