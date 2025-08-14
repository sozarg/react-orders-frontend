export const DeliveryMethods = [
    'Retira en persona',
    'Retiro en correo',
    'Envío a domicilio',
  ];

  export const PaymentMethods = [
    'Efectivo',
    'Transferencia',
    'Instagram',
    'Tienda online',
    'Whatsapp',
  ];
  
  export const SUCCESS_MESSAGES = {
    ORDER_CREATED: 'Pedido creado exitosamente.',
    ORDER_UPDATED: 'Pedido actualizado exitosamente.',
  };
  
  export const ERROR_MESSAGES = {
    FETCH_ORDERS: 'No se pudieron cargar los pedidos.',
    SAVE_ORDER: 'No se pudo guardar el pedido.',
    UPDATE_ORDER: 'No se pudo actualizar el pedido.',
  };
  
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
  