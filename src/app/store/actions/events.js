import * as types from '../types';
export const fetchEvents = url => async dispatch => {
  // console.log(url);
  let res = await fetch(url);
  let data = await res.json();
  await dispatch({
    type: types.FETCH_EVENTS,
    payload: data.data.results,
  });
  dispatch({
    type: types.TOTAL_RESULT,
    payload: {
      totalResult: data.data.total,
      offset: data.data.offset,
    },
  });
  await dispatch({ type: types.IS_FETCHING, payload: false });
};
