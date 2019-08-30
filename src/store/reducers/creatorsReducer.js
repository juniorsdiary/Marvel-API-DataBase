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
  fetchStatus: {
    status: false,
    message: '',
    isFetching: false,
  },
};

export default function creatorsData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CLEAR_CREATORS:
      return {
        ...state,
        totalResults: 0,
      };
    case types.FETCH_CREATORS:
      return {
        ...state,
        creatorsList: payload.results,
        totalResults: payload.total,
        offset: payload.offset,
      };
    case types.FETCH_SINGLE_CREATOR:
      return {
        ...state,
        creator: payload.results[0],
      };
    case types.CREATORS_FETCHING:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          isFetching: payload,
        },
      };
    case types.CREATORS_FETCH_SUCCEEDED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          message: payload,
          status: true,
        },
      };
    case types.CREATORS_FETCH_FAILED:
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
