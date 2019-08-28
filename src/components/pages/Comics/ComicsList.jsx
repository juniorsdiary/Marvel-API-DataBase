import { connect } from 'react-redux';
import { fetchComics, types } from 'Store';
import { SinglePageModule, SearchCard } from 'Modules';
const mapStateToProps = state => {
  return {
    data: state.comicsData.comicsList,
    totalResults: state.comicsData.totalResults,
    offset: state.comicsData.offset,
    isFetching: state.comicsData.isFetching,
    ItemComponent: SearchCard,
    fetchStatus: state.comicsData.fetchStatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => {
      dispatch(fetchComics(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.COMICS_FETCHING, payload: boolean });
    },
  };
};
const ComicsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePageModule);

export default ComicsList;
