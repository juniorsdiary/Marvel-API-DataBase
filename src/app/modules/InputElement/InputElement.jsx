import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputElement = ({ id, label, error, className, ...attr }) => {
  const lableRef = useRef();
  const commonClass = classNames('input_default', className);
  const [focusPosition, setFocusPosition] = useState(false);
  useEffect(() => {
    let shiftValue = focusPosition ? lableRef.current.getBoundingClientRect().width + 5 : 0;
    lableRef.current.style.left = `-${shiftValue}px`;
  }, [focusPosition]);
  return (
    <div className='inputFieldWrapper'>
      <input
        name={id}
        id={id}
        className={commonClass}
        {...attr}
        autoComplete='off'
        onFocus={() => {
          setFocusPosition(true);
        }}
        onBlur={() => {
          setFocusPosition(false);
        }}
      />
      {label && (
        <label htmlFor={id} className='label_default' ref={lableRef}>
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
