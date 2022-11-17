import { wpClient } from '.'

async function getHeaderData() {
  const headerDesktopMenu = await wpClient.headerDesktopMenu()
  const headerMobileMenu = await wpClient.headerMobileMenu()

  return {
    navs: {
      desktop: headerDesktopMenu,
      mobile: headerMobileMenu
    }
  }
}

async function getFooterData() {
  const footerExploreMenu = await wpClient.footerExploreMenu()
  const footerPagesMenu = await wpClient.footerPagesMenu()

  return {
    navs: {
      explore: footerExploreMenu,
      pages: footerPagesMenu
    }
  }
}

export default async function getLayoutData() {
  const headerData = await getHeaderData()
  const footerData = await getFooterData()

  return {
    header: headerData,
    footer: footerData
  }
}
