import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import ComicBookPreview from '../ComicBookPreview/ComicBookPreview.jsx';
import Button from '../Button/Button.jsx';

const AccordeonSection = ({ data, state, number, pathname, location, children }) => {
  const elemRef = useRef();
  useLayoutEffect(() => {
    elemRef.current.style.maxHeight = `${state ? 0 : elemRef.current.scrollHeight}px`;
  }, [state]);

  let renderData = data.map(item => <ComicBookPreview key={item.id} {...item} />);
  const search = location.pathname
    .split('/')
    .join('=')
    .replace(/=/, '?');
  return (
    <>
      {children}
      <div className='accordeon_section' ref={elemRef}>
        {data.length >= 5 ? (
          <Slider {...settings} className='default_slider_block'>
            {renderData}
          </Slider>
        ) : (
          <div className='static_items_block'>{renderData}</div>
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
  data: PropTypes.array,
  state: PropTypes.bool,
  children: PropTypes.node,
  pathname: PropTypes.string,
  location: PropTypes.object,
  number: PropTypes.number,
};

export default AccordeonSection;
