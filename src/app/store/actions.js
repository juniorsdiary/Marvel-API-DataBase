import * as types from './types';
import { getHash, contructParametrsQuery, createApiString } from '../utilities/lib';

export const fetchCharacters = (startsWith, offset) => async dispatch => {
  const controller = new AbortController();
  const signal = controller.signal;
  signal.addEventListener('abort', () => {
    console.log('aborted!');
  });
  const ts = new Date().getTime();
  const hash = getHash(ts);
  const query = contructParametrsQuery(startsWith, offset);
  const apiString = createApiString(`/characters${query}`, hash, ts);
  let res = await fetch(apiString, { signal });
  // console.log('start aborting');
  // controller.abort();
  let data = await res.json();
  await dispatch({
    type: types.FETCH_CHARACTERS,
    payload: data.data,
  });
  await dispatch({
    type: types.TOTAL_RESULT,
    payload: data.data.total,
  });
  await dispatch({ type: types.IS_FETCHING, payload: false });
};

export const fetchSingleCharacter = id => async dispatch => {
  const ts = new Date().getTime();
  const hash = getHash(ts);
  const apiString = createApiString(`/characters/${id}?`, hash, ts);
  let res = await fetch(apiString);
  let data = await res.json();
  await dispatch({
    type: types.FETCH_SINGLE_CHARACTERS,
    payload: data.data,
  });
};
