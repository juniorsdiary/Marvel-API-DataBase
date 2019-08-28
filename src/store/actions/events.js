import * as types from '../types';

export const fetchEvents = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_EVENTS,
        payload: data.data,
      });
      dispatch({ type: types.EVENTS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.EVENTS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.EVENTS_FETCHING, payload: false });
  }
};

export const fetchSingleEvent = url => async dispatch => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      dispatch({
        type: types.FETCH_SINGLE_EVENT,
        payload: data.data,
      });
      dispatch({ type: types.EVENTS_FETCH_SUCCEEDED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: types.EVENTS_FETCH_FAILED, payload: e.message });
  } finally {
    dispatch({ type: types.EVENTS_FETCHING, payload: false });
  }
};
