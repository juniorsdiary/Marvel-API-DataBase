import { connect } from 'react-redux';
import { fetchCharacters, types } from 'Store';
import { CharacterCard } from 'Modules';
import ListModule from 'Pages/templates/ListModule.jsx';

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
    fetchData: (url, token) => dispatch(fetchCharacters(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

const CharactersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListModule);

export default CharactersList;
