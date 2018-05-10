import React from 'react';

import Page from '../components/Page';
import { withReduxSaga } from '../redux';

class Protected extends React.Component {
  static async getInitialProps({ store, isServer }) {
    // Something interesting here like store.dispatch(fetchUsers())
  }

  render() {
    return <Page title='Protected Page' guarded>This is dashboard</Page>;
  }
}

export default withReduxSaga(Protected);
