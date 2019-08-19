import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import { IoIosArrowDown } from 'react-icons/io';

const AccordeonSection = ({ content, number, pathname, location, children, slider, contentClassName, title, loading }) => {
  const elemRef = useRef();
  const [active, setActive] = useState(false);
  useLayoutEffect(() => {
    elemRef.current.style.height = `${active ? elemRef.current.scrollHeight : 0}px`;
  }, [active, number]);
  const search = location.pathname
    .split('/')
    .join('=')
    .replace(/=/, '?');
  return (
    <>
      <div
        tabIndex='-1'
        role='button'
        className={active ? 'available_items_title active_tab' : 'available_items_title'}
        onClick={loading || number === 0 ? () => {} : () => setActive(!active)}
        onKeyPress={loading || number === 0 ? () => {} : () => setActive(!active)}>
        <span>{title}</span>
        {loading ? (
          <span className='accordeon_loading_spinner'></span>
        ) : (
          <IoIosArrowDown size='25' className={active ? 'open_dropdown' : 'close_dropdown'} />
        )}
      </div>
      <div className='accordeon_section' ref={elemRef}>
        {content.length >= 5 && slider ? (
          <Slider {...settings} className={contentClassName}>
            {content}
          </Slider>
        ) : (
          <div className={contentClassName}>{content}</div>
        )}
        {number > 15 && (
          <Link to={{ pathname, search }} className='show_more_link'>
            Show More
          </Link>
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
  onClick: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
};
export default AccordeonSection;
