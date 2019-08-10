import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCharacter, fetchComics } from '../../store/actions';
import PropTypes from 'prop-types';
import * as types from '../../store/types';
import Loader from '../../modules/Loader/Loader.jsx';
import Slider from '../../modules/Slider/Slider.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import ComicBookPreview from '../../modules/ComicBookPreview/ComicBookPreview.jsx';
import { convertToLocale } from '../../utilities/lib';
import ApiFactory from '../../utilities/apiFactory';
// offline fetch
import synteticCharacterData from '../../utilities/characterData.js';
import comicBooksData from '../../utilities/comicsData';
// urls: A set of public web site URLs for the resource.,
// comics: A resource list containing comics which feature this character.,
// stories: A resource list of stories in which this character appears.,
// events: A resource list of events in which this character appears.,
// series: A resource list of series in which this character appears.

const CharacterPage = ({ fetchCharacterData, setFetchingState, isFetching, fetchComicsData, match, characterData, comicsData }) => {
  const { name, description, modified, thumbnail, urls, comics = { items: [] } } = characterData;
  const { path, extension } = thumbnail;
  useEffect(() => {
    const id = match.params.id;
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    const apiStr = charactersAPI.createApiString();
    const comicsAPI = ApiFactory.createApiHandler({ type: 'comics', limit: 10 });
    let secondPart = comicsAPI.asSecondType();
    const apiStr2 = `${charactersAPI.api}${charactersAPI.query}${secondPart}`;
    setFetchingState(true);
    fetchCharacterData(apiStr);
    fetchComicsData(apiStr2);
  }, [fetchCharacterData, fetchComicsData, match, setFetchingState]);

  let lastModified = convertToLocale(modified);
  let renderComicsSlider = comicsData.map(comicBook => <ComicBookPreview key={comicBook.id} {...comicBook} className='comic_book_preview_image' />);
  return (
    <div className='page_content character_page_block'>
      {!isFetching ? (
        <div className='character_data_wrapper'>
          <ImageAvatar className='character_image_wrapper' src={`${path}.${extension}`} />
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

CharacterPage.propTypes = {
  match: PropTypes.object,
  characterData: PropTypes.object,
  comicsData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  setFetchingState: PropTypes.func,
  fetchComicsData: PropTypes.func,
  isFetching: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    characterData: state.singleCharacter,
    isFetching: state.isFetching,
    comicsData: state.comicBooksData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: id => {
      dispatch(fetchSingleCharacter(id));
    },
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
)(CharacterPage);
