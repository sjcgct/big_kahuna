import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='dns-prefetch' href='https://fonts.gstatic.com' />
          <link href='https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@400;700&family=Open+Sans:ital,wght@0,300;0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap' rel='stylesheet' />
          <link rel='preconnect' href='www.googletagmanager.com' />
          <link rel='dns-prefetch' href='www.googletagmanager.com' />
          <link rel='preconnect' href='www.youtube.com' />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
