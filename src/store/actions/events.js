import * as types from '../types';
import { fetchFunction } from 'Utilities';

export const fetchEvents = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_EVENTS,
    payload: data.data,
  });
  dispatch({ type: types.EVENTS_FETCHING, payload: false });
};

export const fetchSingleEvent = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_SINGLE_EVENT,
    payload: data.data,
  });
  dispatch({ type: types.EVENTS_FETCHING, payload: false });
};
