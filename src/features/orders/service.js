import { createRequest } from '../../services/api';

// ENDPOINT BASE
const BASE_URL = '/orders';

// Traer todos los pedidos
export const getAllOrders = async () => {
  return await createRequest(`${BASE_URL}/`, 'GET');
};

// Crear un nuevo pedido
export const createOrder = async (orderData) => {
  return await createRequest(`${BASE_URL}/`, 'POST', orderData);
};

// Actualizar un pedido existente
export const updateOrder = async (orderId, updatedData) => {
  return await createRequest(`${BASE_URL}/${orderId}`, 'PATCH', updatedData);
};

// Traer pedidos completados (solo usado por CompletedOrders)
export const getCompletedOrders = async () => {
  return await createRequest(`${BASE_URL}/completed/`, 'GET');
};