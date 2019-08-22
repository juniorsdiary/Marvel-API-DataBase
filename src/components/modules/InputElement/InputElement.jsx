import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputElement = ({ id, label, error, className, ...attr }) => {
  const commonClass = classNames('input_default', className);
  return (
    <div className='inputFieldWrapper'>
      <input name={id} id={id} className={commonClass} {...attr} autoComplete='off' />
      {label && (
        <label htmlFor={id} className='label_default'>
          {label}
        </label>
      )}
      {error && <span className='error_input'>{error}</span>}
    </div>
  );
};

InputElement.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
};

InputElement.defaultProps = {
  label: '',
  className: '',
  error: '',
};

export default InputElement;
