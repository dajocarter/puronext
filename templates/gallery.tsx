import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './gallery.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import { PageProps } from '../pages/[slug]'
import { WordPressImage, WordPressPage } from '../data/types'
import Image from 'next/image'
import { getImageData } from '../data'
import PageSEO from '../components/seo'

interface GalleryPage extends WordPressPage {
  template: 'page_gallery.php'
  acf: HeroContentProps & {
    gallery: WordPressImage[]
  }
}
export interface GalleryPageProps extends PageProps {
  page: GalleryPage
}

export default function GalleryPageTemplate(props: GalleryPageProps) {
  return (
    <Layout {...props}>
      <PageSEO title={props.page.title.rendered} slug={props.page.slug} />

      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>

      {props.page.acf.gallery && (
        <Container className={styles.main}>
          <Row>
            <Col xs={12}>
              <Carousel>
                {props.page.acf.gallery.map((img) => {
                  const { imgAlt, imgSrc, imgHeight, imgWidth } =
                    getImageData(img)
                  return (
                    <Carousel.Item key={img.id}>
                      <Image
                        alt={imgAlt}
                        src={imgSrc}
                        height={imgHeight}
                        width={imgWidth}
                        sizes='100vw'
                        style={{
                          width: '100%',
                          height: 'auto'
                        }}
                      />
                      <Carousel.Caption>
                        <h3>{img.title}</h3>
                        {img.caption && <p>{img.caption}</p>}
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </Col>
          </Row>
        </Container>
      )}
    </Layout>
  )
}
