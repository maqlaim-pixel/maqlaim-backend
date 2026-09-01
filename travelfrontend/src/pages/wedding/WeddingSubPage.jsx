import { useLocation, Link } from 'react-router-dom'
import { Compass, ArrowRight, Phone, Mail, Heart } from 'lucide-react'
import EnquiryForm from '../../components/common/EnquiryForm'
import {
  WEDDING_INDIA, WEDDING_VENUES, WEDDING_THEMES, DEFAULT_PAGE
} from '../../data/pageData'

const SECTION_MAP = {
  'india':         WEDDING_INDIA,
  'international': WEDDING_INDIA,
  'venues':        WEDDING_VENUES,
  'themes':        WEDDING_THEMES,
  'guides':        { 'default': { title: 'Wedding Guides', emoji: '📖', desc: 'Complete wedding planning guides and tips', highlights: ['Planning Tips', 'Budget Guide', 'Legal Info', 'Guest Management'] } },
}

const HERO_BG = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400'

export default function WeddingSubPage() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const section = pathParts[1] || 'india'
  const subSlug = pathParts[2] || 'default'

  const dataMap = SECTION_MAP[section] || WEDDING_INDIA
  const pageData = dataMap[subSlug] || dataMap['default'] || DEFAULT_PAGE

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={HERO_BG} alt={pageData.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/60 to-rose-900/85" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 text-sm">
            <Link to="/destination-weddings" className="text-white/70 hover:text-white">Weddings</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/70 capitalize">{section}</span>
            {subSlug !== 'default' && <><span className="text-white/50">/</span><span>{pageData.title}</span></>}
          </div>
          <span className="text-6xl mb-4 block">{pageData.emoji}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{pageData.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{pageData.desc}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.highlights?.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center group">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4"><Heart size={28} className="text-rose-600" /></div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{item}</h3>
                <p className="text-navy-500 text-sm">Beautiful {item.toLowerCase()} options</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {subSlug === 'default' && dataMap && (
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Explore {section.charAt(0).toUpperCase() + section.slice(1)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(dataMap).filter(([k]) => k !== 'default').slice(0, 12).map(([slug, data]) => (
                <Link key={slug} to={`/destination-weddings/${section}/${slug}`} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all group border border-gray-100 hover:border-rose-200">
                  <span className="text-4xl block mb-3">{data.emoji}</span>
                  <h3 className="font-bold text-navy-900 text-lg mb-2 group-hover:text-rose-600 transition-colors">{data.title}</h3>
                  <p className="text-navy-500 text-sm mb-4">{data.desc}</p>
                  <span className="text-rose-600 font-semibold text-sm flex items-center gap-1">Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white" id="contact">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-6">Plan Your Dream Wedding</h2>
              <p className="text-navy-500 mb-8">Let our wedding experts create your perfect celebration at {pageData.title.toLowerCase()}.</p>
              <div className="space-y-5">
                <div className="flex items-center gap-4"><div className="bg-rose-100 p-3 rounded-xl"><Phone size={20} className="text-rose-600" /></div><div><p className="text-sm text-navy-500">Call Us</p><p className="font-semibold text-navy-900">+91 98765 43210</p></div></div>
                <div className="flex items-center gap-4"><div className="bg-rose-100 p-3 rounded-xl"><Mail size={20} className="text-rose-600" /></div><div><p className="text-sm text-navy-500">Email Us</p><p className="font-semibold text-navy-900">weddings@travelvista.com</p></div></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Enquire for Wedding</h3>
              <EnquiryForm destination={pageData.title} theme="rose" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
