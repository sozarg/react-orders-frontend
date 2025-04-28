import React from 'react';
import { PaymentMethods } from '../orderTypes';
import PropTypes from 'prop-types';

const PaymentSelector = ({ value, onChange, compact = false }) => {
  return (
    <div className={`payment-selector ${compact ? 'compact' : ''}`}>
      <label htmlFor="payment">Método de Pago:</label>
      <select id="payment" name="payment" value={value} onChange={onChange} required>
        <option value="">Seleccionar...</option>
        {PaymentMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
  );
};

PaymentSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

export default PaymentSelector;