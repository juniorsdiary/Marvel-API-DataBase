import { connect } from 'react-redux';
import { fetchSeries, types } from 'Store';
import { SearchCard } from 'Modules';
import ListModule from 'Pages/templates/ListModule.jsx';

const mapStateToProps = state => {
  return {
    data: state.seriesData.seriesList,
    totalResults: state.seriesData.totalResults,
    offset: state.seriesData.offset,
    isFetching: state.seriesData.isFetching,
    ItemComponent: SearchCard,
    fetchStatus: state.seriesData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, token) => dispatch(fetchSeries(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.SERIES_FETCHING, payload: boolean });
    },
  };
};

const SeriesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListModule);

export default SeriesList;
