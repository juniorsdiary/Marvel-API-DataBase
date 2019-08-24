import * as types from '../types';
import { fetchFunction } from 'Utilities';

export const fetchCreators = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_CREATORS,
    payload: data.data,
  });
  dispatch({ type: types.CREATORS_FETCHING, payload: false });
};

export const fetchSingleCreator = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_SINGLE_CREATOR,
    payload: data.data,
  });
  dispatch({ type: types.CREATORS_FETCHING, payload: false });
};
