import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [order, setOrder] = useState({ user_id: '', product: '', price: '', payment_status: '' });
  const [message, setMessage] = useState({ order_id: '', sender: '', content: '' }); // Cambiado user_id a sender
  const [orderId, setOrderId] = useState('');
  const [fetchedOrder, setFetchedOrder] = useState(null);
  const [error, setError] = useState('');

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/orders/`, order);
      alert(`Pedido creado con ID: ${response.data.id}`);
      setOrder({ user_id: '', product: '', price: '', payment_status: '' });
    } catch (err) {
      setError('Error al crear el pedido: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleGetOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}`);
      setFetchedOrder(response.data);
      setError('');
    } catch (err) {
      setError('Error al consultar el pedido: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/messages/`, message);
      alert('Mensaje enviado con éxito');
      setMessage({ order_id: '', sender: '', content: '' });
    } catch (err) {
      setError('Error al enviar el mensaje: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="App">
      <h1>Detta3D - Gestión de Pedidos</h1>

      <div>
        <h2>Crear Pedido</h2>
        <form onSubmit={handleCreateOrder}>
          <input
            type="text"
            placeholder="ID del usuario"
            value={order.user_id}
            onChange={(e) => setOrder({ ...order, user_id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Producto"
            value={order.product}
            onChange={(e) => setOrder({ ...order, product: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={order.price}
            onChange={(e) => {
              const value = e.target.value;
              setOrder({ ...order, price: value === '' ? '' : parseFloat(value) });
            }}
            required
          />
          <select
            value={order.payment_status}
            onChange={(e) => setOrder({ ...order, payment_status: e.target.value })}
            required
          >
            <option value="">Estado de pago</option>
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <button type="submit">Crear Pedido</button>
        </form>
      </div>

      <div>
        <h2>Consultar Pedido</h2>
        <form onSubmit={handleGetOrder}>
          <input
            type="text"
            placeholder="ID del pedido"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
          <button type="submit">Consultar</button>
        </form>
        {fetchedOrder && (
          <div>
            <h3>Detalles del Pedido</h3>
            <p>ID: {fetchedOrder.id}</p>
            <p>Usuario: {fetchedOrder.user_id}</p>
            <p>Producto: {fetchedOrder.product}</p>
            <p>Estado: {fetchedOrder.status}</p>
            <p>Pago: {fetchedOrder.payment_status}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Enviar Mensaje</h2>
        <form onSubmit={handleCreateMessage}>
          <input
            type="text"
            placeholder="ID del pedido"
            value={message.order_id}
            onChange={(e) => setMessage({ ...message, order_id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Remitente"
            value={message.sender}
            onChange={(e) => setMessage({ ...message, sender: e.target.value })}
            required
          />
          <textarea
            placeholder="Mensaje"
            value={message.content}
            onChange={(e) => setMessage({ ...message, content: e.target.value })}
            required
          />
          <button type="submit">Enviar Mensaje</button>
        </form>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;