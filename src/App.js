import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [order, setOrder] = useState({ user_id: '', product: '' });
  const [message, setMessage] = useState({ order_id: '', user_id: '', content: '' });
  const [orderId, setOrderId] = useState('');
  const [fetchedOrder, setFetchedOrder] = useState(null);
  const [error, setError] = useState('');

  // Crear un pedido
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/orders/`, order);
      alert(`Pedido creado con ID: ${response.data.id}`);
      setOrder({ user_id: '', product: '' });
    } catch (err) {
      setError('Error al crear el pedido: ' + err.message);
    }
  };

  // Consultar un pedido
  const handleGetOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}`);
      setFetchedOrder(response.data);
      setError('');
    } catch (err) {
      setError('Error al consultar el pedido: ' + err.message);
    }
  };

  // Enviar un mensaje
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/messages/`, message);
      alert('Mensaje enviado con éxito');
      setMessage({ order_id: '', user_id: '', content: '' });
    } catch (err) {
      setError('Error al enviar el mensaje: ' + err.message);
    }
  };

  return (
    <div className="App">
      <h1>Detta3D - Gestión de Pedidos</h1>

      {/* Formulario para crear un pedido */}
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
          <button type="submit">Crear Pedido</button>
        </form>
      </div>

      {/* Formulario para consultar un pedido */}
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
          </div>
        )}
      </div>

      {/* Formulario para enviar un mensaje */}
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
            placeholder="ID del usuario"
            value={message.user_id}
            onChange={(e) => setMessage({ ...message, user_id: e.target.value })}
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