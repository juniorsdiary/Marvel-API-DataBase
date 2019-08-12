import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import { fetchSeries } from '../../store/actions';
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
      <h1 className='available_comics_title' onClick={changeState}>
        Encountered in {number} series
      </h1>
      <div className='series_section' ref={elemRef}>
        {seriesData.length >= 5 ? (
          <Slider {...settings} className='default_slider_block'>
            {renderSeriesSlider}
          </Slider>
        ) : (
          <div className='static_comics_block'>{renderSeriesSlider}</div>
        )}
        <Button className='show_more_comics_btn'>Show more</Button>
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
    seriesData: state.seriesData,
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
