import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextFieldNumber from './TextFieldNumber';
import { GROWTH_CHART_MIN_CIRCUMFERENCE, GROWTH_CHART_MAX_CIRCUMFERENCE } from 'common/constants';

const styles = theme => ({
  root: {
    // minWidth: GROWTH_CHART_FIELD_MIN_WIDTH
  }
});

const TextFieldCircumference = props => {
  return (
    <TextFieldNumber
      label="Head (cm)"
      id="circumference"
      inputProps={{ min: GROWTH_CHART_MIN_CIRCUMFERENCE, max: GROWTH_CHART_MAX_CIRCUMFERENCE, step: 0.1, maxLength: 4 }}
      {...props}
    />
  );
};
export default withStyles(styles)(TextFieldCircumference);
