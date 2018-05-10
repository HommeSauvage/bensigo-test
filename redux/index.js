import nextReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import configureStore from './create-store';

export function withReduxSaga(BaseComponent) {
  return withRedux(configureStore)(nextReduxSaga(BaseComponent));
}
