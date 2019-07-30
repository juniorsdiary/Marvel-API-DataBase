import { FETCH_CHARACTERS } from './types';

const initialState = {
  charactersList: [],
};

export default function(state = initialState, action) {
  if (action.type === FETCH_CHARACTERS) {
    return {
      ...state,
      charactersList: action.payload,
    };
  }
  return state;
}
