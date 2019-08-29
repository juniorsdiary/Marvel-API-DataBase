import * as types from '../types';

const initialState = {
  seriesList: [],
  totalResults: 0,
  offset: 0,
  seriesBook: {
    title: '',
    description: '',
    modified: '',
    thumbnail: {
      path: '',
      extension: '',
    },
    characters: [],
    creators: {
      items: [],
    },
    events: [],
    comics: [],
    previous: {
      resourceURI: '',
      name: '',
    },
    next: {
      resourceURI: '',
      name: '',
    },
  },
  fetchStatus: {
    status: false,
    message: '',
    isFetching: false,
  },
};

export default function seriesData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_SERIES:
      return {
        ...state,
        seriesList: payload.results,
        totalResults: payload.total,
        offset: payload.offset,
      };
    case types.SERIES_FETCHING:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          isFetching: payload,
        },
      };
    case types.FETCH_SINGLE_SERIES:
      return {
        ...state,
        seriesBook: payload.results[0],
      };
    case types.SERIES_FETCH_SUCCEEDED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          message: payload,
          status: true,
        },
      };
    case types.SERIES_FETCH_FAILED:
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
