import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleComicBook } from '../../store/actions/comics';
import { fetchCharacters } from '../../store/actions/characters';
import { fetchCreators } from '../../store/actions/creators';
import { fetchEvents } from '../../store/actions/events';
import * as types from '../../store/types';
import { convertToLocale } from '../../utilities/lib';
import ApiFactory from '../../utilities/apiFactory';

import Loader from '../../modules/Loader/Loader.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import AccordeonSection from '../../modules/AccordeonSections/AccordeonSection.jsx';
import DetailsSection from '../../modules/DetailsSection/DetailsSection.jsx';
import ComicBookPreview from '../../modules/ComicBookPreview/ComicBookPreview.jsx';
import PreviewItem from '../../modules/PreviewItem/PreviewItem.jsx';
import withDataFetching from '../../HOCfolder/withDataFetching.jsx';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonCreatorsWithDataFetching = withDataFetching('/creators')(AccordeonSection);
const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);

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
    const { charactersData, comicBookData, creatorsData, eventsData } = this.props;
    const { fetchCharacterData, fetchCreatorsData, fetchEventsData } = this.props;
    const { firstContent, secondContent, thirdContent } = this.state;
    const { title, description, modified, thumbnail, urls, characters, creators, events } = comicBookData;

    const baseSrc = thumbnail ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';
    const lastModified = convertToLocale(modified);

    const renderCharacters = charactersData.map(item => <ComicBookPreview key={item.id} {...item} />);
    const renderCreators = creatorsData.map(item => <PreviewItem key={item.id} {...item} />);
    const renderEvents = eventsData.map(item => <ComicBookPreview key={item.id} {...item} />);
    return (
      <div className='page_content comic_book_page_block'>
        {!isFetching ? (
          <div className='comic_book_data_wrapper'>
            <ImageAvatar className='comic_book_image_wrapper' baseSrc={baseSrc} src={src} />
            <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            <AccordeonCharactersWithDataFetching
              number={characters.available}
              state={firstContent}
              location={location}
              slider={true}
              content={renderCharacters}
              contentClassName='default_slider_block'
              callBack={url => fetchCharacterData(url)}>
              <h1 className='available_items_title' onClick={() => this.handleChange('firstContent')}>
                You can meet {characters.available} characters
              </h1>
            </AccordeonCharactersWithDataFetching>

            <AccordeonCreatorsWithDataFetching
              number={creators.available}
              state={secondContent}
              location={location}
              slider={false}
              content={renderCreators}
              contentClassName='default_content_block'
              callBack={url => fetchCreatorsData(url)}>
              <h1 className='available_items_title' onClick={() => this.handleChange('secondContent')}>
                {creators.available} creators
              </h1>
            </AccordeonCreatorsWithDataFetching>
            <AccordeonEventsWithDataFetching
              number={events.available}
              state={thirdContent}
              location={location}
              slider={false}
              content={renderEvents}
              contentClassName='default_content_block'
              callBack={url => fetchEventsData(url)}>
              <h1 className='available_items_title' onClick={() => this.handleChange('thirdContent')}>
                Part of {events.available} events
              </h1>
            </AccordeonEventsWithDataFetching>
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
  creatorsData: PropTypes.array,
  eventsData: PropTypes.array,
  comicBookData: PropTypes.object,
  seriesData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  fetchCreatorsData: PropTypes.func,
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
    creatorsData: state.creatorsData.creatorsList,
    eventsData: state.eventsData.eventsList,
    comicBookData: state.comicsData.comicBook,
    isFetching: state.comicsData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchCharacters(url));
    },
    fetchCreatorsData: url => {
      dispatch(fetchCreators(url));
    },
    fetchEventsData: url => {
      dispatch(fetchEvents(url));
    },
    fetchComicsData: url => {
      dispatch(fetchSingleComicBook(url));
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