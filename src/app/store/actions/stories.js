import * as types from '../types';
import { fetchFunction } from '../../utilities/lib';

export const fetchStories = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_STORIES,
    payload: data.data,
  });
  dispatch({ type: types.STORIES_FETCHING, payload: false });
};

export const fetchSingleStory = url => async dispatch => {
  const data = await fetchFunction(url);
  dispatch({
    type: types.FETCH_SINGLE_STORY,
    payload: data.data,
  });
  dispatch({ type: types.STORIES_FETCHING, payload: false });
};
