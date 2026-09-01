import { useLocation, Link } from 'react-router-dom'
import { Compass, ArrowRight, Phone, Mail, Stethoscope } from 'lucide-react'
import EnquiryForm from '../../components/common/EnquiryForm'
import { MEDICAL_TREATMENTS, MEDICAL_GUIDE, DEFAULT_PAGE } from '../../data/pageData'

const SECTION_MAP = {
  'treatments':  MEDICAL_TREATMENTS,
  'guide':       MEDICAL_GUIDE,
  'hospitals':   { 'default': { title: 'Top Hospitals', emoji: '🏥', desc: 'India\'s best hospitals for medical tourism', highlights: ['JCI Accredited', 'NABH Certified', 'Multi-specialty', 'Research Hospitals'] } },
  'doctors':     { 'default': { title: 'Find a Doctor', emoji: '👨‍⚕️', desc: 'Expert doctors and specialists', highlights: ['Cardiologists', 'Orthopedic Surgeons', 'Oncologists', 'Neurologists'] } },
  'support':     { 'default': { title: 'Support Services', emoji: '🤝', desc: 'Complete support for medical tourists', highlights: ['Visa Help', 'Travel Booking', 'Accommodation', 'Post-Treatment'] } },
  'cities':      { 'default': { title: 'Medical Tourism Cities', emoji: '🏙️', desc: 'Top cities for medical treatment in India', highlights: ['Delhi NCR', 'Mumbai', 'Chennai', 'Bangalore'] } },
  'india':       { 'default': { title: 'Medical Tourism in India', emoji: '🇮🇳', desc: 'World-class medical treatment at affordable prices', highlights: ['Expert Doctors', 'Advanced Technology', 'Affordable Cost', 'No Waiting'] } },
  'compare':     { 'default': { title: 'Compare Destinations', emoji: '📊', desc: 'Compare medical tourism destinations', highlights: ['Cost Comparison', 'Quality Ratings', 'Specialties', 'Reviews'] } },
}

const HERO_BG = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400'

export default function MedicalSubPage() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const section = pathParts[1] || 'treatments'
  const subSlug = pathParts[2] || 'default'

  const dataMap = SECTION_MAP[section] || MEDICAL_TREATMENTS
  const pageData = dataMap[subSlug] || dataMap['default'] || DEFAULT_PAGE

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={HERO_BG} alt={pageData.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 to-emerald-900/90" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 text-sm">
            <Link to="/medical-tourism" className="text-white/70 hover:text-white">Medical Tourism</Link>
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
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.highlights?.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center group">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Stethoscope size={28} className="text-emerald-600" /></div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{item}</h3>
                <p className="text-navy-500 text-sm">Quality {item.toLowerCase()} services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {subSlug === 'default' && dataMap && (
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Browse {section.charAt(0).toUpperCase() + section.slice(1)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(dataMap).filter(([k]) => k !== 'default').map(([slug, data]) => (
                <Link key={slug} to={`/medical-tourism/${section}/${slug}`} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all group border border-gray-100 hover:border-emerald-200">
                  <span className="text-4xl block mb-3">{data.emoji}</span>
                  <h3 className="font-bold text-navy-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors">{data.title}</h3>
                  <p className="text-navy-500 text-sm mb-4">{data.desc}</p>
                  <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1">Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
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
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-6">Free Medical Consultation</h2>
              <p className="text-navy-500 mb-8">Get expert medical advice and treatment planning for {pageData.title.toLowerCase()}.</p>
              <div className="space-y-5">
                <div className="flex items-center gap-4"><div className="bg-emerald-100 p-3 rounded-xl"><Phone size={20} className="text-emerald-600" /></div><div><p className="text-sm text-navy-500">Call Us</p><p className="font-semibold text-navy-900">+91 98765 43210</p></div></div>
                <div className="flex items-center gap-4"><div className="bg-emerald-100 p-3 rounded-xl"><Mail size={20} className="text-emerald-600" /></div><div><p className="text-sm text-navy-500">Email Us</p><p className="font-semibold text-navy-900">medical@travelvista.com</p></div></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Get Free Quote</h3>
              <EnquiryForm destination={pageData.title} theme="emerald" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
