import { connect } from 'react-redux';
import { fetchEvents, types } from 'Store';
import { SearchCard } from 'Modules';
import ListModule from 'Pages/templates/ListModule.jsx';
const mapStateToProps = state => {
  return {
    data: state.eventsData.eventsList,
    totalResults: state.eventsData.totalResults,
    offset: state.eventsData.offset,
    isFetching: state.eventsData.isFetching,
    ItemComponent: SearchCard,
    fetchStatus: state.eventsData.fetchStatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, token) => dispatch(fetchEvents(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.EVENTS_FETCHING, payload: boolean });
    },
  };
};
const EventsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListModule);

export default EventsList;
