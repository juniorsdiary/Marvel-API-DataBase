import * as types from '../types';

const initialState = {
  creatorsList: [],
  totalResults: 0,
  offset: 0,
  creator: {
    comics: [],
    events: [],
    series: [],
  },
  isFetching: true,
};

export default function creatorsData(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CREATORS:
      return {
        ...state,
        creatorsList: action.payload.results,
        totalResults: action.payload.total,
        offset: action.payload.offset,
      };
    case types.CREATORS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case types.FETCH_SINGLE_CREATOR:
      return {
        ...state,
        creator: action.payload.results[0],
      };
    default:
      return state;
  }
}
