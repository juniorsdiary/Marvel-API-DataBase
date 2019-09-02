import { types, fetchComics } from 'Store';
import { connect } from 'react-redux';
import { withDataFetching } from 'Components/hocs';
import AccordeonSection from './AccordeonSection.jsx';

const ComicsAccordeon = connect(
  state => ({
    data: state.comicsData.comicsList,
    fetchStatus: state.comicsData.fetchStatus,
    history: state.router,
  }),
  dispatch => ({
    fetchFunction: (url, token) => dispatch(fetchComics(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.COMICS_FETCHING, payload: boolean });
    },
  })
)(withDataFetching('/comics')(AccordeonSection));

export default ComicsAccordeon;
