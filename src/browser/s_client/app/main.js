import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {
  syncHistoryWithStore
} from 'react-router-redux';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

import {
  E404,
  E500
} from './component/_error';

import App from './component/_app';

import Home from './container/home';

import store from './redux/indexStore';

const _history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={_history}>
      <Route component={App} path="/">
        <IndexRoute component={Home} />
        <Route component={E500} path="500" />
        <Route component={E404} path="*" />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));