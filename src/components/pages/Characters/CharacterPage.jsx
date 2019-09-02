import { connect } from 'react-redux';
import { types, fetchSingleCharacter } from 'Store';
import CharactersPageContent from './CharactersPageContent.jsx';
import singlePageModule from 'Pages/templates/SinglePageModule.jsx';
import { withLoader } from 'Components/hocs';

const ContentWithLoader = withLoader(CharactersPageContent);
const CharactersItemPage = singlePageModule(ContentWithLoader);

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.charactersData.charactersList.filter(item => item.id === id)[0],
    fetchedData: state.charactersData.singleCharacter,
    fetchStatus: state.charactersData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFunction: (url, token) => dispatch(fetchSingleCharacter(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersItemPage);
