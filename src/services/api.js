// Crear este archivo para centralizar las llamadas a la API
import config from '../config/config';
import { handleApiError } from '../utils/errorHandlers';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: 'Error de conexión con el servidor'
    }));
    throw new Error(error.detail || 'Error en la solicitud');
  }
  return response.json();
};

const createRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Objeto que contiene todos los métodos de la API
export const orderService = {
  // Crear nuevo pedido
  createOrder: (data) => createRequest('/orders/', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Obtener todos los pedidos
  getAllOrders: () => createRequest('/orders/'),

  // Actualizar un pedido
  updateOrder: (id, data) => createRequest(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Obtener pedidos completados
  getCompletedOrders: () => createRequest('/orders/completed/')
}; 