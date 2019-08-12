import { combineReducers } from 'redux';
import * as types from './types';
import { connectRouter } from 'connected-react-router';

const initialCharacterData = {
  name: '',
  description: '',
  modified: '',
  thumbnail: {
    path: '',
    extension: '',
  },
  comics: [],
  series: [],
  events: [],
  stories: [],
};

function charactersList(state = [], action) {
  if (action.type === types.FETCH_CHARACTERS) {
    return action.payload;
  }
  return state;
}

function comicBooksData(state = [], action) {
  if (action.type === types.FETCH_COMICS) {
    return action.payload;
  }
  return state;
}

function seriesData(state = [], action) {
  if (action.type === types.FETCH_SERIES) {
    return action.payload;
  }
  return state;
}
function eventsData(state = [], action) {
  if (action.type === types.FETCH_EVENTS) {
    return action.payload;
  }
  return state;
}
function storiesData(state = [], action) {
  if (action.type === types.FETCH_STORIES) {
    return action.payload;
  }
  return state;
}

function currentOffset(state = 0, action) {
  if (action.type === types.CHANGE_OFFSET) {
    return action.payload;
  }
  return state;
}
function searchValue(state = '', action) {
  if (action.type === types.SET_SEARCH_VALUE) {
    return action.payload;
  }
  return state;
}
function singleCharacter(state = initialCharacterData, action) {
  if (action.type === types.FETCH_SINGLE_CHARACTERS) {
    return action.payload.results[0];
  }
  return state;
}
function paginationData(state = {}, action) {
  if (action.type === types.TOTAL_RESULT) {
    return {
      totalResult: action.payload.totalResult,
      offset: action.payload.offset,
    };
  }
  return state;
}

function isFetching(state = true, action) {
  if (action.type === types.IS_FETCHING) {
    return action.payload;
  }
  return state;
}

const rootReducer = history =>
  combineReducers({
    storiesData,
    eventsData,
    seriesData,
    comicBooksData,
    charactersList,
    singleCharacter,
    isFetching,
    paginationData,
    searchValue,
    currentOffset,
    router: connectRouter(history),
  });

export default rootReducer;
