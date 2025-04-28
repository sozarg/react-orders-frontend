// Métodos de entrega disponibles
export const DeliveryMethods = [
    'Retira en persona',
    'Retiro en correo',
    'Envío a domicilio',
  ];
  
  // Métodos de pago disponibles
  export const PaymentMethods = [
    'Efectivo',
    'Transferencia',
    'Instagram',
    'Tienda online',
    'Whatsapp',
  ];
  
  // Mensajes de éxito (puede ser extendido)
  export const SUCCESS_MESSAGES = {
    ORDER_CREATED: 'Pedido creado exitosamente.',
    ORDER_UPDATED: 'Pedido actualizado exitosamente.',
  };
  
  // Mensajes de error generales
  export const ERROR_MESSAGES = {
    FETCH_ORDERS: 'No se pudieron cargar los pedidos.',
    SAVE_ORDER: 'No se pudo guardar el pedido.',
    UPDATE_ORDER: 'No se pudo actualizar el pedido.',
  };
  
  // Tipado de un pedido (opcional si usás JSDoc o migrás a TS)
  export const OrderFields = [
    'product',
    'price',
    'payment_status',
    'user_id',
    'status',
    'address',
    'notes',
    'created_at',
  ];
  