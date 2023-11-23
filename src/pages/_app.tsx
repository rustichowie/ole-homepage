import '~/styles/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import { PT_Serif, Poppins, Lora } from 'next/font/google'
import type { AppProps } from 'next/app'
import { lazy } from 'react'
config.autoAddCss = false

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const sans = Poppins({
  variable: '--font-family-sans',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['500', '700', '800'],
})

const serif = Lora({
  variable: '--font-family-serif',
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-sans: ${sans.style.fontFamily};
            --font-family-serif: ${serif.style.fontFamily};
          }
        `}
      </style>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
