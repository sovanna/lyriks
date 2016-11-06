import {
  combineReducers
} from 'redux';

import {
  routerReducer
} from 'react-router-redux';

import home from './reducers/home';

const reducerApp = combineReducers({
  home,
  routing: routerReducer
});

export default reducerApp;