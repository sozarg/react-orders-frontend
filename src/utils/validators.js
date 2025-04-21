export const validateOrder = (order) => {
  const errors = {};

  if (!order.user_id?.trim()) {
    errors.user_id = 'El nombre es requerido';
  }

  if (!order.product?.trim()) {
    errors.product = 'El producto es requerido';
  }

  if (!order.price || order.price <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  }

  return errors;
}; 