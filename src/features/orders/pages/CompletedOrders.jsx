import React, { useEffect, useState } from 'react';
import { getCompletedOrders } from '../service';
import { formatDate, formatPrice } from '../../../utils/formatters';
import ErrorMessage from '../components/ErrorMessage';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompleted = async () => {
      setLoading(true);
      try {
        const data = await getCompletedOrders();
        setCompletedOrders(data);
      } catch (err) {
        setError(err.message || 'Error al cargar pedidos completados.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, []);

  if (loading) return <div>Cargando pedidos completados...</div>;

  return (
    <div className="completed-orders">
      <h2>Pedidos Completados</h2>

      <ErrorMessage message={error} />

      {completedOrders.length === 0 ? (
        <p>No hay pedidos completados todavía.</p>
      ) : (
        completedOrders.map((order) => (
          <div key={order.id} className="completed-order-item">
            <h3>{order.product}</h3>
            <p>Cliente: {order.user_id}</p>
            <p>Fecha: {formatDate(order.created_at)}</p>
            <p>Precio: {formatPrice(order.price)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedOrders;