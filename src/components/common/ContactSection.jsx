import { Phone, Mail } from 'lucide-react'
import EnquiryForm from './EnquiryForm'

export default function ContactSection({
  title = 'Plan Your Trip',
  subtitle = 'Ready to explore? Contact our travel experts for the best deals.',
  destination = '',
  theme = 'sky',
}) {
  const themeClasses = {
    sky:     { light: 'bg-sky-100',     text: 'text-sky-600' },
    pink:    { light: 'bg-pink-100',    text: 'text-pink-600' },
    rose:    { light: 'bg-rose-100',    text: 'text-rose-600' },
    teal:    { light: 'bg-teal-100',    text: 'text-teal-600' },
    amber:   { light: 'bg-amber-100',  text: 'text-amber-600' },
    orange:  { light: 'bg-orange-100', text: 'text-orange-600' },
    indigo:  { light: 'bg-indigo-100', text: 'text-indigo-600' },
    emerald: { light: 'bg-emerald-100', text: 'text-emerald-600' },
  }
  const c = themeClasses[theme] || themeClasses.sky

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className={`${c.text} font-semibold text-sm uppercase tracking-wider`}>Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2 mb-6">{title}</h2>
            <p className="text-navy-500 mb-8">{subtitle}</p>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className={`${c.light} p-3 rounded-xl`}><Phone size={20} className={c.text} /></div>
                <div><p className="text-sm text-navy-500">Call Us</p><p className="font-semibold text-navy-900">+91 98765 43210</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`${c.light} p-3 rounded-xl`}><Mail size={20} className={c.text} /></div>
                <div><p className="text-sm text-navy-500">Email Us</p><p className="font-semibold text-navy-900">hello@travelvista.com</p></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-navy-900 mb-6">Send Us an Enquiry</h3>
            <EnquiryForm destination={destination} theme={theme} />
          </div>
        </div>
      </div>
    </section>
  )
}
