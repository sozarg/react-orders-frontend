import React from 'react';
import PropTypes from 'prop-types';

const NotesInput = ({ value, onChange }) => {
  return (
    <div className="notes-input mt-3">
      <label htmlFor="notes">Notas</label>
      <textarea
        id="notes"
        name="notes"
        value={value}
        onChange={onChange}
        placeholder="Agregar notas adicionales…"
      />
    </div>
  );
};

NotesInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NotesInput;