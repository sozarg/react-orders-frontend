import React, { useEffect, useState, useMemo } from 'react';
import { useOrders } from '../context';
import { usePagination } from '../hooks';
import { formatDate, formatPrice } from '../../../utils/formatters';
import ErrorMessage from '../components/ErrorMessage';

const ITEMS_PER_PAGE = 10;

const OrderList = () => {
  const { orders, fetchOrders, updateOrder, loading, error } = useOrders();
  const [editingId, setEditingId] = useState(null);
  const [editedOrderData, setEditedOrderData] = useState({});

  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [orders]);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedOrders,
    nextPage,
    prevPage,
  } = usePagination(sortedOrders, ITEMS_PER_PAGE);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const startEditing = (order) => {
    setEditingId(order.id);
    setEditedOrderData({
      product: order.product,
      price: order.price,
      payment_status: order.payment_status,
      user_id: order.user_id,
      status: order.status,
      address: order.address,
      notes: order.notes,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async (id) => {
    await updateOrder(id, editedOrderData);
    setEditingId(null);
  };

  if (loading) return <div>Cargando pedidos...</div>;

  return (
    <div className="order-list">
      <h2>Lista de Pedidos</h2>

      <ErrorMessage message={error} />

      {paginatedOrders.map((order) => (
        <div key={order.id} className="order-item">
          {editingId === order.id ? (
            <>
              <input
                type="text"
                name="product"
                value={editedOrderData.product}
                onChange={handleEditChange}
              />
              <input
                type="number"
                name="price"
                value={editedOrderData.price}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="payment_status"
                value={editedOrderData.payment_status}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="user_id"
                value={editedOrderData.user_id}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="status"
                value={editedOrderData.status}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="address"
                value={editedOrderData.address}
                onChange={handleEditChange}
              />
              <textarea
                name="notes"
                value={editedOrderData.notes}
                onChange={handleEditChange}
              />

              <button onClick={() => saveChanges(order.id)}>Guardar</button>
              <button onClick={() => setEditingId(null)}>Cancelar</button>
            </>
          ) : (
            <>
              <h3>{order.product}</h3>
              <p>Precio: {formatPrice(order.price)}</p>
              <p>Pago: {order.payment_status}</p>
              <p>Cliente: {order.user_id}</p>
              <p>Entrega: {order.status}</p>
              <p>Dirección: {order.address}</p>
              <p>Notas: {order.notes}</p>
              <p>Fecha: {formatDate(order.created_at)}</p>

              <button onClick={() => startEditing(order)}>Editar</button>
            </>
          )}
        </div>
      ))}

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default OrderList;