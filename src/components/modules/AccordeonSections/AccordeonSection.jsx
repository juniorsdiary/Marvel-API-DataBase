import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { sliderSettings } from 'Utilities';
import { Reload } from 'Modules';
import { IoIosArrowDown } from 'react-icons/io';

const AccordeonSection = ({ data, number, pathname, slider, contentClassName, title, loadData, fetchStatus, MappingComponent, history }) => {
  const { status, isFetching } = fetchStatus;
  const [active, setActive] = useState(false);
  const toggleContent = !status || isFetching || number === 0 ? () => {} : () => setActive(!active);
  const search = history.location.pathname
    .split('/')
    .join('=')
    .replace(/=/, '?');
  let content = data.map(item => <MappingComponent key={item.id} {...item} pathname={pathname} />);
  return (
    <>
      {number > 0 && (
        <>
          <div
            tabIndex='0'
            role='button'
            className={`available_items_title${active ? ' active_tab' : ''}`}
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
          <div className={`accordeon_section${active ? ' active_section' : ''}`}>
            {content.length >= 3 ? (
              <Slider {...sliderSettings} className={contentClassName}>
                {content}
              </Slider>
            ) : (
              <div className={contentClassName}>{content}</div>
            )}
            {number > 15 && (
              <Link tabIndex='0' to={{ pathname, search }} className='show_more_link styled_btn'>
                Show More
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
};

AccordeonSection.propTypes = {
  data: PropTypes.array,
  pathname: PropTypes.string,
  history: PropTypes.object,
  number: PropTypes.number,
  slider: PropTypes.bool,
  contentClassName: PropTypes.string,
  title: PropTypes.string,
  fetchStatus: PropTypes.object,
  loadData: PropTypes.func,
  MappingComponent: PropTypes.any,
};

export default AccordeonSection;
