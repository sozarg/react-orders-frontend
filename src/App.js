import React, { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import OrderForm from './components/OrderForm/OrderForm';
import OrderList from './components/OrderList/OrderList';
import CompletedOrders from './components/CompletedOrders/CompletedOrders';
import { OrderProvider } from './context/OrderContext';
import './App.css';
import './styles/variables.css';

const App = () => {
  const [view, setView] = useState('create');
  const [, setError] = useState('');

  const renderContent = () => {
    switch (view) {
      case 'create':
        return <OrderForm onError={setError} />;
      case 'list':
        return <OrderList />;
      case 'completed':
        return <CompletedOrders />;
      default:
        return <OrderForm />;
    }
  };

  return (
    <OrderProvider>
      <DashboardLayout onViewChange={setView} currentView={view}>
        {renderContent()}
      </DashboardLayout>
    </OrderProvider>
  );
};

export default App;
