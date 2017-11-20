import { BASIC_CALCULATOR, GROWTH_CHART_DEFAULT_GENDER, DEFAULT_PAGE_LABEL } from 'common/constants';
import * as types from 'actionTypes/app';
import _set from 'lodash/fp/set';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import _pullAt from 'lodash/fp/pullAt';
import _isNil from 'lodash/isNil';
import { loadState } from './localStorage';
import _pullAllBy from 'lodash/fp/pullAllBy';
import uuidv4 from 'uuid/v4';
import _assign from 'lodash/assign';

const getMockKidsInit = (uuid = '0000-0001') => {
  return [{ uuid, gender: 'MALE', name: 'Child 1' }];
};
// const getKidPointInitORIGINAL = (kidUuid = '0000-0001', uuid = '0000-0002') => {
//   return {
//     uuid,
//     kidUuid,
//     age: null,
//     length: null,
//     weight: null,
//     circumference: null,
//     point: null
//   };
// };

const getKidsInit = () => [];
const getKidPointsInit = () => [];
const getNewKidInit = () => {
  return {};
};

const currentPointUuid = uuidv4();
const getMockKidPointsInit = (kidUuid = '0000-0001', uuid = '0000-0002') => {
  return [
    {
      uuid: currentPointUuid,
      kidUuid,
      age: 18,
      length: 80,
      weight: 11,
      circumference: 44,
      point: []
    },
    {
      uuid: uuidv4(),
      kidUuid,
      age: 23,
      length: 85,
      weight: 13,
      circumference: 49,
      point: []
    }
  ];
};

const defaultInitialState = {
  currentCalculator: BASIC_CALCULATOR,
  basicCalculatorPage: {
    lastChar: '0',
    currentValue: '0'
  },
  growthChartPage: {
    referrerPageCd: null,
    gender: GROWTH_CHART_DEFAULT_GENDER,
    // kids: [{uuid: '8332-IMSI', gender: 'FEMALE', name: 'Child 1' }]
    kids: getMockKidsInit(),
    // kidPoints: [{uuid: '3234-3UNB3', kidUuid: '8332-IMSI', age: 24, length: 85, weight: 1.7, circumference: 33, point: [33,32] }]
    kidPoints: getMockKidPointsInit(),
    newKid: getNewKidInit(),
    navButtons: {
      lengthForAgeCdcBtn: { disabled: true },
      lengthForAgeWhoBtn: { disabled: true },
      weightForAgeCdcBtn: { disabled: true },
      weightForAgeWhoBtn: { disabled: true },
      lengthForWeightCdcBtn: { disabled: true },
      lengthForWeightWhoBtn: { disabled: true },
      circumferenceForAgeCdcBtn: { disabled: true },
      circumferenceForAgeWhoBtn: { disabled: true }
    },
    currentKidUuid: '0000-0001',
    currentPointUuid: currentPointUuid
  },
  growthChartLengthForAgePage: { data: undefined },
  growthChartCircumferenceForAgePage: { data: undefined },
  growthChartLengthForWeightPage: { data: undefined },
  growthChartWeightForAgePage: { data: undefined },
  pageLabel: DEFAULT_PAGE_LABEL,
  imgSrc: null
};

let localStorageState = loadState();
const __REDUX_PERSIST_OFF__ = process.env.REACT_APP_REDUX_PERSIST_OFF === 'true';
if (__REDUX_PERSIST_OFF__) {
  localStorageState = undefined;
}

