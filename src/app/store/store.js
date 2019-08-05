import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

export const history = createBrowserHistory();

const md = [routerMiddleware(history), thunk];

const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(...md)));

export default store;
