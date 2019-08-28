import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { sliderSettings } from 'Utilities';
import { Reload } from 'Modules';
import { IoIosArrowDown } from 'react-icons/io';

const AccordeonSection = ({ content, number, pathname, location, children, slider, contentClassName, title, loadData, fetchStatus }) => {
  const { status, isFetching } = fetchStatus;
  const [active, setActive] = useState(false);
  const toggleContent = !status || isFetching || number === 0 ? () => {} : () => setActive(!active);
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
        onClick={toggleContent}
        onKeyPress={toggleContent}>
        <span>{title}</span>
        {isFetching ? (
          <span className='accordeon_loading_spinner'></span>
        ) : status ? (
          <IoIosArrowDown size='25' className={`${active ? 'open' : 'close'}_dropdown`} />
        ) : (
          <Reload size={'25'} loadData={loadData} />
        )}
      </div>
      <div className={`accordeon_section ${active && 'active_section'}`}>
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
  fetchStatus: PropTypes.object,
  loadData: PropTypes.func,
};

export default AccordeonSection;
