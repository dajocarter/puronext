import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './videos.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PageProps } from '../pages/[slug]'
import { WordPressPage } from '../data/types'
import PageSEO from '../components/seo'

interface VideoPage extends WordPressPage {
  template: 'page_videos.php'
  acf: HeroContentProps & {
    videos: { video: string }[]
  }
}
export interface VideoPageProps extends PageProps {
  page: VideoPage
}

export default function VideoPageTemplate(props: VideoPageProps) {
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
            {props.page.content.rendered && (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: props.page.content.rendered
                }}
              />
            )}
            {props.page.acf.videos && (
              <Row>
                {props.page.acf.videos.map(({ video }, i) => (
                  <Col md={6} key={i}>
                    <div
                      className={styles.embed}
                      dangerouslySetInnerHTML={{ __html: video }}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
