import * as types from '../types';

const initialState = {
  comicsList: [],
  totalResults: 0,
  offset: 0,
  isFetching: true,
};

export default function comicsData(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_COMICS:
      return {
        ...state,
        comicsList: action.payload.results,
        totalResults: action.payload.total,
        offset: action.payload.offset,
      };
    case types.COMICS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
}
