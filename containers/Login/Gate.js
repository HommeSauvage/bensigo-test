import isEmpty from 'lodash/isEmpty';
import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import config from '../../config/client';
import { login } from './actions';
import { makeSelectLoggedInUser } from './selectors';
import { gatePropTypes } from './utils';
import firebase from 'firebase';


export class Gate extends React.PureComponent {
  static propTypes = gatePropTypes;

  componentDidMount() {
    firebase.initializeApp(config.firebase.client);

    if (isEmpty(this.props.loggedInUser) || !this.props.loggedInUser.email) {
      this.props.goToLogin();
    }
  }

  componentWillUpdate(nextProps) {
    if (!isEmpty(nextProps.loggedInUser) && nextProps.currentRoute === '/login') {
      nextProps.goToDashboard();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = createStructuredSelector({
  currentRoute: () => Router.route,
  loggedInUser: makeSelectLoggedInUser(),
});

export default connect(mapStateToProps, {
  login,
  goToLogin: () => Router.push('/login'),
  goToDashboard: () => Router.push('/dashboard'),
})(Gate);
