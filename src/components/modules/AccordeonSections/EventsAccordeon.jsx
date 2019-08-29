import { types, fetchEvents } from 'Store';
import { connect } from 'react-redux';
import { withDataFetching } from 'Components/hocs';
import AccordeonSection from './AccordeonSection.jsx';

const EventsAccordeon = connect(
  state => ({
    data: state.eventsData.eventsList,
    fetchStatus: state.eventsData.fetchStatus,
  }),
  dispatch => ({
    fetchFunction: url => {
      dispatch(fetchEvents(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.EVENTS_FETCHING, payload: boolean });
    },
  })
)(withDataFetching('/events')(AccordeonSection));

export default EventsAccordeon;
