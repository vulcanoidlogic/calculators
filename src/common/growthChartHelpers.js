import _get from 'lodash/get';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _first from 'lodash/last';
import _keys from 'lodash/keys';
import _assign from 'lodash/assign';
import _isUndefined from 'lodash/isUndefined';
import _clone from 'lodash/clone';
import {
  GROWTH_CHART_HEIGHT_PCT,
  GROWTH_CHART_MIN_AGE,
  GROWTH_CHART_MIN_CIRCUMFERENCE,
  GROWTH_CHART_MIN_LENGTH,
  GROWTH_CHART_MIN_WEIGHT,
  GROWTH_CHART_DEFAULT_GENDER,
  GROWTH_CHART_PADDING,
  MODIFY_CHILD_DATA,
  CDC_LENGTH_FOR_AGE,
  WHO_LENGTH_FOR_AGE,
  CDC_WEIGHT_FOR_AGE,
  WHO_WEIGHT_FOR_AGE,
  CDC_LENGTH_FOR_WEIGHT,
  WHO_LENGTH_FOR_WEIGHT,
  CDC_CIRCUMFERENCE_FOR_AGE,
  WHO_CIRCUMFERENCE_FOR_AGE,
  BASE_IMG_URL,
  MALE,
  FEMALE
} from 'common/constants';
import NormalDistribution from 'common/growthChartValueCalculations';
import * as d3 from 'd3';
import _isNull from 'lodash/isNull';
import _isNil from 'lodash/isNil';

const growthChartWhiteListCols = 'P5|P10|P25|P50|P75|P90|P95';
export const getGrowthChartLinePaths = (x, y, rows, xAxisKey) => {
  const cols = rows[0];
  //d3 uses the first row as the "model" for iterating through all other rows in a column-major fashion
  const linePaths = _keys(cols)
    .filter(colKey => {
      return growthChartWhiteListCols.indexOf(colKey) >= 0;
    })
    .map(colKey => {
      const line = d3
        .line()
        .curve(d3.curveCardinal)
        .x(d => x(d[xAxisKey]))
        .y(d => y(d[colKey]));
      return line(rows);
    });
  return linePaths;
};

/**
 * Growth Chart Defns provides the growth chart render with everything it needs to handle chart display and input field events
 * @param {*} defnsParams
 * @param {*} props 
 * @param {*} rows 
 */
export const getGrowthChartDefns = (
  {
    width,
    height,
    x,
    y,
    pageLabel,
    gender,
    xAxisKey,
    xLabel,
    yLabel,
    imgSrc = '/static/images/Weight.png',
    onAnchorElementLoad,
    refreshDisplay,
    referrerPageCd
  },
  props,
  rows
) => {
  return {
    pageLabel,
    graph: {
      gender,
      width,
      height,
      linePaths: getGrowthChartLinePaths(x, y, rows, xAxisKey),
      axisBottom: d3.axisBottom(x),
      axisLeft: d3.axisLeft(y).tickSize(width - 2 * GROWTH_CHART_PADDING),
      pageLabel,
      xLabel,
      yLabel,
      imgSrc,
      onAnchorElementLoad,
      refreshDisplay,
      referrerPageCd
    }
  };
};

