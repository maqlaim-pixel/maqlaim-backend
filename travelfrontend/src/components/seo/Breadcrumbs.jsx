import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

/**
 * SEO-friendly Breadcrumbs with structured data.
 * Usage: <Breadcrumbs items={[{name: 'Home', url: '/'}, {name: 'Gujarat', url: '/gujarat'}]} />
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null

  // Generate structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://travelvista.com${item.url}`
    }))
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <nav aria-label="Breadcrumb" className="text-sm text-navy-500 mb-4">
        <ol className="flex items-center gap-1 flex-wrap">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={12} className="text-navy-300" />}
                {isLast ? (
                  <span className="text-navy-700 font-medium">{item.name}</span>
                ) : (
                  <Link to={item.url} className="hover:text-sky-600 transition-colors">
                    {i === 0 ? <Home size={14} /> : item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
