import React from 'react';
import PropTypes from 'prop-types';

const ErrorHandler = ({ msg }) => {
  return (
    <div className='fetch_status_message'>
      <span>{msg}</span>
    </div>
  );
};
ErrorHandler.propTypes = {
  msg: PropTypes.string,
};
export default ErrorHandler;
