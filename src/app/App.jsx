import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from 'Modules/Header/Header.jsx';
import Footer from 'Modules/Footer/Footer.jsx';
import CharactersList from 'Pages/CharactersList/CharactersList.jsx';
import CharacterPage from 'Pages/CharacterPage/CharacterPage.jsx';
import ComicsList from 'Pages/ComicsList/ComicsList.jsx';
import EventsList from 'Pages/EventsList/EventsList.jsx';
import SeriesList from 'Pages/SeriesList/SeriesList.jsx';
import CreatorsList from 'Pages/CreatorsList/CreatorsList.jsx';
import ComicBookPage from 'Pages/ComicBookPage/ComicBookPage.jsx';
import SingleSeriesPage from 'Pages/SingleSeriesPage/SingleSeriesPage.jsx';
import EventPage from 'Pages/EventPage/EventPage.jsx';
import CreatorPage from 'Pages/CreatorPage/CreatorPage.jsx';
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

// TODO: адаптивная навигация
// TODO: переделать комнопннет поиска с кнопкной сброса фильтра и добавить еще фильтры
// TODO: сделать выбор отображения результатов для List компонентов
// TODO: погинацию в ContentComponent
// TODO: если выбираемая сущность присутствует в списке полученных данных то берем от туда без не обходимости лишнего запроса данных
// TODO: показать ошибку если не получилось зафетчить и вообще обработать разные рузельтаты при получении ответа (предохранители)
// TODO: сделать для ивентов и серии след и пред компонент