// export const getGrowthChartAddPointFormDefns = props => {
//   const {
//     growthChartPage: {
//       kids,
//       kidPoints,
//       currentKidUuid,
//       currentPointUuid,
//       navButtons: {
//         lengthForAgeCdcBtn,
//         lengthForAgeWhoBtn,
//         weightForAgeCdcBtn,
//         weightForAgeWhoBtn,
//         lengthForWeightCdcBtn,
//         lengthForWeightWhoBtn,
//         circumferenceForAgeCdcBtn,
//         circumferenceForAgeWhoBtn
//       }
//     },
//     appActions: { genericFieldValueChange, measurementsChanged, handleGrowthChartBtnClick }
//   } = props;
//   const kidIdx = _findIndex(kids, {
//     uuid: currentKidUuid
//   });
//   const pointIdx = _findIndex(kidPoints, {
//     uuid: currentPointUuid
//   });
//   const rootPathKids = `growthChartPage.kids[${kidIdx}]`;
//   const rootPathKidPoints = `growthChartPage.kidPoints[${pointIdx}]`;
//   const storePathGender = `${rootPathKids}.gender`;
//   const storePathName = `${rootPathKids}.name`;
//   const storePathAge = `${rootPathKidPoints}.age`;
//   const storePathCircumference = `${rootPathKidPoints}.circumference`;
//   const storePathLength = `${rootPathKidPoints}.length`;
//   const storePathWeight = `${rootPathKidPoints}.weight`;
//   return {
//     gender: {
//       value: _get(props, storePathGender, GROWTH_CHART_DEFAULT_GENDER),
//       onChange: genericFieldValueChange.bind(null, storePathGender)
//     },
//     name: {
//       value: _get(props, storePathGender, 'Name'),
//       onChange: genericFieldValueChange.bind(null, storePathName)
//     },
//     age: {
//       value: _get(props, storePathAge, GROWTH_CHART_MIN_AGE),
//       onChange: measurementsChanged.bind(null, pointIdx, storePathAge)
//     },
//     circumference: {
//       value: _get(props, storePathCircumference, GROWTH_CHART_MIN_CIRCUMFERENCE),
//       onChange: measurementsChanged.bind(null, pointIdx, storePathCircumference)
//     },
//     length: {
//       value: _get(props, storePathLength, GROWTH_CHART_MIN_LENGTH),
//       onChange: measurementsChanged.bind(null, pointIdx, storePathLength)
//     },
//     weight: {
//       value: _get(props, storePathWeight, GROWTH_CHART_MIN_WEIGHT),
//       onChange: measurementsChanged.bind(null, pointIdx, storePathWeight)
//     },
//     lengthForAgeCdcBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-length-for-age'),
//       text: CDC_LENGTH_FOR_AGE,
//       disabled: lengthForAgeCdcBtn.disabled
//     },
//     lengthForAgeWhoBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-length-for-age'),
//       text: WHO_LENGTH_FOR_AGE,
//       disabled: lengthForAgeWhoBtn.disabled
//     },
//     weightForAgeCdcBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-weight-for-age'),
//       text: CDC_WEIGHT_FOR_AGE,
//       disabled: weightForAgeCdcBtn.disabled
//     },
//     weightForAgeWhoBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-weight-for-age'),
//       text: WHO_WEIGHT_FOR_AGE,
//       disabled: weightForAgeWhoBtn.disabled
//     },
//     lengthForWeightCdcBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-length-for-weight'),
//       text: CDC_LENGTH_FOR_WEIGHT,
//       disabled: lengthForWeightCdcBtn.disabled
//     },
//     lengthForWeightWhoBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-length-for-weight'),
//       text: WHO_LENGTH_FOR_WEIGHT,
//       disabled: lengthForWeightWhoBtn.disabled
//     },
//     circumferenceForAgeCdcBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-circumference-for-age'),
//       text: CDC_CIRCUMFERENCE_FOR_AGE,
//       disabled: circumferenceForAgeCdcBtn.disabled
//     },
//     circumferenceForAgeWhoBtn: {
//       onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-circumference-for-age'),
//       text: WHO_CIRCUMFERENCE_FOR_AGE,
//       disabled: circumferenceForAgeWhoBtn.disabled
//     }
//   };
// };

