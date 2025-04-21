import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentView, onViewChange }) => {
  return (
    <div className="sidebar">
      <div className="brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Detta3D
      </div>
      
      <nav className="sidebar-nav">
        <button 
          className={currentView === 'create' ? 'active' : ''} 
          onClick={() => onViewChange('create')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Cargar pedido
        </button>

        <button 
          className={currentView === 'list' ? 'active' : ''} 
          onClick={() => onViewChange('list')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3H15V5M9 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Ver pedidos
        </button>

        <button 
          className={currentView === 'completed' ? 'active' : ''} 
          onClick={() => onViewChange('completed')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Pedidos finalizados
        </button>
      </nav>
    </div>
  );
};

export default Sidebar; 