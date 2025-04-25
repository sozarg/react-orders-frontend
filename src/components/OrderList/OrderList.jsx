import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import './OrderList.css';

const OrderList = () => {
  const { orders, updateOrder } = useOrders();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado

  const handleEditClick = (order) => {
    setEditingId(order.id);
    setError('');
    setEditValues({
      user_id: order.user_id || '',
      product: order.product || '',
      price: order.price || '',
      status: order.status || '',
      payment_status: order.payment_status || '',
    });
  };

  const handleChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (orderId) => {
    const { user_id, product, price } = editValues;
    if (!user_id || !product || !price || Number(price) <= 0) {
      setError('Nombre, producto y precio mayor a 0 son obligatorios');
      return;
    }
  
    try {
      setLoading(true);
      await updateOrder(orderId, editValues);
      setEditingId(null);
      setEditValues({});
      setError('');
    } catch (err) {
      console.error('Error actualizando pedido:', err);
      setError('Hubo un error al guardar los cambios.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!orders.length) {
    return <p>No hay pedidos aún.</p>;
  }

  return (
    <div className="order-list">
      <h2>Pedidos</h2>
      {[...orders]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((order) => (
          <div key={order.id} className="order-item">
            {editingId === order.id ? (
              <>
                <input
                  type="text"
                  name="user_id"
                  value={editValues.user_id}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="product"
                  value={editValues.product}
                  onChange={handleChange}
                  placeholder="Producto"
                />
                <input
                  type="number"
                  name="price"
                  value={editValues.price}
                  onChange={handleChange}
                  placeholder="Precio"
                />
                <select
                  name="status"
                  value={editValues.status}
                  onChange={handleChange}
                >
                  <option value="">Método de entrega</option>
                  <option value="Retira en persona">Retira en persona</option>
                  <option value="Envío a domicilio">Envío a domicilio</option>
                  <option value="Retiro en correo">Retiro en correo</option>
                  <option value="No estoy seguro">No estoy seguro</option>
                </select>
                <select
                  name="payment_status"
                  value={editValues.payment_status}
                  onChange={handleChange}
                >
                  <option value="">Medio de pago</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Whatsapp">Whatsapp</option>
                  <option value="Mercadolibre">Mercadolibre</option>
                  <option value="Tienda online">Tienda online</option>
                </select>

                {error && <div className="error-message">{error}</div>}
                <button
                  onClick={() => handleSave(order.id)}
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
              </>
            ) : (
              <>
                <div><strong>Persona:</strong> {order.user_id}</div>
                <div><strong>Producto:</strong> {order.product}</div>
                <div><strong>Precio:</strong> ${order.price}</div>
                <div><strong>Entrega:</strong> {order.status}</div>
                <div><strong>Pago:</strong> {order.payment_status}</div>
                <div className="order-date">📅 {formatDate(order.created_at)}</div>
                <button onClick={() => handleEditClick(order)}>Editar 🖉</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default OrderList;
