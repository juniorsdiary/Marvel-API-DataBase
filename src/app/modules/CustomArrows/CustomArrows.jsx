import React from 'react';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';
import PropTypes from 'prop-types';

export const NextArrow = ({ className, style, onClick }) => <IoIosArrowDropleftCircle onClick={onClick} className={className} style={{ ...style }} />;
export const PrevArrow = ({ className, style, onClick }) => (
  <IoIosArrowDroprightCircle onClick={onClick} className={className} style={{ ...style }} />
);

NextArrow.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
PrevArrow.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