let initialState = {};
if (_isNil(localStorageState)) {
  initialState = defaultInitialState;
} else {
  const loadedState = _get(localStorageState, 'app', defaultInitialState);
  initialState = _set('imgSrc', null, _set('pageLabel', DEFAULT_PAGE_LABEL, loadedState));
}

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.INIT_REDUX_STORE: {
      return initialState;
    }
    case types.GENERIC_FIELD_CHANGE: {
      const { payload, sourcePath } = action;
      return _set(sourcePath, payload, state);
    }
    case types.GENERIC_FIELD_VALUE_CHANGE:
    case types.GENERIC_PATH_ITEM_CHANGE: {
      const { sourcePath, value } = action;
      return _set(sourcePath, value, state);
    }
    case types.GENERIC_STORE_ITEMS_CHANGE: {
      //items example [{storePath: 'myPage.field1', value: 'My Updated Value}]
      const { items } = action;
      let newState = state;
      items.forEach(item => {
        const { storePath, value } = item;
        newState = _set(storePath, value, newState);
      });
      return newState;
    }
    // case types.PLOT_POINT_CIRCUMFERENCE_FOR_AGE: {
    //   const { defnsParms, uuid } = action;

    //   const age = _get(state, 'growthChartCircumferenceForAgePage.age', GROWTH_CHART_MIN_AGE);
    //   const circumference = _get(state, 'growthChartCircumferenceForAgePage.circumference', GROWTH_CHART_MIN_CIRCUMFERENCE);
    //   const data = _get(state, 'growthChartCircumferenceForAgePage.data', []);
    //   const { growthChartPage: { gender } } = state;

    //   const kidPoints = _get(state, 'growthChartPage.kidPoints');
    //   const newKidPoints = kidPoints.concat({ uuid, gender, age, circumference, length: GROWTH_CHART_MIN_LENGTH, weight: GROWTH_CHART_MIN_WEIGHT, point: [] });
    //   const updateKidPoints = assignGrowthChartCircumferenceForAgePoints(newKidPoints, defnsParms, data);
    //   return _set('growthChartPage.kidPoints', updateKidPoints, state);
    // }

    // case types.PLOT_POINT_LENGTH_FOR_AGE: {
    //   const { defnsParms, uuid } = action;

    //   const length = _get(state, 'growthChartLengthForAgePage.length', GROWTH_CHART_MIN_LENGTH);
    //   const age = _get(state, 'growthChartLengthForAgePage.age', GROWTH_CHART_MIN_AGE);
    //   const data = _get(state, 'growthChartLengthForAgePage.data', []);
    //   const { growthChartPage: { gender } } = state;

    //   const kidPoints = _get(state, 'growthChartPage.kidPoints');
    //   const newKidPoints = kidPoints.concat({
    //     uuid,
    //     gender,
    //     age,
    //     length,
    //     circumference: GROWTH_CHART_MIN_CIRCUMFERENCE,
    //     weight: GROWTH_CHART_MIN_WEIGHT,
    //     point: []
    //   });
    //   const updateKidPoints = assignGrowthChartLengthForAgePoints(newKidPoints, defnsParms, data);

    //   return _set('growthChartPage.kidPoints', updateKidPoints, state);
    // }
    // case types.PLOT_POINT_LENGTH_FOR_WEIGHT: {
    //   const { defnsParms, uuid } = action;

    //   const length = _get(state, 'growthChartLengthForWeightPage.length', GROWTH_CHART_MIN_LENGTH);
    //   const weight = _get(state, 'growthChartLengthForWeightPage.weight', GROWTH_CHART_MIN_WEIGHT);
    //   const data = _get(state, 'growthChartLengthForWeightPage.data', []);
    //   const { growthChartPage: { gender } } = state;

    //   const kidPoints = _get(state, 'growthChartPage.kidPoints');
    //   const newKidPoints = kidPoints.concat({
    //     uuid,
    //     gender,
    //     weight,
    //     length,
    //     age: GROWTH_CHART_MIN_AGE,
    //     circumference: GROWTH_CHART_MIN_CIRCUMFERENCE,
    //     point: []
    //   });
    //   const updateKidPoints = assignGrowthChartLengthForWeightPoints(newKidPoints, defnsParms, data);

    //   return _set('growthChartPage.kidPoints', updateKidPoints, state);
    // }
    // case types.PLOT_POINT_WEIGHT_FOR_AGE: {
    //   const { defnsParms, uuid } = action;

    //   const weight = _get(state, 'growthChartWeightForAgePage.weight', GROWTH_CHART_MIN_WEIGHT);
    //   const age = _get(state, 'growthChartWeightForAgePage.age', GROWTH_CHART_MIN_AGE);
    //   const data = _get(state, 'growthChartWeightForAgePage.data', []);
    //   const { growthChartPage: { gender } } = state;

    //   const kidPoints = _get(state, 'growthChartPage.kidPoints');
    //   const newKidPoints = kidPoints.concat({
    //     uuid,
    //     gender,
    //     age,
    //     weight,
    //     length: GROWTH_CHART_MIN_LENGTH,
    //     circumference: GROWTH_CHART_MIN_CIRCUMFERENCE,
    //     point: []
    //   });
    //   const updateKidPoints = assignGrowthChartWeightForAgePoints(newKidPoints, defnsParms, data);

    //   return _set('growthChartPage.kidPoints', updateKidPoints, state);
    // }
    case types.ADD_KID: {
      const { kid, kid: { uuid: kidUuid } } = action;
      const { growthChartPage, growthChartPage: { kids = [] } } = state;
      return _assign(
        {},
        { ...state },
        {
          growthChartPage: {
            ...growthChartPage,
            kids: [...kids, kid],
            currentKidUuid: kidUuid
          }
        }
      );
    }
    case types.ADD_KID_POINT: {
      const { kidPoint, kidPoint: { uuid: kidPointUuid } } = action;
      const { growthChartPage, growthChartPage: { kidPoints = [] } } = state;
      return _assign(
        {},
        { ...state },
        {
          growthChartPage: {
            ...growthChartPage,
            kidPoints: [...kidPoints, kidPoint],
            currentPointUuid: kidPointUuid
          }
        }
      );
    }
    case types.GROWTH_CHART_DELETE_CURRENT_KID: {
      const { growthChartPage, growthChartPage: { currentPointUuid } } = state;
      const kidPoints = _get(state, 'growthChartPage.kidPoints');
      const kidIdx = _findIndex(kidPoints, o => currentPointUuid === o.uuid);
      if (kidIdx >= 0) {
        const newKidPoints = _pullAt(kidIdx, kidPoints);
        return Object.assign(
          {},
          { ...state },
          { growthChartPage: { ...growthChartPage, kidPoints: newKidPoints, currentPointUuid: null, isDisplayKidDetailsPopover: false } }
        );
      } else {
        return state;
      }
    }
    case types.GROWTH_CHART_UPDATE_KID_POINT: {
      const { growthChartPage, growthChartPage: { kidPoints } } = state;
      const { updatedKidPoint } = action;
      console.log('GROWTH_CHART_UPDATE_KID_POINT updatedKidPoint=', updatedKidPoint);
      const newKidPoints = _pullAllBy('uuid', [updatedKidPoint], kidPoints).concat([updatedKidPoint]);
      return Object.assign({}, { ...state }, { growthChartPage: { ...growthChartPage, kidPoints: newKidPoints } });
    }
    case types.GROWTH_CHART_UPDATE_KID_POINTS: {
      const { growthChartPage, growthChartPage: { kidPoints } } = state;
      const { updatedKidPoints } = action;
      const newKidPoints = _pullAllBy('uuid', updatedKidPoints, kidPoints).concat(updatedKidPoints);
      return Object.assign({}, { ...state }, { growthChartPage: { ...growthChartPage, kidPoints: newKidPoints } });
    }
    case types.NO_OP: {
      return state;
    }
    default:
      return initialState;
  }
}

export { initialState };
