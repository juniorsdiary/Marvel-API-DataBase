import { types, fetchSeries } from 'Store';
import { connect } from 'react-redux';
import { withDataFetching } from 'Components/hocs';
import AccordeonSection from './AccordeonSection.jsx';

const SeriesAccordeon = connect(
  state => ({
    data: state.seriesData.seriesList,
    fetchStatus: state.seriesData.fetchStatus,
    history: state.router,
  }),
  dispatch => ({
    fetchFunction: (url, token) => dispatch(fetchSeries(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.SERIES_FETCHING, payload: boolean });
    },
  })
)(withDataFetching('/series')(AccordeonSection));

export default SeriesAccordeon;
