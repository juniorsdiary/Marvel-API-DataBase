import * as types from './types';
import { createApiString } from '../utilities/lib';

export const fetchCharacters = (startsWith, offset) => async dispatch => {
  console.log('fetch');
  const apiString = createApiString(`/characters`, startsWith, offset);
  let res = await fetch(apiString);
  let data = await res.json();
  await dispatch({
    type: types.FETCH_CHARACTERS,
    payload: data.data,
  });
  await dispatch({
    type: types.TOTAL_RESULT,
    payload: {
      totalResult: data.data.total,
      offset: data.data.offset,
    },
  });
  await dispatch({ type: types.IS_FETCHING, payload: false });
};

export const fetchSingleCharacter = id => async dispatch => {
  console.log('fetch');
  const apiString = createApiString(`/characters/${id}?`);
  let res = await fetch(apiString);
  let data = await res.json();
  await dispatch({
    type: types.FETCH_SINGLE_CHARACTERS,
    payload: data.data,
  });
  await dispatch({ type: types.IS_FETCHING, payload: false });
};

export const fetchSingleCommic = id => async dispatch => {
  console.log('fetch');
  const apiString = createApiString(`/comics/${id}?`);
  let res = await fetch(apiString);
  let data = await res.json();
  dispatch({
    type: types.COMIC_BOOK_DATA,
    payload: data.data.results[0],
  });
};
