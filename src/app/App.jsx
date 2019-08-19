import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from './modules/Header/Header.jsx';
import Footer from './modules/Footer/Footer.jsx';
import CharactersList from './pages/CharactersList/CharactersList.jsx';
import CharacterPage from './pages/CharacterPage/CharacterPage.jsx';
import ComicsList from './pages/ComicsList/ComicsList.jsx';
import EventsList from './pages/EventsList/EventsList.jsx';
import SeriesList from './pages/SeriesList/SeriesList.jsx';
import CreatorsList from './pages/CreatorsList/CreatorsList.jsx';
import ComicBookPage from './pages/ComicBookPage/ComicBookPage.jsx';
import Home from './pages/Home/Home.jsx';

const App = () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/characters' component={CharactersList} />
        <Route exact path='/comics' component={ComicsList} />
        <Route exact path='/events' component={EventsList} />
        <Route exact path='/series' component={SeriesList} />
        <Route exact path='/creators' component={CreatorsList} />
        <Route exact path='/characters/:id' component={CharacterPage} />
        <Route exact path='/comics/:id' component={ComicBookPage} />
      </Switch>
    </Router>
    <Footer />
  </>
);

export default hot(App);

// TODO: страница для серии
// TODO: страница для создателя
// TODO: страница для ивента
// TODO: адаптивная навигация
// TODO: переделать комнопннет поиска с кнопкной сброса фильтра и добавить еще фильтры
// TODO: сделать выбор отображения результатов для List компонентов
