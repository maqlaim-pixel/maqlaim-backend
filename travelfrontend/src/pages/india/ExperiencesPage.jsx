import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const experiences = [
  { slug: 'adventure', emoji: '🏔️', title: 'Adventure', desc: 'Trekking, rafting, paragliding and more', color: 'bg-orange-100 text-orange-600', link: '/india/experiences/adventure' },
  { slug: 'wildlife', emoji: '🐾', title: 'Wildlife', desc: 'Safari tours and wildlife encounters', color: 'bg-green-100 text-green-600', link: '/india/experiences/wildlife' },
  { slug: 'culture', emoji: '🎭', title: 'Culture & Heritage', desc: 'Folk arts, temples and heritage sites', color: 'bg-purple-100 text-purple-600', link: '/india/experiences/culture' },
  { slug: 'food', emoji: '🍛', title: 'Food & Cuisine', desc: 'Culinary journeys through India', color: 'bg-red-100 text-red-600', link: '/india/experiences/food' },
  { slug: 'spiritual', emoji: '🕉️', title: 'Spiritual', desc: 'Yoga, meditation and ashram stays', color: 'bg-indigo-100 text-indigo-600', link: '/india/experiences/spiritual' },
  { slug: 'luxury', emoji: '👑', title: 'Luxury', desc: 'Palace hotels and premium travel', color: 'bg-amber-100 text-amber-600', link: '/india/experiences/luxury' },
  { slug: 'family', emoji: '👨‍👩‍👧‍👦', title: 'Family Friendly', desc: 'Fun activities for the whole family', color: 'bg-pink-100 text-pink-600', link: '/india/experiences/family' },
]

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 to-indigo-900">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Experiences in India</h1>
          <p className="text-xl text-white/80">Discover incredible experiences across Incredible India</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map(exp => (
              <Link key={exp.slug} to={exp.link} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all group border border-gray-100 hover:border-indigo-200">
                <span className="text-5xl block mb-4">{exp.emoji}</span>
                <h3 className="font-bold text-navy-900 text-xl mb-2 group-hover:text-indigo-600 transition-colors">{exp.title}</h3>
                <p className="text-navy-500 mb-4">{exp.desc}</p>
                <span className="text-indigo-600 font-semibold flex items-center gap-1">Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
