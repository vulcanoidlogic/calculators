/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import getContext from 'jssStyles/getContext';
import AppToolbar from 'components/AppToolbar';
import Navigation from 'components/Navigation';
import { lightTheme } from 'themes/lightTheme';
import { APPBAR_TOOLBAR_HEIGHT } from 'common/constants';

// Apply some reset
const styles = theme => {
  const { breakpoints, palette: { background: { contentFrame } } } = theme;
  return {
    '@global': {
      html: {
        background: contentFrame,
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale' // Antialiasing.
      },
      body: {
        margin: 0,
        padding: 0,
        fontFamily: 'sans-serif',
        paddingTop: APPBAR_TOOLBAR_HEIGHT,
        [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
          paddingTop: APPBAR_TOOLBAR_HEIGHT
        }
      }
    }
  };
};

const isScreenLarge = window => {
  const { breakpoints: { values } } = lightTheme;
  return window.innerWidth >= values['lg'];
};

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

function withRoot(BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }

      return {};
    }

    state = {
      isDrawerOpen: false
    };

    componentWillMount() {
      this.styleContext = getContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
      if (!process.browser) {
        this.setState({ isDrawerOpen: false });
      } else {
        window.addEventListener('resize', this.refreshDisplay);
        this.refreshDisplay();
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.refreshDisplay);
    }

    refreshDisplay = () => {
      const isOpen = isScreenLarge(window) ? true : false;
      this.setState({ isDrawerOpen: isOpen });
    };

    handleDrawerOpen = () => {
      this.setState({ isDrawerOpen: true });
    };

    handleDrawerClose = () => {
      this.setState({ isDrawerOpen: false });
    };

    getDrawerType = () => {
      if (!process.browser) {
        return 'temporary';
      } else {
        if (this.state.isDrawerOpen) {
          return isScreenLarge(window) ? 'permanent' : 'temporary';
        } else {
          return 'temporary';
        }
      }
    };

    render() {
      const { handleDrawerOpen, handleDrawerClose, getDrawerType } = this;
      const { isDrawerOpen } = this.state;
      const { imgSrc = null, pageLabel, url: { pathname } } = this.props;
      // In order to pass props to AppToolbar from a page, be certain to include the props in the page's mapStateToProps method
      return (
        <MuiThemeProvider theme={this.styleContext.theme} sheetsManager={this.styleContext.sheetsManager}>
          <AppWrapper>
            <AppToolbar handleDrawerOpen={handleDrawerOpen} imgSrc={imgSrc} pageLabel={pageLabel} />
            <Navigation isDrawerOpen={isDrawerOpen} handleDrawerClose={handleDrawerClose} drawerType={getDrawerType()} pathname={pathname} />
            <BaseComponent {...this.props} />
          </AppWrapper>
        </MuiThemeProvider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
