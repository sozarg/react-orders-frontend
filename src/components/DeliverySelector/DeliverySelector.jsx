import React from 'react';
import './DeliverySelector.css';

const DeliverySelector = ({ selectedMethod, onMethodSelect, address, onAddressChange, compact = false }) => {
  const deliveryMethods = [
    { icon: '🏪', label: 'Retira en persona' },
    { icon: '🚚', label: 'Envío a domicilio' },
    { icon: '📦', label: 'Retiro en correo' },
    { icon: '❓', label: 'No estoy seguro' }
  ];

  const needsAddress = selectedMethod === 'Envío a domicilio' || selectedMethod === 'Retiro en correo';

  return (
    <div className={`delivery-section ${compact ? 'compact' : ''}`}>
      {!compact && <h3>Método de entrega</h3>}
      <div className={`options-group ${compact ? 'compact' : ''}`}>
        {deliveryMethods.map(({ icon, label }) => (
          <button
            key={label}
            type="button"
            className={selectedMethod === label ? 'active' : ''}
            onClick={() => onMethodSelect(label)}
          >
            <span className="option-icon">{icon}</span>
            {!compact && label}
          </button>
        ))}
      </div>
      
      {needsAddress && !compact && (
        <input
          type="text"
          className="form-control address-input"
          placeholder="Dirección"
          value={address || ''}
          onChange={(e) => onAddressChange?.(e.target.value)}
        />
      )}
    </div>
  );
};

export default DeliverySelector; 