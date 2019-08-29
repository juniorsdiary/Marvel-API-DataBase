import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Header } from 'Modules';
import Routes from './routes.jsx';

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  </>
);

export default hot(App);
