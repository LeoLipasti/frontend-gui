// REDUX
import reducer from '../reducers';

import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import reduxPromise from 'redux-promise';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

export default store;
