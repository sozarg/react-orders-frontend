export const validateOrder = (order) => {
    if (!order.product || !order.price || !order.payment_status || !order.user_id || !order.status) {
      return 'Todos los campos obligatorios deben ser completados.';
    }
    return null;
  };