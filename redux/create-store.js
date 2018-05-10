/**
 * Create the store with asynchronously loaded reducers
 */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import login from '../containers/Login/reducer';
import rootSaga from '../sagas';

export const rootReducer = combineReducers({
  login,
});

// creates the store
export default (initialState) => {
  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  let rightCompose = compose;
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    rightCompose = composeWithDevTools;
  }

  const store = createStore(rootReducer, rightCompose(...enhancers));

  // kick off root saga
  store.sagaTask = rootSaga.map((saga) => sagaMiddleware.run(saga));

  return store;
};
