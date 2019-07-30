import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import Navigation from './modules/Navigation';
import Characters from './pages/characters/App';
import Comics from './pages/comics/App';

const App = () => (
  <>
    <Router>
      <Navigation />
      <Route path='/characters' component={Characters} />
      <Route path='/comics' component={Comics} />
    </Router>
  </>
);

export default hot(App);
