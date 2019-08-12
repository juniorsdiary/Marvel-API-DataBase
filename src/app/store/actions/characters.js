import * as types from '../types';
import { fetchFunction } from '../../utilities/lib';

export const fetchCharacters = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_CHARACTERS,
    payload: data.data,
  });
  dispatch({ type: types.CHARACTERS_FETCHING, payload: false });
};

export const fetchSingleCharacter = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_SINGLE_CHARACTERS,
    payload: data.data,
  });
  dispatch({ type: types.CHARACTERS_FETCHING, payload: false });
};
