import React, { useEffect } from 'react';
import { useOrders } from '../../context/OrderContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import './OrderList.css';

const OrderList = () => {
  const { orders, loading, error, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <div className="content-container">Cargando...</div>;
  
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="content-container">
      <h2 className="page-title">Todos los Pedidos</h2>
      
      {orders.length === 0 ? (
        <p>No hay pedidos para mostrar</p>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Persona</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Método de entrega</th>
                <th>Medio de pago</th>
                <th>Notas</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.user_id}</td>
                  <td>{order.product}</td>
                  <td>{formatPrice(order.price)}</td>
                  <td>{order.status}</td>
                  <td>{order.payment_status}</td>
                  <td>{order.notes}</td>
                  <td>{formatDate(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList; 