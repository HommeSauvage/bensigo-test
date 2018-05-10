import noop from 'lodash/noop';
import { createActions } from 'redux-actions';
import { DID_LOGIN, LOGIN } from './constants';

const actions = createActions({
  [LOGIN]: noop,
  [DID_LOGIN]: (userData) => userData,
});

export const { login, didLogin } = actions.bensigo.login;

export default actions;
