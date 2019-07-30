import { SOME_ACTION } from './types';

const initialState = {};

export default function(state = initialState, action) {
  if (action.type === SOME_ACTION) {
    return {
      ...state,
    };
  }
  return state;
}
