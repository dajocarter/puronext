import Image from 'next/image'
import styles from './split-content.module.scss'
import links from '../../styles/links.module.scss'
import { getImageData } from '../../data'
import { WordPressImage } from '../../data/types'

export interface SplitContentProps {
  acf_fc_layout: 'split_content'
  left_background_image: WordPressImage
  right_background_image: WordPressImage
  left_title: string
  right_title: string
  left_content: string
  right_content: string
  left_link: {
    url: string
    target: string
    title: string
  }
  right_link: {
    url: string
    target: string
    title: string
  }
}

export default function SplitContent(props: SplitContentProps) {
  const leftBgImg = getImageData(props.left_background_image)
  const rightBgImg = getImageData(props.right_background_image)

  return (
    <div className={styles.row}>
      <div className={`${styles.side} ${styles.left}`}>
        {props.left_background_image && (
          <Image
            alt={leftBgImg.imgAlt}
            src={leftBgImg.imgSrc}
            fill
            sizes='100vw'
          />
        )}
        <div className={`${styles.container} ${styles.left}`}>
          <h2>{props.left_title}</h2>
          <div
            className={`${styles.content} ${styles.left}`}
            dangerouslySetInnerHTML={{ __html: props.left_content }}
          />
          {props.left_link && (
            <a
              className={`${links.buttonLink} ${links.primary} ${links.whiteColor}`}
              href={props.left_link.url}
              target={props.left_link.target}
            >
              {props.left_link.title}
            </a>
          )}
        </div>
      </div>
      <div className={`${styles.side} ${styles.right}`}>
        {props.right_background_image && (
          <Image
            alt={rightBgImg.imgAlt}
            src={rightBgImg.imgSrc}
            fill
            sizes='100vw'
          />
        )}
        <div className={`${styles.container} ${styles.right}`}>
          <h2>{props.right_title}</h2>
          <div
            className={`${styles.content} ${styles.right}`}
            dangerouslySetInnerHTML={{ __html: props.right_content }}
          />
          {props.right_link && (
            <a
              className={`${links.buttonLink} ${links.secondary} ${links.whiteColor}`}
              href={props.right_link.url}
              target={props.right_link.target}
            >
              {props.right_link.title}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
