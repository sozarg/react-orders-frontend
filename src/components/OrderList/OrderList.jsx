import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import './OrderList.css';
import { DeliveryMethods, PaymentMethods } from '../../constants/orderTypes';

const OrderList = () => {
  const { orders, updateOrder } = useOrders();
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleEditClick = (order) => {
    if (editingId === order.id) {
      setEditingId(null);
    } else {
      setEditingId(order.id);
      setEditedValues(order);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    await updateOrder(id, editedValues);
    setEditingId(null);
  };

  const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="order-list">
      <h2>Pedidos cargados</h2>
      {sortedOrders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-details">
            <strong>{order.user_id}</strong> - {order.product} - ${order.price}  
            <span className="order-date">{new Date(order.created_at).toLocaleDateString()}</span>
            <button onClick={() => handleEditClick(order)} className="edit-btn">✏️</button>
          </div>

          {editingId === order.id && (
            <div className="order-edit-form">
              <input
                name="user_id"
                value={editedValues.user_id}
                onChange={handleChange}
                placeholder="Nombre"
              />
              <input
                name="product"
                value={editedValues.product}
                onChange={handleChange}
                placeholder="Producto"
              />
              <input
                name="price"
                type="number"
                value={editedValues.price}
                onChange={handleChange}
                placeholder="Precio"
              />
              <select name="status" value={editedValues.status} onChange={handleChange}>
                {Object.values(DeliveryMethods).map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <select name="payment_status" value={editedValues.payment_status} onChange={handleChange}>
                {Object.values(PaymentMethods).map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <input
                name="address"
                value={editedValues.address}
                onChange={handleChange}
                placeholder="Dirección"
              />
              <input
                name="notes"
                value={editedValues.notes}
                onChange={handleChange}
                placeholder="Notas"
              />
              <button onClick={() => handleSave(order.id)} className="save-btn">Guardar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
