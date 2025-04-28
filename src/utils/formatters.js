export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  export const formatPrice = (price) => {
    if (price === undefined || price === null) return '';
    return `$${Number(price).toLocaleString('es-AR')}`;
  };  