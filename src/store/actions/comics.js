import * as types from '../types';
import axios from 'axios';

export const fetchComics = (url, cancelToken) => async dispatch => {
  dispatch({ type: types.CLEAR_COMICS });
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_COMICS,
        payload: data.data,
      });
      dispatch({ type: types.COMICS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.COMICS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.COMICS_FETCHING, payload: false }));
};

export const fetchSingleComicBook = (url, cancelToken) => async dispatch => {
  return axios
    .get(url, { cancelToken })
    .then(({ statusText, data }) => {
      dispatch({
        type: types.FETCH_SINGLE_COMIC_BOOK,
        payload: data.data,
      });
      dispatch({ type: types.COMICS_FETCH_SUCCEEDED, payload: statusText });
    })
    .catch(e => dispatch({ type: types.COMICS_FETCH_FAILED, payload: e.message }))
    .then(() => dispatch({ type: types.COMICS_FETCHING, payload: false }));
};
