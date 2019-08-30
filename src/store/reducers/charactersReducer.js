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
  },
  fetchStatus: {
    status: false,
    message: '',
    isFetching: false,
  },
};

export default function charactersData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CLEAR_CHARACTERS:
      return {
        ...state,
        totalResults: 0,
      };
    case types.FETCH_CHARACTERS:
      return {
        ...state,
        charactersList: payload.results,
        totalResults: payload.total,
        offset: payload.offset,
      };
    case types.CHARACTERS_FETCHING:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          isFetching: payload,
        },
      };
    case types.FETCH_SINGLE_CHARACTERS:
      return {
        ...state,
        singleCharacter: payload.results[0],
      };
    case types.CHARACTERS_FETCH_SUCCEEDED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          message: payload,
          status: true,
        },
      };
    case types.CHARACTERS_FETCH_FAILED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          message: payload,
          status: false,
        },
      };
    default:
      return state;
  }
}
