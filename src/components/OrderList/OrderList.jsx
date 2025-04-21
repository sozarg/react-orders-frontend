import React, { useState } from 'react';
import DeliverySelector from '../DeliverySelector/DeliverySelector';
import PaymentSelector from '../PaymentSelector/PaymentSelector';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditingOrder({ ...order });
  };

  const handleSave = async (id) => {
    try {
      // Aquí irá la llamada a tu API FastAPI para actualizar el pedido
      // await axios.put(`${API_URL}/orders/${id}`, editingOrder);
      
      // Actualizar la lista local
      setOrders(orders.map(order => 
        order.id === id ? editingOrder : order
      ));
      setEditingId(null);
      setEditingOrder(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingOrder(null);
  };

  return (
    <div className="orders-container">
      <h2 className="page-title">Todos los Pedidos</h2>
      
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Persona</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Método de entrega</th>
              <th>Medio de pago</th>
              <th>Notas adicionales</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                {editingId === order.id ? (
                  // Modo edición
                  <>
                    <td>
                      <input
                        type="text"
                        value={editingOrder.user_id}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          user_id: e.target.value
                        })}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editingOrder.product}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          product: e.target.value
                        })}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingOrder.price}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          price: e.target.value
                        })}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <DeliverySelector
                        selectedMethod={editingOrder.status}
                        onMethodSelect={(method) => setEditingOrder({
                          ...editingOrder,
                          status: method
                        })}
                        compact={true} // Para versión mini
                      />
                    </td>
                    <td>
                      <PaymentSelector
                        selectedMethod={editingOrder.payment_status}
                        onMethodSelect={(method) => setEditingOrder({
                          ...editingOrder,
                          payment_status: method
                        })}
                        compact={true} // Para versión mini
                      />
                    </td>
                    <td>
                      <textarea
                        value={editingOrder.notes}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder,
                          notes: e.target.value
                        })}
                        className="edit-textarea"
                      />
                    </td>
                    <td className="action-buttons">
                      <button 
                        onClick={() => handleSave(order.id)}
                        className="save-button"
                      >
                        ✓
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="cancel-button"
                      >
                        ✕
                      </button>
                    </td>
                  </>
                ) : (
                  // Modo visualización
                  <>
                    <td>{order.user_id}</td>
                    <td>{order.product}</td>
                    <td>${order.price}</td>
                    <td>{order.status}</td>
                    <td>{order.payment_status}</td>
                    <td>{order.notes}</td>
                    <td>
                      <button 
                        onClick={() => handleEdit(order)}
                        className="edit-button"
                      >
                        ✎
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList; 