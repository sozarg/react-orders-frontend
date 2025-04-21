import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import OrderForm from './components/OrderForm/OrderForm';
import OrderList from './components/OrderList/OrderList';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import './App.css';
import './styles/variables.css';

const App = () => {
  const [view, setView] = useState('create');
  const [error, setError] = useState('');

  return (
    <div className="dashboard">
      <Sidebar 
        currentView={view} 
        onViewChange={setView} 
      />

      <div className="content">
        {view === 'create' && (
          <OrderForm onError={setError} />
        )}

        {view === 'list' && (
          <OrderList />
        )}

        {view === 'completed' && (
          <div>
            <h2>Pedidos finalizados</h2>
            <p>Lista de pedidos completados</p>
          </div>
        )}

        <ErrorMessage message={error} />
      </div>
    </div>
  );
};

export default App;
