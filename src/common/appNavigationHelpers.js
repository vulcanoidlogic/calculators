import { BASE_IMG_URL } from 'common/constants';

export const getNavigationLinkDefns = props => {
  const defns = {
    basicCalculator: {
      href: '/basic-calculator',
      disabled: false,
      label: 'Basic Calculator'
    },
    scientificCalculator: {
      href: '/scientific-calculator',
      disabled: false,
      label: 'Scientific Calculator'
    },
    growthChartAddChildForm: {
      href: '/growth-chart-add-child-form',
      disabled: false,
      label: 'Add Child',
      imgSrc: `${BASE_IMG_URL}/Add_Child.png`
    },
    growthChartModifyChildDataForm: {
      href: '/growth-chart-modify-child-data-form',
      disabled: false,
      label: 'Change Child Data',
      imgSrc: `${BASE_IMG_URL}/Modify_Child.png`
    },
    growthChartLengthForAge: {
      href: '/growth-chart-length-for-age',
      disabled: false,
      label: 'CDC Length for Age',
      imgSrc: `${BASE_IMG_URL}/Length.png`
    },
    whoChartLengthForAge: {
      href: '/who-chart-length-for-age',
      disabled: false,
      label: 'WHO Length for Age',
      imgSrc: `${BASE_IMG_URL}/Length.png`
    },
    growthChartWeightForAge: {
      href: '/growth-chart-weight-for-age',
      disabled: false,
      label: 'CDC Weight for Age',
      imgSrc: `${BASE_IMG_URL}/Weight.png`
    },
    whoChartWeightForAge: {
      href: '/who-chart-weight-for-age',
      disabled: false,
      label: 'WHO Weight for Age',
      imgSrc: `${BASE_IMG_URL}/Weight.png`
    },
    growthChartLengthForWeight: {
      href: '/growth-chart-length-for-weight',
      disabled: false,
      label: 'CDC Length for Weight',
      imgSrc: `${BASE_IMG_URL}/Length_for_Weight.png`
    },
    whoChartLengthForWeight: {
      href: '/who-chart-length-for-weight',
      disabled: false,
      label: 'WHO Length for Weight',
      imgSrc: `${BASE_IMG_URL}/Length_for_Weight.png`
    },
    growthChartCircumferenceForAge: {
      href: '/growth-chart-circumference-for-age',
      disabled: false,
      label: 'CDC Circumference for Age',
      imgSrc: `${BASE_IMG_URL}/Circumference.png`
    },
    whoChartCircumferenceForAge: {
      href: '/who-chart-circumference-for-age',
      disabled: false,
      label: 'WHO Circumference for Age',
      imgSrc: `${BASE_IMG_URL}/Circumference.png`
    }
  };
  return defns;
};
