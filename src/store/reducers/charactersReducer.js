import * as types from '../types';

const initialState = {
  charactersList: [],
  totalResults: 0,
  offset: 0,
  isFetching: true,
};

export default function charactersData(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CHARACTERS:
      return {
        ...state,
        charactersList: action.payload.results,
        totalResults: action.payload.total,
        offset: action.payload.offset,
      };
    case types.CHARACTERS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
}
