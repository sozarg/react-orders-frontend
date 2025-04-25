export const validateOrder = (values) => {
  const errors = {};

  if (!values.user_id || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(values.user_id.trim())) {
    errors.user_id = 'Nombre inválido. Solo letras y espacios';
  }

  if (!values.product || values.product.trim().length < 3) {
    errors.product = 'El producto debe tener al menos 3 caracteres';
  }

  if (!values.price || isNaN(values.price) || Number(values.price) <= 0) {
    errors.price = 'El precio debe ser un número mayor a 0';
  }

  return errors;
};
