import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="no" data-theme="garden">
      <Head>
        <Script
          src="https://kit.fontawesome.com/64c000d950.js"
          crossOrigin="anonymous"
        ></Script>
        <meta
          name="google-site-verification"
          content="4kebsVUgR3UFUXa6Jcu-yUblhdo36uBtzUOSrbwBrT0"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
