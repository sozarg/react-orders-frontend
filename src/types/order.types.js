/**
 * @typedef {Object} Order
 * @property {string} id - ID único del pedido
 * @property {string} user_id - Nombre de la persona
 * @property {string} product - Nombre del producto
 * @property {number} price - Precio del producto
 * @property {string} status - Método de entrega
 * @property {string} payment_status - Medio de pago
 * @property {string} [address] - Dirección de entrega (opcional)
 * @property {string} [notes] - Notas adicionales (opcional)
 */

/**
 * @typedef {Object} OrderCreate
 * @property {string} user_id
 * @property {string} product
 * @property {number} price
 * @property {string} status
 * @property {string} payment_status
 * @property {string} [address]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} OrderUpdate
 * @property {string} [user_id]
 * @property {string} [product]
 * @property {number} [price]
 * @property {string} [status]
 * @property {string} [payment_status]
 * @property {string} [address]
 * @property {string} [notes]
 */ 