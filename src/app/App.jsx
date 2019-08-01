import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from './modules/Header/Header.jsx';
import Footer from './modules/Footer/Footer.jsx';
import CharactersList from './pages/CharactersList/CharactersList.jsx';
import CharacterPage from './pages/CharacterPage/CharacterPage.jsx';
import ComicsList from './pages/ComicsList/ComicsList.jsx';
import Home from './pages/Home/Home.jsx';

const App = () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/characters' component={CharactersList} />
        <Route path='/comics' component={ComicsList} />
        <Route path='/character/:id' component={CharacterPage} />
      </Switch>
    </Router>
    <Footer />
  </>
);

export default hot(App);