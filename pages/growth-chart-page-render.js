import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import GrowthChartGraph from 'components/GrowthChartGraph';
import ComponentLoadHelper from 'components/ComponentLoadHelper';
import GrowthChartKidTabs from 'components/GrowthChartKidTabs';

const styles = theme => ({
  title: {
    color: 'rgba(0,0,0,0.6)'
  }
});

const propTypes = {
  defns: PropTypes.object.isRequired
};

const GrowthChartPageRender = ({ classes, defns, defns: { pageLabel, onAnchorElementLoad } }) => {
  return (
    <div className="centered-page">
      <GrowthChartKidTabs />
      {/* <RowSpacerVertical marginTop={DEFAULT_ROW_SPACER_VERTICAL_PAGE_TOP} /> */}
      {/* <Typography className={classes.title} type="title">
        {pageLabel}
      </Typography> */}
      <FormControl fullWidth={true} component="fieldset">
        <ComponentLoadHelper onLoad={onAnchorElementLoad} />
      </FormControl>
      <GrowthChartGraph {...defns.graph} />
    </div>
  );
};

GrowthChartPageRender.propTypes = propTypes;
export default withStyles(styles)(GrowthChartPageRender);