export const getGrowthChartAddPointFormDefns = (clazz, formData, props, pageCd) => {
  const { childDataChanged, pointDataChanged, handleChartLinkClick } = clazz;
  // const { appActions: { handleGrowthChartBtnClick } } = props;
  const { referrerPageCd, kidUuid: currentKidUuid, kids } = props;

  let isExistingKid = false;
  const kidIdx = _findIndex(kids, {
    uuid: currentKidUuid
  });
  isExistingKid = kidIdx >= 0;

  const statePathName = `name`;
  const statePathGender = `gender`;
  const statePathAge = `age`;
  const statePathCircumference = `circumference`;
  const statePathLength = `length`;
  const statePathWeight = `weight`;

  const {
    lengthForAgeCdcBtn,
    lengthForAgeWhoBtn,
    weightForAgeCdcBtn,
    weightForAgeWhoBtn,
    lengthForWeightCdcBtn,
    lengthForWeightWhoBtn,
    circumferenceForAgeCdcBtn,
    circumferenceForAgeWhoBtn
  } = getChartButtonStateByMeasurements(formData);

  const isShowLengthForAge = !referrerPageCd || (referrerPageCd === CDC_LENGTH_FOR_AGE || referrerPageCd === WHO_LENGTH_FOR_AGE);
  const isShowWeightForAge = !referrerPageCd || (referrerPageCd === CDC_WEIGHT_FOR_AGE || referrerPageCd === WHO_WEIGHT_FOR_AGE);
  const isShowLengthForWeight = !referrerPageCd || (referrerPageCd === CDC_LENGTH_FOR_WEIGHT || referrerPageCd === WHO_LENGTH_FOR_WEIGHT);
  const isShowCircumferenceForAge = !referrerPageCd || (referrerPageCd === CDC_CIRCUMFERENCE_FOR_AGE || referrerPageCd === WHO_CIRCUMFERENCE_FOR_AGE);

  const gender = isExistingKid ? kids[kidIdx].gender : _get(formData, statePathGender);
  const name = isExistingKid ? kids[kidIdx].name : _get(formData, statePathName);

  return {
    name: {
      value: name,
      onChange: childDataChanged.bind(null, statePathName),
      isHidden: isExistingKid
    },
    gender: {
      value: gender,
      onChange: childDataChanged.bind(null, statePathGender),
      isHidden: isExistingKid
    },
    nameGenderStr: {
      value: `${name} (${gender === MALE ? 'Boy' : gender === FEMALE ? 'Girl' : null})`,
      isHidden: !isExistingKid,
      isReadOnly: true
    },
    age: {
      value: _get(formData, statePathAge),
      onChange: pointDataChanged.bind(null, statePathAge),
      isHidden: !isShowLengthForAge && !isShowWeightForAge && !isShowCircumferenceForAge
    },
    circumference: {
      value: _get(formData, statePathCircumference),
      onChange: pointDataChanged.bind(null, statePathCircumference),
      isHidden: !isShowCircumferenceForAge
    },
    length: {
      value: _get(formData, statePathLength),
      onChange: pointDataChanged.bind(null, statePathLength),
      isHidden: !isShowLengthForAge && !isShowLengthForWeight
    },
    weight: {
      value: _get(formData, statePathWeight),
      onChange: pointDataChanged.bind(null, statePathWeight),
      isHidden: !isShowWeightForAge && !isShowLengthForWeight
    },
    lengthForAgeCdcBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/growth-chart-length-for-age'),
      text: CDC_LENGTH_FOR_AGE,
      disabled: lengthForAgeCdcBtn.disabled,
      isHidden: !isShowLengthForAge
    },
    lengthForAgeWhoBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/who-chart-length-for-age'),
      text: WHO_LENGTH_FOR_AGE,
      disabled: lengthForAgeWhoBtn.disabled,
      isHidden: !isShowLengthForAge
    },
    weightForAgeCdcBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/growth-chart-weight-for-age'),
      text: CDC_WEIGHT_FOR_AGE,
      disabled: weightForAgeCdcBtn.disabled,
      isHidden: !isShowWeightForAge
    },
    weightForAgeWhoBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/who-chart-weight-for-age'),
      text: WHO_WEIGHT_FOR_AGE,
      disabled: weightForAgeWhoBtn.disabled,
      isHidden: !isShowWeightForAge
    },
    lengthForWeightCdcBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/growth-chart-length-for-weight'),
      text: CDC_LENGTH_FOR_WEIGHT,
      disabled: lengthForWeightCdcBtn.disabled,
      isHidden: !isShowLengthForWeight
    },
    lengthForWeightWhoBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/who-chart-length-for-weight'),
      text: WHO_LENGTH_FOR_WEIGHT,
      disabled: lengthForWeightWhoBtn.disabled,
      isHidden: !isShowLengthForWeight
    },
    circumferenceForAgeCdcBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/growth-chart-circumference-for-age'),
      text: CDC_CIRCUMFERENCE_FOR_AGE,
      disabled: circumferenceForAgeCdcBtn.disabled,
      isHidden: !isShowCircumferenceForAge
    },
    circumferenceForAgeWhoBtn: {
      onClick: handleChartLinkClick.bind(clazz, '/who-chart-circumference-for-age'),
      text: WHO_CIRCUMFERENCE_FOR_AGE,
      disabled: circumferenceForAgeWhoBtn.disabled,
      isHidden: !isShowCircumferenceForAge
    }
  };
};

