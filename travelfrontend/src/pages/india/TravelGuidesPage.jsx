import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'

const guides = [
  { slug: 'travel-tips', emoji: '💡', title: 'Travel Tips', desc: 'Essential tips for traveling in India' },
  { slug: 'best-time', emoji: '📅', title: 'Best Time to Visit', desc: 'When to visit different destinations' },
  { slug: 'how-to-reach', emoji: '🚆', title: 'How to Reach', desc: 'Transportation guides for all destinations' },
  { slug: 'travel-cost', emoji: '💰', title: 'Travel Cost', desc: 'Budget breakdowns and cost estimates' },
  { slug: 'itineraries', emoji: '🗺️', title: 'Itineraries', desc: 'Curated travel itineraries for every duration' },
  { slug: 'visa', emoji: '📋', title: 'Visa Information', desc: 'Visa requirements and application guides' },
  { slug: 'packing', emoji: '🎒', title: 'Packing Guide', desc: 'What to pack for every destination' },
]

export default function TravelGuidesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 to-sky-900">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <BookOpen size={48} className="mx-auto mb-4 text-white/80" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Travel Guides</h1>
          <p className="text-xl text-white/80">Expert travel guides to help you plan the perfect trip</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map(g => (
              <div key={g.slug} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all group border border-gray-100 hover:border-sky-200">
                <span className="text-5xl block mb-4">{g.emoji}</span>
                <h3 className="font-bold text-navy-900 text-xl mb-2 group-hover:text-sky-600 transition-colors">{g.title}</h3>
                <p className="text-navy-500 mb-4">{g.desc}</p>
                <span className="text-sky-600 font-semibold flex items-center gap-1">Read Guide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
