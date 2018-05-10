import { handleActions } from 'redux-actions';
import { DID_LOGIN, LOGIN } from './constants';

const initialState = {
  loggedInUser: {},
  isLoading: false,
};

export default handleActions(
  {
    [LOGIN]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [DID_LOGIN]: {
      next: (state, action) => ({
        ...state,
        loggedInUser: {
          ...action.payload.userData,
        },
        isLoading: false,
      }),
      throw: (state) => ({
        ...state,
        loggedInUser: initialState.loggedInUser,
        isLoading: false,
      }),
    },
  },
  initialState,
);
