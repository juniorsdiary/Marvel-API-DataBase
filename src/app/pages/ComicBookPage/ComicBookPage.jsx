import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleComicBook } from '../../store/actions/comics';
import { fetchCharacters } from '../../store/actions/characters';
import * as types from '../../store/types';
import { convertToLocale } from '../../utilities/lib';
import ApiFactory from '../../utilities/apiFactory';

import Loader from '../../modules/Loader/Loader.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import AccordeonSection from '../../modules/AccordeonSections/AccordeonSection.jsx';
import withDataFetching from '../../HOCfolder/withDataFetching.jsx';
const AccordeonEventsWithDataFetching = withDataFetching('/characters')(AccordeonSection);
import CharacterDetailsSection from '../../modules/CharacterDetailsSection/CharacterDetailsSection.jsx';
class ComicBookPage extends Component {
  state = {
    firstContent: true,
    secondContent: true,
    thirdContent: true,
  };
  componentDidMount() {
    const { location, setFetchingState, fetchComicsData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchComicsData(apiStr);
  }
  handleChange = name => {
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };
  render() {
    const { isFetching, location } = this.props;
    const { charactersData, comicBookData, seriesData, eventsData } = this.props;
    const { fetchComicsData, fetchSeriesData, fetchEventsData } = this.props;
    const { firstContent, secondContent, thirdContent } = this.state;
    const { title, description, modified, thumbnail, urls } = comicBookData;
    console.log(comicBookData);
    const baseSrc = thumbnail ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';
    const lastModified = convertToLocale(modified);
    return (
      <div className='page_content comic_book_page_block'>
        {!isFetching ? (
          <div className='comic_book_data_wrapper'>
            <ImageAvatar className='comic_book_image_wrapper' baseSrc={baseSrc} src={src} />
            <CharacterDetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

ComicBookPage.propTypes = {
  charactersData: PropTypes.array,
  eventsData: PropTypes.array,
  comicBookData: PropTypes.object,
  seriesData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  fetchSeriesData: PropTypes.func,
  setFetchingState: PropTypes.func,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    charactersData: state.charactersData.charactersList,
    eventsData: state.eventsData.eventsList,
    comicBookData: state.comicsData.comicBook,
    seriesData: state.seriesData.seriesList,
    isFetching: state.comicsData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchCharacters(url));
    },
    fetchEventsData: url => {
      // dispatch(fetchEvents(url));
    },
    fetchComicsData: url => {
      dispatch(fetchSingleComicBook(url));
    },
    fetchSeriesData: url => {
      // dispatch(fetchSeries(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.COMICS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicBookPage);
