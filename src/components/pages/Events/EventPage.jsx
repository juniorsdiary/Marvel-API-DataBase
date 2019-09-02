import { connect } from 'react-redux';
import { types, fetchSingleEvent } from 'Store';
import EventContent from './EventContent.jsx';
import singlePageModule from 'Pages/templates/SinglePageModule.jsx';
import { withLoader } from 'Components/hocs';

const ContentWithLoader = withLoader()(EventContent);
const EventsItemPage = singlePageModule(ContentWithLoader);

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.eventsData.eventsList.filter(item => item.id === id)[0],
    fetchedData: state.eventsData.eventItem,
    fetchStatus: state.eventsData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFunction: url => dispatch(fetchSingleEvent(url)),
    setFetchingState: boolean => {
      dispatch({ type: types.EVENTS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsItemPage);
