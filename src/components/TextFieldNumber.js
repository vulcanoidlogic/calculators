import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import { getErrorList } from 'common/growthChartValidators';

const styles = theme => ({
  root: {
    // minWidth: GROWTH_CHART_FIELD_MIN_WIDTH
  }
});

const initState = props => {
  const { value } = props;
  return { value, error: false, helperText: ' ' };
};

const propTypes = {
  onChange: PropTypes.func.isRequired
};

class TextFieldNumber extends Component {
  constructor(props) {
    super(props);
    this.state = initState(props);
    this.debounceChange = _debounce(this.runAfterChange, 500);
  }

  state = {};
  debounceChange = () => {};

  handleChange = evt => {
    evt.stopPropagation();
    const curVal = evt.target.value;
    if (curVal.length > 5) return false;
    const { debounceChange } = this;
    this.setState({ value: curVal }, () => {
      debounceChange();
    });
  };

  /**
   * Run after change executes from debounceChange.  This is too expensive to run on every change, but we don't want to wait until blur.
   * If fail validation, report error status; otherwise, dispatch onChange (saveToStore)
   */
  runAfterChange = () => {
    const { value } = this.state;
    const { inputProps } = this.props;
    const errorList = getErrorList(inputProps, value);
    if (_isEmpty(errorList)) {
      // clear error and save to store
      this.setState({ error: false, helperText: ' ' }, () => {
        const { onChange: saveToStore } = this.props;
        saveToStore(Number(value));
      });
    } else {
      // set error; do not save to store
      this.setState({ error: true, helperText: errorList[0].value });
    }
  };

  render() {
    const { handleChange } = this;
    const { value, error, helperText } = this.state;
    const { isHidden, ...otherProps } = this.props;
    return isHidden ? null : (
      <FormControl fullWidth={true}>
        <TextField margin="dense" type="number" {...otherProps} onChange={handleChange} value={value} error={error} helperText={helperText} />
      </FormControl>
    );
  }
}

TextFieldNumber.propTypes = propTypes;
export default withStyles(styles)(TextFieldNumber);
