import * as types from '../types';

const initialState = {
  charactersList: [],
  totalResults: 0,
  offset: 0,
  singleCharacter: {
    name: '',
    description: '',
    modified: '',
    thumbnail: {
      path: '',
      extension: '',
    },
    comics: [],
    series: [],
    events: [],
    stories: [],
  },
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
    case types.FETCH_SINGLE_CHARACTERS:
      return {
        ...state,
        singleCharacter: action.payload.results[0],
      };
    default:
      return state;
  }
}
