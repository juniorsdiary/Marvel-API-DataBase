import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCharacter } from '../../store/actions';
import PropTypes from 'prop-types';
import * as types from '../../store/types';
import Loader from '../../modules/Loader/Loader.jsx';
import Slider from '../../modules/Slider/Slider.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import ComicBookPreview from '../../modules/ComicBookPreview/ComicBookPreview.jsx';
import { hot } from 'react-hot-loader/root';
import synteticCharacterData from '../../utilities/characterData.js';
import comicBooksData from '../../utilities/comicsData';
// urls: A set of public web site URLs for the resource.,
// comics: A resource list containing comics which feature this character.,
// stories: A resource list of stories in which this character appears.,
// events: A resource list of events in which this character appears.,
// series: A resource list of series in which this character appears.

const CharacterPage = ({ fetchData, setFetchingState, match, characterData, isFetching, fetchComicData }) => {
  let _isMounted = useRef(true);
  console.log(synteticCharacterData);
  const { name, description, modified, thumbnail, urls, comics = { items: [] } } = synteticCharacterData;
  const { path, extension } = thumbnail;
  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    const id = match.params.id;
    setFetchingState(true);
    if (_isMounted.current) {
      // fetchData(id);
    }
    return () => {
      console.log('CharacterPage   unmounted');
    };
  }, [fetchData, match, setFetchingState]);

  let options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  let lastModified = new Date(modified).toLocaleString('en-US', options);
  console.log(comicBooksData);
  let renderComicsSlider = comicBooksData.map(comicBook => (
    <ComicBookPreview key={comicBook.id} {...comicBook} className='comic_book_preview_image' />
  ));
  return (
    <div className='page_content character_page_block'>
      {/* {!isFetching ? ( */}
      <div className='character_data_wrapper'>
        <ImageAvatar className='character_image_wrapper' src='../images/avatar.jpg' />
        <div className='character_data_details'>
          <h1 className='character_data_title'>{name}</h1>
          <p className='character_data_description'>{description ? description : `We are sorry! :( We couldn't find any description`}</p>
          <p className='character_data_details_link'>
            Want to know more details about this character? Visit official Marvel{' '}
            <a href={urls && urls[0].url} target='blank'>
              web-site
            </a>
          </p>
          <p className='character_data_last_modified'>Last modified: {lastModified}</p>
        </div>
        <h1 className='slider_title'>Encountered in {comics.available} comics</h1>
        <Slider className='character_comics_slider'>{renderComicsSlider}</Slider>
      </div>
      {/* ) : (
        <Loader />
      )} */}
    </div>
  );
};

CharacterPage.propTypes = {
  match: PropTypes.object,
  fetchData: PropTypes.func,
  characterData: PropTypes.object,
  setFetchingState: PropTypes.func,
  isFetching: PropTypes.bool,
  fetchComicData: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    characterData: state.singleCharacter,
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: id => {
      dispatch(fetchSingleCharacter(id));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.IS_FETCHING, payload: boolean });
    },
  };
};

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterPage)
);
