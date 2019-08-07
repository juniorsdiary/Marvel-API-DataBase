import { combineReducers } from 'redux';
import * as types from './types';
import { connectRouter } from 'connected-react-router';

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
function singleCharacter(state = {}, action) {
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

function charactersList(state = [], action) {
  if (action.type === types.FETCH_CHARACTERS) {
    return action.payload.results;
  } else if (action.type === types.SET_LOAD_STATE) {
    return state.map(character => (character.id === action.payload ? { ...character, imageLoaded: true } : { ...character }));
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
    charactersList,
    singleCharacter,
    isFetching,
    paginationData,
    searchValue,
    currentOffset,
    router: connectRouter(history),
  });

export default rootReducer;
