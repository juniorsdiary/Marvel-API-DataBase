import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import charactersData from './charactersReducer';
import comicsData from './comicsReducer';
import seriesData from './seriesReducer';
import eventsData from './eventsReducer';
import creatorsData from './creatorsReducer';

const rootReducer = history =>
  combineReducers({
    creatorsData,
    eventsData,
    seriesData,
    comicsData,
    charactersData,
    router: connectRouter(history),
  });

export default rootReducer;