export const getGrowthChartModifyChildDataFormDefns = props => {
  const {
    growthChartPage: {
      kids,
      kidPoints,
      currentKidUuid,
      currentPointUuid,
      navButtons: {
        lengthForAgeCdcBtn,
        lengthForAgeWhoBtn,
        weightForAgeCdcBtn,
        weightForAgeWhoBtn,
        lengthForWeightCdcBtn,
        lengthForWeightWhoBtn,
        circumferenceForAgeCdcBtn,
        circumferenceForAgeWhoBtn
      }
    },
    appActions: { genericFieldValueChange, measurementsChanged, handleGrowthChartBtnClick }
  } = props;
  const kidIdx = _findIndex(kids, {
    uuid: currentKidUuid
  });
  const pointIdx = _findIndex(kidPoints, {
    uuid: currentPointUuid
  });
  const rootPathKids = `growthChartPage.kids[${kidIdx}]`;
  const rootPathKidPoints = `growthChartPage.kidPoints[${pointIdx}]`;
  const storePathGender = `${rootPathKids}.gender`;
  const storePathName = `${rootPathKids}.name`;
  const storePathAge = `${rootPathKidPoints}.age`;
  const storePathCircumference = `${rootPathKidPoints}.circumference`;
  const storePathLength = `${rootPathKidPoints}.length`;
  const storePathWeight = `${rootPathKidPoints}.weight`;
  return {
    gender: {
      value: _get(props, storePathGender, GROWTH_CHART_DEFAULT_GENDER),
      onChange: genericFieldValueChange.bind(null, storePathGender)
    },
    name: {
      value: _get(props, storePathGender, 'Name'),
      onChange: genericFieldValueChange.bind(null, storePathName)
    },
    age: {
      value: _get(props, storePathAge, GROWTH_CHART_MIN_AGE),
      onChange: measurementsChanged.bind(null, pointIdx, storePathAge)
    },
    circumference: {
      value: _get(props, storePathCircumference, GROWTH_CHART_MIN_CIRCUMFERENCE),
      onChange: measurementsChanged.bind(null, pointIdx, storePathCircumference)
    },
    length: {
      value: _get(props, storePathLength, GROWTH_CHART_MIN_LENGTH),
      onChange: measurementsChanged.bind(null, pointIdx, storePathLength)
    },
    weight: {
      value: _get(props, storePathWeight, GROWTH_CHART_MIN_WEIGHT),
      onChange: measurementsChanged.bind(null, pointIdx, storePathWeight)
    },
    lengthForAgeCdcBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-length-for-age'),
      text: CDC_LENGTH_FOR_AGE,
      disabled: lengthForAgeCdcBtn.disabled
    },
    lengthForAgeWhoBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-length-for-age'),
      text: WHO_LENGTH_FOR_AGE,
      disabled: lengthForAgeWhoBtn.disabled
    },
    weightForAgeCdcBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-weight-for-age'),
      text: CDC_WEIGHT_FOR_AGE,
      disabled: weightForAgeCdcBtn.disabled
    },
    weightForAgeWhoBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-weight-for-age'),
      text: WHO_WEIGHT_FOR_AGE,
      disabled: weightForAgeWhoBtn.disabled
    },
    lengthForWeightCdcBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-length-for-weight'),
      text: CDC_LENGTH_FOR_WEIGHT,
      disabled: lengthForWeightCdcBtn.disabled
    },
    lengthForWeightWhoBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-length-for-weight'),
      text: WHO_LENGTH_FOR_WEIGHT,
      disabled: lengthForWeightWhoBtn.disabled
    },
    circumferenceForAgeCdcBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/growth-chart-circumference-for-age'),
      text: CDC_CIRCUMFERENCE_FOR_AGE,
      disabled: circumferenceForAgeCdcBtn.disabled
    },
    circumferenceForAgeWhoBtn: {
      onClick: handleGrowthChartBtnClick.bind(null, '/who-chart-circumference-for-age'),
      text: WHO_CIRCUMFERENCE_FOR_AGE,
      disabled: circumferenceForAgeWhoBtn.disabled
    }
  };
};

export const getChartButtonStateByMeasurements = state => {
  const { name, gender, age, length, weight, circumference } = state;

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

  if (name && gender) {
    if (age && length) {
      navButtons.lengthForAgeCdcBtn.disabled = false;
      navButtons.lengthForAgeWhoBtn.disabled = false;
    }
    if (age && weight) {
      navButtons.weightForAgeCdcBtn.disabled = false;
      navButtons.weightForAgeWhoBtn.disabled = false;
    }
    if (length && weight) {
      navButtons.lengthForWeightCdcBtn.disabled = false;
      navButtons.lengthForWeightWhoBtn.disabled = false;
    }
    if (age && circumference) {
      navButtons.circumferenceForAgeCdcBtn.disabled = false;
      navButtons.circumferenceForAgeWhoBtn.disabled = false;
    }
  }

  return navButtons;
};

export const getGrowthChartEditKidInfoFormDefns = (clazz, formData) => {
  const { kidInfoChanged } = clazz;
  const storePathGender = `gender`;
  const storePathName = `name`;
  const { uuid } = formData;
  return {
    gender: {
      value: _get(formData, storePathGender, GROWTH_CHART_DEFAULT_GENDER),
      onChange: kidInfoChanged.bind(null, uuid, storePathGender),
      isHidden: false,
      uuid,
      storePath: storePathGender
    },
    name: {
      value: _get(formData, storePathName, 'New Child'),
      onChange: kidInfoChanged.bind(null, uuid, storePathName),
      isHidden: false,
      uuid,
      storePath: storePathName
    }
  };
};

