import React, { useState, useEffect } from 'react';
import { useOrders } from '../../context/OrderContext';
import './OrderList.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ITEMS_PER_PAGE = 10;

const OrderList = () => {
  const { orders, updateOrder, fetchOrders } = useOrders();
  const [editingId, setEditingId] = useState(null);
  const [editedOrderData, setEditedOrderData] = useState({});
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await fetchOrders();
      } catch (err) {
        console.error('Error al cargar pedidos', err);
        setFormError('No se pudieron cargar los pedidos');
      } finally {
        setIsLoading(false);
      }
      
    };
    loadOrders();
  }, [fetchOrders]);

  const startEditingOrder = (order) => {
    setEditingId(order.id);
    setFormError('');
    setEditedOrderData({
      user_id: order.user_id || '',
      product: order.product || '',
      price: order.price || '',
      status: order.status || '',
      payment_status: order.payment_status || '',
    });
  };

  const handleEditChange = (e) => {
    setEditedOrderData({
      ...editedOrderData,
      [e.target.name]: e.target.value,
    });
  };

  const saveEditedOrder = async (orderId) => {
    const { user_id, product, price } = editedOrderData;
    if (!user_id || !product || !price || Number(price) <= 0) {
      setFormError('Nombre, producto y precio mayor a 0 son obligatorios');
      return;
    }

    try {
      setIsSaving(true);
      await updateOrder(orderId, editedOrderData);
      setEditingId(null);
      setEditedOrderData({});
      setFormError('');
    } catch (err) {
      console.error('Error actualizando pedido:', err);
      setFormError('Hubo un error al guardar los cambios.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginatedOrders = [...orders]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No hay pedidos registrados</h3>
        <p>¡Cargá el primer pedido para comenzar!</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h2>Pedidos</h2>

      {paginatedOrders.map((order) => (
        <div key={order.id} className="order-item">
          {editingId === order.id ? (
            <>
              <input
                type="text"
                name="user_id"
                value={editedOrderData.user_id}
                onChange={handleEditChange}
                placeholder="Nombre"
              />
              <input
                type="text"
                name="product"
                value={editedOrderData.product}
                onChange={handleEditChange}
                placeholder="Producto"
              />
              <input
                type="number"
                name="price"
                value={editedOrderData.price}
                onChange={handleEditChange}
                placeholder="Precio"
              />
              <select
                name="status"
                value={editedOrderData.status}
                onChange={handleEditChange}
              >
                <option value="" disabled hidden>Método de entrega</option>
                <option value="Retira en persona">Retira en persona</option>
                <option value="Envío a domicilio">Envío a domicilio</option>
                <option value="Retiro en correo">Retiro en correo</option>
                <option value="No estoy seguro">No estoy seguro</option>
              </select>

              <select
                name="payment_status"
                value={editedOrderData.payment_status}
                onChange={handleEditChange}
              >
                <option value="" disabled hidden>Medio de pago</option>
                <option value="Instagram">Instagram</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="Mercadolibre">Mercadolibre</option>
                <option value="Tienda online">Tienda online</option>
              </select>


              {formError && <ErrorMessage message={formError} />}
              <button
                onClick={() => saveEditedOrder(order.id)}
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </>
          ) : (
            <>
              <div><strong>Persona:</strong> {order.user_id}</div>
              <div><strong>Producto:</strong> {order.product}</div>
              <div><strong>Precio:</strong> ${order.price}</div>
              <div><strong>Entrega:</strong> {order.status}</div>
              <div><strong>Pago:</strong> {order.payment_status}</div>
              <div className="order-date">📅 {formatDate(order.created_at)}</div>
              <button onClick={() => startEditingOrder(order)}>Editar 🖉</button>
            </>
          )}
        </div>
      ))}

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default OrderList;
