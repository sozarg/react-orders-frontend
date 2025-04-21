import React, { useState } from 'react';
import './CompletedOrders.css';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]); // Aquí vendrán los datos de FastAPI

  return (
    <div className="content-container">
      <h2 className="page-title">Pedidos finalizados</h2>
      
      <div className="completed-orders-grid">
        {completedOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-field">
              <label>Nombre</label>
              <span>{order.user_id}</span>
            </div>
            
            <div className="order-field">
              <label>Producto</label>
              <span>{order.product}</span>
            </div>
            
            <div className="order-field">
              <label>Precio</label>
              <span>${order.price}</span>
            </div>
            
            <div className="order-field">
              <label>Método de entrega</label>
              <span>{order.status}</span>
            </div>
            
            <div className="order-field">
              <label>Medio de pago</label>
              <span>{order.payment_status}</span>
            </div>
            
            <div className="order-field">
              <label>Fecha</label>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedOrders; 