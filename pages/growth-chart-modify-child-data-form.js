import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import { initStore } from '/src/configureStore';
import withRoot from 'components/withRoot';
import withRedux from 'next-redux-wrapper';
import GrowthChartModifyChildDataFormRender from './growth-chart-modify-child-data-form-render';
import { getGrowthChartEditMeasurementsFormDefns, getJoinedKidDataAndDefns } from 'common/growthChartHelpers';
import _assign from 'lodash/assign';
import _find from 'lodash/find';
import { BASE_IMG_URL, MODIFY_CHILD_DATA } from 'common/constants';

const getUpdatedKidData = (originalData, uuid, storePath, value) => {
  const newJoinedKidData = _assign({}, joinedKidData, {
    [uuid]: { ...joinedKidData[uuid], [storePath]: { ...joinedKidData[uuid][storePath], value } }
  });
  return newJoinedKidData;
};

class GrowthChartModifyChildDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = { joinedKidData: getJoinedKidDataAndDefns(this, props, MODIFY_CHILD_DATA) };
    console.log('GrowthChartModifyChildDataForm constructor this.state.joinedKidData=', this.state.joinedKidData);
  }

  componentDidMount() {
    const { appActions: { setStoreItems } } = this.props;
    const imgSrc = `${BASE_IMG_URL}/Modify_Child_w.png`;
    setStoreItems([{ storePath: 'pageLabel', value: MODIFY_CHILD_DATA }, { storePath: 'imgSrc', value: imgSrc }]);
  }

  componentWillReceiveProps(props) {}

  kidInfoChanged = (uuid, storePath, evt) => {
    const { joinedKidData } = this.state;
    const newJoinedKidData = getUpdatedKidData(joinedKidData, uuid, storePath, evt.target.value);
    this.setState({ joinedKidData: newJoinedKidData });
  };

  measurementsChanged = (uuid, storePath, value) => {
    const { joinedKidData } = this.state;
    const newJoinedKidData = getUpdatedKidData(joinedKidData, uuid, storePath, value);
    this.setState({ joinedKidData: newJoinedKidData });
  };

  render() {
    const { joinedKidData } = this.state;
    return <GrowthChartModifyChildDataFormRender joinedKidData={joinedKidData} />;
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  const { app: { growthChartPage, pageLabel, imgSrc } } = state;
  return { growthChartPage, pageLabel, imgSrc };
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withRoot(GrowthChartModifyChildDataForm));
