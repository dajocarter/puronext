import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import styles from './footer.module.scss'
import links from '../styles/links.module.scss'
import { WordPressMenu } from '../data/types'
import { lato } from '../pages/_app'

export interface FooterProps {
  navs: {
    explore: WordPressMenu
    pages: WordPressMenu
  }
}

export default function Footer({ navs }: FooterProps) {
  const pagesMenuName = navs.pages.name
  const pagesMenuItems = navs.pages.items
  const exploreMenuName = navs.explore.name
  const exploreMenuItems = navs.explore.items

  return (
    <footer className={`${styles.footerWrapper} ${lato.className}`}>
      <div className={styles.callToAction}>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={5}>
              <h2 className={styles.headline}>Ready to get started?</h2>
            </Col>
            <Col xs={12} md={6} lg={7}>
              <p className={styles.action}>
                Call us at{' '}
                <a
                  className={styles.phoneNumber}
                  href='tel:805-579-0216'
                  title='Dial (805) 579-0216'
                >
                  (805) 579-0216
                </a>{' '}
                or{' '}
                <Link
                  href='/contact'
                  passHref
                  className={`${links.buttonLink} ${links.ctaLink}`}
                >
                  Contact Us
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className={styles.menuRow}>
          <Col className={styles.column} xs={12} sm={4} md={3}>
            <h4 className={styles.columnTitle}>{pagesMenuName}</h4>
            <ul className={styles.menu}>
              {pagesMenuItems.map((item, index) => (
                <li className={styles.menuItem} key={index}>
                  <Link
                    href={`/${item.object_slug}`}
                    passHref
                    className={styles.menuLink}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col
            className={styles.column}
            xs={12}
            sm={4}
            md={{ span: 3, offset: 1 }}
          >
            <h4 className={styles.columnTitle}>{exploreMenuName}</h4>
            <ul className={styles.menu}>
              {exploreMenuItems.map((item, index) => (
                <li className={styles.menuItem} key={index}>
                  <Link
                    href={`/${item.object_slug}`}
                    passHref
                    className={
                      item.object_slug === 'rep-login'
                        ? `${styles.menuLink} ${styles.alt}`
                        : `${styles.menuLink}`
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col className={styles.signupColumn} xs={12} sm={4} md={5}>
            <Row>
              <Col sm={12} md={6} lg={7} xl={8}>
                <h4 className={styles.columnTitle}>
                  Sign up for our newsletter
                </h4>
              </Col>
              <Col sm={12} md={6} lg={5} xl={4}>
                <Link href='/newsletter' passHref className={styles.signupLink}>
                  Sign up
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className={styles.copyright}>
        <p>&copy; Copyright 2018 - PUROFLUX. All rights reserved.</p>
      </div>
    </footer>
  )
}
