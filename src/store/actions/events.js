import * as types from '../types';
import axios from 'axios';

export const fetchEvents = (url, cancelToken) => async dispatch => {
  dispatch({ type: types.CLEAR_EVENTS });
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_EVENTS,
        payload: data.data,
      });
      dispatch({ type: types.EVENTS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.EVENTS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.EVENTS_FETCHING, payload: false }));
};

export const fetchSingleEvent = (url, cancelToken) => async dispatch => {
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_SINGLE_EVENT,
        payload: data.data,
      });
      dispatch({ type: types.EVENTS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.EVENTS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.EVENTS_FETCHING, payload: false }));
};
