import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GrowthChartKidDetailsPopover from 'components/GrowthChartKidDetailsPopover';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Link from 'next/link';

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative'
  },
  button: {
    position: 'absolute',
    width: '48px',
    height: '48px'
  }
});

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

const GrowthChartGraphRender = ({ width, height, anchorElTop = 90, anchorElLeft = 20, imgSrc, refreshDisplay, referrerPageCd, classes }) => {
  return (
    <div>
      <Card className={classes.root} style={{ width: `${width}px` }}>
        <svg key="svg" id="growth-chart" width={width} height={height}>
          <g id="legend" />
          <g id="chart" />
        </svg>
        <Link prefetch href="/growth-chart-add-point-form">
          <Button fab color="primary" aria-label="Add Entry" className={`add-point-form-fab ${classes.button}`}>
            <AddIcon />
          </Button>
        </Link>
      </Card>
      <GrowthChartKidDetailsPopover
        key="popover"
        width={width}
        height={height}
        anchorElTop={anchorElTop}
        anchorElLeft={anchorElLeft}
        refreshDisplay={refreshDisplay}
        referrerPageCd={referrerPageCd}
      />
    </div>
  );
};

GrowthChartGraphRender.propTypes = propTypes;
export default withStyles(styles)(GrowthChartGraphRender);
