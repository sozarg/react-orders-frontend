// Crear este archivo para centralizar las llamadas a la API
const API_URL = process.env.REACT_APP_API_URL;

export const orderService = {
  // Crear nuevo pedido
  createOrder: async (orderData) => {
    const response = await fetch(`${API_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Error al crear el pedido');
    return response.json();
  },

  // Obtener todos los pedidos
  getAllOrders: async () => {
    const response = await fetch(`${API_URL}/orders/`);
    if (!response.ok) throw new Error('Error al obtener los pedidos');
    return response.json();
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