import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import { initStore } from '/src/configureStore';
import withRoot from 'components/withRoot';
import withRedux from 'next-redux-wrapper';
import rowsFemale from 'data/growth/cdcFemaleCircumferenceForAgeJson';
import rowsMale from 'data/growth/cdcMaleCircumferenceForAgeJson';
import GrowthChartPageRender from './growth-chart-page-render';
import {
  getGrowthChartDefns,
  assignGrowthChartCircumferenceForAgePoints,
  getDefaultDefnsParmsChartCircumferenceForAge,
  updateGrowthChartCircumferenceForAgeDisplayParms
} from 'common/growthChartHelpers';
import { CDC_CIRCUMFERENCE_FOR_AGE } from 'common/constants';

const chartData = rowsFemale.concat(rowsMale);

// defnsParms contains chart-specific info that is passed to getGrowthChartDefns to build defns props that are passed to growth chart graph
const defnsParms = getDefaultDefnsParmsChartCircumferenceForAge();

class GrowthChartCircumferenceForAge extends Component {
  constructor(props) {
    super(props);
    updateGrowthChartCircumferenceForAgeDisplayParms(320, props, defnsParms);
    this.initDefns(props);
    const { appActions: { initGrowthChart } } = props;
    initGrowthChart(chartData, defnsParms);
  }

  defns = {};
  chartTopPos = 200;

  componentDidMount() {
    window.addEventListener('resize', this.refreshDisplay);
    this.refreshDisplay();
  }

  componentWillReceiveProps(props) {
    this.updateDefns(props);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.refreshDisplay);
  }

  refreshDisplay = () => {
    updateGrowthChartCircumferenceForAgeDisplayParms(window.innerHeight - this.chartTopPos, this.props, defnsParms);
    const { appActions: { updateKidPoints }, growthChartPage: { currentKidUuid, kids, kidPoints } } = this.props;
    const plotPoints = assignGrowthChartCircumferenceForAgePoints(currentKidUuid, kids, kidPoints, defnsParms, chartData);
    updateKidPoints(plotPoints);
  };

  handleAnchorElementLoad = evt => {
    const { top } = evt.target.getBoundingClientRect();
    this.chartTopPos = top;
    this.refreshDisplay();
  };

  initDefns = props => {
    defnsParms.referrerPageCd = CDC_CIRCUMFERENCE_FOR_AGE;
    defnsParms.refreshDisplay = this.refreshDisplay;
    defnsParms.onAnchorElementLoad = this.handleAnchorElementLoad;
    this.updateDefns(props);
  };

  updateDefns = props => {
    const { gender } = defnsParms;
    if (gender === 'MALE') {
      this.defns = getGrowthChartDefns(defnsParms, props, rowsMale);
    } else if (gender === 'FEMALE') {
      this.defns = getGrowthChartDefns(defnsParms, props, rowsFemale);
    }
  };

  render() {
    const { defns } = this;
    return <GrowthChartPageRender defns={defns} />;
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  const { app: { growthChartPage, growthChartCircumferenceForAgePage, pageLabel, imgSrc } } = state;
  return { growthChartPage, growthChartCircumferenceForAgePage, pageLabel, imgSrc };
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withRoot(GrowthChartCircumferenceForAge));
