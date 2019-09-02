import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Header } from 'Modules';
import Routes from './routes.jsx';

const App = () => (
  <>
    <Header />
    <Routes />
  </>
);

export default hot(App);
