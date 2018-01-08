import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import path from 'path';
import flush from 'styled-jsx/server';

import stylesheet from '../resources/styles/bundle.scss';
import config from '../configs/config';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const {
      html, head, errorHtml, chunks,
    } = renderPage();
    const styles = flush();
    return {
      html, head, errorHtml, chunks, styles,
    };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link rel="shortcut icon" href={path.join(config.paths.images, 'favicon.png')} />
          {/* CSS Begin */}
          {config.env === 'dev' ?
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            :
            <link rel="stylesheet" href={path.join(config.paths.styles, 'bundle.css')} />
          }
          {/* CSS End */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}