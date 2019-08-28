import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchEvents, fetchSeries, fetchComics, fetchSingleCharacter } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import { Loader, ImageAvatar, AccordeonSection, DetailsSection, SearchCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';

const EventsAccordeon = withDataFetching('/events')(AccordeonSection);
const SeriesAccordeon = withDataFetching('/series')(AccordeonSection);
const ComicsAccordeon = withDataFetching('/comics')(AccordeonSection);

const CharacterPage = props => {
  const { fetchComicsData, fetchSeriesData, fetchEventsData, fetchCharacterData } = props;
  const { fetchedData, storeData, comicsData, seriesData, eventsData } = props;
  const { setFetchingState, location } = props;
  const { fetchStatus, eventsFetchStatus, comicsFetchStatus, seriesFetchStatus } = props;
  const { name, description, modified, thumbnail, urls, comics, series, events } = storeData || fetchedData;
  const { isFetching } = fetchStatus;

  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    if (!storeData) {
      setFetchingState(types.CHARACTERS_FETCHING, true);
      fetchCharacterData(apiStr);
    }
  }, [fetchCharacterData, location, setFetchingState, storeData]);

  const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
  const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

  const lastModified = convertToLocale(modified);

  let renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
  let renderSeries = seriesData.map(item => <SearchCard key={item.id} {...item} pathname={'/series'} />);
  let renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);

  return (
    <div className='page_content'>
      {isFetching ? (
        <Loader />
      ) : (
        <div className='items_data_wrapper'>
          <ImageAvatar wrapper={true} className='character_page_image' baseSrc={baseSrc} src={src} />
          <DetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} />
          <ComicsAccordeon
            fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
            fetchStatus={comicsFetchStatus}
            number={comics.available}
            location={location}
            content={renderComics}
            slider={true}
            contentClassName='default_slider_block'
            callBack={fetchComicsData}
            title={`Encountered in ${comics.available} comics`}
          />
          <SeriesAccordeon
            fetchingCallBack={bool => setFetchingState(types.SERIES_FETCHING, bool)}
            fetchStatus={seriesFetchStatus}
            number={series.available}
            location={location}
            content={renderSeries}
            slider={true}
            contentClassName='default_slider_block'
            callBack={fetchSeriesData}
            title={`Encountered in ${series.available} series`}
          />
          <EventsAccordeon
            fetchingCallBack={bool => setFetchingState(types.EVENTS_FETCHING, bool)}
            fetchStatus={eventsFetchStatus}
            number={events.available}
            location={location}
            content={renderEvents}
            slider={true}
            contentClassName='default_slider_block'
            callBack={fetchEventsData}
            title={`Encountered in ${events.available} events`}
          />
        </div>
      )}
    </div>
  );
};

CharacterPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchStatus: PropTypes.object,
  fetchCharacterData: PropTypes.func,
  eventsData: PropTypes.array,
  fetchEventsData: PropTypes.func,
  eventsFetchStatus: PropTypes.object,
  comicsData: PropTypes.array,
  fetchComicsData: PropTypes.func,
  comicsFetchStatus: PropTypes.object,
  seriesData: PropTypes.array,
  fetchSeriesData: PropTypes.func,
  seriesFetchStatus: PropTypes.object,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.charactersData.charactersList.filter(item => item.id === id)[0],
    fetchedData: state.charactersData.singleCharacter,
    fetchStatus: state.charactersData.fetchStatus,
    eventsData: state.eventsData.eventsList,
    eventsFetchStatus: state.eventsData.fetchStatus,
    comicsData: state.comicsData.comicsList,
    comicsFetchStatus: state.comicsData.fetchStatus,
    seriesData: state.seriesData.seriesList,
    seriesFetchStatus: state.seriesData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsData: url => {
      dispatch(fetchEvents(url));
    },
    fetchComicsData: url => {
      dispatch(fetchComics(url));
    },
    fetchSeriesData: url => {
      dispatch(fetchSeries(url));
    },
    fetchCharacterData: url => {
      dispatch(fetchSingleCharacter(url));
    },
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPage);
