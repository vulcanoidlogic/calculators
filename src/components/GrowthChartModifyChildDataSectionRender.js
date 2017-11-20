import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import Button from 'material-ui/Button';
import ButtonPrimary from 'components/ButtonPrimary';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import RadioGroupInline from 'components/RadioGroupInline';
import TextFieldAge from 'components/TextFieldAge';
import TextFieldCircumference from 'components/TextFieldCircumference';
import TextFieldLength from 'components/TextFieldLength';
import TextFieldName from 'components/TextFieldName';
import TextFieldWeight from 'components/TextFieldWeight';
import RowSpacerVertical from 'components/RowSpacerVertical';
import { DEFAULT_ROW_SPACER_VERTICAL_PAGE_TOP } from 'common/constants';
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

const GrowthChartModifyChildDataSectionRender = ({ classes, defns, kidPoints }) => {
  console.log('GrowthChartModifyChildDataSectionRender kidPoints=', kidPoints);
  return (
    <div>
      <span>{defns.gender.value}</span>&nbsp;
      <span>{defns.name.value}</span>
      <div />
      <RadioGroupInline name="gender" {...defns.gender}>
        <FormControlLabel value="MALE" control={<Radio />} label="Boy" />
        <FormControlLabel value="FEMALE" control={<Radio />} label="Girl" />
      </RadioGroupInline>
      <TextFieldName {...defns.name} />
      {kidPoints.map(kidPoint => {
        console.log('GrowthChartModifyChildDataSectionRender kidPoint=', kidPoint);
        return (
          <div key={`KID_POINT_${kidPoint.uuid}`}>
            <TextFieldAge {...kidPoint.age} />
            <TextFieldLength {...kidPoint.length} style={{ marginTop: '1rem' }} />
            <TextFieldCircumference {...kidPoint.circumference} />
            <TextFieldWeight {...kidPoint.weight} style={{ marginTop: '1rem' }} />
          </div>
        );
      })}
    </div>
  );
};

GrowthChartModifyChildDataSectionRender.propTypes = propTypes;
export default withStyles(styles)(GrowthChartModifyChildDataSectionRender);
