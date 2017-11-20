import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GrowthChartKidTabs from 'components/GrowthChartKidTabs';
import GrowthChartModifyChildDataSection from 'components/GrowthChartModifyChildDataSection';
import _filter from 'lodash/filter';
// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-datasheet/lib/react-datasheet.css';

const gridData = {
  grid: [[{ value: 1 }, { value: 3 }], [{ value: 2 }, { value: 4 }]]
};

const styles = theme => {
  return {
    root: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '320px',
      position: 'relative',
      width: '100%'
    },
    card: {
      minWidth: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
      color: theme.palette.text.secondary
    },
    pos: {
      marginBottom: 12,
      color: theme.palette.text.secondary
    }
  };
};

const propTypes = {
  classes: PropTypes.object.isRequired
};
// return <GrowthChartModifyChildDataSection key={`KID_${joinedKid.uuid}`} joinedKid={joinedKid} />;

const GrowthChartModifyChildDataFormRender = ({ classes, joinedKidData }) => {
  return (
    <div>
      <GrowthChartKidTabs />
      <div>Modify Child Data</div>
      {_filter(joinedKidData, { type: 'KID' }).map(kid => {
        const { uuid } = kid;
        const kidPoints = _filter(joinedKidData, { type: 'KID_POINT', kidUuid: uuid });
        console.log('called GrowthChartModifyChildDataFormRender kid, kidPoints=', kid, kidPoints);
        return <GrowthChartModifyChildDataSection key={`KID_${uuid}`} defns={kid} kidPoints={kidPoints} />;
      })}
    </div>
  );
};

GrowthChartModifyChildDataFormRender.propTypes = propTypes;
export default withStyles(styles)(GrowthChartModifyChildDataFormRender);
