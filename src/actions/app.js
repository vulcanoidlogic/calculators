import * as types from 'actionTypes/app';
import Router from 'next/router';
import uuidv4 from 'uuid/v4';
import _assign from 'lodash/assign';

export const genericFieldChange = (sourcePath, payload) => {
  return {
    type: types.GENERIC_FIELD_CHANGE,
    sourcePath,
    payload
  };
};

export const genericFieldValueChange = (sourcePath, evt) => {
  return {
    type: types.GENERIC_FIELD_VALUE_CHANGE,
    sourcePath,
    value: evt.target.value
  };
};

export const setStoreItem = (sourcePath, value) => {
  return {
    type: types.GENERIC_PATH_ITEM_CHANGE,
    sourcePath,
    value
  };
};

//items example [{storePath: 'myPage.field1', value: 'My Updated Value}]
export const setStoreItems = items => {
  return {
    type: types.GENERIC_STORE_ITEMS_CHANGE,
    items
  };
};

export const handleGrowthChartBtnClick = (url, formData = {}) => {
  return (dispatch, getState) => {
    const { name, gender, age, length, weight, circumference, kidUuid: formKidUuid } = formData;
    const kidUuid = formKidUuid ? formKidUuid : uuidv4();
    const kidPointUuid = uuidv4();

    // Save the kid and kidPoint data
    if (!formKidUuid) {
      dispatch(addKid({ uuid: kidUuid, name, gender }));
    }
    dispatch(addKidPoint({ uuid: kidPointUuid, kidUuid, age, length, weight, circumference, point: [] }));

    // Route to the URL
    Router.push({ pathname: url });
  };
};

export const measurementsChanged = (idx, sourcePath, value) => {
  return (dispatch, getState) => {
    dispatch(setStoreItem(sourcePath, value));

    const { app: { growthChartPage: { kidPoints } } } = getState();
    const { age, length, weight, circumference } = kidPoints[idx];

    let navButtons = {
      lengthForAgeCdcBtn: { disabled: true },
      lengthForAgeWhoBtn: { disabled: true },
      weightForAgeCdcBtn: { disabled: true },
      weightForAgeWhoBtn: { disabled: true },
      lengthForWeightCdcBtn: { disabled: true },
      lengthForWeightWhoBtn: { disabled: true },
      circumferenceForAgeCdcBtn: { disabled: true },
      circumferenceForAgeWhoBtn: { disabled: true }
    };

    if (age && length) {
      navButtons.lengthForAgeCdcBtn.disabled = false;
      navButtons.lengthForAgeWhoBtn.disabled = false;
    }
    if (age && weight) {
      navButtons.weightForAgeCdcBtn.disabled = false;
      navButtons.weightForAgeCdcBtn.disabled = false;
    }
    if (length && weight) {
      navButtons.lengthForWeightCdcBtn.disabled = false;
      navButtons.lengthForWeightWhoBtn.disabled = false;
    }
    if (age && circumference) {
      navButtons.circumferenceForAgeCdcBtn.disabled = false;
      navButtons.circumferenceForAgeWhoBtn.disabled = false;
    }

    dispatch(setStoreItem('growthChartPage.navButtons', navButtons));
  };
};

// export const plotPointCircumferenceForAge = defnsParms => {
//   return {
//     type: types.PLOT_POINT_CIRCUMFERENCE_FOR_AGE,
//     defnsParms,
//     uuid: uuidv4()
//   };
// };

// export const plotPointLengthForAge = defnsParms => {
//   return {
//     type: types.PLOT_POINT_LENGTH_FOR_AGE,
//     defnsParms,
//     uuid: uuidv4()
//   };
// };

// export const plotPointLengthForWeight = defnsParms => {
//   return {
//     type: types.PLOT_POINT_LENGTH_FOR_WEIGHT,
//     defnsParms,
//     uuid: uuidv4()
//   };
// };

// export const plotPointWeightForAge = defnsParms => {
//   return {
//     type: types.PLOT_POINT_WEIGHT_FOR_AGE,
//     defnsParms,
//     uuid: uuidv4()
//   };
// };

// export const fetchGrowthChartCircumferenceForAgeData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartCircumferenceForAgePage.data';
//   const data = cdcFemaleCircumferenceForAgeJson.concat(cdcMaleCircumferenceForAgeJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

// export const fetchGrowthChartLengthForAgeData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartLengthForAgePage.data';
//   const data = cdcFemaleLengthForAgeJson.concat(cdcMaleLengthForAgeJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

// export const fetchGrowthChartLengthForWeightData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartLengthForWeightPage.data';
//   const data = cdcFemaleLengthForWeightJson.concat(cdcMaleLengthForWeightJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

export const initGrowthChart = (chartData, defnsParms) => {
  const { pageLabel, imgSrc, referrerPageCd } = defnsParms;
  return setStoreItems([
    // { storePath: 'growthChartLengthForWeightPage.data', value: chartData },
    { storePath: 'pageLabel', value: pageLabel },
    { storePath: 'imgSrc', value: imgSrc },
    { storePath: 'referrerPageCd', value: referrerPageCd }
  ]);
};

// export const fetchGrowthChartWeightForAgeData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartWeightForAgePage.data';
//   const data = cdcFemaleWeightForAgeJson.concat(cdcMaleWeightForAgeJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

// export const fetchWhoChartCircumferenceForAgeData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartCircumferenceForAgePage.data';
//   const data = whoFemaleCircumferenceForAgeJson.concat(whoMaleCircumferenceForAgeJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

// export const fetchWhoChartLengthForAgeData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartLengthForAgePage.data';
//   const data = whoFemaleLengthForAgeJson.concat(whoMaleLengthForAgeJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

// export const fetchWhoChartLengthForWeightData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartLengthForWeightPage.data';
//   const data = whoFemaleLengthForWeightJson.concat(whoMaleLengthForWeightJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

// export const fetchWhoChartWeightForAgeData = () => {
//   // return dispatch => {
//   const storePath = 'growthChartWeightForAgePage.data';
//   const data = whoFemaleWeightForAgeJson.concat(whoMaleWeightForAgeJson);
//   // dispatch(setStoreItem(storePath, data));
//   return setStoreItem(storePath, data);
//   // };
// };

export const addKid = kid => {
  return {
    type: types.ADD_KID,
    kid: _assign({}, kid)
  };
};

export const addKidPoint = kidPoint => {
  return {
    type: types.ADD_KID_POINT,
    kidPoint: _assign({}, kidPoint)
  };
};

export const deleteCurrentKid = () => {
  return {
    type: types.GROWTH_CHART_DELETE_CURRENT_KID
  };
};

export const updateKidPoint = kidPoint => {
  return {
    type: types.GROWTH_CHART_UPDATE_KID_POINT,
    updatedKidPoint: kidPoint
  };
};

export const updateKidPoints = kidPoints => {
  return {
    type: types.GROWTH_CHART_UPDATE_KID_POINTS,
    updatedKidPoints: kidPoints
  };
};
