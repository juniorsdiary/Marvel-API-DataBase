import { connect } from 'react-redux';
import { fetchCreators, types } from 'Store';
import { CreatorsSearchCard, SinglePageModule } from 'Modules';
const mapStateToProps = state => {
  return {
    data: state.creatorsData.creatorsList,
    totalResults: state.creatorsData.totalResults,
    offset: state.creatorsData.offset,
    isFetching: state.creatorsData.isFetching,
    ItemComponent: CreatorsSearchCard,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => {
      dispatch(fetchCreators(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CREATORS_FETCHING, payload: boolean });
    },
  };
};
const CreatorsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePageModule);

export default CreatorsList;
