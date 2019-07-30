import { INCREMENT } from './types';

const initialState = {
  counter: 1666,
};

export default function(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }
  return state;
}
