import React from 'react';
import PropTypes from 'prop-types';

const DashboardLayout = ({ currentView, onViewChange, children }) => {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Pedidos</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => onViewChange('create')}>Crear Pedido</button>
            </li>
            <li>
              <button onClick={() => onViewChange('list')}>Lista de Pedidos</button>
            </li>
            <li>
              <button onClick={() => onViewChange('completed')}>Pedidos Completados</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
};

DashboardLayout.propTypes = {
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;