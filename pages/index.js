import React, { Component } from 'react';
import { initStore } from '/src/configureStore';
import withRoot from 'components/withRoot';
import withRedux from 'next-redux-wrapper';
import Typography from 'material-ui/Typography';

class Home extends Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  render() {
    return (
      <main className="centered-page">
        <Typography type="title" color="inherit" noWrap>
          Welcome to our wonderful calculators site!
        </Typography>
      </main>
    );
  }
}
export default withRedux(initStore, null, null)(withRoot(Home));
