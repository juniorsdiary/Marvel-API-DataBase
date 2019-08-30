import * as types from '../types';

const initialState = {
  comicsList: [],
  totalResults: 0,
  offset: 0,
  comicBook: {
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
  },
  fetchStatus: {
    status: false,
    message: '',
    isFetching: false,
  },
};

export default function comicsData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CLEAR_COMICS:
      return {
        ...state,
        totalResults: 0,
      };
    case types.FETCH_COMICS:
      return {
        ...state,
        comicsList: payload.results,
        totalResults: payload.total,
        offset: payload.offset,
      };
    case types.COMICS_FETCHING:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          isFetching: payload,
        },
      };
    case types.FETCH_SINGLE_COMIC_BOOK:
      return {
        ...state,
        comicBook: payload.results[0],
      };
    case types.COMICS_FETCH_SUCCEEDED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          message: payload,
          status: true,
        },
      };
    case types.COMICS_FETCH_FAILED:
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
