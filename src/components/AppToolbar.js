import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import Link from 'next/link';
import { DRAWER_WIDTH, APPBAR_TOOLBAR_HEIGHT, DEFAULT_PAGE_LABEL } from 'common/constants';
import AppToolbarPageIcon from 'components/AppToolbarPageIcon';

const styles = theme => {
  const { breakpoints } = theme;
  return {
    title: {
      lineHeight: 1.1,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    appBar: {
      width: '100%',
      [`${breakpoints.up('lg')}`]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`
      }
    },
    toolBar: {
      [`${breakpoints.up('sm')}`]: {
        minHeight: APPBAR_TOOLBAR_HEIGHT
      }
    },
    menuIcon: {
      [`${breakpoints.up('lg')}`]: {
        visibility: 'hidden'
      }
    },
    indentedItem: {
      marginLeft: '8px'
    },
    iconImg: {
      width: '16px',
      height: '16px'
    }
  };
};

const defaultProps = {
  pageLabel: DEFAULT_PAGE_LABEL
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  pageLabel: PropTypes.string.isRequired,
  imgSrc: PropTypes.string
};

const AppToolbar = ({ classes, handleDrawerOpen, imgSrc, pageLabel }) => {
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar} disableGutters={true}>
        <IconButton className={classes.menuIcon} color="contrast" aria-label="open drawer" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Link prefetch href="/">
          <Typography className={classes.title} type="title" color="inherit" noWrap>
            {imgSrc && <AppToolbarPageIcon imgSrc={imgSrc} />}
            <span className={classes.indentedItem}>{pageLabel}</span>
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

AppToolbar.defaultProps = defaultProps;
AppToolbar.propTypes = propTypes;

export default withStyles(styles)(AppToolbar);
