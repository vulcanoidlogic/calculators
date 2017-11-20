import React from 'react';
import { withStyles } from 'material-ui/styles';
import { RadioGroup } from 'material-ui/Radio';

const styles = theme => ({
  radioGroupRoot: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const RadioGroupInline = ({ children, classes, isHidden, ...otherProps }) => {
  if (isHidden) return null;

  return (
    <RadioGroup {...otherProps} className={classes.radioGroupRoot}>
      {children}
    </RadioGroup>
  );
};
export default withStyles(styles)(RadioGroupInline);
