import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import api from '../../services/api'

export default function EnquiryForm({
  destination = '',
  theme = 'sky',
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: destination,
    travelers: '',
    travelDate: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const themeClasses = {
    sky:     { btn: 'bg-sky-600 hover:bg-sky-700',     ring: 'focus:ring-sky-500',     light: 'bg-sky-100',     text: 'text-sky-600' },
    pink:    { btn: 'bg-pink-600 hover:bg-pink-700',    ring: 'focus:ring-pink-500',    light: 'bg-pink-100',    text: 'text-pink-600' },
    rose:    { btn: 'bg-rose-600 hover:bg-rose-700',    ring: 'focus:ring-rose-500',    light: 'bg-rose-100',    text: 'text-rose-600' },
    teal:    { btn: 'bg-teal-600 hover:bg-teal-700',    ring: 'focus:ring-teal-500',    light: 'bg-teal-100',    text: 'text-teal-600' },
    amber:   { btn: 'bg-amber-600 hover:bg-amber-700',  ring: 'focus:ring-amber-500',  light: 'bg-amber-100',  text: 'text-amber-600' },
    orange:  { btn: 'bg-orange-600 hover:bg-orange-700', ring: 'focus:ring-orange-500', light: 'bg-orange-100', text: 'text-orange-600' },
    indigo:  { btn: 'bg-indigo-600 hover:bg-indigo-700', ring: 'focus:ring-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-600' },
    emerald: { btn: 'bg-emerald-600 hover:bg-emerald-700', ring: 'focus:ring-emerald-500', light: 'bg-emerald-100', text: 'text-emerald-600' },
  }
  const c = themeClasses[theme] || themeClasses.sky

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in name, email and phone.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/leads/public/submit', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        destination: form.destination,
        travelers: form.travelers ? parseInt(form.travelers) : null,
        travelDate: form.travelDate || null,
        message: form.message,
        leadType: 'ENQUIRY',
        sourceUrl: window.location.pathname,
      })
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', destination: destination, travelers: '', travelDate: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className={`w-16 h-16 ${c.light} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <CheckCircle size={32} className={c.text} />
        </div>
        <h3 className="text-xl font-bold text-navy-900 mb-2">Thank You!</h3>
        <p className="text-navy-500 mb-6">Your enquiry has been submitted. Our team will contact you shortly.</p>
        <button onClick={() => setSuccess(false)} className={`${c.btn} text-white px-6 py-2 rounded-xl font-semibold transition-colors`}>
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ${c.ring} focus:outline-none`} />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email *" required
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ${c.ring} focus:outline-none`} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone *" required
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ${c.ring} focus:outline-none`} />
        <input type="text" name="destination" value={form.destination} onChange={handleChange} placeholder="Destination"
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ${c.ring} focus:outline-none`} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="date" name="travelDate" value={form.travelDate} onChange={handleChange} placeholder="Travel Date"
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ${c.ring} focus:outline-none`} />
        <input type="number" name="travelers" value={form.travelers} onChange={handleChange} placeholder="No. of Travelers" min="1"
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ${c.ring} focus:outline-none`} />
      </div>
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message / Special Requirements" rows={3}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ${c.ring} focus:outline-none resize-none`} />
      <button type="submit" disabled={loading}
        className={`w-full ${c.btn} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50`}>
        {loading ? 'Submitting...' : <><Send size={18} /> Submit Enquiry</>}
      </button>
    </form>
  )
}
