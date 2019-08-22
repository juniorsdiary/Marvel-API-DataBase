import * as types from '../types';
import { fetchFunction } from 'Utilities/lib';

export const fetchSeries = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_SERIES,
    payload: data.data,
  });
  dispatch({ type: types.SERIES_FETCHING, payload: false });
};

export const fetchSingleSeries = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_SINGLE_SERIES,
    payload: data.data,
  });
  dispatch({ type: types.SERIES_FETCHING, payload: false });
};
