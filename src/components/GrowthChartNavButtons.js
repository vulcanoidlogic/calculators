import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import { initStore } from '/src/configureStore';
import withRoot from 'components/withRoot';
import withRedux from 'next-redux-wrapper';
import GrowthChartNavButtonsRender from './GrowthChartNavButtonsRender';
import { getGrowthChartAddPointFormDefns } from 'common/growthChartHelpers';
import _assign from 'lodash/assign';

class GrowthChartNavButtons extends Component {
  constructor(props) {
    super(props);
    this.defnsList = this.getDefns(props);
  }

  defns = {};
  defnsList = [];

  componentWillReceiveProps(props) {
    this.defnsList = this.getDefns(props);
  }

  getDefns = props => {
    const { growthChartPage: { navButtons = [] } } = props;
    const defnsList = [];

    // navButtons.forEach(navBtn => {
    //   defnsList.push({
    //     navBtn: { onClick: () => {} },
    //     navBtnText: { value: navBtn }
    //   });
    // });

    navButtons.forEach(navBtn => {
      defnsList.push({
        link: { href: navBtn.href },
        linkText: { value: navBtn.text }
      });
    });

    return defnsList;
  };

  render() {
    const { defnsList } = this;

    return (
      <div>
        {defnsList.map((defns, idx) => (
          <GrowthChartNavButtonsRender defns={defns} key={idx} />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

function mapStateToProps(state) {
  const { app: { growthChartPage } } = state;
  return { growthChartPage };
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  GrowthChartNavButtons
);
