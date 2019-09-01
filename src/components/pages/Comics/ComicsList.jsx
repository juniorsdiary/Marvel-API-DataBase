import { connect } from 'react-redux';
import { fetchComics, types } from 'Store';
import { SearchCard } from 'Modules';
import ListModule from 'Pages/templates/ListModule.jsx';

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
)(ListModule);

export default ComicsList;
