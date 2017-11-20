// @flow weak

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { string } from 'prop-types';
import JssProvider from 'react-jss/lib/JssProvider';
import getContext from 'jssStyles/getContext';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

class CalculatorsDocument extends Document {
  render() {
    const { props } = this;
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="UTF-8" />
          {/* PWA primary color */}
          <meta name="theme-color" content={this.props.stylesContext.theme.palette.primary[500]} />
          <title>{props.title || ''}</title>
          <meta name="description" content={props.description || defaultDescription} />
          <meta name="viewport" content={'user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height'} />
          {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="icon" href="/static/favicon.png" />
          <link href="/static/index.css" rel="stylesheet" title="Default Style" />
          <meta property="og:url" content={props.url || defaultOGURL} />
          <meta property="og:title" content={props.title || ''} />
          <meta property="og:description" content={props.description || defaultDescription} />
          <meta name="twitter:site" content={props.url || defaultOGURL} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
          <meta property="og:image" content={props.ogImage || defaultOGImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

CalculatorsDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context to collected side effects.
  const context = getContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
      <Component {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    stylesContext: context,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }}
      />
    )
  };
};

CalculatorsDocument.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default CalculatorsDocument;
