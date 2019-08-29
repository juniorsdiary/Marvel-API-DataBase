import * as types from '../types';

const initialState = {
  eventsList: [],
  totalResults: 0,
  offset: 0,
  eventItem: {
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
    series: [],
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

export default function eventsData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_EVENTS:
      return {
        ...state,
        eventsList: payload.results,
        totalResults: payload.total,
        offset: payload.offset,
      };
    case types.EVENTS_FETCHING:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          isFetching: payload,
        },
      };
    case types.FETCH_SINGLE_EVENT:
      return {
        ...state,
        eventItem: payload.results[0],
      };
    case types.EVENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          message: payload,
          status: true,
        },
      };
    case types.EVENTS_FETCH_FAILED:
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