export const getGrowthChartEditMeasurementsFormDefns = (clazz, formData, pageCd) => {
  const { measurementsChanged } = clazz;
  const { uuid } = formData;
  const storePathAge = `age`;
  const storePathCircumference = `circumference`;
  const storePathLength = `length`;
  const storePathWeight = `weight`;
  return {
    age: {
      value: _get(formData, storePathAge, GROWTH_CHART_MIN_AGE),
      onChange: measurementsChanged.bind(null, uuid, storePathAge),
      isHidden: `${CDC_LENGTH_FOR_WEIGHT}|${WHO_LENGTH_FOR_WEIGHT}`.indexOf(pageCd) >= 0,
      uuid,
      storePath: storePathAge
    },
    circumference: {
      value: _get(formData, storePathCircumference, GROWTH_CHART_MIN_CIRCUMFERENCE),
      onChange: measurementsChanged.bind(null, uuid, storePathCircumference),
      isHidden:
        `${CDC_LENGTH_FOR_WEIGHT}|${WHO_LENGTH_FOR_WEIGHT}|${CDC_WEIGHT_FOR_AGE}|${WHO_WEIGHT_FOR_AGE}|${CDC_LENGTH_FOR_AGE}|${WHO_LENGTH_FOR_AGE}`.indexOf(
          pageCd
        ) >= 0,
      uuid,
      storePath: storePathCircumference
    },
    length: {
      value: _get(formData, storePathLength, GROWTH_CHART_MIN_LENGTH),
      onChange: measurementsChanged.bind(null, uuid, storePathLength),
      isHidden: `${CDC_WEIGHT_FOR_AGE}|${WHO_WEIGHT_FOR_AGE}|${CDC_CIRCUMFERENCE_FOR_AGE}|${WHO_CIRCUMFERENCE_FOR_AGE}`.indexOf(pageCd) >= 0,
      uuid,
      storePath: storePathLength
    },
    weight: {
      value: _get(formData, storePathWeight, GROWTH_CHART_MIN_WEIGHT),
      onChange: measurementsChanged.bind(null, uuid, storePathWeight),
      isHidden: `${CDC_LENGTH_FOR_AGE}|${WHO_LENGTH_FOR_AGE}|${CDC_CIRCUMFERENCE_FOR_AGE}|${WHO_CIRCUMFERENCE_FOR_AGE}`.indexOf(pageCd) >= 0,
      uuid,
      storePath: storePathWeight
    }
  };
};

export const updateGrowthChartCircumferenceForAgeDisplayParms = (displayH, props, defnsParms) => {
  const widthPctOfHeight = 0.9;
  const height = getGrowthChartDisplayHeight(displayH);
  const width = Number(Number(height * widthPctOfHeight).toFixed(0));
  defnsParms.width = width;
  defnsParms.height = height;
  defnsParms.x = getGrowthChartCircumferenceForAgeXFn(defnsParms.width);
  defnsParms.y = getGrowthChartCircumferenceForAgeYFn(defnsParms.height);
  defnsParms.xAxisKey = 'Agemos';
  defnsParms.imgSrc = `${BASE_IMG_URL}/Circumference_w.png`;

  const { growthChartPage: { kids, currentKidUuid } } = props;
  const { gender } = getCurrentKidInfo(kids, currentKidUuid);
  defnsParms.gender = gender;
};

export const updateGrowthChartLengthForAgeDisplayParms = (displayH, props, defnsParms) => {
  const widthPctOfHeight = 0.9;
  const height = getGrowthChartDisplayHeight(displayH);
  const width = Number(Number(height * widthPctOfHeight).toFixed(0));
  defnsParms.width = width;
  defnsParms.height = height;
  defnsParms.x = getGrowthChartLengthForAgeXFn(defnsParms.width);
  defnsParms.y = getGrowthChartLengthForAgeYFn(defnsParms.height);
  defnsParms.xAxisKey = 'Agemos';
  defnsParms.imgSrc = `${BASE_IMG_URL}/Length_w.png`;

  const { growthChartPage: { kids, currentKidUuid } } = props;
  const { gender } = getCurrentKidInfo(kids, currentKidUuid);
  defnsParms.gender = gender;
};

export const updateGrowthChartWeightForAgeDisplayParms = (displayH, props, defnsParms) => {
  const widthPctOfHeight = 0.9;
  const height = getGrowthChartDisplayHeight(displayH);
  const width = Number(Number(height * widthPctOfHeight).toFixed(0));
  defnsParms.width = width;
  defnsParms.height = height;
  defnsParms.x = getGrowthChartWeightForAgeXFn(defnsParms.width);
  defnsParms.y = getGrowthChartWeightForAgeYFn(defnsParms.height);
  defnsParms.xAxisKey = 'Agemos';
  defnsParms.imgSrc = `${BASE_IMG_URL}/Weight_w.png`;

  const { growthChartPage: { kids, currentKidUuid } } = props;
  const { gender } = getCurrentKidInfo(kids, currentKidUuid);
  defnsParms.gender = gender;
};

