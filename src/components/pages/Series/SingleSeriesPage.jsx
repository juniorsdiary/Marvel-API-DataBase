import { connect } from 'react-redux';
import { types, fetchSingleSeries } from 'Store';
import SingleSeriesContent from './SingleSeriesContent.jsx';
import singlePageModule from 'Pages/templates/SinglePageModule.jsx';
import { withLoader } from 'Components/hocs';

const ContentWithLoader = withLoader()(SingleSeriesContent);
const SeriesItemPage = singlePageModule(ContentWithLoader);

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.seriesData.seriesList.filter(item => item.id === id)[0],
    fetchedData: state.seriesData.seriesBook,
    fetchStatus: state.seriesData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFunction: url => dispatch(fetchSingleSeries(url)),
    setFetchingState: boolean => {
      dispatch({ type: types.SERIES_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesItemPage);
