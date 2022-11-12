import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Lato, Josefin_Sans } from '@next/font/google'
import '../styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/variables.module.scss'

export const lato = Lato({ weight: ['400', '700'] })
export const josefinSans = Josefin_Sans({ weight: ['400', '700'] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
