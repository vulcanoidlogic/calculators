import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import GrowthChartModifyChildDataSectionRender from './GrowthChartModifyChildDataSectionRender';
import { getGrowthChartModifyChildDataFormDefns } from 'common/growthChartHelpers';
import { BASE_IMG_URL } from 'common/constants';

class GrowthChartModifyChildDataSection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {}

  // getDefns = props => {
  //   const defns = _assign(getGrowthChartModifyChildDataFormDefns(props), { handleClickGo: this.handleClickGo });
  //   return defns;
  // };

  render() {
    const { defns, kidPoints } = this.props;
    console.log('calling GrowthChartModifyChildDataSectionRender defns, kidPoints=', defns, kidPoints);
    return <GrowthChartModifyChildDataSectionRender defns={defns} kidPoints={kidPoints} />;
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  const { app: { growthChartPage, pageLabel, imgSrc } } = state;
  return { growthChartPage, pageLabel, imgSrc };
}
export default connect(mapStateToProps, mapDispatchToProps)(GrowthChartModifyChildDataSection);
