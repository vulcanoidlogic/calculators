import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationRender from './NavigationRender';
import { getNavigationLinkDefns } from 'common/appNavigationHelpers';
import _findKey from 'lodash/findKey';
import _set from 'lodash/set';

const propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  drawerType: PropTypes.string.isRequired
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.defns = this.getDefns(props);
  }

  defns = {};
  state = { isOpenGrowthCharts: true };

  componentWillReceiveProps(props) {
    this.defns = this.getDefns(props);
  }

  getDefns = props => {
    const { handleClickGrowthCharts } = this;
    const { isOpenGrowthCharts } = this.state;
    const { isDrawerOpen, handleDrawerClose, drawerType, pathname } = props;
    const defns = {
      ...getNavigationLinkDefns(props),
      drawer: { isDrawerOpen, onRequestClose: handleDrawerClose, type: drawerType, isOpenGrowthCharts, onClickGrowthCharts: handleClickGrowthCharts }
    };
    const pageKey = _findKey(defns, { href: pathname });
    _set(defns, `${pageKey}.disabled`, true);
    return defns;
  };

  handleClickGrowthCharts = evt => {
    evt.stopPropagation();
    const { isOpenGrowthCharts } = this.state;
    this.defns.drawer.isOpenGrowthCharts = !isOpenGrowthCharts;
    this.setState({ isOpenGrowthCharts: !isOpenGrowthCharts });
  };

  render() {
    const { defns } = this;
    return <NavigationRender defns={defns} />;
  }
}

Navigation.propTypes = propTypes;

export default Navigation;
