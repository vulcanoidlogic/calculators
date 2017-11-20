import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import { initStore } from '/src/configureStore';
import withRoot from 'components/withRoot';
import withRedux from 'next-redux-wrapper';
import GrowthChartAddPointFormRender from './growth-chart-add-point-form-render';
import { getGrowthChartAddPointFormDefns } from 'common/growthChartHelpers';
import _assign from 'lodash/assign';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import {
  BASE_IMG_URL,
  CDC_LENGTH_FOR_AGE,
  WHO_LENGTH_FOR_AGE,
  CDC_WEIGHT_FOR_AGE,
  WHO_WEIGHT_FOR_AGE,
  CDC_LENGTH_FOR_WEIGHT,
  WHO_LENGTH_FOR_WEIGHT,
  CDC_CIRCUMFERENCE_FOR_AGE,
  WHO_CIRCUMFERENCE_FOR_AGE
} from 'common/constants';

const initFormData = props => {
  // const { growthChartPage: { kidPoints, currentPointUuid } } = props;
  // const currentKidPointInfo = getCurrentKidPointInfo(kidPoints, currentPointUuid);
  // const { age, length, circumference, weight } = currentKidPointInfo;
  const { kidUuid, kids } = props;

  const kidIdx = _findIndex(kids, {
    uuid: kidUuid
  });

  // Load either existing child data or blank child data
  const existingKid = kidIdx >= 0;
  const name = existingKid ? kids[kidIdx].name : null;
  const gender = existingKid ? kids[kidIdx].gender : null;

  return {
    kidUuid,
    name,
    gender,
    age: null,
    length: null,
    circumference: null,
    weight: null,
    navButtons: {
      lengthForAgeCdcBtn: { disabled: true, isHidden: true },
      lengthForAgeWhoBtn: { disabled: true, isHidden: true },
      weightForAgeCdcBtn: { disabled: true, isHidden: true },
      weightForAgeWhoBtn: { disabled: true, isHidden: true },
      lengthForWeightCdcBtn: { disabled: true, isHidden: true },
      lengthForWeightWhoBtn: { disabled: true, isHidden: true },
      circumferenceForAgeCdcBtn: { disabled: true, isHidden: true },
      circumferenceForAgeWhoBtn: { disabled: true, isHidden: true }
    }
  };
};

class GrowthChartAddPointForm extends Component {
  constructor(props) {
    super(props);
    // this.defns = this.getDefns(props);
    this.state = initFormData(props);
  }

  defns = {};

  componentDidMount() {
    const { appActions: { setStoreItems } } = this.props;
    const imgSrc = `${BASE_IMG_URL}/Add_Child_w.png`;
    const pageLabel = 'Add New Point to Child';
    setStoreItems([{ storePath: 'pageLabel', value: pageLabel }, { storePath: 'imgSrc', value: imgSrc }]);
  }

  componentWillReceiveProps(props) {
    // this.defns = this.getDefns(props);
    // this.formData = initFormData(props);
  }

  // getDefns = props => {
  //   const { growthChartPage: { kids, kidPoints, currentKidUuid, currentPointUuid }, appActions: { genericFieldValueChange, setStoreItem }, pageLabel } = props;
  //   const kid = kids[0];
  //   const kidPoint = _find(kidPoints, item => {
  //     uuid: currentPointUuid;
  //   });
  //   const defns = _assign(
  //     {
  //       pageLabel
  //     },
  //     getGrowthChartAddPointFormDefns(props),
  //     { handleClickGo: this.handleClickGo }
  //   );
  //   return defns;
  // };

  getDefns = props => {
    const { pageLabel } = props;
    const { state } = this;
    const defns = _assign({ pageLabel }, getGrowthChartAddPointFormDefns(this, state, props));
    return defns;
  };

  childDataChanged = (statePath, evt) => {
    // console.log('--------> ', evt.target.value);
    // this.setState(formData.gender = evt.target.value;
    // let newState = { gender: evt.target.value };
    let newState = {};
    newState[statePath] = evt.target.value;
    this.setState(newState);
  };

  pointDataChanged = (statePath, value) => {
    // console.log('--------> ', statePath, value);
    let newState = {};
    newState[statePath] = value;
    this.setState(newState);
  };

  handleChartLinkClick = url => {
    const { appActions: { handleGrowthChartBtnClick } } = this.props;
    const { kidUuid, name, gender, age, length, weight, circumference } = this.state;
    handleGrowthChartBtnClick(url, { kidUuid, name, gender, age, length, weight, circumference });
  };

  render() {
    // const { defns } = this;
    const defns = this.getDefns(this.props);
    return <GrowthChartAddPointFormRender defns={defns} />;
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  // const { app: { growthChartPage, pageLabel, imgSrc } } = state;
  // return { growthChartPage, pageLabel, imgSrc };
  const { app: { referrerPageCd, growthChartPage: { kids, currentKidUuid } } } = state;
  return { referrerPageCd, kidUuid: currentKidUuid, kids };
  // return {};
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withRoot(GrowthChartAddPointForm));
