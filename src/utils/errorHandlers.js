export const handleApiError = (error) => {
  if (error.response) {
    // Error de respuesta del servidor
    return error.response.data.detail || 'Error en el servidor';
  } else if (error.request) {
    // Error de red
    return 'Error de conexión. Por favor, verifica tu conexión a internet.';
  } else {
    // Error de configuración
    return 'Error en la aplicación';
  }
};

export const logError = (error, context) => {
  console.error(`Error en ${context}:`, {
    message: error.message,
    stack: error.stack,
    context
  });
}; 