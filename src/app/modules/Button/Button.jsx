import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ children, className, active }) => {
  const commonClass = classNames(className, 'default_btn', { active });
  return <button className={commonClass}>{children}</button>;
};
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
};

export default Button;
