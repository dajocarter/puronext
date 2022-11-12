import { queryBySlug, wpClient } from '.'
import { ModelPostType, ProductPostType, SeriesPostType } from './types'

async function getHeroImage(slug: string) {
  const heroImgSlug =
    slug === 'home'
      ? 'puroflux_home_hero_pf_4060'
      : slug.startsWith('pfi')
      ? 'pfi-logo'
      : 'puroflux_home_hero_sample'
  return await wpClient.media().find(queryBySlug(heroImgSlug))
}

export async function getUnknownPageData(slug: string) {
  const [heroImg] = await getHeroImage(slug)

  const [page] = await wpClient.page().find(queryBySlug(slug))
  if (!page) {
    const products = await wpClient.product().find()
    const product = products.find((p) => p && p.slug === slug)

    if (!product) {
      const series = await wpClient.series().find()
      const seriesPage = series.find((p) => p && p.slug === slug)
      let seriesProduct = {} as ProductPostType
      let relatedSeries: SeriesPostType[] = []
      // we need more info about the models than what the ACF data provides so we have to fetch :(
      let models: ModelPostType[] = []
      if (seriesPage) {
        const product = products.find(
          (p) => p && p.slug === seriesPage.acf.product_series?.[0].post_name
        )
        if (product) {
          seriesProduct = product
          const productSeries = product.acf.product_series
          if (productSeries) {
            productSeries.forEach((node) => {
              if (node.post_name !== seriesPage.slug) {
                const related = series.find(
                  (p) => p && p.slug === node.post_name
                )
                if (related) {
                  relatedSeries.push(related)
                }
              }
            })
          }
        }

        const seriesModels = seriesPage.acf.series_models
        if (seriesModels) {
          const modelsData = await Promise.all(
            seriesModels.map((node) => wpClient.model().find(node.ID))
          )
          modelsData.forEach((node) => {
            const data = node[0]
            if (data) models.push(data)
          })
        }
      }

      return {
        heroImg,
        page: seriesPage,
        models,
        products,
        series,
        seriesProduct,
        relatedSeries
      }
    }

    // we need more info about the series than what the ACF data provides so we have to fetch :(
    let series: SeriesPostType[] = []
    if (product) {
      const productSeries = product.acf.product_series
      if (productSeries) {
        const seriesData = await Promise.all(
          productSeries.map((node) => wpClient.series().find(node.ID))
        )
        seriesData.forEach((node) => {
          const data = node[0]
          if (data) series.push(data)
        })
      }
    }

    return {
      heroImg,
      page: product,
      products,
      series
    }
  } else {
    if (page.template === 'page_products.php') {
      const [addlItem] = await wpClient
        .page()
        .find(queryBySlug('installations'))
      const products = await wpClient.product().find()

      return {
        heroImg,
        page,
        addlItem,
        products
      }
    }

    if (page.template === 'page_store-locator.php') {
      const reps = await wpClient.rep().find()
      const states = await wpClient.state().find()

      return {
        heroImg,
        page,
        reps,
        states
      }
    }

    if (page.template === 'page_typical-installations.php') {
      const series = await wpClient.series().find()

      const filterSeries: SeriesPostType[] = []
      const separatorSeries: SeriesPostType[] = []

      series.forEach((elt) => {
        if (!elt) return
        if (
          elt.acf.product_series?.find(
            (p) => p.post_title === 'Permanent Media Filters'
          )
        ) {
          filterSeries.push(elt)
        } else if (
          elt.acf.product_series?.find((p) => p.post_title === 'Separators')
        ) {
          separatorSeries.push(elt)
        }
      })

      return {
        heroImg,
        page,
        filterSeries,
        separatorSeries
      }
    }

    return {
      heroImg,
      page
    }
  }
}

export async function getProductsTemplateData(slug: string) {
  const [heroImg] = await getHeroImage(slug)

  const [page] = await wpClient.page().find(queryBySlug(slug))
  const [addlItem] = await wpClient.page().find(queryBySlug('installations'))
  const products = await wpClient.product().find()

  return {
    heroImg,
    page,
    addlItem,
    products
  }
}

export async function getStoreLocatorTemplateData(slug: string) {
  const [heroImg] = await getHeroImage(slug)

  const [page] = await wpClient.page().find(queryBySlug(slug))

  const reps = await wpClient.rep().find()
  const states = await wpClient.state().find()

  return {
    heroImg,
    page,
    reps,
    states
  }
}

export async function getTypicalInstallationsTemplateData(slug: string) {
  const [heroImg] = await getHeroImage(slug)

  const [page] = await wpClient.page().find(queryBySlug(slug))

  const series = await wpClient.series().find()

  const filterSeries: SeriesPostType[] = []
  const separatorSeries: SeriesPostType[] = []

  series.forEach((elt) => {
    if (!elt) return
    if (
      elt.acf.product_series?.find(
        (p) => p.post_title === 'Permanent Media Filters'
      )
    ) {
      filterSeries.push(elt)
    } else if (
      elt.acf.product_series?.find((p) => p.post_title === 'Separators')
    ) {
      separatorSeries.push(elt)
    }
  })

  return {
    heroImg,
    page,
    filterSeries,
    separatorSeries
  }
}

export async function getPageTemplateData(slug: string) {
  const [heroImg] = await getHeroImage(slug)

  const [page] = await wpClient.page().find(queryBySlug(slug))

  return {
    heroImg,
    page
  }
}

export async function getProductTemplateData(slug: string) {
  const [heroImg] = await getHeroImage(slug)

  const products = await wpClient.product().find(queryBySlug(slug))
  const product = products.find((p) => p && p.slug === slug)

  // we need more info about the series than what the ACF data provides so we have to fetch :(
  let series: SeriesPostType[] = []
  if (product) {
    const productSeries = product.acf.product_series
    if (productSeries) {
      const seriesData = await Promise.all(
        productSeries.map((node) => wpClient.series().find(node.ID))
      )
      seriesData.forEach((node) => {
        const data = node[0]
        if (data) series.push(data)
      })
    }
  }

  return {
    heroImg,
    page: product,
    products,
    series
  }
}

export async function getSeriesTemplateData(slug: string) {
  const [heroImg] = await getHeroImage(slug)

  const products = await wpClient.product().find()
  const series = await wpClient.series().find()
  const seriesPage = series.find((p) => p && p.slug === slug)
  let seriesProduct = {} as ProductPostType
  let relatedSeries: SeriesPostType[] = []
  // we need more info about the models than what the ACF data provides so we have to fetch :(
  let models: ModelPostType[] = []
  if (seriesPage) {
    const product = products.find(
      (p) => p && p.slug === seriesPage.acf.product_series?.[0].post_name
    )
    if (product) {
      seriesProduct = product
      const productSeries = product.acf.product_series
      if (productSeries) {
        productSeries.forEach((node) => {
          if (node.post_name !== seriesPage.slug) {
            const related = series.find((p) => p && p.slug === node.post_name)
            if (related) {
              relatedSeries.push(related)
            }
          }
        })
      }
    }

    const seriesModels = seriesPage.acf.series_models
    if (seriesModels) {
      const modelsData = await Promise.all(
        seriesModels.map((node) => wpClient.model().find(node.ID))
      )
      modelsData.forEach((node) => {
        const data = node[0]
        if (data) models.push(data)
      })
    }
  }

  return {
    heroImg,
    page: seriesPage,
    models,
    products,
    series,
    seriesProduct,
    relatedSeries
  }
}
