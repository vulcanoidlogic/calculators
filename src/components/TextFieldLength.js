import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextFieldNumber from './TextFieldNumber';
import { GROWTH_CHART_MIN_LENGTH, GROWTH_CHART_MAX_LENGTH } from 'common/constants';

const styles = theme => ({
  root: {
    // minWidth: GROWTH_CHART_FIELD_MIN_WIDTH
  }
});

const TextFieldLength = props => {
  return (
    <TextFieldNumber
      label="Length (cm)"
      id="length"
      inputProps={{ min: GROWTH_CHART_MIN_LENGTH, max: GROWTH_CHART_MAX_LENGTH, step: 0.5, maxLength: 4 }}
      {...props}
    />
  );
};
export default withStyles(styles)(TextFieldLength);
