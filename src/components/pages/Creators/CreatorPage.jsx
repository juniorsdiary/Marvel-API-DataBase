import { connect } from 'react-redux';
import { types, fetchSingleCreator } from 'Store';
import CreatorsPageContent from './CreatorsPageContent.jsx';
import singlePageModule from 'Pages/templates/SinglePageModule.jsx';
import { withLoader } from 'Components/hocs';

const ContentWithLoader = withLoader(CreatorsPageContent);
const CreatorsItemPage = singlePageModule(ContentWithLoader);

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedData: state.creatorsData.creator,
    fetchStatus: state.creatorsData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFunction: (url, token) => dispatch(fetchSingleCreator(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.CREATORS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorsItemPage);
