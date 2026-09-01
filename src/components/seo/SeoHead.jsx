import { Helmet } from 'react-helmet-async'

/**
 * Dynamic SEO meta tags component.
 * Usage: <SeoHead destination={destination} />
 * 
 * If fields are empty, auto-generates fallback from content.
 */
export default function SeoHead({ destination, page = {} }) {
  const siteName = 'TravelVista'
  const baseUrl = 'https://travelvista.com'

  // Auto-generate SEO fields from content if not manually set
  const title = destination?.seoTitle
    || page.seoTitle
    || (destination?.name ? `${destination.name} Tour Packages & Travel Guide | ${siteName}` : `${page.title || 'TravelVista'} | ${siteName}`)

  const description = destination?.seoDescription
    || page.seoDescription
    || destination?.shortDescription
    || destination?.description?.substring(0, 155)
    || `Explore ${destination?.name || page.title || ''} tour packages, destinations and travel experiences with ${siteName}`

  const keywords = destination?.seoKeywords
    || page.seoKeywords
    || (destination?.name ? `${destination.name} tour packages, ${destination.name} travel, ${destination.name} tourism, visit ${destination.name}` : '')

  const slug = destination?.slug || page.slug || ''
  const canonical = destination?.canonicalUrl || `${baseUrl}/${slug}`
  const ogTitle = destination?.ogTitle || title
  const ogDescription = destination?.ogDescription || description
  const ogImage = destination?.ogImage || destination?.heroImages?.split(',')[0] || destination?.image || ''
  const twitterTitle = destination?.twitterTitle || ogTitle
  const twitterDescription = destination?.twitterDescription || ogDescription
  const twitterImage = destination?.twitterImage || ogImage
  const noIndex = destination?.noIndex || page.noIndex || false
  const noFollow = destination?.noFollow || page.noFollow || false
  const robots = `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`

  // BreadcrumbList structured data
  const breadcrumbItems = page.breadcrumbs || [
    { name: 'Home', url: '/' },
    { name: destination?.name || page.title || 'Page', url: `/${slug}` }
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  }

  // Destination structured data
  const destinationSchema = destination ? {
    '@context': 'https://schema.org',
    '@type': destination.schemaType || 'TouristDestination',
    name: destination.name,
    description: destination.shortDescription || description,
    url: canonical,
    image: ogImage,
    ...(destination.bestTime && { touristType: destination.bestTime }),
    ...(destination.state && { address: { '@type': 'PostalAddress', addressRegion: destination.state, addressCountry: 'IN' } }),
    ...(destination.highlights && { aggregateRating: undefined }),
  } : null

  // FAQ structured data
  const faqItems = destination?.faqs?.filter(f => f.isActive !== false) || page.faqs || []
  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  } : null

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}

      {/* Structured Data */}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {destinationSchema && (
        <script type="application/ld+json">{JSON.stringify(destinationSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  )
}
