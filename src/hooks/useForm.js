import { useState, useCallback } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
  }, [initialState]);

  return {
    values,
    errors,
    handleChange,
    reset,
    setValues,
    setErrors
  };
}; 