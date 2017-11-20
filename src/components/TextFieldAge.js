import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextFieldNumber from './TextFieldNumber';
import { GROWTH_CHART_MIN_AGE, GROWTH_CHART_MAX_AGE } from 'common/constants';

const styles = theme => ({
  root: {
    // minWidth: GROWTH_CHART_FIELD_MIN_WIDTH
  }
});

const TextFieldAge = props => {
  return (
    <TextFieldNumber label="Age (months)" id="age" inputProps={{ min: GROWTH_CHART_MIN_AGE, max: GROWTH_CHART_MAX_AGE, step: 0.5, maxLength: 4 }} {...props} />
  );
};
export default withStyles(styles)(TextFieldAge);
