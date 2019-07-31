import { FETCH_CHARACTERS, FETCH_SINGLE_CHARACTERS } from './types';

const initialState = {
  charactersList: [],
  singleCharacter: {},
  totalResult: 0,
};

export default function(state = initialState, action) {
  if (action.type === FETCH_CHARACTERS) {
    return {
      ...state,
      charactersList: action.payload.results,
      totalResult: action.payload.total,
    };
  } else if (action.type === FETCH_SINGLE_CHARACTERS) {
    return {
      ...state,
      singleCharacter: action.payload.results[0],
    };
  }
  return state;
}
