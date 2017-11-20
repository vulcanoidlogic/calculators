import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextFieldAge from 'components/TextFieldAge';
import TextFieldLength from 'components/TextFieldLength';
import TextFieldCircumference from 'components/TextFieldCircumference';
import TextFieldWeight from 'components/TextFieldWeight';

let anchorEl = null;

const popoverDefns = {
  anchorOriginVertical: 'center',
  anchorOriginHorizontal: 'center',
  transformOriginVertical: 'center',
  transformOriginHorizontal: 'center'
};

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

const GrowthChartKidDetailsPopoverRender = ({
  width,
  height,
  isKidDetailsPopoverOpen,
  onRequestClose,
  onRequestDelete,
  onClickSave,
  anchorElTop = 90,
  anchorElLeft = 20,
  defns
}) => {
  const { anchorOriginVertical, anchorOriginHorizontal, transformOriginVertical, transformOriginHorizontal } = popoverDefns;
  return [
    <div
      ref={ref => (anchorEl = ref)}
      key="anchor-el"
      id="anchor-el"
      style={{ position: 'fixed', top: anchorElTop - 10, left: anchorElLeft - 10, width: '20px', height: '20px' }}
    />,
    <Popover
      key="popover"
      open={isKidDetailsPopoverOpen}
      anchorEl={anchorEl}
      onRequestClose={onRequestClose}
      anchorOrigin={{
        vertical: anchorOriginVertical,
        horizontal: anchorOriginHorizontal
      }}
      transformOrigin={{
        vertical: transformOriginVertical,
        horizontal: transformOriginHorizontal
      }}
    >
      <Card>
        <CardContent>
          <Typography type="headline" component="h2">
            Child
          </Typography>
          <Typography type="headline" component="h2">
            TODO: add percentile
          </Typography>
          <Typography component="div">
            <TextFieldAge {...defns.age} />
            <TextFieldLength {...defns.length} style={{ marginTop: '1rem' }} />
            <TextFieldCircumference {...defns.circumference} />
            <TextFieldWeight {...defns.weight} style={{ marginTop: '1rem' }} />
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense onClick={onClickSave} color="primary">
            Save
          </Button>
          <Button dense onClick={onRequestClose} color="primary">
            Cancel
          </Button>
          <Button dense onClick={onRequestDelete} color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Popover>
  ];
};

GrowthChartKidDetailsPopoverRender.propTypes = propTypes;
export default GrowthChartKidDetailsPopoverRender;
