import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import Button from '../Button/Button.jsx';

const AccordeonSection = ({ content, state, number, pathname, location, children, slider, contentClassName }) => {
  const elemRef = useRef();
  useLayoutEffect(() => {
    elemRef.current.style.maxHeight = `${state ? 0 : elemRef.current.scrollHeight}px`;
  }, [state]);
  const search = location.pathname
    .split('/')
    .join('=')
    .replace(/=/, '?');
  return (
    <>
      {children}
      <div className='accordeon_section' ref={elemRef}>
        {content.length >= 5 && slider ? (
          <Slider {...settings} className={contentClassName}>
            {content}
          </Slider>
        ) : (
          <div className={contentClassName}>{content}</div>
        )}
        {number > 15 && (
          <Button className='show_more_items_btn'>
            <Link to={{ pathname, search }} className='show_more_link'>
              Show More
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

AccordeonSection.propTypes = {
  content: PropTypes.array,
  state: PropTypes.bool,
  children: PropTypes.node,
  pathname: PropTypes.string,
  location: PropTypes.object,
  number: PropTypes.number,
  slider: PropTypes.bool,
  contentClassName: PropTypes.string,
};

export default AccordeonSection;
