import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const DashboardLayout = ({ children, currentView, onViewChange }) => {
  return (
    <div className="dashboard">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 