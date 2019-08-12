import * as types from '../types';

const initialState = {
  seriesList: [],
  totalResults: 0,
  offset: 0,
  seriesBook: {},
  isFetching: false,
};

export default function seriesData(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SERIES:
      return {
        ...state,
        seriesList: action.payload.results,
        totalResults: action.payload.total,
        offset: action.payload.offset,
      };
    case types.SERIES_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case types.FETCH_SINGLE_SERIES:
      return {
        ...state,
        seriesBook: action.payload.results[0],
      };
    default:
      return state;
  }
}
