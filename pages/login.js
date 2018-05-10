import React from 'react';

import Page from '../components/Page';
import LoginContainer from '../containers/Login';
import { withReduxSaga } from '../redux';

class Login extends React.Component {
  render() {
    return <Page title='Login Page'>
      <LoginContainer />
    </Page>;
  }
}

export default withReduxSaga(Login);
