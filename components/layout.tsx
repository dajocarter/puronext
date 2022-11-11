import { ReactNode } from 'react'
import Header, { HeaderProps } from './header'
import Footer, { FooterProps } from './footer'
import { lato } from '../pages/_app'

export default function Layout(props: {
  header: HeaderProps
  children: ReactNode
  footer: FooterProps
}) {
  return (
    <>
      <Header {...props.header} />
      <main className={lato.className}>{props.children}</main>
      <Footer {...props.footer} />
    </>
  )
}
