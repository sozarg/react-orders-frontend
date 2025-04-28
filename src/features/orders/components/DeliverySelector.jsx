import React from 'react';
import { DeliveryMethods } from '../orderTypes';
import PropTypes from 'prop-types';

const DeliverySelector = ({ value, onChange, compact = false }) => {
  return (
    <div className={`delivery-selector ${compact ? 'compact' : ''}`}>
      <label htmlFor="delivery">Método de Entrega:</label>
      <select id="delivery" name="delivery" value={value} onChange={onChange} required>
        <option value="">Seleccionar...</option>
        {DeliveryMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
  );
};

DeliverySelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

export default DeliverySelector;