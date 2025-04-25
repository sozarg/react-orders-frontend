import React, { createContext, useContext, useState, useCallback } from 'react';
import { orderService } from '../services/api';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      await orderService.createOrder(orderData);
      await fetchOrders(); // Recargar la lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  const updateOrder = useCallback(async (orderId, updatedData) => {
    try {
      setLoading(true);
      setError(null);
      await orderService.updateOrder(orderId, updatedData);
      await fetchOrders(); // Recargar la lista
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  const value = {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders debe ser usado dentro de un OrderProvider');
  }
  return context;
};
