import { connect } from 'react-redux';
import { fetchCreators, types } from 'Store';
import { CreatorsSearchCard } from 'Modules';
import ListModule from 'Pages/templates/ListModule.jsx';

const mapStateToProps = state => {
  return {
    data: state.creatorsData.creatorsList,
    totalResults: state.creatorsData.totalResults,
    offset: state.creatorsData.offset,
    isFetching: state.creatorsData.isFetching,
    ItemComponent: CreatorsSearchCard,
    fetchStatus: state.creatorsData.fetchStatus,
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
)(ListModule);

export default CreatorsList;
