import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './products.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import { PageProps } from '../pages/[slug]'
import Image from 'next/image'
import { useRef, useState } from 'react'
import links from '../styles/links.module.scss'
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa'
import ProductNav from '../components/product-nav'
import {
  EmbeddedFeaturedMedia,
  ProductPostType,
  WordPressPage
} from '../data/types'
import { getImageData } from '../data'
import PageSEO from '../components/seo'

interface ProductsPage extends WordPressPage {
  template: 'page_products.php'
  acf: HeroContentProps & {
    excerpt?: string
  }
}
interface AdditionalItem extends WordPressPage {
  _embedded: EmbeddedFeaturedMedia
}
export interface ProductsPageProps extends PageProps {
  page: ProductsPage
  addlItem: AdditionalItem
  products: ProductPostType[]
}

export default function ProductsPageTemplate(props: ProductsPageProps) {
  const [key, setKey] = useState<number>()
  const panesRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const prevPane = () => {
    if (panesRef.current)
      panesRef.current.scrollIntoView({ behavior: 'smooth' })
    setKey((prevKey) => (prevKey ? prevKey - 1 : undefined))
  }

  const nextPane = () => {
    if (panesRef.current)
      panesRef.current.scrollIntoView({ behavior: 'smooth' })
    setKey((prevKey) => (prevKey ? prevKey + 1 : undefined))
  }

  const setPane = (key: string | null) => {
    if (panesRef.current)
      panesRef.current.scrollIntoView({ behavior: 'smooth' })
    if (key) setKey(parseInt(key))
  }

  const closePane = () => {
    if (tabsRef.current) tabsRef.current.scrollIntoView({ behavior: 'smooth' })
    setKey(undefined)
  }

  const addlItemImage = getImageData(
    props.addlItem._embedded['wp:featuredmedia'][0]
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

      <Container className={styles.main}>
        <Row>
          <Col xs={12}>
            <ProductNav products={props.products} />
          </Col>
        </Row>
        {props.products && props.addlItem && (
          <TabContainer
            id='product-selector'
            activeKey={key}
            onSelect={(key) => setPane(key)}
          >
            <Row ref={tabsRef}>
              <Col xs={12}>
                <Nav className={styles.tabs}>
                  {props.products.map((product, index) => {
                    const { imgAlt, imgSrc, imgHeight, imgWidth } =
                      getImageData(product._embedded['wp:featuredmedia'][0])
                    return (
                      <Nav.Item key={product.id}>
                        <Nav.Link eventKey={index} className={styles.navLink}>
                          <Image
                            alt={imgAlt}
                            src={imgSrc}
                            height={imgHeight}
                            width={imgWidth}
                            style={{
                              maxWidth: '100%',
                              height: 'auto'
                            }}
                          />
                        </Nav.Link>
                      </Nav.Item>
                    )
                  })}
                  <Nav.Item>
                    <Nav.Link
                      eventKey={props.products.length}
                      className={styles.navLink}
                    >
                      <Image
                        alt={addlItemImage.imgAlt}
                        src={addlItemImage.imgSrc}
                        height={addlItemImage.imgHeight}
                        width={addlItemImage.imgWidth}
                        style={{
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                      />
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row ref={panesRef}>
              <Col xs={12}>
                <TabContent>
                  {props.products.map((product, index) => (
                    <SelectablePane
                      key={product.id}
                      node={product}
                      eventKey={index}
                      closePane={closePane}
                      next
                      nextPane={nextPane}
                      prev={index > 0}
                      prevPane={prevPane}
                    />
                  ))}
                  <SelectablePane
                    node={props.addlItem}
                    eventKey={props.products.length}
                    closePane={closePane}
                    next={false}
                    nextPane={nextPane}
                    prev={true}
                    prevPane={prevPane}
                  />
                </TabContent>
              </Col>
            </Row>
          </TabContainer>
        )}
      </Container>
    </Layout>
  )
}

type PaneNode = ProductPostType | ProductsPageProps['addlItem']

function SelectablePane({
  node,
  eventKey,
  closePane,
  next,
  nextPane,
  prev,
  prevPane
}: {
  node: PaneNode
  eventKey: number
  closePane: () => void
  next: boolean
  nextPane: () => void
  prev: boolean
  prevPane: () => void
}) {
  const { imgAlt, imgSrc, imgHeight, imgWidth } = getImageData(
    node._embedded['wp:featuredmedia'][0]
  )
  return (
    <TabPane eventKey={eventKey}>
      <div className={styles.pane}>
        <Image
          alt={imgAlt}
          src={imgSrc}
          height={imgHeight}
          width={imgWidth}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
        <div>
          <h2>{node.title.rendered}</h2>
          {node.type === 'product' && node.acf.excerpt && (
            <p
              dangerouslySetInnerHTML={{
                __html: node.acf.excerpt
              }}
            />
          )}
          {node.type === 'page' && (
            <p
              dangerouslySetInnerHTML={{
                __html: node?.excerpt?.rendered
              }}
            />
          )}
          <a className={links.buttonLink} href={node.slug}>
            Learn More
          </a>
          <FaTimes
            className={`${styles.icon} ${styles.closeIcon}`}
            onClick={closePane}
          />
          <div className={styles.arrows}>
            {prev && <FaArrowLeft className={styles.icon} onClick={prevPane} />}
            {next && (
              <FaArrowRight className={styles.icon} onClick={nextPane} />
            )}
          </div>
        </div>
      </div>
    </TabPane>
  )
}
