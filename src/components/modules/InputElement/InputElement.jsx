import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputElement = ({ id, label, error, inputClass, wrapperClass, name, activeClass, ...attr }) => {
  const inputCommonClass = classNames('input_default', inputClass);
  const wrapperCommonClass = classNames('default_input_wrapper', wrapperClass, activeClass);
  return (
    <div className={wrapperCommonClass}>
      {label && (
        <label htmlFor={id} className='label_default'>
          {label}
        </label>
      )}
      <input name={name ? name : id} id={id} className={inputCommonClass} {...attr} autoComplete='off' />
      {error && <span className='error_input'>{error}</span>}
    </div>
  );
};

InputElement.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  inputClass: PropTypes.string,
  wrapperClass: PropTypes.string,
  error: PropTypes.string,
  activeClass: PropTypes.string,
};

InputElement.defaultProps = {
  label: '',
  error: '',
};

export default InputElement;
