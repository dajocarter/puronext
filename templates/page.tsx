import { HeroContent, HeroUnit } from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './page.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PageProps } from '../pages/[slug]'
import PageSEO from '../components/seo'

export default function PageTemplate(props: PageProps) {
  return (
    <Layout {...props}>
      <PageSEO title={props.page.title.rendered} slug={props.page.slug} />

      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>

      {props.page.content.rendered && (
        <Container className={styles.main}>
          <Row>
            <Col xs={12}>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: props.page.content.rendered
                }}
              />
            </Col>
          </Row>
        </Container>
      )}
    </Layout>
  )
}