export const updateGrowthChartLengthForWeightDisplayParms = (displayH, props, defnsParms) => {
  const widthPctOfHeight = 0.9;
  const height = getGrowthChartDisplayHeight(displayH);
  const width = Number(Number(height * widthPctOfHeight).toFixed(0));
  defnsParms.width = width;
  defnsParms.height = height;
  defnsParms.x = getGrowthChartLengthForWeightXFn(defnsParms.width);
  defnsParms.y = getGrowthChartLengthForWeightYFn(defnsParms.height);
  defnsParms.xAxisKey = 'Length';
  defnsParms.imgSrc = `${BASE_IMG_URL}/Length_for_Weight_w.png`;

  const { growthChartPage: { kids, currentKidUuid } } = props;
  const { gender } = getCurrentKidInfo(kids, currentKidUuid);
  defnsParms.gender = gender;
};

const interpolateValueAtTime = (t, t1, t2, v1, v2) => {
  let deltaTime = t2 - t1;
  if (deltaTime <= 0) {
    return v1;
  }
  let slope = (v2 - v1) / deltaTime;
  let interpolatedValue = v1 + slope * (t - t1);
  return interpolatedValue;
};

// CDF = Cumulative Distribution Function
const getGrowthChartCDF = (X, row) => {
  const { L, M, S } = row;
  if (M === undefined) {
    return undefined;
  } else {
    const Z = ((X / M) ** L - 1) / (L * S);
    const nd = new NormalDistribution();
    return nd.cdf(Z);
  }
};

const getGrowthChartAgeBasedPercentile = (gender, age, X, data) => {
  const genderFilter = gender === 'MALE' ? '1' : '2';
  let row = {};
  if (data) {
    if (age !== 0) {
      const genderData = data.filter(d => d.Sex === genderFilter && d.Agemos !== '0');
      const upperIdx = _findIndex(genderData, o => {
        return Number(o.Agemos) >= age;
      });
      const rowUpperBound = upperIdx >= 0 ? genderData[upperIdx] : _first(genderData);
      const rowLowerBound = genderData[upperIdx - 1];
      row = {
        L: interpolateValueAtTime(age, Number(rowLowerBound.Agemos), Number(rowUpperBound.Agemos), Number(rowLowerBound.L), Number(rowUpperBound.L)),
        M: interpolateValueAtTime(age, Number(rowLowerBound.Agemos), Number(rowUpperBound.Agemos), Number(rowLowerBound.M), Number(rowUpperBound.M)),
        S: interpolateValueAtTime(age, Number(rowLowerBound.Agemos), Number(rowUpperBound.Agemos), Number(rowLowerBound.S), Number(rowUpperBound.S))
      };
    } else {
      row = _find(data.filter(d => d.Sex === genderFilter && d.Agemos === '0'), o => o.Agemos === '0');
    }

    return getGrowthChartCDF(X, row);
  } else {
    return 0;
  }
};

const getGrowthChartLengthBasedPercentile = (gender, length, X, data) => {
  const genderFilter = gender === 'MALE' ? '1' : '2';
  let row = {};
  if (data) {
    if (length !== 0) {
      const genderData = data.filter(d => d.Sex === genderFilter && d.Length !== '0');
      const upperIdx = _findIndex(genderData, o => {
        return Number(o.Length) >= length;
      });
      const rowUpperBound = upperIdx >= 0 ? genderData[upperIdx] : _first(genderData);
      const rowLowerBound = genderData[upperIdx - 1];
      row = {
        L: interpolateValueAtTime(length, Number(rowLowerBound.Length), Number(rowUpperBound.Length), Number(rowLowerBound.L), Number(rowUpperBound.L)),
        M: interpolateValueAtTime(length, Number(rowLowerBound.Length), Number(rowUpperBound.Length), Number(rowLowerBound.M), Number(rowUpperBound.M)),
        S: interpolateValueAtTime(length, Number(rowLowerBound.Length), Number(rowUpperBound.Length), Number(rowLowerBound.S), Number(rowUpperBound.S))
      };
    } else {
      row = _find(data.filter(d => d.Sex === genderFilter && d.Length === '0'), o => o.Length === '0');
    }
    return getGrowthChartCDF(X, row);
  } else {
    return 0;
  }
};

export const getCurrentKidInfo = (kids, currentKidUuid) => {
  if (_isNull(currentKidUuid)) {
    return kids[0] || {};
  } else {
    const currentKidInfo = _find(kids, o => {
      return o.uuid === currentKidUuid;
    });
    return currentKidInfo;
  }
};

