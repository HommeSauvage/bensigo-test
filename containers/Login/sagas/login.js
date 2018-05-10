import firebase from 'firebase';
import { call, fork, put, takeLatest } from 'redux-saga/lib/effects';
import { didLogin } from '../actions';
import { LOGIN } from '../constants';

export async function login() {
  return new Promise((resolve, reject) => {
    firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(({ user }) => {
        user
          .getIdToken()
          .then((token) => {
            return fetch('/api/login', {
              method: 'POST',
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: JSON.stringify({ token }),
            });
          })
          .then(({ decodedToken }) => resolve(decodedToken));
      })
      .catch(() => {
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin',
        }).then(reject, reject);
      });
  });
}

/**
 * Request request/response handler
 */
export function* handle() {
  try {
    // I'm not sure, I didn't test the code, but if login() using firebase returns an
    // object with user details, it'll be saved to userData variable
    const userData = yield call(login);
    yield put(didLogin(userData));

    // Redirect to dashboard will be done in Gate, but there's a way to add to the "meta"
    // and not the "payload" a "redirect" property that can be consumed here
  } catch (err) {
    yield put(didLogin(err));
  }
}

/**
 * Watches for the action and calls the handler.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* listen() {
  yield fork(takeLatest, LOGIN, handle);
}

// All sagas to be loaded
export default listen;
