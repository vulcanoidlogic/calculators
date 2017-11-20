import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { DRAWER_WIDTH } from 'common/constants';

const styles = theme => {
  const { breakpoints } = theme;
  return {
    appBar: {
      width: '100%',
      marginLeft: 0,
      [`${breakpoints.up('lg')}`]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH
      }
    }
  };
};

const propTypes = {
  classes: PropTypes.object.isRequired
};

const GrowthChartKidTabsRender = ({ classes }) => {
  return (
    <AppBar className={classes.appBar} position="static" color="default">
      <Tabs
        value={0}
        onChange={() => {
          console.log('clicked change tab');
        }}
        indicatorColor="primary"
        textColor="primary"
        scrollable
        scrollButtons="on"
      >
        <Tab label="Child 1" />
      </Tabs>
    </AppBar>
  );
};

GrowthChartKidTabsRender.propTypes = propTypes;
export default withStyles(styles)(GrowthChartKidTabsRender);
