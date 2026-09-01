import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import EnquiryForm from '../../components/common/EnquiryForm'

const cities = [
  { name: 'Ahmedabad', state: 'Gujarat', slug: 'ahmedabad' },
  { name: 'Surat', state: 'Gujarat', slug: 'surat' },
  { name: 'Vadodara', state: 'Gujarat', slug: 'vadodara' },
  { name: 'Rajkot', state: 'Gujarat', slug: 'rajkot' },
  { name: 'Jaipur', state: 'Rajasthan', slug: 'jaipur' },
  { name: 'Udaipur', state: 'Rajasthan', slug: 'udaipur' },
  { name: 'Jodhpur', state: 'Rajasthan', slug: 'jodhpur' },
  { name: 'Mumbai', state: 'Maharashtra', slug: 'mumbai' },
  { name: 'Pune', state: 'Maharashtra', slug: 'pune' },
  { name: 'Goa (Panaji)', state: 'Goa', slug: 'goa' },
  { name: 'Bangalore', state: 'Karnataka', slug: 'bangalore' },
  { name: 'Chennai', state: 'Tamil Nadu', slug: 'chennai' },
  { name: 'Kochi', state: 'Kerala', slug: 'kochi' },
  { name: 'Delhi', state: 'Delhi', slug: 'delhi' },
  { name: 'Kolkata', state: 'West Bengal', slug: 'kolkata' },
  { name: 'Varanasi', state: 'Uttar Pradesh', slug: 'varanasi' },
  { name: 'Shimla', state: 'Himachal Pradesh', slug: 'shimla' },
  { name: 'Manali', state: 'Himachal Pradesh', slug: 'manali' },
  { name: 'Darjeeling', state: 'West Bengal', slug: 'darjeeling' },
  { name: 'Srinagar', state: 'Jammu & Kashmir', slug: 'srinagar' },
]

export default function IndiaCitiesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 to-sky-900">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">All Cities in India</h1>
          <p className="text-xl text-white/80">Explore the vibrant cities across India</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map(city => (
              <Link key={city.slug} to={`/india/${city.state.toLowerCase().replace(/ /g, '-').replace('&-', '')}/${city.slug}`}
                className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all group border border-gray-100 hover:border-sky-200 flex items-center gap-3">
                <div className="bg-sky-100 p-2 rounded-lg"><MapPin size={18} className="text-sky-600" /></div>
                <div>
                  <h3 className="font-bold text-navy-900 group-hover:text-sky-600 transition-colors">{city.name}</h3>
                  <p className="text-sm text-navy-500">{city.state}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-gray-50">
        <div className="container-wide max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">Plan Your City Trip</h2>
          <EnquiryForm destination="India City" theme="sky" />
        </div>
      </section>
    </div>
  )
}
