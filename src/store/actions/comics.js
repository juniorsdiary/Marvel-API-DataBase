import * as types from '../types';

export const fetchComics = url => async dispatch => {
  dispatch({ type: types.CLEAR_COMICS });
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_COMICS,
        payload: data.data,
      });
      dispatch({ type: types.COMICS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.COMICS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.COMICS_FETCHING, payload: false });
  }
};

export const fetchSingleComicBook = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_SINGLE_COMIC_BOOK,
        payload: data.data,
      });
      dispatch({ type: types.COMICS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.COMICS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.COMICS_FETCHING, payload: false });
  }
};
