import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from '../reducers/index.js';
import rootSaga from '../sagas/index.js';

const middlewares = [];
const { logger } = require('redux-logger');


// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
middlewares.push(logger);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  // install saga run
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  //run saga
  store.runSaga(rootSaga);

  return store;
}