import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { types, fetchSingleComicBook, fetchCharacters, fetchEvents } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import { Loader, ImageAvatar, AccordeonSection, DetailsSection, SearchCard, PreviewItem, CharacterCard } from 'Modules';

import { withDataFetching } from 'Components/hocs.jsx';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);

class ComicBookPage extends Component {
  componentDidMount() {
    const { location, setFetchingState, fetchComicsData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.COMICS_FETCHING, true);
    fetchComicsData(apiStr);
  }
  render() {
    const { isFetching, charactersFetching, eventsFetching, location } = this.props;
    const { charactersData, comicBookData, eventsData } = this.props;
    const { fetchCharacterData, fetchEventsData, setFetchingState } = this.props;
    const { title, description, modified, thumbnail, urls, characters, creators, events } = comicBookData;

    const baseSrc = thumbnail ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);

    const renderCharacters = charactersData.map(item => <CharacterCard key={item.id} {...item} />);
    const renderCreators = creators.items.map((item, index) => <PreviewItem key={index} {...item} />);
    const renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);

    return (
      <div className='page_content'>
        {!isFetching ? (
          <div className='items_data_wrapper'>
            <ImageAvatar wrapper={true} className='cover_book_image' baseSrc={baseSrc} src={src} />
            <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            <AccordeonSection
              number={creators.available}
              location={location}
              pathname={'/creators'}
              content={renderCreators}
              slider={false}
              contentClassName='creators_content_block'
              title={`${creators.available} creators`}
            />
            <AccordeonCharactersWithDataFetching
              fetchingCallBack={bool => setFetchingState(types.CHARACTERS_FETCHING, bool)}
              loading={charactersFetching}
              number={characters.available}
              location={location}
              content={renderCharacters}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchCharacterData}
              title={`You can meet ${characters.available} characters`}
            />
            <AccordeonEventsWithDataFetching
              fetchingCallBack={bool => setFetchingState(types.EVENTS_FETCHING, bool)}
              loading={eventsFetching}
              number={events.available}
              location={location}
              content={renderEvents}
              slider={true}
              contentClassName='default_content_block'
              callBack={fetchEventsData}
              title={`Part of ${events.available} events`}
            />
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
  fetchCharacterData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  setFetchingState: PropTypes.func,
  isFetching: PropTypes.bool,
  charactersFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    charactersData: state.charactersData.charactersList,
    eventsData: state.eventsData.eventsList,
    comicBookData: state.comicsData.comicBook,
    charactersFetching: state.charactersData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    isFetching: state.comicsData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchCharacters(url));
    },
    fetchEventsData: url => {
      dispatch(fetchEvents(url));
    },
    fetchComicsData: url => {
      dispatch(fetchSingleComicBook(url));
    },
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicBookPage);
