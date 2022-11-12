import { ReactNode } from 'react'
import Image from 'next/image'
import { formatURL } from '../data'
import styles from './hero-unit.module.scss'
import links from '../styles/links.module.scss'

export function HeroUnit({
  imgSrc,
  isPFIndustrial = false,
  children
}: {
  imgSrc: string
  isPFIndustrial?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={
        isPFIndustrial
          ? `${styles.background} ${styles.isPFI}`
          : styles.background
      }
    >
      <Image
        className={
          isPFIndustrial ? styles.heroImg : `${styles.heroImg} ${styles.isPFI}`
        }
        alt='background-image'
        src={imgSrc}
        fill
        priority
        sizes='100vw'
      />
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  )
}

export interface HeroContentProps {
  content: string
  buttons: {
    button_link: {
      url: string
      target: string
      title: string
    }
  }[]
}

export function HeroContent({ content, buttons }: HeroContentProps) {
  return (
    <>
      {content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {buttons && buttons.length > 0 && (
        <div className={styles.buttons}>
          {buttons.map((link, i) => (
            <a
              key={i}
              href={formatURL(link.button_link.url)}
              target={link.button_link.target && link.button_link.target}
              rel={link.button_link.target && 'noopener noreferrer'}
              className={`${links.buttonLink} ${
                i % 2 === 0 && `${links.primary}`
              } ${i % 2 === 1 && `${links.secondary}`} ${links.heroButton}`}
            >
              {link.button_link.title}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
