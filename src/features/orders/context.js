import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  getAllOrders,
  createOrder as createOrderService,
  updateOrder as updateOrderService,
} from './service';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Error al cargar pedidos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError('');
    try {
      await createOrderService(orderData);
      await fetchOrders();
    } catch (err) {
      setError(err.message || 'Error al crear pedido.');
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  const updateOrder = useCallback(async (orderId, updatedData) => {
    setLoading(true);
    setError('');
    try {
      await updateOrderService(orderId, updatedData);
      await fetchOrders();
    } catch (err) {
      setError(err.message || 'Error al actualizar pedido.');
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        createOrder,
        updateOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders debe usarse dentro de un OrderProvider');
  }
  return context;
};