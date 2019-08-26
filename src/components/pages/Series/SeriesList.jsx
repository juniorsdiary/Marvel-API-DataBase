import { connect } from 'react-redux';
import { fetchSeries, types } from 'Store';
import { SinglePageModule, SearchCard } from 'Modules';
const mapStateToProps = state => {
  return {
    data: state.seriesData.seriesList,
    totalResults: state.seriesData.totalResults,
    offset: state.seriesData.offset,
    isFetching: state.seriesData.isFetching,
    ItemComponent: SearchCard,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => {
      dispatch(fetchSeries(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.SERIES_FETCHING, payload: boolean });
    },
  };
};
const SeriesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePageModule);

export default SeriesList;
