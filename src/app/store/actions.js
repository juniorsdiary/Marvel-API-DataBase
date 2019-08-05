import { FETCH_CHARACTERS, FETCH_SINGLE_CHARACTERS, IS_FETCHING, TOTAL_RESULT } from './types';
import { getHash, contructParametrsQuery, createApiString } from '../lib';

export const fetchCharacters = (startsWith, offset) => async dispatch => {
  const ts = new Date().getTime();
  const hash = getHash(ts);
  const query = contructParametrsQuery(startsWith, offset);
  const apiString = createApiString(`/characters${query}`, hash, ts);
  let res = await fetch(apiString);
  let data = await res.json();
  await dispatch({
    type: FETCH_CHARACTERS,
    payload: data.data,
  });
  await dispatch({
    type: TOTAL_RESULT,
    payload: {
      totalResult: data.data.total,
      offset: data.data.offset,
    },
  });
  await dispatch({ type: IS_FETCHING, payload: false });
};

export const fetchSingleCharacter = id => async dispatch => {
  const ts = new Date().getTime();
  const hash = getHash(ts);
  const apiString = createApiString(`/characters/${id}?`, hash, ts);
  let res = await fetch(apiString);
  let data = await res.json();
  await dispatch({
    type: FETCH_SINGLE_CHARACTERS,
    payload: data.data,
  });
};
