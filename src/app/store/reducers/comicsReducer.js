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
    case types.FETCH_SINGLE_COMIC_BOOK:
      return {
        ...state,
        comicBook: action.payload.results[0],
      };
    default:
      return state;
  }
}
