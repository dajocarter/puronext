import { useState } from 'react'
import Link from 'next/link'
import { ActiveLink } from './links'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaBars, FaTimes } from 'react-icons/fa'
import styles from './header.module.scss'
import { WordPressMenu } from '../data/types'
import { josefinSans } from '../pages/_app'

export interface HeaderProps {
  navs: {
    desktop: WordPressMenu
    mobile: WordPressMenu
  }
}

export default function Header({ navs }: HeaderProps) {
  const [menuIsOpen, setMenu] = useState(false)
  const desktopMenuName = navs.desktop.name
  const desktopMenuItems = navs.desktop.items
  const mobileMenuName = navs.mobile.name
  const mobileMenuItems = navs.mobile.items

  return (
    <header className={styles.wrapper}>
      <Container>
        <Row>
          <Col xs={9} xl={3}>
            <div className={styles.navBrand}>
              <Link href='/'>
                <Image
                  alt='Puroflux Corporation'
                  src='/purofluxlogo_white_2x.png'
                  height={42}
                  width={200}
                />
              </Link>
            </div>
          </Col>
          <Col className='d-none d-xl-block' xl={9}>
            <nav
              className={styles.nav}
              role='navigation'
              aria-label={desktopMenuName}
            >
              <ul className={styles.navMenu}>
                {desktopMenuItems.map((item) => (
                  <li className={styles.navItem} key={item.object_id}>
                    <ActiveLink
                      href={
                        item.object_slug === 'home'
                          ? '/'
                          : `/${item.object_slug}`
                      }
                      activeClassName={styles.active}
                    >
                      <a
                        className={
                          item.object_slug === 'rep-login'
                            ? `${styles.navLink} ${styles.alt} ${josefinSans.className}`
                            : `${styles.navLink} ${josefinSans.className}`
                        }
                      >
                        {item.title}
                      </a>
                    </ActiveLink>
                    {item.children && (
                      <ul
                        className={`${styles.navMenu} ${styles.subMenu} ${styles.childMenu}`}
                      >
                        {item.children.map((child) => (
                          <li className={styles.navItem} key={child.object_id}>
                            <ActiveLink
                              href={`/${child.object_slug}`}
                              activeClassName={styles.active}
                            >
                              <a
                                className={`${styles.navLink} ${josefinSans.className}`}
                              >
                                {child.title}
                              </a>
                            </ActiveLink>
                            {child.children && (
                              <ul
                                className={`${styles.navMenu} ${styles.subMenu} ${styles.grandchildMenu}`}
                              >
                                {child.children.map((grandchild) => (
                                  <li
                                    className={styles.navItem}
                                    key={grandchild.object_id}
                                  >
                                    <ActiveLink
                                      href={`/${grandchild.object_slug}`}
                                      activeClassName={styles.active}
                                    >
                                      <a
                                        className={`${styles.navLink} ${josefinSans.className}`}
                                      >
                                        {grandchild.title}
                                      </a>
                                    </ActiveLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </Col>
          <div
            className={
              menuIsOpen
                ? `${styles.overlay} ${styles.overlayOpen} d-xl-none`
                : `${styles.overlay} d-xl-none`
            }
          >
            <div
              className={
                menuIsOpen
                  ? `${styles.menuToggle} ${styles.menuToggleOpen}`
                  : styles.menuToggle
              }
              onClick={() => setMenu((menuIsOpen) => !menuIsOpen)}
            >
              {menuIsOpen ? <FaTimes /> : <FaBars />}
            </div>
            <nav
              className={
                menuIsOpen
                  ? `${styles.nav} ${styles.withOverlay} ${styles.withOverlayOpen}`
                  : `${styles.nav} ${styles.withOverlay}`
              }
              role={`navigation`}
              aria-label={mobileMenuName}
            >
              <ul className={styles.navMenu}>
                {mobileMenuItems.map((item) => (
                  <li className={styles.navItem} key={item.object_id}>
                    <ActiveLink
                      href={
                        item.object_slug === 'home'
                          ? `/`
                          : `/${item.object_slug}`
                      }
                      activeClassName={styles.active}
                    >
                      <a
                        className={
                          item.object_slug === 'rep-login'
                            ? `${styles.navLink} ${styles.alt} ${josefinSans.className}`
                            : `${styles.navLink} ${josefinSans.className}`
                        }
                      >
                        {item.title}
                      </a>
                    </ActiveLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Row>
      </Container>
    </header>
  )
}
