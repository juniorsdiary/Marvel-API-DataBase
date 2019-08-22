import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ children, className, active, disabled, onClick, ...props }) => {
  const commonClass = classNames(className, 'default_btn', { active });
  return (
    <button className={commonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: 'Default Button',
  onClick: () => {},
  className: '',
  disabled: false,
  active: false,
};

export default Button;
