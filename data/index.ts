import WpApiClient, { DefaultEndpoint } from 'wordpress-api-client'
import {
  FeaturedMedia,
  ModelPostType,
  ProductPostType,
  RepPostType,
  SeriesPostType,
  StatePostType,
  WordPressImage,
  WordPressMenu
} from './types'

const HEADER_DESKTOP_MENU_PATH = 'wp-api-menus/v2/menus/7'
const FOOTER_PAGES_MENU_PATH = 'wp-api-menus/v2/menus/8'
const FOOTER_EXPLORE_MENU_PATH = 'wp-api-menus/v2/menus/9'
const HEADER_MOBILE_MENU_PATH = 'wp-api-menus/v2/menus/63'

const MODELS_POST_TYPE_PATH = 'wp/v2/models'
const PRODUCTS_POST_TYPE_PATH = 'wp/v2/products'
const REPS_POST_TYPE_PATH = 'wp/v2/reps'
const SERIES_POST_TYPE_PATH = 'wp/v2/series'
const STATES_POST_TYPE_PATH = 'wp/v2/states'

class WpClient extends WpApiClient {
  constructor() {
    super(`${process.env.NEXT_PUBLIC_SOURCE_URL}`, {
      auth: {
        type: 'basic',
        username: `${process.env.NEXT_PUBLIC_WP_USERNAME}`,
        password: `${process.env.NEXT_PUBLIC_WP_PASSWORD}`
      }
    })
  }

  headerDesktopMenu = this.createEndpointCustomGet<WordPressMenu>(
    HEADER_DESKTOP_MENU_PATH
  )
  headerMobileMenu = this.createEndpointCustomGet<WordPressMenu>(
    HEADER_MOBILE_MENU_PATH
  )
  footerExploreMenu = this.createEndpointCustomGet<WordPressMenu>(
    FOOTER_EXPLORE_MENU_PATH
  )
  footerPagesMenu = this.createEndpointCustomGet<WordPressMenu>(
    FOOTER_PAGES_MENU_PATH
  )

  public model(): DefaultEndpoint<ModelPostType> {
    return this.addPostType<ModelPostType>(MODELS_POST_TYPE_PATH)
  }

  public product<P = ProductPostType>(): DefaultEndpoint<P> {
    const queryParams = new URLSearchParams({
      order: 'desc',
      orderBy: 'id'
    })
    return {
      ...this.defaultEndpoints(PRODUCTS_POST_TYPE_PATH, queryParams)
    }
  }

  public rep(): DefaultEndpoint<RepPostType> {
    return this.addPostType<RepPostType>(REPS_POST_TYPE_PATH)
  }

  public series(): DefaultEndpoint<SeriesPostType> {
    return this.addPostType<SeriesPostType>(SERIES_POST_TYPE_PATH)
  }

  public state(): DefaultEndpoint<StatePostType> {
    return this.addPostType<StatePostType>(STATES_POST_TYPE_PATH)
  }
}

export const wpClient = new WpClient()

export const queryBySlug = (slug: string) => new URLSearchParams({ slug })

export const formatPhoneNumber = (
  phoneNumber: string,
  formatType: 'back' | 'front' = 'back'
): string => {
  // Replace any non-number with an empty string and trim
  const numbersOnly = phoneNumber.replace(/\D/g, '').trim()
  // Group string of numbers into telephone parts
  const grouped = numbersOnly.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (!grouped) return phoneNumber
  let formatted
  switch (formatType) {
    case 'front':
      formatted = `(${grouped[1]}) ${grouped[2]}-${grouped[3]}`
      break
    case 'back':
    default:
      formatted = `${grouped[1]}-${grouped[2]}-${grouped[3]}`
      break
  }
  return formatted
}

export const formatURL = (url: string): string => {
  // Determine if the URL contains /wp-content/
  const filePath = 'wp-content/uploads'
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const httpLink = `http://${baseURL}`
  const httpsLink = `https://${baseURL}`
  let formattedURL = url
  if (url.match(filePath)) return url
  if (url.match(httpLink)) formattedURL = url.replace(httpLink, '')
  if (url.match(httpsLink)) formattedURL = url.replace(httpsLink, '')
  return formattedURL
}

export function getImageData(imageData: WordPressImage | FeaturedMedia | null) {
  let imgAlt = ''
  let imgSrc = ''
  let imgHeight = 0
  let imgWidth = 0

  if (imageData) {
    if (typeof imageData.title === 'string') {
      imgAlt = imageData.title
    } else if (typeof imageData.title === 'object') {
      imgAlt = imageData.title.rendered
    }
    if (!imgAlt) {
      if ('alt' in imageData) {
        imgAlt = imageData.alt
      } else if ('alt_text' in imageData) {
        imgAlt = imageData.alt_text
      }
    }
    if ('media_details' in imageData) {
      const mediaDetailsHierarchy = 'full' || 'medium'
      imgSrc =
        imageData.media_details.sizes[mediaDetailsHierarchy]?.source_url || ''
      imgHeight =
        imageData.media_details.sizes[mediaDetailsHierarchy]?.height ||
        imageData.media_details.height
      imgWidth =
        imageData.media_details.sizes[mediaDetailsHierarchy]?.width ||
        imageData.media_details.width
    } else if ('sizes' in imageData) {
      const sizesHierarchy = 'large' || 'medium_large'
      const heightHierarchy = 'large-height' || 'medium_large-height'
      const widthHierarchy = 'large-width' || 'medium_large-width'
      imgSrc = imageData.sizes[sizesHierarchy] || ''
      imgHeight = imageData.sizes[heightHierarchy] || 0
      imgWidth = imageData.sizes[widthHierarchy] || 0
    }
    if (!imgSrc) imgSrc = imageData.source_url
  }

  return {
    imgAlt,
    imgSrc,
    imgHeight,
    imgWidth
  }
}
