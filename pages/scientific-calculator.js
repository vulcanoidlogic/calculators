import React from 'react';
import Typography from 'material-ui/Typography';
import { initStore } from '/src/configureStore';
import withRoot from 'components/withRoot';
import withRedux from 'next-redux-wrapper';

const ScientificCalculator = props => {
  return (
    <main className="centered-page">
      <Typography type="title" color="inherit" noWrap>
        Welcome to our scientific calculator.
      </Typography>
    </main>
  );
};

export default withRedux(initStore, null, null)(withRoot(ScientificCalculator));
