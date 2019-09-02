import { types, fetchCharacters } from 'Store';
import { connect } from 'react-redux';
import { withDataFetching } from 'Components/hocs';
import AccordeonSection from './AccordeonSection.jsx';

const CharactersAccordeon = connect(
  state => ({
    data: state.charactersData.charactersList,
    fetchStatus: state.charactersData.fetchStatus,
    history: state.router,
  }),
  dispatch => ({
    fetchFunction: (url, token) => dispatch(fetchCharacters(url, token)),
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  })
)(withDataFetching('/characters')(AccordeonSection));

export default CharactersAccordeon;
