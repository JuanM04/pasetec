import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import 'bootstrap/scss/bootstrap.scss'
import 'utils/styles.sass'

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" type="image/png" href="/icons/32.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <title>PaseTec</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
