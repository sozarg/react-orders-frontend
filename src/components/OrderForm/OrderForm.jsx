import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useOrders } from '../../context/OrderContext';
import { DeliveryMethods, PaymentMethods } from '../../constants/orderTypes';
import { validateOrder } from '../../utils/validators';
import DeliverySelector from '../DeliverySelector/DeliverySelector';
import PaymentSelector from '../PaymentSelector/PaymentSelector';
import NotesInput from '../NotesInput/NotesInput';
import './OrderForm.css';

const initialState = {
  user_id: '',
  product: '',
  price: '',
  status: '',
  payment_status: '',
  address: '',
  notes: ''
};

const OrderForm = () => {
  const { values, handleChange, reset, errors, setErrors } = useForm(initialState);
  const { createOrder, error: submitError } = useOrders();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateOrder(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createOrder(values);
      reset();
    } catch (error) {
      // El error ya está manejado por el contexto
      console.error('Error al crear pedido:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Nuevo Pedido</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          className={`form-control ${errors.user_id ? 'error' : ''}`}
          placeholder="Nombre de la persona"
          value={values.user_id}
          onChange={handleChange}
        />
        {errors.user_id && <span className="error-message">{errors.user_id}</span>}

        <input
          type="text"
          name="product"
          className={`form-control ${errors.product ? 'error' : ''}`}
          placeholder="Producto"
          value={values.product}
          onChange={handleChange}
        />
        {errors.product && <span className="error-message">{errors.product}</span>}

        <input
          type="number"
          name="price"
          className={`form-control ${errors.price ? 'error' : ''}`}
          placeholder="Precio"
          value={values.price}
          onChange={handleChange}
        />
        {errors.price && <span className="error-message">{errors.price}</span>}

        <DeliverySelector
          selectedMethod={values.status}
          onMethodSelect={(method) => handleChange({
            target: { name: 'status', value: method }
          })}
          address={values.address}
          onAddressChange={(address) => handleChange({
            target: { name: 'address', value: address }
          })}
        />

        <PaymentSelector
          selectedMethod={values.payment_status}
          onMethodSelect={(method) => handleChange({
            target: { name: 'payment_status', value: method }
          })}
        />

        <NotesInput
          value={values.notes}
          onChange={(notes) => handleChange({
            target: { name: 'notes', value: notes }
          })}
        />

        {submitError && <div className="error-message">{submitError}</div>}

        <button type="submit" className="submit-button">
          Guardar Pedido
        </button>
      </form>
    </div>
  );
};

export default OrderForm; 