import * as types from '../types';

export const fetchCreators = url => async dispatch => {
  dispatch({ type: types.CLEAR_CREATORS });
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_CREATORS,
        payload: data.data,
      });
      dispatch({ type: types.CREATORS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.CREATORS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.CREATORS_FETCHING, payload: false });
  }
};

export const fetchSingleCreator = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_SINGLE_CREATOR,
        payload: data.data,
      });
      dispatch({ type: types.CREATORS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.CREATORS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.CREATORS_FETCHING, payload: false });
  }
};
