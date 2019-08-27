import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchComics, fetchEvents, fetchSeries, fetchSingleCreator } from 'Store';
import { Loader, AccordeonSection, SearchCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';
import { ApiFactory } from 'Utilities';
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);
const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);

const CreatorPage = props => {
  const { isFetching, comicsFetching, eventsFetching, seriesFetching, location } = props;
  const { fetchComicsData, fetchEventsData, fetchSeriesData, fetchCreatorData } = props;
  const { fetchedData, comicsData, eventsData, seriesData } = props;
  const { setFetchingState } = props;
  const { comics, events, series } = fetchedData;

  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.CREATORS_FETCHING, true);
    fetchCreatorData(apiStr);
  }, [fetchCreatorData, location, setFetchingState]);

  let renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
  let renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);
  let renderSeries = seriesData.map(item => <SearchCard key={item.id} {...item} pathname={'/series'} />);
  return (
    <div className='page_content'>
      {isFetching ? (
        <Loader />
      ) : (
        <div className='items_data_wrapper'>
          <p className='creator_page_name'>{fetchedData.fullName}</p>
          <AccordeonComicsWithDataFetching
            fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
            loading={comicsFetching}
            number={comics.available}
            location={location}
            content={renderComics}
            slider={true}
            contentClassName='default_slider_block'
            callBack={fetchComicsData}
            title={`Took part in ${comics.available} comics`}
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
            title={`Created ${events.available} events`}
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
            title={`Creator of ${series.available} series`}
          />
        </div>
      )}
    </div>
  );
};

CreatorPage.propTypes = {
  fetchedData: PropTypes.object,
  comicsData: PropTypes.array,
  eventsData: PropTypes.array,
  seriesData: PropTypes.array,
  fetchSeriesData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  fetchCreatorData: PropTypes.func,
  setFetchingState: PropTypes.func,
  comicsFetching: PropTypes.bool,
  seriesFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    eventsData: state.eventsData.eventsList,
    comicsData: state.comicsData.comicsList,
    fetchedData: state.creatorsData.creator,
    isFetching: state.creatorsData.isFetching,
    seriesData: state.seriesData.seriesList,
    comicsFetching: state.comicsData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    seriesFetching: state.seriesData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicsData: url => {
      dispatch(fetchComics(url));
    },
    fetchEventsData: url => {
      dispatch(fetchEvents(url));
    },
    fetchSeriesData: url => {
      dispatch(fetchSeries(url));
    },
    fetchCreatorData: url => {
      dispatch(fetchSingleCreator(url));
    },
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorPage);
