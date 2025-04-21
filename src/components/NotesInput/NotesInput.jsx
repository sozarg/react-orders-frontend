import React from 'react';
import './NotesInput.css';

const NotesInput = ({ value, onChange }) => {
  return (
    <textarea
      className="form-control notes-input"
      placeholder="Notas adicionales (opcional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default NotesInput; 