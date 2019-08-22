import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from 'Modules/Header/Header.jsx';
import Footer from 'Modules/Footer/Footer.jsx';
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
        <Route exact path='/series/:id' component={SingleSeriesPage} />
        <Route exact path='/events/:id' component={EventPage} />
        <Route exact path='/creators/:id' component={CreatorPage} />
      </Switch>
    </Router>
    <Footer />
  </>
);

export default hot(App);

// TODO: переделать комнопннет поиска с кнопкной сброса фильтра и добавить еще фильтры
// TODO: сделать выбор отображения результатов для List компонентов
// TODO: погинацию в ContentComponent
// TODO: если выбираемая сущность присутствует в списке полученных данных то берем от туда без не обходимости лишнего запроса данных
// TODO: показать ошибку если не получилось зафетчить и вообще обработать разные рузельтаты при получении ответа (предохранители)
// TODO: сделать для ивентов и серии след и пред компонент
// // TODO: not found page
