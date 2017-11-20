import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextFieldNumber from './TextFieldNumber';
import { GROWTH_CHART_MIN_WEIGHT, GROWTH_CHART_MAX_WEIGHT } from 'common/constants';

const styles = theme => ({
  root: {
    // minWidth: GROWTH_CHART_FIELD_MIN_WIDTH
  }
});

const TextFieldWeight = props => {
  return (
    <TextFieldNumber
      label="Weight (kg)"
      id="weight"
      inputProps={{ min: GROWTH_CHART_MIN_WEIGHT, max: GROWTH_CHART_MAX_WEIGHT, step: 0.1, maxLength: 4 }}
      {...props}
    />
  );
};
export default withStyles(styles)(TextFieldWeight);
