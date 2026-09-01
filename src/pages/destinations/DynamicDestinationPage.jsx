import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import SeoHead from '../../components/seo/SeoHead'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import { MapPin, Star, Clock, ChevronRight, Calendar, Users, Phone, Mail, MessageCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

/**
 * Fully Dynamic Destination Page — all content from CMS/admin.
 * Renders: Hero → Why Travel → Destinations → Packages → Gallery → FAQ → Enquiry
 */
export default function DynamicDestinationPage() {
  const { slug } = useParams()
  const [destination, setDestination] = useState(null)
  const [packages, setPackages] = useState([])
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [enquiry, setEnquiry] = useState({ name: '', email: '', phone: '', message: '' })
  const [enquirySent, setEnquirySent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setError('')
    // Fetch destination by slug
    api.get(`/destinations/slug/${slug}`)
      .then(res => {
        setDestination(res.data)
        // Fetch associated data
        if (res.data.id) {
          fetchPackages(res.data.id)
          fetchSections(res.data.id)
        }
      })
      .catch(() => setError('Destination not found'))
      .finally(() => setLoading(false))
  }, [slug])

  const fetchPackages = async (destId) => {
    try {
      const res = await api.get('/packages')
      const all = res.data || []
      const filtered = all.filter(p =>
        p.destination?.toLowerCase() === destination?.name?.toLowerCase() ||
        p.state?.toLowerCase() === destination?.name?.toLowerCase() ||
        p.tags?.toLowerCase().includes(destination?.name?.toLowerCase())
      )
      setPackages(filtered)
    } catch { setPackages([]) }
  }

  const fetchSections = async (destId) => {
    try {
      const res = await api.get(`/destinations/${destId}/sections`)
      setSections(res.data || [])
    } catch { setSections([]) }
  }

  // Auto-advance hero slider
  useEffect(() => {
    if (!destination?.heroImages) return
    const images = parseImages(destination.heroImages)
    if (images.length <= 1) return
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [destination])

  const parseImages = (imgStr) => {
    if (!imgStr) return []
    try {
      const parsed = JSON.parse(imgStr)
      return Array.isArray(parsed) ? parsed : [imgStr]
    } catch {
      return imgStr.split(',').map(s => s.trim()).filter(Boolean)
    }
  }

  const parseJson = (str) => {
    if (!str) return []
    try { return JSON.parse(str) } catch { return [] }
  }

  const handleEnquiry = async (e) => {
    e.preventDefault()
    try {
      await api.post('/leads/public/submit', {
        ...enquiry,
        source: 'destination_page',
        destination: destination?.name
      })
      setEnquirySent(true)
    } catch { alert('Failed to send enquiry') }
  }

  const fmt = (v) => v ? '₹' + Number(v).toLocaleString('en-IN') : ''

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <Loader2 className="animate-spin text-sky-600" size={40} />
    </div>
  )

  if (error || !destination) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto text-red-400 mb-3" size={48} />
      <p className="text-red-600 font-medium text-lg">{error || 'Destination not found'}</p>
      <Link to="/" className="mt-4 inline-block text-sky-600 hover:underline">← Go Home</Link>
    </div>
  )

  const heroImages = parseImages(destination.heroImages)
  const attractions = parseJson(destination.attractions)
  const highlights = parseJson(destination.destinationHighlights)
  const quickInfo = parseJson(destination.quickInfo)
  const faqs = destination.faqs || []

  // Build breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: destination.type === 'international' ? 'International' : 'India', url: destination.type === 'international' ? '/international' : '/india' },
    { name: destination.name, url: `/${destination.slug}` }
  ]

  return (
    <>
      <SeoHead destination={destination} page={{ breadcrumbs }} />

      {/* ════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {heroImages.length > 0 ? (
          <>
            {heroImages.map((img, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={img} alt={destination.heroTitle || destination.name} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            {/* Slider dots */}
            {heroImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            )}
          </>
        ) : destination.image ? (
          <>
            <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-600 to-navy-800" />
        )}
        <div className="absolute bottom-0 container-wide py-10 z-10">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
            {destination.h1Text || destination.heroTitle || `${destination.name} Tour Packages & Travel Guide`}
          </h1>
          {destination.heroSubtitle && (
            <p className="text-white/80 text-lg max-w-2xl">{destination.heroSubtitle}</p>
          )}
          {destination.tagline && !destination.heroSubtitle && (
            <p className="text-white/80 text-lg max-w-2xl">{destination.tagline}</p>
          )}
        </div>
      </section>

      <div className="section-padding">
        <div className="container-wide">

          {/* ════════════════════════════════════════════════════════════ */}
          {/* WHY TRAVEL SECTION */}
          {/* ════════════════════════════════════════════════════════════ */}
          {(destination.aboutTitle || destination.aboutContent || highlights.length > 0) && (
            <section className="mb-16">
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">
                {destination.aboutTitle || `Why Travel ${destination.name}?`}
              </h2>
              {destination.aboutContent && (
                <p className="text-navy-600 leading-relaxed mb-6 max-w-3xl">{destination.aboutContent}</p>
              )}
              {highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {highlights.map((h, i) => (
                    <div key={i} className="bg-sky-50 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                      <span className="text-3xl mb-2 block">{h.icon || '✨'}</span>
                      <h3 className="font-semibold text-navy-900 mb-1">{h.title}</h3>
                      {h.description && <p className="text-sm text-navy-500">{h.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════ */}
          {/* QUICK INFO */}
          {/* ════════════════════════════════════════════════════════════ */}
          {quickInfo.length > 0 && (
            <section className="mb-16 bg-gray-50 rounded-2xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickInfo.map((info, i) => (
                  <div key={i} className="text-center">
                    <span className="text-2xl mb-1 block">{info.icon || '📍'}</span>
                    <p className="text-xs text-navy-400 uppercase">{info.label}</p>
                    <p className="font-semibold text-navy-900">{info.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════ */}
          {/* POPULAR DESTINATIONS / ATTRACTIONS */}
          {/* ════════════════════════════════════════════════════════════ */}
          {attractions.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">
                Popular Destinations in {destination.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {attractions.map((attr, i) => (
                  <div key={i} className="bg-white rounded-xl border overflow-hidden group hover:shadow-lg transition-shadow">
                    {attr.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={attr.image} alt={attr.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-navy-900 group-hover:text-sky-600 transition-colors">{attr.title}</h3>
                      {attr.location && <p className="text-sm text-navy-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {attr.location}</p>}
                      {attr.description && <p className="text-sm text-navy-600 mt-2 line-clamp-2">{attr.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════ */}
          {/* PACKAGES SECTION */}
          {/* ════════════════════════════════════════════════════════════ */}
          {destination.showPackages !== false && (
            <section className="mb-16">
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">
                {destination.name} Tour Packages
              </h2>
              {destination.packagesComingSoon ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <Package size={48} className="mx-auto text-navy-300 mb-3" />
                  <p className="text-lg font-semibold text-navy-700">Packages Coming Soon</p>
                  <p className="text-navy-500 mt-1">{destination.packagesComingSoonText || `Exciting ${destination.name} packages are being prepared. Stay tuned!`}</p>
                  <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sky-600 font-medium hover:underline">
                    <Phone size={16} /> Contact Us for Custom Packages
                  </Link>
                </div>
              ) : packages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.slice(0, 6).map(pkg => (
                    <Link key={pkg.id} to={`/packages/${pkg.slug || pkg.id}`} className="bg-white rounded-xl border overflow-hidden group hover:shadow-lg transition-shadow">
                      {pkg.coverImage && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={pkg.coverImage} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-bold text-navy-900 group-hover:text-sky-600 transition-colors">{pkg.title}</h3>
                        {pkg.durationDays > 0 && (
                          <p className="text-sm text-navy-500 mt-1"><Clock size={12} className="inline" /> {pkg.durationDays}D/{pkg.durationNights}N</p>
                        )}
                        {pkg.startingPrice > 0 && (
                          <p className="text-lg font-bold text-sky-600 mt-2">{fmt(pkg.startingPrice)}<span className="text-xs text-navy-400 font-normal"> /person</span></p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-navy-500 text-center py-8">No packages available yet. Check back soon!</p>
              )}
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════ */}
          {/* FAQ SECTION */}
          {/* ════════════════════════════════════════════════════════════ */}
          {faqs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">
                Frequently Asked Questions about {destination.name}
              </h2>
              <div className="space-y-3 max-w-3xl">
                {faqs.map((faq, i) => (
                  <details key={i} className="bg-white rounded-xl border group">
                    <summary className="px-6 py-4 cursor-pointer font-semibold text-navy-900 hover:text-sky-600 transition-colors list-none flex items-center justify-between">
                      {faq.question}
                      <ChevronRight size={18} className="text-navy-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-4 text-navy-600 text-sm leading-relaxed">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════ */}
          {/* ENQUIRY FORM */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="mb-16 bg-gradient-to-r from-sky-600 to-sky-800 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-display font-bold mb-2">Plan Your {destination.name} Trip</h2>
            <p className="text-sky-100 mb-6">Get a free quote from our travel experts</p>
            {enquirySent ? (
              <div className="bg-white/10 rounded-xl p-8 text-center">
                <p className="text-xl font-semibold">✓ Thank you! We'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <input type="text" required placeholder="Your Name" value={enquiry.name} onChange={e => setEnquiry(p => ({ ...p, name: e.target.value }))}
                  className="px-4 py-3 rounded-xl text-navy-900 text-sm focus:ring-2 focus:ring-white focus:outline-none" />
                <input type="email" required placeholder="Email" value={enquiry.email} onChange={e => setEnquiry(p => ({ ...p, email: e.target.value }))}
                  className="px-4 py-3 rounded-xl text-navy-900 text-sm focus:ring-2 focus:ring-white focus:outline-none" />
                <input type="tel" placeholder="Phone" value={enquiry.phone} onChange={e => setEnquiry(p => ({ ...p, phone: e.target.value }))}
                  className="px-4 py-3 rounded-xl text-navy-900 text-sm focus:ring-2 focus:ring-white focus:outline-none" />
                <textarea placeholder="Your message..." rows={2} value={enquiry.message} onChange={e => setEnquiry(p => ({ ...p, message: e.target.value }))}
                  className="px-4 py-3 rounded-xl text-navy-900 text-sm focus:ring-2 focus:ring-white focus:outline-none resize-none" />
                <button type="submit" className="sm:col-span-2 bg-white text-sky-700 font-bold py-3 rounded-xl hover:bg-sky-50 transition-colors">
                  Send Enquiry
                </button>
              </form>
            )}
          </section>

        </div>
      </div>
    </>
  )
}
