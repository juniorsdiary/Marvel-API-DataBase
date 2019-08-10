import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

const Slider = ({ children, className }) => {
  const commonClass = classNames('default_slider_block', className);
  const [index, setIndex] = useState(0);
  // const [slideValue, setSlideValue] = useState(0);
  const sliderRef = useRef();
  useEffect(() => {
    let width = sliderRef.current.getBoundingClientRect().width;
    // setSlideValue(slideValue => (width / children.length) * index);
    sliderRef.current.style.marginLeft = `${(width / children.length) * index}px`;
  }, [children.length, index]);

  const shiftItems = direction => {
    if (/right/.test(direction)) {
      const lastElem = children.splice(children.length - 1, 1)[0];
      children.unshift(lastElem);
    } else {
      const lastElem = children.splice(0, 1)[0];
      children.push(lastElem);
    }
  };
  return (
    <div className={commonClass}>
      <span
        className='slider_btn'
        onClick={() => {
          shiftItems('left');
          setIndex(index => index + 1);
        }}>
        <IoIosArrowDropleftCircle className='icon-custom-class' />
      </span>
      <div className='slider_wrapper_overflow' ref={sliderRef}>
        <div className='slider_content'>{children}</div>
      </div>
      <span
        className='slider_btn'
        onClick={() => {
          shiftItems('right');
          setIndex(index => index - 1);
        }}>
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
