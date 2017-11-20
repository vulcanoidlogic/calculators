import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    // minWidth: GROWTH_CHART_FIELD_MIN_WIDTH
  }
});

const TextFieldName = props => {
  const { value, isHidden, isReadOnly } = props;
  if (isHidden) {
    return null;
  }
  if (isReadOnly) {
    return <div>{value}</div>;
  } else {
    const { storePath, isHidden, ...whiteListProps } = props;
    return <TextField label="Nickname" placeholder="Type Child's Nickname" id="name" inputProps={{ maxLength: 30 }} required={true} {...whiteListProps} />;
  }
};
export default withStyles(styles)(TextFieldName);
