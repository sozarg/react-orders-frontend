import React from 'react';
import './OrderForm.css';
import { useOrders } from '../../context/OrderContext';
import { useForm } from '../../hooks/useForm';
import { useError } from '../../hooks/useError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import DeliverySelector from '../DeliverySelector/DeliverySelector';
import PaymentSelector from '../PaymentSelector/PaymentSelector';
import NotesInput from '../NotesInput/NotesInput';

const OrderForm = () => {
  const { createOrder } = useOrders();
  const { values, handleChange, resetForm } = useForm();
  const { error, showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.user_id || !values.product || !values.price || Number(values.price) <= 0) {
      showError('Todos los campos obligatorios deben estar completos y el precio debe ser mayor a 0');
      return;
    }
  
    try {
      await createOrder(values);
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

      <DeliverySelector
        selectedMethod={values.status}
        onMethodSelect={(method) => handleChange({ target: { name: 'status', value: method } })}
        address={values.address}
        onAddressChange={(address) => handleChange({ target: { name: 'address', value: address } })}
      />

      <PaymentSelector
        selectedMethod={values.payment_status}
        onMethodSelect={(method) => handleChange({ target: { name: 'payment_status', value: method } })}
      />

      <NotesInput value={values.notes} onChange={handleChange} />

      <button type="submit" className="submit-button">
        Guardar Pedido
      </button>


      <ErrorMessage message={error} />
    </form>
  );
};

export default OrderForm;
