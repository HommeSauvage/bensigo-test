import Link from 'next/link';
import React from 'react';
import Page from '../components/Page';
import { withReduxSaga } from '../redux';

class Home extends React.Component {

  render() {
    return <Page title='Home Page'>
      <div>Hello, <Link href="/protected" as={`/dashboard`}><a>Go to dashboard</a></Link></div>
    </Page>;
  }
}

export default withReduxSaga(Home);