export const getCurrentKidPointInfo = (kidPoints, currentPointUuid) => {
  let findPointUuid = currentPointUuid;
  if (_isNil(findPointUuid)) {
    const { uuid } = kidPoints[0] || {};
    findPointUuid = uuid;
  }
  const currentKidPointInfo =
    _find(kidPoints, o => {
      return o.uuid === findPointUuid;
    }) || {};
  return currentKidPointInfo;
};

// const getKidPointsForKidAndDefns = (clazz, kidPoints, currentKidUuid, pageCd = 'N/A') => {
//   const currentKidPoints = kidPoints
//     .filter(kidPoint => {
//       const { kidUuid } = kidPoint;
//       return currentKidUuid === kidUuid ? true : false;
//     })
//     .map(filteredKidPoint => {
//       // poor man's clone
//       const newKidPoint = _clone(filteredKidPoint);
//       newKidPoint.defns = getGrowthChartEditMeasurementsFormDefns(clazz, newKidPoint, pageCd);
//       return newKidPoint;
//     });
//   console.log('getKidPointsForKidAndDefns kidPoints, currentKidPoints=', kidPoints, currentKidPoints);
//   return currentKidPoints;
// };

export const getJoinedKidDataAndDefns = (clazz, props, pageCd = 'N/A') => {
  const { growthChartPage: { kids, kidPoints } } = props;
  const kidData = {};
  kids.forEach(kid => {
    const { uuid } = kid;
    kidData[uuid] = _assign({ ...getGrowthChartEditKidInfoFormDefns(clazz, kid) }, { uuid, type: 'KID' });
    kidPoints
      .filter(kidPoint => {
        const { kidUuid } = kidPoint;
        return uuid === kidUuid ? true : false;
      })
      .forEach(filteredKidPoint => {
        const { uuid, kidUuid } = filteredKidPoint;
        kidData[uuid] = _assign({ ...getGrowthChartEditMeasurementsFormDefns(clazz, filteredKidPoint, pageCd) }, { uuid, kidUuid, type: 'KID_POINT' });
      });
  });
  console.log('kids, kidData=', kids, kidData);
  return kidData;
};

export const assignGrowthChartCircumferenceForAgePoints = (currentKidUuid, kids, kidPoints, { width, height }, data) => {
  const currentKidInfo = getCurrentKidInfo(kids, currentKidUuid);
  const { gender } = currentKidInfo;
  const kidPointsWithPoints = kidPoints
    .filter(kid => {
      const { kidUuid, age, circumference } = kid;
      if (kidUuid === currentKidUuid && !_isNull(age) && !_isNull(circumference)) {
        return kid;
      } else {
        return false;
      }
    })
    .map(kid => {
      const { age, circumference } = kid;
      const newKid = Object.assign({}, kid);
      newKid.point = [getGrowthChartCircumferenceForAgeXFn(width)(age), getGrowthChartCircumferenceForAgeYFn(height)(circumference)];
      newKid.percentile = getGrowthChartAgeBasedPercentile(gender, age, circumference, data);
      return newKid;
    });
  return kidPointsWithPoints;
};

export const assignGrowthChartLengthForAgePoints = (currentKidUuid, kids, kidPoints, { width, height }, data) => {
  const currentKidInfo = getCurrentKidInfo(kids, currentKidUuid);
  const { gender } = currentKidInfo;
  const kidPointsWithPoints = kidPoints
    .filter(kid => {
      const { kidUuid, age, length } = kid;
      if (kidUuid === currentKidUuid && !_isNull(age) && !_isNull(length)) {
        return kid;
      } else {
        return false;
      }
    })
    .map(kid => {
      const { age, length } = kid;
      const newKid = Object.assign({}, kid);
      newKid.point = [getGrowthChartLengthForAgeXFn(width)(age), getGrowthChartLengthForAgeYFn(height)(length)];
      newKid.percentile = getGrowthChartAgeBasedPercentile(gender, age, length, data);
      return newKid;
    });
  return kidPointsWithPoints;
};

export const assignGrowthChartLengthForWeightPoints = (currentKidUuid, kids, kidPoints, { width, height }, data) => {
  const currentKidInfo = getCurrentKidInfo(kids, currentKidUuid);
  const { gender } = currentKidInfo;
  const kidPointsWithPoints = kidPoints
    .filter(kid => {
      const { kidUuid, length, weight } = kid;
      if (kidUuid === currentKidUuid && !_isNull(weight) && !_isNull(length)) {
        return kid;
      } else {
        return false;
      }
    })
    .map(kid => {
      const { length, weight } = kid;
      const newKid = Object.assign({}, kid);
      newKid.point = [getGrowthChartLengthForWeightXFn(width)(length), getGrowthChartLengthForWeightYFn(height)(weight)];
      newKid.percentile = getGrowthChartLengthBasedPercentile(gender, length, weight, data);
      return newKid;
    });
  return kidPointsWithPoints;
};

