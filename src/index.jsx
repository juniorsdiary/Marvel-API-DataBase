import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'Store';
import App from './App.jsx';
import './styles/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
);

// TODO: если выбираемая сущность присутствует в списке полученных данных то берем от туда без не обходимости лишнего запроса данных
// TODO: показать ошибку если не получилось зафетчить и вообще обработать разные рузельтаты при получении ответа (предохранители)
// TODO: сделать для ивентов и серии след и пред компонент
// TODO: not found page
