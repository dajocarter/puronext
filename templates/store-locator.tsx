import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './store-locator.module.scss'
import { formatPhoneNumber } from '../data'
import Layout from '../components/layout'
import { HeroContent, HeroUnit } from '../components/hero-unit'
import Accordion, {
  AccordionContent,
  AccordionTitle
} from '../components/accordion'
import { PageProps } from '../pages/[slug]'
import { RepPostType, StatePostType, WordPressPage } from '../data/types'

const groupRepsByState = (reps: RepPostType[], states: StatePostType[]) => {
  const statesExtracted = reps.reduce(
    (acc: RepPostType[], rep: RepPostType) => {
      const newNode = Object.assign({}, rep)
      if (rep.states) {
        const state = states.find((state) => state.id === rep.states[0])
        newNode.state = state?.name || ''
      } else {
        newNode.state = ''
      }
      acc.push(newNode)
      return acc
    },
    []
  )
  const sortedReps = statesExtracted.sort((a, b) => {
    let stateA = a.state || ''
    let stateB = b.state || ''
    if (stateA > stateB) {
      return 1
    } else if (stateA < stateB) {
      return -1
    } else {
      return 0
    }
  })
  const repsByState = sortedReps.reduce(
    (acc: { [key: string]: RepPostType[] }, node: RepPostType) => {
      var key = node.state || ''
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(node)
      return acc
    },
    {}
  )
  const html = Object.entries(repsByState).map(([state, firms], i) => (
    <Fragment key={i}>
      <AccordionTitle accordionIndex={i}>{state}</AccordionTitle>
      <AccordionContent accordionIndex={i}>
        <div className={styles.firms}>
          {firms.map(
            (
              {
                title,
                acf: { territory, phone_number, fax_number, address, website }
              },
              j
            ) => (
              <ul key={j}>
                <li>
                  <span>Territory:</span> <span>{territory || state}</span>
                </li>
                <li>
                  <span>Phone:</span>{' '}
                  {phone_number && (
                    <a href={`tel:${formatPhoneNumber(phone_number, 'back')}`}>
                      {formatPhoneNumber(phone_number, 'front')}
                    </a>
                  )}
                </li>
                <li>
                  <span>Firm:</span>{' '}
                  <span dangerouslySetInnerHTML={{ __html: title.rendered }} />
                </li>
                <li>
                  <span>Fax:</span>{' '}
                  {fax_number && (
                    <a href={`fax:${formatPhoneNumber(fax_number, 'back')}`}>
                      {formatPhoneNumber(fax_number, 'front')}
                    </a>
                  )}
                </li>
                <li>
                  <span>Address:</span>
                  <br />
                  <span dangerouslySetInnerHTML={{ __html: address }} />
                </li>
                <li>
                  <span>Website:</span>{' '}
                  <a
                    href={website}
                    target='_blank'
                    rel='noopener noreferrer nofollow'
                  >
                    {website}
                  </a>
                </li>
              </ul>
            )
          )}
        </div>
      </AccordionContent>
    </Fragment>
  ))
  return html
}

interface StoreLocatorPage extends WordPressPage {
  template: 'page_store-locator.php'
}

export interface StoreLocatorProps extends PageProps {
  page: StoreLocatorPage
  reps: RepPostType[]
  states: StatePostType[]
}

export default function StoreLocatorTemplate(props: StoreLocatorProps) {
  const sortedReps = groupRepsByState(props.reps, props.states)
  return (
    <Layout {...props}>
      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>
      <Container className={styles.main}>
        {props.page.content.rendered && (
          <Row>
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.page.content.rendered
                }}
              />
            </Col>
          </Row>
        )}
        {sortedReps && (
          <Row>
            <Col>
              <Accordion>{sortedReps}</Accordion>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  )
}
