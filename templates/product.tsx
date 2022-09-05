import Head from 'next/head'
import Layout from '../components/layout'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PageProps } from '../pages/[slug]'
import ProductNav from '../components/product-nav'
import Image from 'next/image'
import { StyledButtonLink } from '../components/links'
import {
  ProductPostType,
  SeriesPostType,
  WordPressFile,
  WordPressImage,
  WordPressPage
} from '../data/types'
import { HeroContentProps } from '../components/hero-unit'
import { getImageData } from '../data'

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
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Main>
        <Row>
          <Col>
            <ProductNav products={props.products} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductTitle>{props.page.title.rendered}</ProductTitle>
            <ProductDescription>
              {props.page.acf.description}
            </ProductDescription>
          </Col>
        </Row>
        <Row>
          <FeaturedProduct>
            {props.page.acf.title && (
              <FeaturedTitle>{props.page.acf.title}</FeaturedTitle>
            )}
            <div>
              <Image
                alt={imgAlt}
                src={imgSrc}
                height={imgHeight}
                width={imgWidth}
                layout='responsive'
              />
            </div>
            {props.page.acf.files && (
              <Row style={{ justifyContent: 'center' }}>
                {props.page.acf.files.map(({ file }) => (
                  <Col key={file.id}>
                    <FeaturedBtn
                      as='a'
                      primary
                      href={file.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {file.title}
                    </FeaturedBtn>
                  </Col>
                ))}
              </Row>
            )}
          </FeaturedProduct>
        </Row>
        {props.series && (
          <Row style={{ justifyContent: 'center' }}>
            {props.series.map((series) => {
              const { imgAlt, imgSrc, imgHeight, imgWidth } = getImageData(
                series._embedded['wp:featuredmedia'][0]
              )
              return (
                <Series key={series.id} xs={12} sm={6} md={3}>
                  <SeriesTitle>{series.title.rendered} Series</SeriesTitle>
                  <Image
                    alt={imgAlt}
                    src={imgSrc}
                    height={imgHeight}
                    width={imgWidth}
                    layout='responsive'
                  />
                  {series.acf.description && (
                    <SeriesDescrip>{series.acf.description}</SeriesDescrip>
                  )}
                  <StyledButtonLink primary href={series.slug}>
                    View Product
                  </StyledButtonLink>
                </Series>
              )
            })}
          </Row>
        )}
        <Row>
          <Col>
            <OverviewTitle>Overview</OverviewTitle>
            <OverviewContent
              dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
            />
          </Col>
        </Row>
      </Main>
    </Layout>
  )
}

const Main = styled(Container)`
  padding: 45px 15px;
`

const ProductTitle = styled.h1`
  margin-top: 3rem;
  text-align: center;
`

const ProductDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.body};
  margin-bottom: 3rem;
`

const FeaturedProduct = styled(Col)`
  text-align: center;
`

const FeaturedTitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-transform: uppercase;
`

const FeaturedBtn = styled(StyledButtonLink)`
  margin-top: 2rem;
`

const Series = styled(Col)`
  margin-bottom: 2rem;
  text-align: center;
`

const SeriesTitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-transform: uppercase;
`

const SeriesDescrip = styled.p`
  color: ${({ theme }) => theme.body};
  font-size: 0.85rem;
`

const OverviewTitle = styled.h2`
  margin-top: 3rem;
  margin-bottom: 2rem;
`

const OverviewContent = styled.div`
  color: ${({ theme }) => theme.body};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.primary};
  }

  a {
    color: ${({ theme }) => theme.secondary};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.secondary};
      text-decoration-color: ${({ theme }) => theme.primary};
    }
  }

  iframe {
    display: block;
    margin: 1rem auto;
    max-width: 100%;
  }
`