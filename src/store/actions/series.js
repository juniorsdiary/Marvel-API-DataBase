import * as types from '../types';
import axios from 'axios';

export const fetchSeries = (url, cancelToken) => async dispatch => {
  dispatch({ type: types.CLEAR_SERIES });
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_SERIES,
        payload: data.data,
      });
      dispatch({ type: types.SERIES_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.SERIES_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.SERIES_FETCHING, payload: false }));
};

export const fetchSingleSeries = (url, cancelToken) => async dispatch => {
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_SINGLE_SERIES,
        payload: data.data,
      });
      dispatch({ type: types.SERIES_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.SERIES_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.SERIES_FETCHING, payload: false }));
};
