import React from 'react';
import PropTypes from 'prop-types';
import { Reload } from 'Modules';

const ErrorHandler = ({ msg, loadData, size }) => {
  return (
    <div className='fetch_status_message'>
      <span>{msg}</span>
      <Reload size={size} loadData={loadData} />
    </div>
  );
};
ErrorHandler.propTypes = {
  msg: PropTypes.string,
  size: PropTypes.string,
  loadData: PropTypes.func,
};
export default ErrorHandler;
