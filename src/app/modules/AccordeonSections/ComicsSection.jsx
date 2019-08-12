import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import { fetchComics } from '../../store/actions/comics';
import ApiFactory from '../../utilities/apiFactory';
import ComicBookPreview from '../ComicBookPreview/ComicBookPreview.jsx';
import Button from '../Button/Button.jsx';

const ComicsSection = ({ comicsData, fetchComicsData, id, number, state, changeState }) => {
  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    charactersAPI.createApiString();
    const comicsAPI = ApiFactory.createApiHandler({ type: 'comics', limit: 15 });
    let secondPart = comicsAPI.asSecondType();
    const apiStr = `${charactersAPI.api}${charactersAPI.query}${secondPart}`;
    fetchComicsData(apiStr);
  }, [fetchComicsData, id]);

  let renderComicsSlider = comicsData.map(comicBook => <ComicBookPreview key={comicBook.id} {...comicBook} />);

  const elemRef = useRef();
  useLayoutEffect(() => {
    elemRef.current.style.maxHeight = `${state ? 0 : elemRef.current.scrollHeight}px`;
  }, [state]);
  return (
    <>
      <h2 className='available_items_title' onClick={changeState}>
        Encountered in {number} comics
      </h2>
      <div className='accordeon_section' ref={elemRef}>
        {comicsData.length >= 5 ? (
          <Slider {...settings} className='default_slider_block'>
            {renderComicsSlider}
          </Slider>
        ) : (
          <div className='static_items_block'>{renderComicsSlider}</div>
        )}
        {number > 15 && (
          <Button className='show_more_items_btn'>
            <Link to={{ pathname: '/comics', search: `?characters=${id}` }} className='show_more_link'>
              Show More
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

ComicsSection.propTypes = {
  comicsData: PropTypes.array,
  fetchComicsData: PropTypes.func,
  id: PropTypes.string,
  number: PropTypes.number,
  state: PropTypes.bool,
  changeState: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    comicsData: state.comicsData.comicsList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicsData: id => {
      dispatch(fetchComics(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicsSection);
