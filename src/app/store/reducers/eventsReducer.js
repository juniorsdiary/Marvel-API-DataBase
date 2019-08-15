import * as types from '../types';

const initialState = {
  eventsList: [],
  totalResults: 0,
  offset: 0,
  eventItem: {},
  isFetching: false,
};

export default function eventsData(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_EVENTS:
      return {
        ...state,
        eventsList: action.payload.results,
        totalResults: action.payload.total,
        offset: action.payload.offset,
      };
    case types.EVENTS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case types.FETCH_SINGLE_EVENT:
      return {
        ...state,
        eventItem: action.payload.results[0],
      };
    default:
      return state;
  }
}
