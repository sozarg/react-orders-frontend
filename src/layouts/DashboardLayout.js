import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 