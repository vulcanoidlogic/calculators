import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Link from 'next/link';
import { APPBAR_TOOLBAR_HEIGHT } from 'common/constants';
import NavigationListItemIcon from 'components/NavigationListItemIcon';

const styles = theme => {
  const { breakpoints } = theme;
  return {
    drawerHeader: {
      [`${breakpoints.up('sm')}`]: {
        minHeight: APPBAR_TOOLBAR_HEIGHT
      },
      color: theme.palette.getContrastText(theme.palette.primary[500]),
      backgroundColor: theme.palette.primary[500],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    listIconText: {
      paddingLeft: '4px'
    }
  };
};

const propTypes = {
  defns: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

class NavigationRender extends Component {
  render() {
    const {
      classes,
      defns: {
        drawer: { isDrawerOpen, onRequestClose, type, onClickGrowthCharts, isOpenGrowthCharts },
        basicCalculator,
        scientificCalculator,
        growthChartAddChildForm,
        growthChartModifyChildDataForm,
        growthChartLengthForAge,
        whoChartLengthForAge,
        growthChartWeightForAge,
        whoChartWeightForAge,
        growthChartLengthForWeight,
        whoChartLengthForWeight,
        growthChartCircumferenceForAge,
        whoChartCircumferenceForAge
      }
    } = this.props;
    return (
      <Drawer open={isDrawerOpen} onRequestClose={onRequestClose} type={type}>
        <div className={classes.drawerHeader}>
          <Typography type="title" color="inherit" noWrap>
            <span>Select Item</span>
          </Typography>
        </div>
        <Divider light />
        <List>
          <Link prefetch href={basicCalculator.href}>
            <ListItem button divider disabled={basicCalculator.disabled}>
              <ListItemText primary={basicCalculator.label} />
            </ListItem>
          </Link>
          <Link prefetch href={scientificCalculator.href}>
            <ListItem button divider disabled={scientificCalculator.disabled}>
              <ListItemText primary={scientificCalculator.label} />
            </ListItem>
          </Link>
          <ListItem button onClick={onClickGrowthCharts}>
            <ListItemText primary="Growth Charts (Length, Weight)" />
            {isOpenGrowthCharts ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <div>
            <Collapse in={isOpenGrowthCharts} transitionDuration="auto" unmountOnExit={false}>
              <Link prefetch href={growthChartAddChildForm.href}>
                <ListItem button divider disabled={growthChartAddChildForm.disabled}>
                  <NavigationListItemIcon imgSrc={growthChartAddChildForm.imgSrc} />
                  <ListItemText primary={growthChartAddChildForm.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={growthChartModifyChildDataForm.href}>
                <ListItem button divider disabled={growthChartModifyChildDataForm.disabled}>
                  <NavigationListItemIcon imgSrc={growthChartModifyChildDataForm.imgSrc} />
                  <ListItemText primary={growthChartModifyChildDataForm.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={growthChartLengthForAge.href}>
                <ListItem button divider disabled={growthChartLengthForAge.disabled}>
                  <NavigationListItemIcon imgSrc={growthChartLengthForAge.imgSrc} />
                  <ListItemText primary={growthChartLengthForAge.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={whoChartLengthForAge.href}>
                <ListItem button divider disabled={whoChartLengthForAge.disabled}>
                  <NavigationListItemIcon imgSrc={whoChartLengthForAge.imgSrc} />
                  <ListItemText primary={whoChartLengthForAge.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={growthChartWeightForAge.href}>
                <ListItem button divider disabled={growthChartWeightForAge.disabled}>
                  <NavigationListItemIcon imgSrc={growthChartWeightForAge.imgSrc} />
                  <ListItemText primary={growthChartWeightForAge.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={whoChartWeightForAge.href}>
                <ListItem button divider disabled={whoChartWeightForAge.disabled}>
                  <NavigationListItemIcon imgSrc={whoChartWeightForAge.imgSrc} />
                  <ListItemText primary={whoChartWeightForAge.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={growthChartLengthForWeight.href}>
                <ListItem button divider disabled={growthChartLengthForWeight.disabled}>
                  <NavigationListItemIcon imgSrc={growthChartLengthForWeight.imgSrc} />
                  <ListItemText primary={growthChartLengthForWeight.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={whoChartLengthForWeight.href}>
                <ListItem button divider disabled={whoChartLengthForWeight.disabled}>
                  <NavigationListItemIcon imgSrc={whoChartLengthForWeight.imgSrc} />
                  <ListItemText primary={whoChartLengthForWeight.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={growthChartCircumferenceForAge.href}>
                <ListItem button divider disabled={growthChartCircumferenceForAge.disabled}>
                  <NavigationListItemIcon imgSrc={growthChartCircumferenceForAge.imgSrc} />
                  <ListItemText primary={growthChartCircumferenceForAge.label} className={classes.listIconText} />
                </ListItem>
              </Link>
              <Link prefetch href={whoChartCircumferenceForAge.href}>
                <ListItem button divider disabled={whoChartCircumferenceForAge.disabled}>
                  <NavigationListItemIcon imgSrc={whoChartCircumferenceForAge.imgSrc} />
                  <ListItemText primary={whoChartCircumferenceForAge.label} className={classes.listIconText} />
                </ListItem>
              </Link>
            </Collapse>
          </div>
        </List>
      </Drawer>
    );
  }
}

NavigationRender.propTypes = propTypes;

export default withStyles(styles)(NavigationRender);
