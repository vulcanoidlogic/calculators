import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { initStore } from '/src/configureStore';
import withRoot from 'components/withRoot';
import withRedux from 'next-redux-wrapper';
import * as appActions from 'actions/app';
import _get from 'lodash/get';
import BasicCalculatorRender from './basic-calculator-render';

const propTypes = {};

class BasicCalculator extends Component {
  calcStr = '0';

  componentWillReceiveProps(props) {
    this.calcStr = Number(this.calcStr + _get(props, 'basicCalculatorPage.lastChar', '0')).toString();
  }

  handleClickNumber = number => {
    const { appActions: { genericFieldChange } } = this.props;
    genericFieldChange('basicCalculatorPage.lastChar', number);
    genericFieldChange('basicCalculatorPage.currentValue', this.calcStr);
  };

  render() {
    const { handleClickNumber, calcStr } = this;
    return <BasicCalculatorRender calcStr={calcStr} handleClickNumber={handleClickNumber} />;
  }
}

BasicCalculator.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  const { app } = state;
  return app;
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withRoot(BasicCalculator));
