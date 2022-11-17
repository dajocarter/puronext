interface MenuItem {
  id: number
  order: number
  parent: number
  title: string
  url: string
  attr: string
  target: string
  classes: string
  xfn: string
  description: string
  object_id: number
  object: 'page' | 'post' | 'product' | 'series'
  object_slug: string
  type: 'post_type'
  type_label: 'Page' | 'Post' | 'Product' | 'Series'
  children?: MenuItem[]
}

export interface WordPressMenu {
  ID: number
  name: string
  slug: string
  description: string
  count: number
  items: MenuItem[]
  meta: {
    links: {
      collection: string
      self: string
    }
  }
}

interface ImageSizes {
  thumbnail?: string
  'thumbnail-height'?: number
  'thumbnail-width'?: number
  medium?: string
  'medium-height'?: number
  'medium-width'?: number
  medium_large?: string
  'medium_large-height'?: number
  'medium_large-width'?: number
  large?: string
  'large-height'?: number
  'large-width'?: number
  '1536x1536'?: string
  '1536x1536-height'?: number
  '1536x1536-width'?: number
  '2048x2048'?: string
  '2048x2048-height'?: number
  '2048x2048-width'?: number
}

export interface WordPressImage {
  ID: number
  id: number
  alt: string
  title: string
  caption: string
  sizes: ImageSizes
  source_url: string
}

export interface WordPressPage {
  id: number
  date: Date
  date_gmt: Date
  guid: {
    rendered: string
  }
  modified: Date
  modified_gmt: Date
  slug: string
  status: 'publish'
  type: string
  link: string
  template:
    | 'page_contact.php'
    | 'page_form.php'
    | 'page_gallery.php'
    | 'page_library.php'
    | 'page_products.php'
    | 'page_store-locator.php'
    | 'page_typical-installations.php'
    | 'page_videos.php'
    | ''
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  acf: HeroContentProps
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  _embedded: EmbeddedFeaturedMedia
}

interface LinkedPost {
  ID: number
  post_content: string
  post_title: string
  post_name: string
}

export interface FeaturedMedia {
  alt_text: string
  media_details: {
    height: number
    width: number
    sizes: {
      medium?: {
        source_url: string
        height: number
        width: number
      }
      full?: {
        source_url: string
        height: number
        width: number
      }
    }
  }
  source_url: string
  title: {
    rendered: string
  }
}

export interface EmbeddedFeaturedMedia {
  'wp:featuredmedia': FeaturedMedia[]
}

export interface ProductPostType extends WordPressPage {
  template: ''
  type: 'product'
  acf: {
    title: string | null
    image: WordPressImage | null
    product_series: LinkedPost[] | null
    description: string | null
    excerpt: string | null
    files?: { file: WordPressFile }[]
    datasheet?: WordPressFile | null
    'operation_&_maint_manual'?: WordPressFile | null
    sample_spec_sheet?: WordPressFile | null
  }
}

export interface RepPostType extends WordPressPage {
  template: ''
  type: 'rep'
  states: number[]
  state?: string
  acf: {
    territory: string
    location?: {
      address: string
      lat: string
      lng: string
    }
    address: string
    phone_number: string
    fax_number: string
    website: string
  }
}

export interface WordPressFile {
  ID: number
  id: number
  title: string
  filename: string
  url: string
  name: string
}

export interface SeriesPostType extends WordPressPage {
  template: ''
  type: 'series'
  acf: {
    model_notes: string | null
    series_models: LinkedPost[] | null
    product_series: LinkedPost[] | null
    description: string | null
    datasheet: WordPressFile | null
    'operation_&_maint_manual': WordPressFile | null
    sample_spec_sheet: WordPressFile | null
    optional_file: WordPressFile | null
    slip_stream_files: { file: WordPressFile }[] | null
    sweeper_piping_files: { file: WordPressFile }[] | null
    full_flow_files: { file: WordPressFile }[] | null
    side_stream_files: { file: WordPressFile }[] | null
  }
}

export interface StatePostType {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: 'state'
}

export interface ModelPostType extends WordPressPage {
  type: 'model'
  template: ''
  acf: {
    model_stats: {
      title: string
      value: string
    }[]
    model_series: LinkedPost[]
    file_names: null | string
    model_files: null | { title: string; file: WordPressFile }[]
  }
}

export type PageTypes = 'page' | 'product' | 'series'
export type PageTemplates = 'page_form.php' | 'page_products.php' | 'page_library.php' | 'page_gallery.php' | 'page_videos.php' | 'page_typical-installations.php' | 'page_contact.php' | 'page_store-locator.php'
export type PageSlugsByTemplate = {
  [K in PageTypes | PageTemplates]: string[]
}