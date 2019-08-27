import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchEvents, fetchSeries, fetchComics, fetchSingleCharacter } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import { Loader, ImageAvatar, AccordeonSection, DetailsSection, SearchCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';

const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);

const CharacterPage = props => {
  const { location, fetchComicsData, fetchSeriesData, fetchEventsData, fetchCharacterData } = props;
  const { fetchedData, storeData, comicsData, seriesData, eventsData } = props;
  const { isFetching, comicsFetching, seriesFetching, eventsFetching, setFetchingState } = props;
  const { name, description, modified, thumbnail, urls, comics, series, events } = storeData || fetchedData;

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
    <div className='single_item_page'>
      {isFetching ? (
        <Loader />
      ) : (
        <div className='items_data_wrapper'>
          {/* <ImageAvatar wrapper={true} className='character_page_image' baseSrc={baseSrc} src={src} />
          <DetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} /> */}
          <AccordeonComicsWithDataFetching
            fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
            loading={comicsFetching}
            number={comics.available}
            location={location}
            content={renderComics}
            slider={true}
            contentClassName='default_slider_block'
            callBack={fetchComicsData}
            title={`Encountered in ${comics.available} comics`}
          />
          <AccordeonSeriesWithDataFetching
            fetchingCallBack={bool => setFetchingState(types.SERIES_FETCHING, bool)}
            loading={seriesFetching}
            number={series.available}
            location={location}
            content={renderSeries}
            slider={true}
            contentClassName='default_slider_block'
            callBack={fetchSeriesData}
            title={`Encountered in ${series.available} series`}
          />
          <AccordeonEventsWithDataFetching
            fetchingCallBack={bool => setFetchingState(types.EVENTS_FETCHING, bool)}
            loading={eventsFetching}
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
  eventsData: PropTypes.array,
  comicsData: PropTypes.array,
  seriesData: PropTypes.array,
  fetchEventsData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  fetchSeriesData: PropTypes.func,
  setFetchingState: PropTypes.func,
  comicsFetching: PropTypes.bool,
  seriesFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  location: PropTypes.object,
  fetchCharacterData: PropTypes.func,
  isFetching: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.charactersData.charactersList.filter(item => item.id === id)[0],
    fetchedData: state.charactersData.singleCharacter,
    eventsData: state.eventsData.eventsList,
    comicsData: state.comicsData.comicsList,
    seriesData: state.seriesData.seriesList,
    comicsFetching: state.comicsData.isFetching,
    seriesFetching: state.seriesData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    isFetching: state.charactersData.isFetching,
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
