import React from 'react';
import { DeliveryMethods } from '../features/orders/orderTypes';
import PropTypes from 'prop-types';

const DeliverySelector = ({ value, onChange, compact = false, isInvalid = false, onBlur }) => {
  return (
    <div className={`delivery-selector ${compact ? 'compact' : ''}`}>
      <label htmlFor="status">Método de Entrega</label>
      <select
        id="status"
        name="status"
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
        {DeliveryMethods.map((method) => (
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

DeliverySelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  compact: PropTypes.bool,
  isInvalid: PropTypes.bool,
  onBlur: PropTypes.func,
};

export default DeliverySelector;