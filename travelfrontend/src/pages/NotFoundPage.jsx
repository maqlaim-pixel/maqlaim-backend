import { Link } from 'react-router-dom'
import { MapPin, Package, Home, Search } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="text-8xl font-bold text-sky-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-navy-900 mb-3">Page Not Found</h1>
        <p className="text-navy-500 mb-8 leading-relaxed">
          The page you're looking for may have moved or doesn't exist. 
          Let us help you find what you need.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition-colors">
            <Home size={18} /> Go Home
          </Link>
          <Link to="/packages" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-navy-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            <Package size={18} /> Browse Packages
          </Link>
          <Link to="/contact" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-navy-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            <Search size={18} /> Contact Us
          </Link>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-navy-900 mb-3">Popular Destinations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Gujarat', slug: '/gujarat' },
              { name: 'Rajasthan', slug: '/rajasthan' },
              { name: 'Kerala', slug: '/kerala' },
              { name: 'Goa', slug: '/goa' },
            ].map(dest => (
              <Link key={dest.slug} to={dest.slug}
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-sky-50 text-navy-700 hover:text-sky-600 transition-colors text-sm font-medium">
                <MapPin size={14} /> {dest.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
