import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Slider = ({ children, classname }) => {
  const commonClass = classNames('default_slider_block', classname);
  return <div className={commonClass}>{children}</div>;
};

Slider.propTypes = {
  children: PropTypes.node,
  classname: PropTypes.string,
};

export default Slider;
