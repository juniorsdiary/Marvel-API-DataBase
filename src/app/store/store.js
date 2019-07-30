import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const md = [thunk];

const store = createStore(reducer, applyMiddleware(...md));

export default store;
