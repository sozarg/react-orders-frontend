import React from 'react';
import PropTypes from 'prop-types';

const NotesInput = ({ value, onChange }) => {
  return (
    <div className="notes-input">
      <label htmlFor="notes">Notas:</label>
      <textarea
        id="notes"
        name="notes"
        value={value}
        onChange={onChange}
        placeholder="Agregar notas adicionales..."
        rows={4}
      />
    </div>
  );
};

NotesInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NotesInput;