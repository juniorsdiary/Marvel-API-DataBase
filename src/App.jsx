import React from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './routes.jsx';
import { Header, Footer } from 'Modules';

import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <>
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  </>
);

export default hot(App);
