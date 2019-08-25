import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { types, fetchSingleCreator, fetchComics, fetchEvents, fetchSeries } from 'Store';
import { ApiFactory } from 'Utilities';
import { Loader, AccordeonSection, SearchCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';

const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);
const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);

class CreatorPage extends Component {
  componentDidMount() {
    const { location, setFetchingState, fetchCreatorData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.CREATORS_FETCHING, true);
    fetchCreatorData(apiStr);
  }
  render() {
    const { isFetching, comicsFetching, eventsFetching, seriesFetching, location } = this.props;
    const { fetchComicsData, fetchEventsData, fetchSeriesData } = this.props;
    const { creatorData, comicsData, eventsData, seriesData } = this.props;
    const { setFetchingState } = this.props;
    const { comics, events, series } = creatorData;
    let renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
    let renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);
    let renderSeries = seriesData.map(item => <SearchCard key={item.id} {...item} pathname={'/series'} />);
    return (
      <div className='page_content'>
        {!isFetching ? (
          <div className='items_data_wrapper'>
            <p className='creator_page_name'>{creatorData.fullName}</p>
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
              title={`Encountered in ${series.available} series`}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

CreatorPage.propTypes = {
  creatorData: PropTypes.object,
  comicsData: PropTypes.array,
  eventsData: PropTypes.array,
  seriesData: PropTypes.array,
  fetchCreatorData: PropTypes.func,
  fetchSeriesData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  setFetchingState: PropTypes.func,
  comicsFetching: PropTypes.bool,
  seriesFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    eventsData: state.eventsData.eventsList,
    comicsData: state.comicsData.comicsList,
    creatorData: state.creatorsData.creator,
    seriesData: state.seriesData.seriesList,
    comicsFetching: state.comicsData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    seriesFetching: state.seriesData.isFetching,
    isFetching: state.creatorsData.isFetching,
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
