import React from 'react';
import PropTypes from 'prop-types';
const FormGroup = ({ requestData, children }) => {
  return (
    <form
      className='parametrs_list'
      onSubmit={e => {
        e.preventDefault();
        requestData(0);
      }}>
      {children}
    </form>
  );
};

FormGroup.propTypes = {
  requestData: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(FormGroup);
