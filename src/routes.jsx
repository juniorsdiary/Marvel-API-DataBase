import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  CharactersList,
  CharacterPage,
  ComicsList,
  ComicBookPage,
  EventsList,
  EventPage,
  SeriesList,
  SingleSeriesPage,
  CreatorPage,
  CreatorsList,
  Home,
} from 'Pages';

const Routes = () => (
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
);

export default Routes;
