// Crear este archivo para centralizar las llamadas a la API
const API_URL = process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: 'Error de conexión con el servidor'
    }));
    throw new Error(error.detail || 'Error en la solicitud');
  }
  return response.json();
};

export const orderService = {
  // Crear nuevo pedido
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error en createOrder:', error);
      throw new Error(error.message || 'Error al crear el pedido');
    }
  },

  // Obtener todos los pedidos
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_URL}/orders/`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error en getAllOrders:', error);
      throw new Error(error.message || 'Error al obtener los pedidos');
    }
  },

  // Actualizar un pedido
  updateOrder: async (orderId, updateData) => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) throw new Error('Error al actualizar el pedido');
    return response.json();
  },

  // Obtener pedidos completados
  getCompletedOrders: async () => {
    const response = await fetch(`${API_URL}/orders/completed/`);
    if (!response.ok) throw new Error('Error al obtener los pedidos completados');
    return response.json();
  }
}; 