import { connect } from 'react-redux';
import { fetchEvents, types } from 'Store';
import { SearchCard, SinglePageModule } from 'Modules';
const mapStateToProps = state => {
  return {
    data: state.eventsData.eventsList,
    totalResults: state.eventsData.totalResults,
    offset: state.eventsData.offset,
    isFetching: state.eventsData.isFetching,
    ItemComponent: SearchCard,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => {
      dispatch(fetchEvents(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.EVENTS_FETCHING, payload: boolean });
    },
  };
};
const EventsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePageModule);

export default EventsList;
