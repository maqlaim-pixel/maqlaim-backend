import { useParams, useLocation, Link } from 'react-router-dom'
import { MapPin, Compass, ArrowRight, Star, Phone, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import EnquiryForm from '../../components/common/EnquiryForm'
import api from '../../services/api'
import {
  INDIA_DESTINATIONS, INDIA_PLACES, INDIA_THINGS_TO_DO,
  INDIA_NATIONAL_PARKS, INDIA_EXPERIENCES, DEFAULT_PAGE
} from '../../data/pageData'

const SECTION_MAP = {
  'destinations':    INDIA_DESTINATIONS,
  'places':          INDIA_PLACES,
  'things-to-do':    INDIA_THINGS_TO_DO,
  'national-parks':  INDIA_NATIONAL_PARKS,
  'experiences':     INDIA_EXPERIENCES,
}

const HERO_IMAGES = {
  'destinations': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400',
  'places':       'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1400',
  'things-to-do': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400',
  'national-parks': 'https://images.unsplash.com/photo-1535338454528-1b5e4b3d53e3?w=1400',
  'experiences':   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400',
}

export default function IndiaSubPage() {
  const { destSlug, placeSlug, actSlug } = useParams()
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const section = pathParts[1] || 'destinations'
  const subSlug = pathParts[2] || 'default'

  const dataMap = SECTION_MAP[section] || INDIA_DESTINATIONS
  const pageData = dataMap[subSlug] || dataMap['default'] || DEFAULT_PAGE
  const heroImage = HERO_IMAGES[section] || HERO_IMAGES['destinations']

  const [enquiryDest, setEnquiryDest] = useState('')

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt={pageData.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 to-navy-900/90" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/india" className="text-white/70 hover:text-white transition-colors">India</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/70 capitalize">{section.replace(/-/g, ' ')}</span>
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
      {pageData.highlights && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">
              {subSlug === 'default' ? `Explore ${pageData.title}` : `Top ${pageData.title}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageData.highlights.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center group">
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors">
                    <MapPin size={28} className="text-sky-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{item}</h3>
                  <p className="text-navy-500 text-sm">Explore this amazing {item.toLowerCase()} experience</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sub-category cards if on default view */}
      {subSlug === 'default' && (
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(dataMap).filter(([k]) => k !== 'default').map(([slug, data]) => (
                <Link key={slug} to={`/india/${section}/${slug}`}
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

      {/* Popular Packages */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Popular Packages</h2>
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <Compass size={48} className="text-sky-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-900 mb-2">Packages Coming Soon</h3>
            <p className="text-navy-500 mb-4">We are curating the best packages for {pageData.title}. Check back soon!</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Contact Us for Custom Package <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
                <img src={`https://images.unsplash.com/photo-15${24492412937 + i * 111}-b28074a5d7da?w=400&h=300&fit=crop`}
                  alt={`${pageData.title} gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white" id="contact">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-6">Plan Your India Trip</h2>
              <p className="text-navy-500 mb-8">Ready to explore {pageData.title.toLowerCase()}? Contact our travel experts for the best deals.</p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="bg-sky-100 p-3 rounded-xl"><Phone size={20} className="text-sky-600" /></div>
                  <div><p className="text-sm text-navy-500">Call Us</p><p className="font-semibold text-navy-900">+91 98765 43210</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-sky-100 p-3 rounded-xl"><Mail size={20} className="text-sky-600" /></div>
                  <div><p className="text-sm text-navy-500">Email Us</p><p className="font-semibold text-navy-900">hello@travelvista.com</p></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Send Us an Enquiry</h3>
              <EnquiryForm destination={pageData.title} theme="sky" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
