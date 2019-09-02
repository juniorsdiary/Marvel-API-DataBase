import * as types from '../types';
import axios from 'axios';

export const fetchCreators = (url, cancelToken) => async dispatch => {
  dispatch({ type: types.CLEAR_CREATORS });
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_CREATORS,
        payload: data.data,
      });
      dispatch({ type: types.CREATORS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.CREATORS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.CREATORS_FETCHING, payload: false }));
};

export const fetchSingleCreator = (url, cancelToken) => async dispatch => {
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_SINGLE_CREATOR,
        payload: data.data,
      });
      dispatch({ type: types.CREATORS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.CREATORS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.CREATORS_FETCHING, payload: false }));
};
