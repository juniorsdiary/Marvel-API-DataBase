import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App.jsx';
import { store, history } from 'Store';

import './styles/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
);

// TODO: adaptive for larger screens and changing design
// TODO: refactor styles and clear useless selectors
// TODO: refactor js code and optimize rendering components
