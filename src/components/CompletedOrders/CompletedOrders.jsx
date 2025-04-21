import React, { useState, useEffect } from 'react';
import './CompletedOrders.css';
import { orderService } from '../../services/api';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const loadCompletedOrders = async () => {
      try {
        const data = await orderService.getCompletedOrders();
        setCompletedOrders(data);
      } catch (error) {
        console.error('Error al cargar pedidos completados:', error);
      }
    };

    loadCompletedOrders();
  }, []);

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