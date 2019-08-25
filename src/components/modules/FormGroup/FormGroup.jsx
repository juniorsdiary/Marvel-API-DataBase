import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ requestData, children, className }) => {
  return <div>Hee</div>;
};

FormGroup.propTypes = {
  requestData: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default React.memo(FormGroup);
