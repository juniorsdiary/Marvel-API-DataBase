import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { sliderSettings } from 'Utilities';
import { IoIosArrowDown } from 'react-icons/io';

const AccordeonSection = ({ content, number, pathname, location, children, slider, contentClassName, title, loading }) => {
  const elemRef = useRef();
  const h = useRef(0);
  const [active, setActive] = useState(false);
  useLayoutEffect(() => {
    elemRef.current.style.maxHeight = `${active ? elemRef.current.scrollHeight : 0}px`;
    h.current = active ? elemRef.current.scrollHeight : 0;
  }, [active]);
  h.current = active ? elemRef.current.scrollHeight : 0;
  const search = location.pathname
    .split('/')
    .join('=')
    .replace(/=/, '?');
  return (
    <>
      <div
        tabIndex='-1'
        role='button'
        className={`available_items_title ${active && 'active_tab'}`}
        onClick={loading || number === 0 ? () => {} : () => setActive(!active)}
        onKeyPress={loading || number === 0 ? () => {} : () => setActive(!active)}>
        <span>{title}</span>
        {loading ? (
          <span className='accordeon_loading_spinner'></span>
        ) : (
          <IoIosArrowDown size='25' className={`${active ? 'open' : 'close'}_dropdown`} />
        )}
      </div>
      <div className={`accordeon_section`} ref={elemRef}>
        {content.length >= 5 && slider ? (
          <Slider {...sliderSettings} className={contentClassName}>
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
        {/* <span>{h.current}</span> */}
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
