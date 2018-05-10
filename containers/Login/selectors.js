import { createSelector } from "reselect";

/**
 * Select base
 */
export const selectLogin = () => (state) => state.login;

export const makeSelectLoggedInUser = () => createSelector(
  selectLogin(),
  (auth) => auth.loggedInUser,
);
