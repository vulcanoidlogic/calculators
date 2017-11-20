import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => {
  return {
    indentedItem: {
      marginLeft: '8px'
    },
    iconImgContainer: {
      width: '28px',
      height: '28px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }
  };
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  imgSrc: PropTypes.string.isRequired
};

const AppToolbarPageIcon = ({ classes, imgSrc }) => {
  return <div className={`${classes.indentedItem} ${classes.iconImgContainer}`} style={{ backgroundImage: `url("${imgSrc}")` }} />;
};

AppToolbarPageIcon.propTypes = propTypes;
export default withStyles(styles)(AppToolbarPageIcon);
