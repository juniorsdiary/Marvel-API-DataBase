import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Header, Footer } from 'Modules';
import Routes from './routes.jsx';

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
