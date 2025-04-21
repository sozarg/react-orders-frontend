const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'https://fastapi-orders-backend.onrender.com',
    timeout: 5000,
  },
  pagination: {
    itemsPerPage: 10,
  },
  dateFormat: 'dd/MM/yyyy HH:mm',
  currency: {
    locale: 'es-AR',
    currency: 'ARS'
  }
};

export default config; 