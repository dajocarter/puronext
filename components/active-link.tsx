import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import styles from './active-link.module.scss'
import { josefinSans } from '../pages/_app'

type ActiveLinkProps = LinkProps & {
  text: string
  alt?: boolean
}
export default function ActiveLink({
  href,
  text,
  alt = false
}: ActiveLinkProps) {
  const { asPath, isReady } = useRouter()
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    if (isReady) {
      // Using URL().pathname to get rid of query and hash
      const linkPathname = new URL(href as string, location.href).pathname
      const activePathname = new URL(asPath, location.href).pathname

      if (activePathname === linkPathname) {
        setActive(true)
      }
    }
  }, [asPath, isReady, href])

  let className = `${josefinSans.className} ${styles.navLink}`
  if (alt) className += ` ${styles.alt}`
  if (isActive) className += ` ${styles.active}`

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  )
}
