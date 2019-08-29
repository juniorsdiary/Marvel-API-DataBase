import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchComics, fetchEvents, fetchSeries, fetchSingleCreator } from 'Store';
import { ErrorHandler, Loader, AccordeonSection, SearchCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';
import { ApiFactory } from 'Utilities';

const ComicsAccordeon = withDataFetching('/comics')(AccordeonSection);
const EventsAccordeon = withDataFetching('/events')(AccordeonSection);
const SeriesAccordeon = withDataFetching('/series')(AccordeonSection);
class CreatorPage extends Component {
  componentDidMount() {
    this.loadPrimaryData();
  }
  loadPrimaryData = () => {
    const { fetchCreatorData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.CREATORS_FETCHING, true);
    fetchCreatorData(apiStr);
  };
  render() {
    const { location, setFetchingState } = this.props;
    const { fetchComicsData, fetchEventsData, fetchSeriesData } = this.props;
    const { fetchedData, comicsData, eventsData, seriesData } = this.props;
    const { fetchStatus, eventsFetchStatus, comicsFetchStatus, seriesFetchStatus } = this.props;
    const { comics, events, series } = fetchedData;
    const { isFetching, status, message } = fetchStatus;

    let renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
    let renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);
    let renderSeries = seriesData.map(item => <SearchCard key={item.id} {...item} pathname={'/series'} />);

    return (
      <div className='page_content'>
        {isFetching ? (
          <Loader />
        ) : !status ? (
          <ErrorHandler msg={message} size={'35'} loadData={() => this.loadPrimaryData()} />
        ) : (
          <div className='items_data_wrapper'>
            <p className='creator_page_name'>{fetchedData.fullName}</p>
            <ComicsAccordeon
              fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
              fetchStatus={comicsFetchStatus}
              number={comics.available}
              location={location}
              content={renderComics}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchComicsData}
              title={`Took part in ${comics.available} comics`}
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
              title={`Created ${events.available} events`}
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
              title={`Creator of ${series.available} series`}
            />
          </div>
        )}
      </div>
    );
  }
}

CreatorPage.propTypes = {
  fetchedData: PropTypes.object,
  fetchCreatorData: PropTypes.func,
  fetchStatus: PropTypes.object,
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
  return {
    fetchedData: state.creatorsData.creator,
    fetchStatus: state.creatorsData.fetchStatus,
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
