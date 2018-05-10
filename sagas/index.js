import { polyfill } from 'es6-promise';
import 'isomorphic-unfetch';
import auth from '../containers/Login/sagas';

polyfill();

export default [
  ...auth,
];
