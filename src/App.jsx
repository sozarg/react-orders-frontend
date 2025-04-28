import React, { useState } from 'react';
import { OrderProvider } from './features/orders/context';
import OrderForm from './features/orders/pages/OrderForm';
import OrderList from './features/orders/pages/OrderList';
import CompletedOrders from './features/orders/pages/CompletedOrders';
import DashboardLayout from './layout/DashboardLayout';

const App = () => {
  const [view, setView] = useState('create');

  const renderContent = () => {
    switch (view) {
      case 'list':
        return <OrderList />;
      case 'completed':
        return <CompletedOrders />;
      case 'create':
      default:
        return <OrderForm />;
    }
  };

  return (
    <OrderProvider>
      <DashboardLayout currentView={view} onViewChange={setView}>
        {renderContent()}
      </DashboardLayout>
    </OrderProvider>
  );
};

export default App;