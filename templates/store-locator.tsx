import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './store-locator.module.scss'
import { formatPhoneNumber } from '../lib/data'
import Layout from '../components/layout'
import { HeroContent, HeroUnit } from '../components/hero-unit'
import Accordion, {
  AccordionContent,
  AccordionTitle
} from '../components/accordion'
import { PageProps } from '../pages/[slug]'
import { RepPostType, StatePostType, WordPressPage } from '../lib/data/types'
import PageSEO from '../components/seo'

const groupRepsByCountrySortedByState = (
  reps: RepPostType[],
  states: StatePostType[]
) => {
  const { internationalReps, domesticReps } = reps.reduce(
    (
      acc: {
        internationalReps: { [key: string]: RepPostType[] }
        domesticReps: { [key: string]: RepPostType[] }
      },
      rep: RepPostType
    ) => {
      // Create a shallow copy of the rep
      const newNode = { ...rep }

      // Find the state name or use an empty string if not found
      const state = rep.states
        ? states.find((state) => state.id === rep.states[0])
        : null
      newNode.state = state ? state.name : ''

      // Determine if the state is international
      const isInternational =
        state &&
        state.acf &&
        !Array.isArray(state.acf) &&
        state.acf.international

      // Choose the appropriate object to store the rep
      const target = isInternational ? acc.internationalReps : acc.domesticReps
      const key = newNode.state

      // Initialize the state group if it doesn't exist
      if (!target[key]) {
        target[key] = []
      }

      // Add the rep to the appropriate state group
      target[key].push(newNode)

      return acc
    },
    { internationalReps: {}, domesticReps: {} }
  )

  // Function to sort an object by its keys
  const sortRepsByState = (obj: { [key: string]: RepPostType[] }) =>
    Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .reduce((sortedAcc: { [key: string]: RepPostType[] }, key: string) => {
        sortedAcc[key] = obj[key]
        return sortedAcc
      }, {})

  // Sort both objects
  const sortedInternationalReps = sortRepsByState(internationalReps)
  const sortedDomesticReps = sortRepsByState(domesticReps)

  return {
    internationalReps: sortedInternationalReps,
    domesticReps: sortedDomesticReps
  }
}

const renderRepsAccordion = (reps: { [key: string]: RepPostType[] }) => {
  return Object.entries(reps).map(([state, firms], i) => (
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
  const { internationalReps, domesticReps } = groupRepsByCountrySortedByState(
    props.reps,
    props.states
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
        <h2 className='mb-3'>Domestic</h2>
        <Row>
          <Col>
            <Accordion>{renderRepsAccordion(domesticReps)}</Accordion>
          </Col>
        </Row>
        {Object.entries(internationalReps).length > 0 && (
          <Fragment>
            <h2 className='mt-5 mb-3'>International</h2>
            <Row>
              <Col>
                <Accordion>{renderRepsAccordion(internationalReps)}</Accordion>
              </Col>
            </Row>
          </Fragment>
        )}
      </Container>
    </Layout>
  )
}
