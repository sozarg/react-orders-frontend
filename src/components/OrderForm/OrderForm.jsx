import React from 'react';
import './OrderForm.css';
import { useOrder } from '../../context/OrderContext';
import { useForm } from '../../hooks/useForm';
import { useError } from '../../hooks/useError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import DeliverySelector from '../DeliverySelector/DeliverySelector';
import PaymentSelector from '../PaymentSelector/PaymentSelector';
import NotesInput from '../NotesInput/NotesInput';

const OrderForm = () => {
  const { addOrder } = useOrder();
  const { values, handleChange, resetForm } = useForm();
  const { error, showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.user_id || !values.product || !values.price) {
      showError('Todos los campos obligatorios deben estar completos');
      return;
    }

    try {
      await addOrder(values);
      resetForm();
    } catch (err) {
      showError('No se pudo guardar el pedido');
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Nuevo pedido</h2>

      <input
        type="text"
        name="user_id"
        placeholder="Nombre"
        value={values.user_id || ''}
        onChange={handleChange}
      />

      <input
        type="text"
        name="product"
        placeholder="Producto"
        value={values.product || ''}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={values.price || ''}
        onChange={handleChange}
      />

      <DeliverySelector value={values.status} onChange={handleChange} />
      <PaymentSelector value={values.payment_status} onChange={handleChange} />
      <NotesInput value={values.notes} onChange={handleChange} />

      <button type="submit">Guardar Pedido</button>

      <ErrorMessage message={error} />
    </form>
  );
};

export default OrderForm;
