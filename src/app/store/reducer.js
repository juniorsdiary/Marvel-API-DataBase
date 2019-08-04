import { FETCH_CHARACTERS, FETCH_SINGLE_CHARACTERS, SET_LOAD_STATE, IS_FETCHING, TOTAL_RESULT, SET_SEARCH_VALUE } from './types';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
const pagination = {
  totalResult: 0,
  offset: 0,
};
function searchValue(state = '', action) {
  if (action.type === SET_SEARCH_VALUE) {
    return action.payload;
  }
  return state;
}
function singleCharacter(state = {}, action) {
  if (action.type === FETCH_SINGLE_CHARACTERS) {
    return action.payload.results[0];
  }
  return state;
}
function paginationData(state = pagination, action) {
  if (action.type === TOTAL_RESULT) {
    return action.payload;
  }
  return state;
}

function charactersList(state = [], action) {
  if (action.type === FETCH_CHARACTERS) {
    return action.payload.results;
  } else if (action.type === SET_LOAD_STATE) {
    return state.map(character => (character.id === action.payload ? { ...character, imageLoaded: true } : { ...character }));
  }
  return state;
}

function isFetching(state = true, action) {
  if (action.type === IS_FETCHING) {
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
    router: connectRouter(history),
  });

export default rootReducer;
