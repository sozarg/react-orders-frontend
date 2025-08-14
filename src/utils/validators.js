export const validateOrder = (order) => {
  if (!order.product || !order.price || !order.payment_status || !order.user_id || !order.status) {
    return 'Todos los campos obligatorios deben ser completados.';
  }
  return null;
};

export const getFirstInvalidField = (order) => {
  if (!order.product) return 'product';
  if (!order.price) return 'price';
  if (!order.payment_status) return 'payment_status';
  if (!order.user_id) return 'user_id';
  if (!order.status) return 'status';
  return '';
};

export const isValidPrice = (value) => {
  if (value === undefined || value === null || value === '') return false;
  const pattern = /^\d+(?:[\.,]\d{1,2})?$/; // locale-friendly decimal
  if (!pattern.test(String(value))) return false;
  const num = Number(String(value).replace(',', '.'));
  if (Number.isNaN(num)) return false;
  return num > 0;
};