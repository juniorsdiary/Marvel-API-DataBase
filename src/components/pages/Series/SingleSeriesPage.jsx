import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCharacters, fetchEvents, fetchComics, types, fetchSingleSeries } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import {
  ErrorHandler,
  CreatorsComponent,
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
const ComicsAccordeon = withDataFetching('/comics')(AccordeonSection);

class SingleSeriesPage extends Component {
  componentDidMount() {
    const { storeData } = this.props;
    if (!storeData) {
      this.loadPrimaryData();
    }
  }
  loadPrimaryData = () => {
    const { fetchSeriesData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.SERIES_FETCHING, true);
    fetchSeriesData(apiStr);
  };
  render() {
    const { location, setFetchingState } = this.props;
    const { fetchStatus, eventsFetchStatus, comicsFetchStatus, charactersFetchStatus } = this.props;
    const { fetchedData, storeData, charactersData, eventsData, comicsData } = this.props;
    const { fetchCharacterData, fetchEventsData, fetchComicsData } = this.props;
    const { title, description, modified, thumbnail, urls, comics, creators, characters, events } = storeData || fetchedData;
    const { isFetching, status, message } = fetchStatus;

    const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);

    const renderCharacters = charactersData.map(item => <CharacterCard key={item.id} {...item} pathname={'/characters'} />);
    const renderCreators = creators.items.map((item, index) => <PreviewItem key={index} {...item} />);
    const renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);
    const renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);

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
            <ComicsAccordeon
              fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
              fetchStatus={comicsFetchStatus}
              number={comics.available}
              location={location}
              content={renderComics}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchComicsData}
              title={`Contains ${comics.available} comics`}
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

SingleSeriesPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchSeriesData: PropTypes.func,
  fetchStatus: PropTypes.object,
  charactersData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  charactersFetchStatus: PropTypes.object,
  eventsData: PropTypes.array,
  fetchEventsData: PropTypes.func,
  eventsFetchStatus: PropTypes.object,
  comicsData: PropTypes.array,
  fetchComicsData: PropTypes.func,
  comicsFetchStatus: PropTypes.object,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.seriesData.seriesList.filter(item => item.id === id)[0],
    fetchedData: state.seriesData.seriesBook,
    fetchStatus: state.seriesData.fetchStatus,
    charactersData: state.charactersData.charactersList,
    charactersFetchStatus: state.charactersData.fetchStatus,
    eventsData: state.eventsData.eventsList,
    eventsFetchStatus: state.eventsData.fetchStatus,
    comicsData: state.comicsData.comicsList,
    comicsFetchStatus: state.comicsData.fetchStatus,
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
      dispatch(fetchComics(url));
    },
    fetchSeriesData: url => {
      dispatch(fetchSingleSeries(url));
    },
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSeriesPage);
