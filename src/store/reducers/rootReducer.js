import { combineReducers } from 'redux';
import * as types from '../types';
import { connectRouter } from 'connected-react-router';
import charactersData from './charactersReducer';
import comicsData from './comicsReducer';
import seriesData from './seriesReducer';
import eventsData from './eventsReducer';
import creatorsData from './creatorsReducer';

function searchValue(state = '', action) {
  if (action.type === types.SET_SEARCH_VALUE) {
    return action.payload;
  }
  return state;
}

const rootReducer = history =>
  combineReducers({
    creatorsData,
    eventsData,
    seriesData,
    comicsData,
    charactersData,
    searchValue,
    router: connectRouter(history),
  });

export default rootReducer;
