import React from 'react';
import { useOrders } from '../context';
import { useForm } from '../hooks';
import { validateOrder } from '../../../utils/validators';
import DeliverySelector from '../components/DeliverySelector';
import PaymentSelector from '../components/PaymentSelector';
import NotesInput from '../components/NotesInput';
import ErrorMessage from '../components/ErrorMessage';

const OrderForm = () => {
  const { createOrder, loading, error } = useOrders();
  const { values, handleChange, reset: resetForm } = useForm({
    product: '',
    price: '',
    payment_status: '',
    user_id: '',
    status: '',
    address: '',
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateOrder(values);
    if (validationError) {
      alert(validationError); // Se podría mejorar con una notificación mejor
      return;
    }
    await createOrder(values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Crear Nuevo Pedido</h2>

      <label>Producto:</label>
      <input
        type="text"
        name="product"
        value={values.product}
        onChange={handleChange}
        required
      />

      <label>Precio:</label>
      <input
        type="number"
        name="price"
        value={values.price}
        onChange={handleChange}
        required
      />

      <PaymentSelector value={values.payment_status} onChange={handleChange} />
      
      <label>Nombre del Cliente:</label>
      <input
        type="text"
        name="user_id"
        value={values.user_id}
        onChange={handleChange}
        required
      />

      <DeliverySelector value={values.status} onChange={handleChange} />

      <label>Dirección (opcional):</label>
      <input
        type="text"
        name="address"
        value={values.address}
        onChange={handleChange}
      />

      <NotesInput value={values.notes} onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar Pedido'}
      </button>

      <ErrorMessage message={error} />
    </form>
  );
};

export default OrderForm;