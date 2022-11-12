import Head from 'next/head'
import Script from 'next/script'

export default function PageSEO({
  slug,
  title
}: {
  slug: string
  title: string
}) {
  const description =
    'Industrial & Commercial Water Filtration and Control Systems'
  const pageTitle = `${title} | Puroflux Corporation`
  const baseURL = 'https://puronext.vercel.app'
  const url = `${baseURL}/${slug}`

  const image = `${baseURL}/public/purofluxlogo_white_2x.png`
  const favicon = '/puroflux-logo-white.png'

  const schema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      description,
      image: {
        '@type': 'ImageObject',
        url: image
      }
    }
  ]

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <meta name='image' content={image} />
        <link rel='shortcut icon' href={favicon} />

        {/* OpenGraph tags */}
        <meta property='og:url' content={url} />
        <meta property='og:title' content={pageTitle} />
        <meta
          property='og:description'
          content='Industrial & Commercial Water Filtration and Control Systems'
        />
        <meta property='og:image' content={image} />

        {/* Twitter Card tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={pageTitle} />
        <meta
          name='twitter:description'
          content='Industrial & Commercial Water Filtration and Control Systems'
        />
        <meta name='twitter:image' content={image} />

        {/* Schema.org tags */}
        <script type='application/ld+json'>{JSON.stringify(schema)}</script>
      </Head>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-GMSESPXRVJ'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GMSESPXRVJ');
        `}
      </Script>
    </>
  )
}
