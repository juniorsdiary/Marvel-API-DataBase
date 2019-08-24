import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
const FormGroup = ({ requestData, children, className }) => {
  const commonClass = classNames('default_form', className);
  return (
    <form
      className={commonClass}
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
  className: PropTypes.string,
};

export default React.memo(FormGroup);
