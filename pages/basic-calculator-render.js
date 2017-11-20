import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ButtonPrimary from 'components/ButtonPrimary';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '300px',
    height: '450px',
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: theme.palette.common.faintBlack,
    borderRadius: '8px',
    padding: '8px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BasicCalculatorRender = ({ classes, calcStr, handleClickNumber }) => {
  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography type="display1" gutterBottom>
          {calcStr}
        </Typography>
      </div>
      <div className={classes.row}>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 7)}>
          <Typography type="display1" color="inherit">
            7
          </Typography>
        </ButtonPrimary>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 8)}>
          <Typography type="display1" color="inherit">
            8
          </Typography>
        </ButtonPrimary>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 9)}>
          <Typography type="display1" color="inherit">
            9
          </Typography>
        </ButtonPrimary>
      </div>
      <div className={classes.row}>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 4)}>
          <Typography type="display1" color="inherit">
            4
          </Typography>
        </ButtonPrimary>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 5)}>
          <Typography type="display1" color="inherit">
            5
          </Typography>
        </ButtonPrimary>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 6)}>
          <Typography type="display1" color="inherit">
            6
          </Typography>
        </ButtonPrimary>
      </div>
      <div className={classes.row}>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 1)}>
          <Typography type="display1" color="inherit">
            1
          </Typography>
        </ButtonPrimary>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 2)}>
          <Typography type="display1" color="inherit">
            2
          </Typography>
        </ButtonPrimary>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 3)}>
          <Typography type="display1" color="inherit">
            3
          </Typography>
        </ButtonPrimary>
      </div>
      <div className={classes.row}>
        <ButtonPrimary onClick={handleClickNumber.bind(null, 0)}>
          <Typography type="display1" color="inherit">
            0
          </Typography>
        </ButtonPrimary>
      </div>
    </div>
  );
};

BasicCalculatorRender.propTypes = propTypes;

export default withStyles(styles, { name: 'BasicCalculator' })(
  BasicCalculatorRender
);