export const assignGrowthChartWeightForAgePoints = (currentKidUuid, kids, kidPoints, { width, height }, data) => {
  const currentKidInfo = getCurrentKidInfo(kids, currentKidUuid);
  const { gender } = currentKidInfo;
  const kidPointsWithPoints = kidPoints
    .filter(kid => {
      const { kidUuid, age, weight } = kid;
      if (kidUuid === currentKidUuid && !_isNull(age) && !_isNull(weight)) {
        return kid;
      } else {
        return false;
      }
    })
    .map(kid => {
      const { age, weight } = kid;
      const newKid = Object.assign({}, kid);
      newKid.point = [getGrowthChartWeightForAgeXFn(width)(age), getGrowthChartWeightForAgeYFn(height)(weight)];
      newKid.percentile = getGrowthChartAgeBasedPercentile(gender, age, weight, data);
      return newKid;
    });
  return kidPointsWithPoints;
};

export const getGrowthChartKidDetails = (kidPoints, uuid) => {
  const kidDetails = _find(kidPoints, o => uuid === o.uuid);
  return kidDetails || {};
};

const getGrowthChartDisplayHeight = displayH => {
  return displayH * GROWTH_CHART_HEIGHT_PCT;
};

// Circumference for age
const getGrowthChartCircumferenceForAgeXFn = width => {
  const x = d3
    .scaleLinear()
    .domain([0, 36])
    .range([GROWTH_CHART_PADDING, width - GROWTH_CHART_PADDING]);
  return x;
};

const getGrowthChartCircumferenceForAgeYFn = height => {
  const y = d3
    .scaleLinear()
    .domain([30, 55])
    .range([height - GROWTH_CHART_PADDING, GROWTH_CHART_PADDING]);
  return y;
};

export const getDefaultDefnsParmsChartCircumferenceForAge = () => {
  return {
    storePathAge: 'growthChartCircumferenceForAgePage.age',
    storePathCircumference: 'growthChartCircumferenceForAgePage.circumference',
    pageLabel: 'Head Circumference for Age',
    yLabel: 'CIRCUMFERENCE (cm)',
    xLabel: 'AGE (mos)'
  };
};

// Length for age
const getGrowthChartLengthForAgeXFn = width => {
  const x = d3
    .scaleLinear()
    .domain([0, 36])
    .range([GROWTH_CHART_PADDING, width - GROWTH_CHART_PADDING]);
  return x;
};

const getGrowthChartLengthForAgeYFn = height => {
  const y = d3
    .scaleLinear()
    .domain([40, 110])
    .range([height - GROWTH_CHART_PADDING, GROWTH_CHART_PADDING]);
  return y;
};

export const getDefaultDefnsParmsChartLengthForAge = () => {
  return {
    storePathAge: 'growthChartLengthForAgePage.age',
    storePathLength: 'growthChartLengthForAgePage.length',
    pageLabel: 'Length for Age',
    yLabel: 'LENGTH (cm)',
    xLabel: 'AGE (mos)'
  };
};

// Length for Weight
const getGrowthChartLengthForWeightXFn = width => {
  const x = d3
    .scaleLinear()
    .domain([40, 105])
    .range([GROWTH_CHART_PADDING, width - GROWTH_CHART_PADDING]);
  return x;
};

const getGrowthChartLengthForWeightYFn = height => {
  const y = d3
    .scaleLinear()
    .domain([0, 24])
    .range([height - GROWTH_CHART_PADDING, GROWTH_CHART_PADDING]);
  return y;
};

export const getDefaultDefnsParmsChartLengthForWeight = () => {
  return {
    storePathWeight: 'growthChartLengthForWeightPage.weight',
    storePathLength: 'growthChartLengthForWeightPage.length',
    pageLabel: 'Length for Weight',
    yLabel: 'WEIGHT (kg)',
    xLabel: 'LENGTH (cm)'
  };
};

// Weight for Age
const getGrowthChartWeightForAgeXFn = width => {
  const x = d3
    .scaleLinear()
    .domain([0, 36])
    .range([GROWTH_CHART_PADDING, width - GROWTH_CHART_PADDING]);
  return x;
};

const getGrowthChartWeightForAgeYFn = height => {
  const y = d3
    .scaleLinear()
    .domain([0, 30])
    .range([height - GROWTH_CHART_PADDING, GROWTH_CHART_PADDING]);
  return y;
};

export const getDefaultDefnsParmsChartWeightForAge = () => {
  return {
    storePathWeight: 'growthChartWeightForAgePage.weight',
    storePathAge: 'growthChartWeightForAgePage.age',
    pageLabel: 'Weight for Age',
    yLabel: 'WEIGHT (kg)',
    xLabel: 'AGE (mos)'
  };
};
