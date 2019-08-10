import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import settings from '../../utilities/sliderSettings';
import { fetchComics } from '../../store/actions';
import * as types from '../../store/types';
import ApiFactory from '../../utilities/apiFactory';

import ComicBookPreview from '../ComicBookPreview/ComicBookPreview.jsx';
import Button from '../Button/Button.jsx';

const ComicsSection = ({ comicsData, fetchComicsData, id, number }) => {
  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    charactersAPI.createApiString();
    const comicsAPI = ApiFactory.createApiHandler({ type: 'comics', limit: 15 });
    let secondPart = comicsAPI.asSecondType();
    const apiStr = `${charactersAPI.api}${charactersAPI.query}${secondPart}`;
    fetchComicsData(apiStr);
  }, [fetchComicsData, id]);

  let renderComicsSlider = comicsData.map(comicBook => <ComicBookPreview key={comicBook.id} {...comicBook} />);
  return (
    <>
      <h1 className='available_comics_title'>Encountered in {number} comics</h1>
      {comicsData.length >= 5 ? (
        <Slider {...settings} className='default_slider_block'>
          {renderComicsSlider}
        </Slider>
      ) : (
        <div className='static_comics_block'>{renderComicsSlider}</div>
      )}
      <Button className='show_more_comics_btn'>Show more</Button>
    </>
  );
};

ComicsSection.propTypes = {
  comicsData: PropTypes.array,
  setFetchingState: PropTypes.func,
  fetchComicsData: PropTypes.func,
  isFetching: PropTypes.bool,
  id: PropTypes.string,
  mainApi: PropTypes.object,
  number: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    comicsData: state.comicBooksData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicsData: id => {
      dispatch(fetchComics(id));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.IS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicsSection);
