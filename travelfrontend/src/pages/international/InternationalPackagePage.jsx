import { useLocation, Link } from 'react-router-dom'
import { Compass, ArrowRight, Phone, Mail, Globe } from 'lucide-react'
import EnquiryForm from '../../components/common/EnquiryForm'
import { INTERNATIONAL_PACKAGES, DEFAULT_PAGE } from '../../data/pageData'

const HERO_BG = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400'

export default function InternationalPackagePage() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const countrySlug = pathParts[1] || 'default'
  const pageData = INTERNATIONAL_PACKAGES[countrySlug] || DEFAULT_PAGE

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={HERO_BG} alt={pageData.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 to-indigo-900/90" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 text-sm">
            <Link to="/international" className="text-white/70 hover:text-white">International</Link>
            <span className="text-white/50">/</span>
            <span>{pageData.title}</span>
          </div>
          <span className="text-6xl mb-4 block">{pageData.emoji}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{pageData.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{pageData.desc}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Why {pageData.title.replace(' Packages', '')}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.highlights?.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center group">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe size={28} className="text-indigo-600" /></div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{item}</h3>
                <p className="text-navy-500 text-sm">Experience the best of {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Featured Packages</h2>
          <div className="bg-white rounded-2xl p-12 text-center">
            <Compass size={48} className="text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-900 mb-2">Packages Coming Soon</h3>
            <p className="text-navy-500 mb-4">We are curating the best {pageData.title.toLowerCase()}. Check back soon!</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Contact Us for Custom Package <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white" id="contact">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-6">Plan Your {pageData.title.replace(' Packages', '')} Trip</h2>
              <p className="text-navy-500 mb-8">Contact our international travel experts for the best deals and customized packages.</p>
              <div className="space-y-5">
                <div className="flex items-center gap-4"><div className="bg-indigo-100 p-3 rounded-xl"><Phone size={20} className="text-indigo-600" /></div><div><p className="text-sm text-navy-500">Call Us</p><p className="font-semibold text-navy-900">+91 98765 43210</p></div></div>
                <div className="flex items-center gap-4"><div className="bg-indigo-100 p-3 rounded-xl"><Mail size={20} className="text-indigo-600" /></div><div><p className="text-sm text-navy-500">Email Us</p><p className="font-semibold text-navy-900">international@travelvista.com</p></div></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Enquire Now</h3>
              <EnquiryForm destination={pageData.title.replace(' Packages', '')} theme="indigo" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
