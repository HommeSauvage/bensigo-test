import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import { propTypes } from './utils';

export class Login extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    return <div>
      <button onClick={this.props.login}>Login</button>
    </div>;
  }
}

export default connect(null, {
  login,
})(Login);
