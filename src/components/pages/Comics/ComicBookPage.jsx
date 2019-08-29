import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchCharacters, fetchEvents, fetchSingleComicBook } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import {
  CreatorsComponent,
  ErrorHandler,
  Loader,
  ImageAvatar,
  AccordeonSection,
  DetailsSection,
  SearchCard,
  PreviewItem,
  CharacterCard,
} from 'Modules';
import { withDataFetching } from 'Components/hocs';

const CharactersAccordeon = withDataFetching('/characters')(AccordeonSection);
const EventsAccordeon = withDataFetching('/events')(AccordeonSection);

class ComicBookPage extends Component {
  componentDidMount() {
    const { storeData } = this.props;
    if (!storeData) {
      this.loadPrimaryData();
    }
  }
  loadPrimaryData = () => {
    const { fetchComicsData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.COMICS_FETCHING, true);
    fetchComicsData(apiStr);
  };
  render() {
    const { location, charactersFetchStatus, eventsFetchStatus, fetchStatus } = this.props;
    const { fetchedData, storeData, charactersData, eventsData } = this.props;
    const { fetchCharacterData, fetchEventsData, setFetchingState } = this.props;
    const { title, description, modified, thumbnail, urls, characters, creators, events } = storeData || fetchedData;
    const { isFetching, status, message } = fetchStatus;

    const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);

    const renderCharacters = charactersData.map(item => <CharacterCard key={item.id} {...item} pathname={'/characters'} />);
    const renderCreators = creators.items.map((item, index) => <PreviewItem key={index} {...item} />);
    const renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);

    return (
      <div className='page_content'>
        {isFetching ? (
          <Loader />
        ) : !status ? (
          <ErrorHandler msg={message} size={'35'} loadData={() => this.loadPrimaryData()} />
        ) : (
          <div className='items_data_wrapper'>
            <ImageAvatar wrapper={true} className='cover_book_image' baseSrc={baseSrc} src={src} />
            <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            <CharactersAccordeon
              fetchingCallBack={bool => setFetchingState(types.CHARACTERS_FETCHING, bool)}
              fetchStatus={charactersFetchStatus}
              number={characters.available}
              location={location}
              content={renderCharacters}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchCharacterData}
              title={`You can meet ${characters.available} characters`}
            />
            <EventsAccordeon
              fetchingCallBack={bool => setFetchingState(types.EVENTS_FETCHING, bool)}
              fetchStatus={eventsFetchStatus}
              number={events.available}
              location={location}
              content={renderEvents}
              slider={true}
              contentClassName='default_content_block'
              callBack={fetchEventsData}
              title={`Part of ${events.available} events`}
            />
            <CreatorsComponent content={renderCreators} number={creators.available} location={location} pathname={'/creators'} />
          </div>
        )}
      </div>
    );
  }
}

ComicBookPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchComicsData: PropTypes.func,
  fetchStatus: PropTypes.object,
  charactersData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  charactersFetchStatus: PropTypes.object,
  eventsData: PropTypes.array,
  fetchEventsData: PropTypes.func,
  eventsFetchStatus: PropTypes.object,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.comicsData.comicsList.filter(item => item.id === id)[0],
    fetchedData: state.comicsData.comicBook,
    fetchStatus: state.comicsData.fetchStatus,
    charactersData: state.charactersData.charactersList,
    charactersFetchStatus: state.charactersData.fetchStatus,
    eventsData: state.eventsData.eventsList,
    eventsFetchStatus: state.eventsData.fetchStatus,
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
