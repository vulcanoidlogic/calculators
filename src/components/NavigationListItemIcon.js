import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => {
  return {
    indentedItem: {
      marginLeft: '16px'
    },
    iconImgContainer: {
      width: '24px',
      height: '24px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%'
    }
  };
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  imgSrc: PropTypes.string.isRequired
};

const NavigationListItemIcon = ({ classes, imgSrc }) => {
  return <div className={`${classes.indentedItem} ${classes.iconImgContainer}`} style={{ backgroundImage: `url("${imgSrc}")` }} />;
};

NavigationListItemIcon.propTypes = propTypes;
export default withStyles(styles)(NavigationListItemIcon);
