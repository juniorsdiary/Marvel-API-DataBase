import { connect } from 'react-redux';
import { fetchCharacters, types } from 'Store';
import { SinglePageModule, CharacterCard } from 'Modules';

const mapStateToProps = state => {
  return {
    data: state.charactersData.charactersList,
    totalResults: state.charactersData.totalResults,
    offset: state.charactersData.offset,
    isFetching: state.charactersData.isFetching,
    ItemComponent: CharacterCard,
    fetchStatus: state.charactersData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => {
      dispatch(fetchCharacters(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

const CharactersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePageModule);

export default CharactersList;
