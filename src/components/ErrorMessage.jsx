import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <Alert variant="danger">{message}</Alert>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;