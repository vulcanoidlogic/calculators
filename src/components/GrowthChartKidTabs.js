import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import GrowthChartKidTabsRender from './GrowthChartKidTabsRender';

class GrowthChartKidTabs extends Component {
  handleClickClose = () => {};

  handleClickDelete = () => {};

  render() {
    return <GrowthChartKidTabsRender />;
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  const { app: { growthChartPage } } = state;
  return { growthChartPage };
}
export default connect(mapStateToProps, mapDispatchToProps)(GrowthChartKidTabs);
