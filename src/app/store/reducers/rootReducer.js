import { combineReducers } from 'redux';
import * as types from '../types';
import { connectRouter } from 'connected-react-router';
import charactersData from './charactersReducer';
import comicsData from './comicsReducer';

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
function searchValue(state = '', action) {
  if (action.type === types.SET_SEARCH_VALUE) {
    console.log(action.payload);
    return action.payload;
  }
  return state;
}

const rootReducer = history =>
  combineReducers({
    storiesData,
    eventsData,
    seriesData,
    comicsData,
    charactersData,
    searchValue,
    router: connectRouter(history),
  });

export default rootReducer;
