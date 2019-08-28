import * as types from '../types';

export const fetchCharacters = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_CHARACTERS,
        payload: data.data,
      });
      dispatch({ type: types.CHARACTERS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.CHARACTERS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.CHARACTERS_FETCHING, payload: false });
  }
};

export const fetchSingleCharacter = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_SINGLE_CHARACTERS,
        payload: data.data,
      });
      dispatch({ type: types.CHARACTERS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.CHARACTERS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.CHARACTERS_FETCHING, payload: false });
  }
};
