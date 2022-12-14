import { HeroContent, HeroUnit } from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './typical-installations.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PageProps } from '../pages/[slug]'
import Accordion, {
  AccordionContent,
  AccordionTitle
} from '../components/accordion'
import { SeriesPostType, WordPressPage } from '../lib/data/types'
import ModelInstallationFiles from '../components/model-installation-files'
import PageSEO from '../components/seo'

interface TypicalInstallationsPage extends WordPressPage {
  template: 'page_typical-installations.php'
}
export interface TypicalInstallationsPageProps extends PageProps {
  page: TypicalInstallationsPage
  filterSeries: SeriesPostType[]
  separatorSeries: SeriesPostType[]
}

export default function TypicalInstallationsPage(
  props: TypicalInstallationsPageProps
) {
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
            {props.filterSeries && (
              <div className={styles.installation}>
                <div className={styles.textCenter}>
                  <h2>Filter Installations</h2>
                  <h3>Select a Model</h3>
                  <h4>View product summary</h4>
                </div>
                <Accordion>
                  {props.filterSeries.map((node, i) => (
                    <div key={node.id}>
                      <AccordionTitle accordionIndex={i}>
                        {node.title.rendered}
                      </AccordionTitle>
                      <AccordionContent accordionIndex={i}>
                        <ModelInstallationFiles
                          slipStream={node.acf.slip_stream_files || true}
                          sweeperPiping={node.acf.sweeper_piping_files || true}
                        />
                      </AccordionContent>
                    </div>
                  ))}
                </Accordion>
              </div>
            )}
            {props.separatorSeries && (
              <div className={styles.installation}>
                <div className={styles.textCenter}>
                  <h2>Separator Installations</h2>
                  <h3>Select a Model</h3>
                  <h4>View product summary</h4>
                </div>
                <Accordion>
                  {props.separatorSeries.map((node, i) => (
                    <div key={node.id}>
                      <AccordionTitle accordionIndex={i}>
                        {node.title.rendered}
                      </AccordionTitle>
                      <AccordionContent accordionIndex={i}>
                        <ModelInstallationFiles
                          sweeperPiping={node.acf.sweeper_piping_files || true}
                          fullFlow={node.acf.full_flow_files || true}
                          sideStream={node.acf.side_stream_files || true}
                        />
                      </AccordionContent>
                    </div>
                  ))}
                </Accordion>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
