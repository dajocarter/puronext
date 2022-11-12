import Layout from '../components/layout'
import styles from './product.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PageProps } from '../pages/[slug]'
import ProductNav from '../components/product-nav'
import Image from 'next/image'
import links from '../styles/links.module.scss'
import {
  ProductPostType,
  SeriesPostType,
  WordPressFile,
  WordPressImage,
  WordPressPage
} from '../data/types'
import { HeroContentProps } from '../components/hero-unit'
import { getImageData } from '../data'
import PageSEO from '../components/seo'

interface ProductPageACF extends HeroContentProps {
  title: null | string
  description: null | string
  excerpt: null | string
  image: null | WordPressImage
  files?: { file: WordPressFile }[]
}

interface ProductPage extends WordPressPage {
  template: ''
  type: 'product'
  acf: ProductPageACF
}

export interface ProductPageProps extends PageProps {
  products: ProductPostType[]
  series: SeriesPostType[]
  page: ProductPage
}

export default function ProductTemplate(props: ProductPageProps) {
  const { imgAlt, imgSrc, imgHeight, imgWidth } = getImageData(
    props.page.acf.image
  )

  return (
    <Layout {...props}>
      <PageSEO title={props.page.title.rendered} slug={props.page.slug} />

      <Container className={styles.main}>
        <Row>
          <Col>
            <ProductNav products={props.products} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className={styles.productTitle}>{props.page.title.rendered}</h1>
            <p className={styles.productDescription}>
              {props.page.acf.description}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className={styles.featuredProduct}>
            {props.page.acf.title && (
              <p className={styles.featuredTitle}>{props.page.acf.title}</p>
            )}
            {imgSrc && (
              <Image
                alt={imgAlt}
                src={imgSrc}
                height={(imgHeight * 250) / imgWidth}
                width={250}
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            )}
            {props.page.acf.files && (
              <Row style={{ justifyContent: 'center' }}>
                {props.page.acf.files.map(({ file }) => (
                  <Col key={file.id}>
                    <a
                      className={`${links.buttonLink} ${links.primary} ${links.featuredButton}`}
                      href={file.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {file.title}
                    </a>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
        {props.series && (
          <Row style={{ justifyContent: 'center' }}>
            {props.series.map((series) => {
              const { imgAlt, imgSrc, imgHeight, imgWidth } = getImageData(
                series._embedded['wp:featuredmedia'][0]
              )
              return (
                <Col
                  className={styles.series}
                  key={series.id}
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <p className={styles.seriesTitle}>
                    {series.title.rendered} Series
                  </p>
                  <Image
                    alt={imgAlt}
                    src={imgSrc}
                    height={175}
                    width={(imgWidth * 175) / imgHeight}
                    style={{
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                  {series.acf.description && (
                    <p className={styles.seriesDescrip}>
                      {series.acf.description}
                    </p>
                  )}
                  <a
                    className={`${links.buttonLink} ${links.primary}`}
                    href={series.slug}
                  >
                    View Product
                  </a>
                </Col>
              )
            })}
          </Row>
        )}
        <Row>
          <Col>
            <h2 className={styles.overviewTitle}>Overview</h2>
            <div
              className={styles.overviewContent}
              dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
