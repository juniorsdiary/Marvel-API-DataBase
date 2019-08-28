import * as types from '../types';

export const fetchSeries = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_SERIES,
        payload: data.data,
      });
      dispatch({ type: types.SERIES_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.SERIES_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.SERIES_FETCHING, payload: false });
  }
};

export const fetchSingleSeries = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_SINGLE_SERIES,
        payload: data.data,
      });
      dispatch({ type: types.SERIES_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.SERIES_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.SERIES_FETCHING, payload: false });
  }
};
