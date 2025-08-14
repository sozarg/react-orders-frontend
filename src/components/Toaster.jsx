import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const Toaster = () => {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState('success');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handler = (e) => {
      const { variant: v = 'success', message: m = '' } = e.detail || {};
      setVariant(v);
      setMessage(m);
      setShow(true);
    };
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, []);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 3000 }} aria-live="polite" aria-atomic="true">
      <Toast onClose={() => setShow(false)} show={show} delay={3500} autohide bg={variant === 'success' ? 'dark' : 'danger'} role="status">
        <Toast.Body style={{ color: '#fff' }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toaster;


