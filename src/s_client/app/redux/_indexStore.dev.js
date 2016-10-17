import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import thunk from 'redux-thunk';

import reducerApp from './indexReducers';

import DevTools from '../component/__devtools';

const store = createStore(
  reducerApp,
  window.STATE_FROM_SERVER,
  compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  )
);

export default store;