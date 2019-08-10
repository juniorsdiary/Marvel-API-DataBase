import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

const Slider = ({ children, className, number }) => {
  const commonClass = classNames('default_slider_block', className);
  const [index, setIndex] = useState(0);
  let transformValue = (index * 100) / children.length;
  return (
    <div className={commonClass}>
      <span className='slider_btn' onClick={() => setIndex(index => (index !== children.length ? index + 1 : index))}>
        <IoIosArrowDropleftCircle className='icon-custom-class' />
      </span>
      <div className='slider_wrapper_overflow'>
        <div className='slider_content' style={{ transform: `translateX(-${transformValue}%)` }}>
          {children}
        </div>
      </div>
      <span className='slider_btn' onClick={() => setIndex(index => (index !== 0 ? index - 1 : index))}>
        <IoIosArrowDroprightCircle className='icon-custom-class' />
      </span>
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  number: PropTypes.number,
};

export default Slider;
