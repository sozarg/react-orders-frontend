import React from 'react';
import { PaymentMethods } from '../features/orders/orderTypes';
import PropTypes from 'prop-types';

const PaymentSelector = ({ value, onChange, compact = false, isInvalid = false, onBlur }) => {
  return (
    <div className={`payment-selector ${compact ? 'compact' : ''}`}>
      <label htmlFor="payment_status">Método de Pago</label>
      <select
        id="payment_status"
        name="payment_status"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        className={isInvalid ? 'is-invalid' : ''}
        aria-invalid={isInvalid}
      >
        <option value="" disabled hidden>
          Seleccionar…
        </option>
        {PaymentMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
      {isInvalid && (
        <div className="invalid-feedback d-block">Este campo es obligatorio.</div>
      )}
    </div>
  );
};

PaymentSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  compact: PropTypes.bool,
  isInvalid: PropTypes.bool,
  onBlur: PropTypes.func,
};

export default PaymentSelector;