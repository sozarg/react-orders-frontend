import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatters';
import './CompletedOrders.css';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCompletedOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getCompletedOrders();
        setCompletedOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCompletedOrders();
  }, []);

  if (loading) return <div className="content-container">Cargando...</div>;
  
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="content-container">
      <h2 className="page-title">Pedidos finalizados</h2>
      
      {completedOrders.length === 0 ? (
        <p>No hay pedidos finalizados</p>
      ) : (
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
                <span>{formatPrice(order.price)}</span>
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
                <span>{formatDate(order.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedOrders; 