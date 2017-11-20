import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    margin: '4px',
    height: '48px'
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired
};

const ButtonPrimary = ({ children, classes, onClick }) => {
  return (
    <Button className={classes.root} raised color="primary" onClick={onClick}>
      {children}
    </Button>
  );
};

ButtonPrimary.propTypes = propTypes;

export default withStyles(styles)(ButtonPrimary);
