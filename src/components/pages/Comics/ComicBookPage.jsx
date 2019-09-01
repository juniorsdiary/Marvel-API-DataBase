import { connect } from 'react-redux';
import { types, fetchSingleComicBook } from 'Store';
import ComicsPageContent from './ComicsPageContent.jsx';
import singlePageModule from 'Pages/templates/SinglePageModule.jsx';
import { withLoader } from 'Components/hocs';

const ContentWithLoader = withLoader()(ComicsPageContent);
const ComicsItemPage = singlePageModule(ContentWithLoader);

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.comicsData.comicsList.filter(item => item.id === id)[0],
    fetchedData: state.comicsData.comicBook,
    fetchStatus: state.comicsData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFunction: url => {
      dispatch(fetchSingleComicBook(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.COMICS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicsItemPage);
