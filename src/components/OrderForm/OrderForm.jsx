import React, { useState } from 'react';
import DeliverySelector from '../DeliverySelector/DeliverySelector';
import PaymentSelector from '../PaymentSelector/PaymentSelector';
import NotesInput from '../NotesInput/NotesInput';
import './OrderForm.css';

const OrderForm = ({ onError }) => {
  const [order, setOrder] = useState({
    user_id: '',
    product: '',
    price: '',
    status: '',
    payment_status: '',
    address: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí iría la lógica para enviar el pedido al backend
      console.log('Enviando pedido:', order);
      // Resetear el formulario después de enviar
      setOrder({
        user_id: '',
        product: '',
        price: '',
        status: '',
        payment_status: '',
        address: '',
        notes: ''
      });
    } catch (error) {
      onError('Error al crear el pedido: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Nuevo Pedido</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la persona"
          value={order.user_id}
          onChange={(e) => setOrder({ ...order, user_id: e.target.value })}
          required
        />

        <input
          type="text"
          className="form-control"
          placeholder="Producto"
          value={order.product}
          onChange={(e) => setOrder({ ...order, product: e.target.value })}
          required
        />

        <input
          type="number"
          className="form-control"
          placeholder="Precio"
          value={order.price}
          onChange={(e) => setOrder({ ...order, price: e.target.value })}
          required
        />

        <DeliverySelector
          selectedMethod={order.status}
          onMethodSelect={(method) => setOrder({ ...order, status: method })}
          address={order.address}
          onAddressChange={(address) => setOrder({ ...order, address: address })}
        />

        <PaymentSelector
          selectedMethod={order.payment_status}
          onMethodSelect={(method) => setOrder({ ...order, payment_status: method })}
        />

        <NotesInput
          value={order.notes}
          onChange={(notes) => setOrder({ ...order, notes: notes })}
        />

        <button type="submit" className="submit-button">
          Guardar Pedido
        </button>
      </form>
    </div>
  );
};

export default OrderForm; 