import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import { fetchSeries } from '../../store/actions/series';
import ApiFactory from '../../utilities/apiFactory';
import ComicBookPreview from '../ComicBookPreview/ComicBookPreview.jsx';
import Button from '../Button/Button.jsx';

const SeriesSection = ({ seriesData, fetchSeriesData, id, number, state, changeState }) => {
  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    charactersAPI.createApiString();
    const seriesAPI = ApiFactory.createApiHandler({ type: 'series', limit: 15 });
    let secondPart = seriesAPI.asSecondType();
    const apiStr = `${charactersAPI.api}${charactersAPI.query}${secondPart}`;
    fetchSeriesData(apiStr);
  }, [fetchSeriesData, id]);

  let renderSeriesSlider = seriesData.map(seriesItem => <ComicBookPreview key={seriesItem.id} {...seriesItem} />);

  const elemRef = useRef();
  useLayoutEffect(() => {
    elemRef.current.style.maxHeight = `${state ? 0 : elemRef.current.scrollHeight}px`;
  }, [state]);
  return (
    <>
      <h1 className='available_items_title' onClick={changeState}>
        Encountered in {number} series
      </h1>
      <div className='accordeon_section' ref={elemRef}>
        {seriesData.length >= 5 ? (
          <Slider {...settings} className='default_slider_block'>
            {renderSeriesSlider}
          </Slider>
        ) : (
          <div className='static_items_block'>{renderSeriesSlider}</div>
        )}
        {number > 15 && (
          <Button className='show_more_items_btn'>
            <Link to={{ pathname: '/series', search: `?characters=${id}` }} className='show_more_link'>
              Show More
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};
SeriesSection.propTypes = {
  seriesData: PropTypes.array,
  fetchSeriesData: PropTypes.func,
  id: PropTypes.string,
  number: PropTypes.number,
  state: PropTypes.bool,
  changeState: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    seriesData: state.seriesData.seriesList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSeriesData: id => {
      dispatch(fetchSeries(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesSection);
