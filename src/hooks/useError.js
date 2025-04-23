import { useState } from 'react';

export const useError = () => {
  const [error, setError] = useState('');

  const showError = (msg, duration = 4000) => {
    setError(msg);
    if (duration) {
      setTimeout(() => setError(''), duration);
    }
  };

  return { error, showError };
};
