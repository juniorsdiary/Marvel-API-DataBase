import * as types from '../types';

const initialState = {
  storiesList: [],
  totalResults: 0,
  offset: 0,
  storyItem: {},
  isFetching: false,
};

export default function seriesData(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_STORIES:
      return {
        ...state,
        storiesList: action.payload.results,
        totalResults: action.payload.total,
        offset: action.payload.offset,
      };
    case types.STORIES_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case types.FETCH_SINGLE_STORY:
      return {
        ...state,
        storyItem: action.payload.results[0],
      };
    default:
      return state;
  }
}
