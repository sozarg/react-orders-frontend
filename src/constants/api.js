import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'https://fastapi-orders-backend.onrender.com';

export const ENDPOINTS = {
  ORDERS: '/orders',
  COMPLETED_ORDERS: '/orders/completed'
};

// Creamos una instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Servicio de pedidos
export const orderService = {
  getAllOrders: async () => {
    const response = await api.get(ENDPOINTS.ORDERS);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post(ENDPOINTS.ORDERS, orderData);
    return response.data;
  },

  updateOrder: async (orderId, updatedData) => {
    const response = await api.patch(`${ENDPOINTS.ORDERS}/${orderId}`, updatedData);
    return response.data;
  },

  getCompletedOrders: async () => {
    const response = await api.get(ENDPOINTS.COMPLETED_ORDERS);
    return response.data;
  }
};
