import Head from 'next/head'
import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PageProps } from '../pages/[slug]'

export interface VideoPageProps extends PageProps {
  page: {
    template: 'page_videos.php'
    content: {
      rendered: string
    }
    acf: HeroContentProps & {
      videos: { video: string }[]
    }
  }
}

export default function VideoPageTemplate(props: VideoPageProps) {
  return (
    <Layout {...props}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>
      <Main>
        <Row>
          <Col xs={12}>
            {props.page.content.rendered && (
              <Content
                dangerouslySetInnerHTML={{
                  __html: props.page.content.rendered
                }}
              />
            )}
            {props.page.acf.videos && (
              <Row>
                {props.page.acf.videos.map(({ video }, i) => (
                  <Col md={6} key={i}>
                    <Embed dangerouslySetInnerHTML={{ __html: video }} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Main>
    </Layout>
  )
}

const Main = styled(Container)`
  padding: 45px 15px;
`

const Content = styled.div`
  color: ${({ theme }) => theme.body};
  margin: 0 auto;
  max-width: 960px;
  padding: 45px 15px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.primary};
  }
`

const Embed = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  overflow: hidden;
  max-width: 100%;
  height: auto;
  margin-bottom: 45px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`