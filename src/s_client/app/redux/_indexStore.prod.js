import {
  createStore,
  applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';

import reducerApp from './indexReducers';

const store = createStore(
  reducerApp,
  window.STATE_FROM_SERVER,
  applyMiddleware(thunk)
);

export default store;