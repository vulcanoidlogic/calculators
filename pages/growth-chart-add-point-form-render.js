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
import GrowthChartKidTabs from 'components/GrowthChartKidTabs';
import RowSpacerVertical from 'components/RowSpacerVertical';
import { DEFAULT_ROW_SPACER_VERTICAL_PAGE_TOP } from 'common/constants';
import cx from 'classnames';

const styles = theme => {
  return {
    root: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '320px',
      position: 'relative',
      width: '100%'
    },
    // card: {
    //   minWidth: 275
    // },
    // bullet: {
    //   display: 'inline-block',
    //   margin: '0 2px',
    //   transform: 'scale(0.8)'
    // },
    // title: {
    //   marginBottom: 16,
    //   fontSize: 14,
    //   color: theme.palette.text.secondary
    // },
    // pos: {
    //   marginBottom: 12,
    //   color: theme.palette.text.secondary
    // },
    navBtnRow: {
      display: 'flex',
      flexDirection: 'row'
    },
    hidden: {
      display: 'none'
    }
  };
};

const propTypes = {
  classes: PropTypes.object.isRequired
};

const GrowthChartAddPointFormRender = ({ classes, defns, defns: { pageLabel, handleClickGo } }) => {
  return (
    <div>
      <GrowthChartKidTabs />
      <RowSpacerVertical marginTop={DEFAULT_ROW_SPACER_VERTICAL_PAGE_TOP} />
      <Card className={classes.root}>
        <CardContent>
          <Typography type="subheading">{pageLabel}</Typography>
          <div className="flex-row">
            <RadioGroupInline name="gender" {...defns.gender}>
              <FormControlLabel value="MALE" control={<Radio />} label="Boy" />
              <FormControlLabel value="FEMALE" control={<Radio />} label="Girl" />
            </RadioGroupInline>
          </div>
          <Typography component="div">
            <TextFieldName {...defns.name} />
            <TextFieldName {...defns.nameGenderStr} />
            <br />
            <TextFieldAge {...defns.age} />
            <TextFieldLength {...defns.length} />
            <TextFieldWeight {...defns.weight} />
            <TextFieldCircumference {...defns.circumference} />
          </Typography>
          {/* <Typography type="body2" color="inherit">
            See Growth Chart for:
          </Typography> */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={classes.navBtnRow}>
              <Button className={cx({ [classes.hidden]: defns.lengthForAgeCdcBtn.isHidden })} {...defns.lengthForAgeCdcBtn}>
                {defns.lengthForAgeCdcBtn.text}
              </Button>
              <Button className={cx({ [classes.hidden]: defns.lengthForAgeWhoBtn.isHidden })} {...defns.lengthForAgeWhoBtn}>
                {defns.lengthForAgeWhoBtn.text}
              </Button>
            </div>
            <div className={classes.navBtnRow}>
              <Button className={cx({ [classes.hidden]: defns.weightForAgeCdcBtn.isHidden })} {...defns.weightForAgeCdcBtn}>
                {defns.weightForAgeCdcBtn.text}
              </Button>
              <Button className={cx({ [classes.hidden]: defns.weightForAgeWhoBtn.isHidden })} {...defns.weightForAgeWhoBtn}>
                {defns.weightForAgeWhoBtn.text}
              </Button>
            </div>
            <div className={classes.navBtnRow}>
              <Button className={cx({ [classes.hidden]: defns.lengthForWeightCdcBtn.isHidden })} {...defns.lengthForWeightCdcBtn}>
                {defns.lengthForWeightCdcBtn.text}
              </Button>
              <Button className={cx({ [classes.hidden]: defns.lengthForWeightWhoBtn.isHidden })} {...defns.lengthForWeightWhoBtn}>
                {defns.lengthForWeightWhoBtn.text}
              </Button>
            </div>
            <div className={classes.navBtnRow}>
              <Button className={cx({ [classes.hidden]: defns.circumferenceForAgeCdcBtn.isHidden })} {...defns.circumferenceForAgeCdcBtn}>
                {defns.circumferenceForAgeCdcBtn.text}
              </Button>
              <Button className={cx({ [classes.hidden]: defns.circumferenceForAgeWhoBtn.isHidden })} {...defns.circumferenceForAgeWhoBtn}>
                {defns.circumferenceForAgeWhoBtn.text}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

GrowthChartAddPointFormRender.propTypes = propTypes;
export default withStyles(styles)(GrowthChartAddPointFormRender);
