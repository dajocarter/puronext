import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './library.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Fragment } from 'react'
import { PageProps } from '../pages/[slug]'
import { WordPressPage } from '../data/types'
import PageSEO from '../components/seo'

interface LibraryPage extends WordPressPage {
  template: 'page_library.php'
  acf: HeroContentProps & {
    file_groups: {
      group_name: string
      file_group: {
        list_name: string | null
        files: {
          title: string
          file: {
            url: string
          }
        }[]
      }[]
    }[]
  }
}
export interface LibraryTemplateProps extends PageProps {
  page: LibraryPage
}

export default function LibraryTemplate(props: LibraryTemplateProps) {
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
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
        />
      )}
      <div className={styles.main}>
        <Container>
          <Row>
            <Col xs={12}>
              <div className={styles.library}>
                {props.page.acf &&
                  props.page.acf.file_groups &&
                  props.page.acf.file_groups.map((groups, i) => (
                    <div className={styles.libraryGroup} key={i}>
                      <h2>{groups.group_name}</h2>
                      {groups.file_group.map((group, j) => (
                        <Fragment key={j}>
                          {group.list_name && <h3>{group.list_name}</h3>}
                          {group.files && (
                            <ul>
                              {group.files.map(({ title, file }, k) => (
                                <li key={k}>
                                  {file && file.url && file.url ? (
                                    <a
                                      href={file.url}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      {title}
                                    </a>
                                  ) : (
                                    title
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}
