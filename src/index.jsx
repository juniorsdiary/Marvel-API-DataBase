import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'Store/store';
// import { hot } from 'react-hot-loader/root';

import './styles/styles.scss';
import Routes from './routes.jsx';
import Header from 'Modules/Header/Header.jsx';
import Footer from 'Modules/Footer/Footer.jsx';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Header />
      <Routes />
      <Footer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
);

// TODO: переделать комнопннет поиска с кнопкной сброса фильтра и добавить еще фильтры
// TODO: сделать выбор отображения результатов для List компонентов
// TODO: погинацию в ContentComponent
// TODO: если выбираемая сущность присутствует в списке полученных данных то берем от туда без не обходимости лишнего запроса данных
// TODO: показать ошибку если не получилось зафетчить и вообще обработать разные рузельтаты при получении ответа (предохранители)
// TODO: сделать для ивентов и серии след и пред компонент
// TODO: not found page
