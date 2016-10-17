import {
  combineReducers
} from 'redux';

import {
  routerReducer
} from 'react-router-redux';

const reducerApp = combineReducers({
  routing: routerReducer
});

export default reducerApp;