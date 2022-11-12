import Image from 'next/image'
import styles from './full-width-content.module.scss'
import links from '../../styles/links.module.scss'
import { getImageData } from '../../data'
import { WordPressImage } from '../../data/types'

export interface FullWidthContentProps {
  acf_fc_layout: 'full_width_content'
  background_image: WordPressImage
  content: string
  link: {
    url: string
    target: string
    title: string
  }
}

export default function FullWidthContent(props: FullWidthContentProps) {
  const { imgAlt, imgSrc, imgHeight, imgWidth } = getImageData(
    props.background_image
  )
  return (
    <div className={styles.row}>
      <div className={styles.container}>
        {props.background_image && (
          <Image
            className={styles.bgImg}
            alt={imgAlt}
            src={imgSrc}
            height={imgHeight}
            width={imgWidth}
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        )}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
        {props.link && (
          <a
            className={`${links.buttonLink} ${links.secondary}`}
            href={props.link.url}
            target={props.link.target}
          >
            {props.link.title}
          </a>
        )}
      </div>
    </div>
  )
}
