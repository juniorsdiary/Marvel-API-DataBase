import * as types from './types';

export const fetchCharacters = url => async dispatch => {
  let res = await fetch(url);
  let data = await res.json();
  dispatch({
    type: types.FETCH_CHARACTERS,
    payload: data.data.results,
  });
  dispatch({
    type: types.TOTAL_RESULT,
    payload: {
      totalResult: data.data.total,
      offset: data.data.offset,
    },
  });
  dispatch({ type: types.IS_FETCHING, payload: false });
};

export const fetchSingleCharacter = url => async dispatch => {
  let res = await fetch(url);
  let data = await res.json();
  await dispatch({
    type: types.FETCH_SINGLE_CHARACTERS,
    payload: data.data,
  });
  await dispatch({ type: types.IS_FETCHING, payload: false });
};

export const fetchComics = url => async dispatch => {
  let res = await fetch(url);
  let data = await res.json();
  await dispatch({
    type: types.FETCH_COMICS,
    payload: data.data.results,
  });
  dispatch({
    type: types.TOTAL_RESULT,
    payload: {
      totalResult: data.data.total,
      offset: data.data.offset,
    },
  });
  await dispatch({ type: types.IS_FETCHING, payload: false });
};
