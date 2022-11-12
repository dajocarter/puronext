import type { GetStaticProps, GetStaticPropsContext } from 'next'
import getLayoutData from '../data/layout'
import Layout from '../components/layout'
import { getPageTemplateData } from '../data/page'
import {
  HeroUnit,
  HeroContent,
  HeroContentProps
} from '../components/hero-unit'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from '../styles/index.module.scss'
import Image from 'next/image'
import FlexibleContent, { Layouts } from '../components/flexible-content'
import links from '../styles/links.module.scss'
import Link from 'next/link'
import { PageProps } from './[slug]'
import { WordPressImage, WordPressPage } from '../data/types'
import { getImageData } from '../data'
import PageSEO from '../components/seo'
import { josefinSans } from './_app'

interface HomePage extends WordPressPage {
  acf: HeroContentProps & {
    featured_image: WordPressImage
    featured_content: string
    layouts: Layouts[]
  }
}

interface HomePageProps extends PageProps {
  page: HomePage
}

export default function Home(props: HomePageProps) {
  const { imgSrc, imgAlt, imgHeight, imgWidth } = getImageData(
    props.page.acf.featured_image
  )

  return (
    <Layout {...props}>
      <PageSEO title={props.page.title.rendered} slug={props.page.slug} />

      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>
      <Container className={styles.featureContainer}>
        <Row>
          <Col className={styles.featureTitleContainer}>
            <h2
              className={
                imgSrc
                  ? `${styles.featureTitle} ${styles.featuredImage} ${josefinSans.className}`
                  : `${styles.featureTitle} ${josefinSans.className}`
              }
            >
              Featured
            </h2>
          </Col>
        </Row>
        <Row>
          {imgSrc && (
            <Col className={styles.column} xs={12} lg={6}>
              <Image
                src={imgSrc}
                alt={imgAlt}
                width={imgWidth}
                height={imgHeight}
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </Col>
          )}
          <Col className={styles.column} xs={12} lg={imgSrc ? 6 : 12}>
            <div
              className={styles.wpContent}
              dangerouslySetInnerHTML={{
                __html: props.page.acf.featured_content
              }}
            />
            <Link
              href='/gallery/'
              className={`${links.buttonLink} ${links.secondary}`}
            >
              View Gallery
            </Link>
          </Col>
        </Row>
      </Container>
      {props.page.acf.layouts && (
        <FlexibleContent layouts={props.page.acf.layouts} />
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const layoutData = await getLayoutData()
  const pageData = await getPageTemplateData('home')
  return {
    props: {
      ...layoutData,
      ...pageData
    }
  }
}
