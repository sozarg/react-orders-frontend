import React from 'react';
import './PaymentSelector.css';

const PaymentSelector = ({ selectedMethod, onMethodSelect, compact = false }) => {
  const paymentMethods = ['Instagram', 'Whatsapp', 'Mercadolibre', 'Tienda online'];

  return (
    <div className={`payment-section ${compact ? 'compact' : ''}`}>
      {!compact && <h3>Medio de pago</h3>}
      <div className={`options-group ${compact ? 'compact' : ''}`}>
        {paymentMethods.map((method) => (
          <button
            key={method}
            type="button"
            className={selectedMethod === method ? 'active' : ''}
            onClick={() => onMethodSelect(method)}
          >
            {compact ? method.slice(0, 1) : method}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentSelector; 