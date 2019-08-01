import React from 'react';
import PropTypes from 'prop-types';

const ParametrsComponent = ({ active }) => {
  return (
    <div className='height-0' hidden={active}>
      Some Parametrs
    </div>
  );
};
ParametrsComponent.propTypes = {
  active: PropTypes.bool,
};
export default ParametrsComponent;
