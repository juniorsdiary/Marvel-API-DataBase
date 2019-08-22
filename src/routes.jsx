import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CharactersList from 'Pages/Characters/CharactersList.jsx';
import CharacterPage from 'Pages/Characters/CharacterPage.jsx';
import ComicsList from 'Pages/Comics/ComicsList.jsx';
import ComicBookPage from 'Pages/Comics/ComicBookPage.jsx';
import EventsList from 'Pages/Events/EventsList.jsx';
import EventPage from 'Pages/Events/EventPage.jsx';
import SeriesList from 'Pages/Series/SeriesList.jsx';
import SingleSeriesPage from 'Pages/Series/SingleSeriesPage.jsx';
import CreatorPage from 'Pages/Creators/CreatorPage.jsx';
import CreatorsList from 'Pages/Creators/CreatorsList.jsx';
import Home from 'Pages/Home/Home.jsx';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/characters' component={CharactersList} />
      <Route exact path='/comics' component={ComicsList} />
      <Route exact path='/events' component={EventsList} />
      <Route exact path='/series' component={SeriesList} />
      <Route exact path='/creators' component={CreatorsList} />
      <Route exact path='/characters/:id' component={CharacterPage} />
      <Route exact path='/comics/:id' component={ComicBookPage} />
      <Route exact path='/series/:id' component={SingleSeriesPage} />
      <Route exact path='/events/:id' component={EventPage} />
      <Route exact path='/creators/:id' component={CreatorPage} />
    </Switch>
  </Router>
);

export default Routes;
