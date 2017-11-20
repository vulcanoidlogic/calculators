import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ButtonPrimary from 'components/ButtonPrimary';
import Link from 'next/link';

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
    btn: {
      fontSize: 10
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

const GrowthChartNavButtonsRender = ({
  classes,
  defns,
  defns: { pageLabel, handleClickGo }
}) => {
  return (
    <div>
      <Link prefetch {...defns.link} disabled={true}>
        {defns.linkText.value}
      </Link>
    </div>
  );
};

GrowthChartNavButtonsRender.propTypes = propTypes;
export default withStyles(styles)(GrowthChartNavButtonsRender);
