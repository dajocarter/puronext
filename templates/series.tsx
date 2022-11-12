import { HeroUnit } from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './series.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PageProps } from '../pages/[slug]'
import {
  ModelPostType,
  ProductPostType,
  SeriesPostType,
  WordPressFile
} from '../data/types'
import { FaFilePdf } from 'react-icons/fa'
import ProductNav from '../components/product-nav'
import Image from 'next/image'
import Accordion, {
  AccordionContent,
  AccordionTitle
} from '../components/accordion'
import links from '../styles/links.module.scss'
import { getImageData } from '../data'
import PageSEO from '../components/seo'

export interface SeriesPageProps extends PageProps {
  models: ModelPostType[]
  products: ProductPostType[]
  relatedSeries: SeriesPostType[]
  series: SeriesPostType[]
  seriesProduct: ProductPostType
  page: SeriesPostType
}

export default function SeriesTemplate(props: SeriesPageProps) {
  const { imgAlt, imgSrc, imgHeight, imgWidth } = getImageData(
    props.page?._embedded?.['wp:featuredmedia'][0]
  )

  const isPFIpage = props.page.slug.startsWith('pfi')

  return (
    <Layout {...props}>
      <PageSEO title={props.page.title.rendered} slug={props.page.slug} />

      <HeroUnit
        imgSrc={props.heroImg.media_details.sizes.full.source_url}
        isPFIndustrial={isPFIpage}
      >
        {!isPFIpage && (
          <>
            <Row>
              <Col>
                <ProductNav products={props.products} light />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={styles.content}>
                  <h1 className={styles.seriesTitle}>
                    {props.page.title.rendered} Series
                  </h1>
                  <p className={styles.seriesDescription}>
                    {props.page.acf.description}
                  </p>
                </div>
              </Col>
            </Row>
          </>
        )}
      </HeroUnit>

      <Container
        className={isPFIpage ? `${styles.main} ${styles.isPFI}` : styles.main}
      >
        {isPFIpage && (
          <Row>
            <Col>
              <h1 className={`${styles.seriesTitle} ${styles.isPFI}`}>
                {props.page.title.rendered} Series
              </h1>
              <p className={`${styles.seriesDescription} ${styles.isPFI}`}>
                {props.page.acf.description}
              </p>
            </Col>
          </Row>
        )}
        <Row>
          <Col sm={12} md={6}>
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
          </Col>
          <Col sm={12} md={6}>
            <h2 className={styles.featuredTitle}>Details</h2>
            <div
              className={styles.featuredContent}
              dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
            />
          </Col>
        </Row>
        <Row className={styles.downloadRow}>
          {props.page.acf.datasheet && (
            <DownloadCol
              title={`${props.page.title.rendered} Series Datasheet`}
              file={props.page.acf.datasheet}
            />
          )}
          {props.page.acf['operation_&_maint_manual'] && (
            <DownloadCol
              title='Operation & Maint. Manual'
              file={props.page.acf['operation_&_maint_manual']}
            />
          )}
          {props.page.acf.sample_spec_sheet && (
            <DownloadCol
              title='Sample Spec. Sheet'
              file={props.page.acf.sample_spec_sheet}
            />
          )}
          {props.page.acf.optional_file && (
            <DownloadCol
              title={props.page.acf.optional_file.title}
              file={props.page.acf.optional_file}
            />
          )}
        </Row>
        {props.page.acf.series_models && (
          <Row>
            <Col>
              <h2 className={styles.modelTitle}>Select a Model</h2>
              <p className={styles.modelDescription}>View product summary</p>
            </Col>
          </Row>
        )}
        {props.page.acf.series_models && (
          <Row className={styles.accordionRow}>
            <Col>
              <Accordion>
                {props.models.map((model, i) => (
                  <div key={model.id}>
                    <AccordionTitle accordionIndex={i}>
                      {model.title.rendered}
                    </AccordionTitle>
                    <AccordionContent accordionIndex={i}>
                      <Row>
                        {model.acf.model_stats && (
                          <Col xs={12} md={8}>
                            <ul>
                              {model.acf.model_stats.map((stat, s) => (
                                <li key={s}>
                                  <span>{stat.title}:</span>{' '}
                                  <span>{stat.value}</span>
                                </li>
                              ))}
                            </ul>
                          </Col>
                        )}
                        {model.acf.model_files && (
                          <Col xs={12} md={4}>
                            <strong>{model.acf.file_names}</strong>
                            <ul>
                              {model.acf.model_files.map((mf, f) => (
                                <li key={f}>
                                  {mf.title}:
                                  {mf.file ? (
                                    <a
                                      href={mf.file.url}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      DOWNLOAD
                                    </a>
                                  ) : (
                                    <span>* Consult Factory</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </Col>
                        )}
                      </Row>
                    </AccordionContent>
                  </div>
                ))}
              </Accordion>
            </Col>
          </Row>
        )}
        {props.page.acf.model_notes && (
          <Row>
            <Col>
              <div
                className={styles.modelNotes}
                dangerouslySetInnerHTML={{ __html: props.page.acf.model_notes }}
              />
            </Col>
          </Row>
        )}
        {props.seriesProduct?.title && (
          <Row>
            <Col>
              <h2 className={styles.productTitle}>
                {props.seriesProduct.title.rendered}
              </h2>
            </Col>
          </Row>
        )}
        {props.relatedSeries.length > 0 && (
          <Row style={{ justifyContent: 'center' }}>
            {props.relatedSeries.map((relatedSeries) => (
              <Col
                className={styles.relatedModel}
                key={relatedSeries.id}
                xs={12}
                md={4}
              >
                <h4 className={styles.relatedTitle}>
                  {relatedSeries.title.rendered}
                </h4>
                <p className={styles.relatedExcerpt}>
                  {relatedSeries.acf.description}
                </p>
                <a
                  className={`${links.buttonLink} ${links.primary}`}
                  href={relatedSeries.slug}
                >
                  View Product
                </a>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Layout>
  )
}

const DownloadCol = ({
  title,
  file
}: {
  title: string
  file: WordPressFile
}) => (
  <Col xs={12} sm={3}>
    <div className={styles.download}>
      <FaFilePdf className={styles.pdfIcon} />
      <p>
        <span>{title}</span>
        <a href={file.url} target='_blank' rel='noopener noreferrer'>
          DOWNLOAD
        </a>
      </p>
    </div>
  </Col>
)
