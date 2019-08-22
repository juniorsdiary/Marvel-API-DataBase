import * as types from '../types';
import { fetchFunction } from 'Utilities/lib';

export const fetchComics = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_COMICS,
    payload: data.data,
  });
  dispatch({ type: types.COMICS_FETCHING, payload: false });
};

export const fetchSingleComicBook = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_SINGLE_COMIC_BOOK,
    payload: data.data,
  });
  dispatch({ type: types.COMICS_FETCHING, payload: false });
};
