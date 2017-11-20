import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import GrowthChartKidDetailsPopoverRender from './GrowthChartKidDetailsPopoverRender';
import { getCurrentKidPointInfo, getGrowthChartEditMeasurementsFormDefns } from 'common/growthChartHelpers';

const initFormData = props => {
  const { growthChartPage: { kidPoints, currentPointUuid } } = props;
  const currentKidPointInfo = getCurrentKidPointInfo(kidPoints, currentPointUuid);
  // const { age, length, circumference, weight } = currentKidPointInfo;
  // return {
  //   age,
  //   length,
  //   circumference,
  //   weight
  // };
  return currentKidPointInfo;
};

class GrowthChartKidDetailsPopover extends Component {
  formData = {};

  componentWillReceiveProps(props) {
    this.formData = initFormData(props);
  }

  handleClickClose = () => {
    const { appActions: { setStoreItem } } = this.props;
    // setStoreItem('growthChartPage.currentPointUuid', null);
    setStoreItem('growthChartPage.isDisplayKidDetailsPopover', false);
  };

  handleClickSave = () => {
    const { appActions: { updateKidPoint }, refreshDisplay } = this.props;
    this.handleClickClose();
    updateKidPoint(this.formData);
    refreshDisplay();
  };

  handleClickDelete = () => {
    const { appActions: { deleteCurrentKid } } = this.props;
    deleteCurrentKid();
  };

  measurementsChanged = (uuid, statePath, value) => {
    this.formData[statePath] = value;
  };

  render() {
    const { handleClickClose, handleClickDelete, handleClickSave, formData } = this;
    const { width, height, growthChartPage: { isDisplayKidDetailsPopover }, anchorElLeft, anchorElTop, referrerPageCd } = this.props;
    return (
      <GrowthChartKidDetailsPopoverRender
        width={width}
        height={height}
        isKidDetailsPopoverOpen={isDisplayKidDetailsPopover}
        onRequestClose={handleClickClose}
        onRequestDelete={handleClickDelete}
        onClickSave={handleClickSave}
        anchorElLeft={isDisplayKidDetailsPopover ? anchorElLeft : 20}
        anchorElTop={isDisplayKidDetailsPopover ? anchorElTop : 60}
        defns={getGrowthChartEditMeasurementsFormDefns(this, formData, referrerPageCd)}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  const { app: { growthChartPage } } = state;
  return { growthChartPage };
}
export default connect(mapStateToProps, mapDispatchToProps)(GrowthChartKidDetailsPopover);
