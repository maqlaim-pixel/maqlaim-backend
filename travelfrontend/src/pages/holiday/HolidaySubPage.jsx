import { useParams, useLocation, Link } from 'react-router-dom'
import { MapPin, Compass, ArrowRight, Heart, Phone, Mail } from 'lucide-react'
import EnquiryForm from '../../components/common/EnquiryForm'
import {
  HOLIDAY_ADVENTURE, HOLIDAY_BEACH, HOLIDAY_SPIRITUAL, HOLIDAY_DEFAULTS, DEFAULT_PAGE
} from '../../data/pageData'

const SECTION_MAP = {
  'adventure': HOLIDAY_ADVENTURE,
  'beach':     HOLIDAY_BEACH,
  'spiritual': HOLIDAY_SPIRITUAL,
}

const THEME_MAP = {
  'adventure': 'orange',
  'beach':     'teal',
  'spiritual': 'indigo',
  'luxury':    'amber',
  'budget':    'teal',
  'weekend':   'sky',
  'group':     'indigo',
  'solo':      'emerald',
  'festival':  'rose',
}

const HERO_BG = {
  'adventure': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400',
  'beach':     'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400',
  'spiritual': 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1400',
}

export default function HolidaySubPage() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const category = pathParts[1] || 'adventure'
  const subSlug = pathParts[2] || 'default'

  const dataMap = SECTION_MAP[category]
  const defaultPages = HOLIDAY_DEFAULTS[category]

  let pageData
  if (dataMap) {
    pageData = dataMap[subSlug] || dataMap['default'] || DEFAULT_PAGE
  } else if (defaultPages) {
    pageData = defaultPages
  } else {
    pageData = DEFAULT_PAGE
  }

  const theme = THEME_MAP[category] || 'sky'
  const heroImage = HERO_BG[category] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400'

  const themeColors = {
    sky: 'bg-sky-100 text-sky-600', pink: 'bg-pink-100 text-pink-600', rose: 'bg-rose-100 text-rose-600',
    teal: 'bg-teal-100 text-teal-600', amber: 'bg-amber-100 text-amber-600', orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600', emerald: 'bg-emerald-100 text-emerald-600',
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt={pageData.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 to-navy-900/85" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 text-sm">
            <Link to="/holidays" className="text-white/70 hover:text-white">Holidays</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/70 capitalize">{category}</span>
            {subSlug !== 'default' && (
              <>
                <span className="text-white/50">/</span>
                <span>{pageData.title}</span>
              </>
            )}
          </div>
          <span className="text-6xl mb-4 block">{pageData.emoji}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{pageData.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{pageData.desc}</p>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Why Choose {pageData.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.highlights?.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center group">
                <div className={`w-16 h-16 ${themeColors[theme] || 'bg-sky-100 text-sky-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Heart size={28} />
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{item}</h3>
                <p className="text-navy-500 text-sm">Experience the best of {item.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-categories if on default view */}
      {dataMap && subSlug === 'default' && (
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Explore {category.charAt(0).toUpperCase() + category.slice(1)} Holidays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(dataMap).filter(([k]) => k !== 'default').map(([slug, data]) => (
                <Link key={slug} to={`/holidays/${category}/${slug}`}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all group border border-gray-100 hover:border-sky-200">
                  <span className="text-4xl block mb-3">{data.emoji}</span>
                  <h3 className="font-bold text-navy-900 text-lg mb-2 group-hover:text-sky-600 transition-colors">{data.title}</h3>
                  <p className="text-navy-500 text-sm mb-4">{data.desc}</p>
                  <span className="text-sky-600 font-semibold text-sm flex items-center gap-1">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Popular Packages</h2>
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <Compass size={48} className="text-sky-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-900 mb-2">Packages Coming Soon</h3>
            <p className="text-navy-500 mb-4">We are curating the best {pageData.title.toLowerCase()} packages. Check back soon!</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Contact Us for Custom Package <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-white" id="contact">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-6">Plan Your {pageData.title}</h2>
              <p className="text-navy-500 mb-8">Ready to book? Contact our travel experts for the best {pageData.title.toLowerCase()} deals.</p>
              <div className="space-y-5">
                <div className="flex items-center gap-4"><div className="bg-sky-100 p-3 rounded-xl"><Phone size={20} className="text-sky-600" /></div><div><p className="text-sm text-navy-500">Call Us</p><p className="font-semibold text-navy-900">+91 98765 43210</p></div></div>
                <div className="flex items-center gap-4"><div className="bg-sky-100 p-3 rounded-xl"><Mail size={20} className="text-sky-600" /></div><div><p className="text-sm text-navy-500">Email Us</p><p className="font-semibold text-navy-900">hello@travelvista.com</p></div></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Send Us an Enquiry</h3>
              <EnquiryForm destination={pageData.title} theme={theme} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
