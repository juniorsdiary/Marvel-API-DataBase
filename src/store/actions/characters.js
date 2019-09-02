import * as types from '../types';
import axios from 'axios';

export const fetchCharacters = (url, cancelToken) => async dispatch => {
  dispatch({ type: types.CLEAR_CHARACTERS });
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_CHARACTERS,
        payload: data.data,
      });
      dispatch({ type: types.CHARACTERS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.CHARACTERS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.CHARACTERS_FETCHING, payload: false }));
};

export const fetchSingleCharacter = (url, cancelToken) => async dispatch => {
  dispatch({ type: types.CLEAR_CHARACTERS });
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_SINGLE_CHARACTERS,
        payload: data.data,
      });
      dispatch({ type: types.CHARACTERS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.CHARACTERS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.CHARACTERS_FETCHING, payload: false }));
};
