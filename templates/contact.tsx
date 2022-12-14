import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import { formatPhoneNumber } from '../lib/data'
import styles from './contact.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ContactForm from '../components/forms/contact'
import { PageProps } from '../pages/[slug]'
import { WordPressPage } from '../lib/data/types'
import PageSEO from '../components/seo'

interface ContactPage extends WordPressPage {
  template: 'page_contact.php'
  acf: HeroContentProps & {
    address: string
    phone_number: string
    fax_number: string
    contact_email: string
  }
}
export interface ContactPageProps extends PageProps {
  page: ContactPage
}

export default function ContactPage(props: ContactPageProps) {
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
          <Col md={5}>
            <h2 className={styles.columnTitle}>Contact Information</h2>
            <div className={styles.gMap}>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.9867927125356!2d-118.80215204942941!3d34.27438898045055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c282bad55e5c73%3A0xe389b73478d03800!2sPuroflux+Corporation!5e0!3m2!1sen!2sus!4v1535824827764'
                width='600'
                height='450'
                frameBorder='0'
                style={{ border: 0 }}
                title='map'
                allowFullScreen
              />
            </div>
            <p
              className={styles.address}
              dangerouslySetInnerHTML={{ __html: props.page.acf.address }}
            />
            <p>
              <span className={styles.title}>Tel:</span>
              <a
                className={styles.value}
                href={`tel:${formatPhoneNumber(
                  props.page.acf.phone_number,
                  'back'
                )}`}
              >
                {formatPhoneNumber(props.page.acf.phone_number, 'front')}
              </a>{' '}
              <br />
              <span className={styles.title}>Fax:</span>
              <a
                className={styles.value}
                href={`tel:${formatPhoneNumber(
                  props.page.acf.fax_number,
                  'back'
                )}`}
              >
                {formatPhoneNumber(props.page.acf.fax_number, 'front')}
              </a>{' '}
              <br />
              <span className={styles.title}>Email:</span>
              <a
                className={styles.value}
                href={`mailto:${props.page.acf.contact_email}`}
              >
                {props.page.acf.contact_email}
              </a>
            </p>
          </Col>
          <Col md={{ span: 5, offset: 2 }}>
            <h2 className={styles.columnTitle}>Contact Form</h2>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
