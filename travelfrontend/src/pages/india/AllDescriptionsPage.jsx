import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Phone, Mail, ChevronRight, Users, Shield, Award, Heart, ArrowRight, Check, Send, Home } from 'lucide-react';
import './AllDescriptionsPage.css';

const DESCRIPTIONS = [
  {
    id: 'heritage',
    title: 'Heritage',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
    icon: '🏛️',
    description: 'Step into India\'s glorious past. Explore magnificent forts, palaces, monuments and UNESCO World Heritage Sites.',
    highlights: ['Historic Forts & Palaces', 'UNESCO Heritage Sites', 'Ancient Architecture', 'Cultural Walks'],
    href: '/india/destinations/heritage',
  },
  {
    id: 'religious',
    title: 'Religious',
    image: 'https://images.unsplash.com/photo-1545126178-862cdb436e88?w=600&h=400&fit=crop',
    icon: '🕉️',
    description: 'Feel the spiritual energy of India. Visit sacred temples, holy rivers, dargahs, churches and pilgrimage sites.',
    highlights: ['Pilgrimage Destinations', 'Sacred Rivers & Ghats', 'Temples, Dargahs & Churches', 'Festivals & Rituals'],
    href: '/india/destinations/religious',
  },
  {
    id: 'wildlife',
    title: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1535338454528-1b22dc2e7708?w=600&h=400&fit=crop',
    icon: '🐾',
    description: 'Experience the wild side of India. Discover national parks, wildlife sanctuaries and exotic species.',
    highlights: ['Jungle Safaris', 'National Parks & Sanctuaries', 'Bird Watching', 'Wildlife Photography'],
    href: '/india/destinations/wildlife',
  },
  {
    id: 'beach',
    title: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    icon: '🏖️',
    description: 'Relax and unwind at India\'s most beautiful beaches and island destinations.',
    highlights: ['Scenic Beaches', 'Island Getaways', 'Water Activities', 'Beach Resorts'],
    href: '/india/destinations/beaches',
  },
  {
    id: 'adventure',
    title: 'Adventure',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
    icon: '🏔️',
    description: 'For thrill seekers and nature lovers. Enjoy trekking, rafting, camping and other adventure activities.',
    highlights: ['Trekking & Hiking', 'River Rafting', 'Camping & Bonfire', 'Paragliding & More'],
    href: '/india/destinations/adventure',
  },
  {
    id: 'cultural',
    title: 'Cultural',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
    icon: '🎭',
    description: 'Discover India\'s vibrant culture, art, music, dance, crafts and local traditions.',
    highlights: ['Folk Performances', 'Art, Craft & Handlooms', 'Local Festivals', 'Traditional Cuisine'],
    href: '/india/destinations/culture',
  },
  {
    id: 'hill-stations',
    title: 'Hill Stations',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    icon: '⛰️',
    description: 'Escape to the cool and serene hill stations of India for a refreshing holiday.',
    highlights: ['Scenic Hill Stations', 'Lakes & Waterfalls', 'Family Getaways', 'Peace & Relaxation'],
    href: '/india/destinations/hill-stations',
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop',
    icon: '💑',
    description: 'Romantic getaways for couples. Find the perfect destinations for your dream honeymoon.',
    highlights: ['Romantic Destinations', 'Luxury Stays', 'Private Experiences', 'Memorable Moments'],
    href: '/holidays/domestic-honeymoon',
  },
];

export default function AllDescriptionsPage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', category: '', destination: '', date: '', travelers: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your enquiry has been submitted. Our team will contact you shortly.');
    setFormData({ name: '', mobile: '', email: '', category: '', destination: '', date: '', travelers: '', message: '' });
  };

  return (
    <div className="all-descriptions-page">
      {/* ═══ HERO SECTION ═══ */}
      <section className="ad-hero">
        <div className="ad-hero-overlay"></div>
        <div className="ad-hero-content">
          <h1>
            Explore <span className="ad-highlight">India</span> in Every Way
          </h1>
          <p className="ad-hero-subtitle">
            From timeless heritage to divine spirituality, thrilling wildlife to beautiful beaches — discover detailed descriptions and travel inspiration for every experience.
          </p>
        </div>

        {/* Feature Bar */}
        <div className="ad-feature-bar">
          <div className="ad-feature-item">
            <div className="ad-feature-icon">
              <Star size={20} />
            </div>
            <div>
              <strong>Handpicked Experiences</strong>
              <span>Curated just for you</span>
            </div>
          </div>
          <div className="ad-feature-item">
            <div className="ad-feature-icon">
              <Award size={20} />
            </div>
            <div>
              <strong>Detailed Descriptions</strong>
              <span>Know more before you go</span>
            </div>
          </div>
          <div className="ad-feature-item">
            <div className="ad-feature-icon">
              <MapPin size={20} />
            </div>
            <div>
              <strong>Travel Guide & Tips</strong>
              <span>Plan better, travel smarter</span>
            </div>
          </div>
          <div className="ad-feature-item">
            <div className="ad-feature-icon">
              <Users size={20} />
            </div>
            <div>
              <strong>Trusted by Travelers</strong>
              <span>Thousands of happy explorers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ALL DESCRIPTIONS GRID ═══ */}
      <section className="ad-categories-section">
        <div className="ad-container">
          <h2 className="ad-section-title">All Descriptions</h2>
          <p className="ad-section-subtitle">Browse all our travel experience categories and find the perfect journey for you.</p>

          <div className="ad-categories-grid">
            {DESCRIPTIONS.map((cat) => (
              <div key={cat.id} className="ad-category-card">
                <div className="ad-card-image">
                  <img src={cat.image} alt={cat.title} loading="lazy" />
                  <div className="ad-card-icon">{cat.icon}</div>
                </div>
                <div className="ad-card-body">
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <ul className="ad-highlights">
                    {cat.highlights.map((h, i) => (
                      <li key={i}>
                        <Check size={14} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link to={cat.href} className="ad-explore-btn">
                    Explore Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BAR ═══ */}
      <section className="ad-cta-bar">
        <div className="ad-container">
          <div className="ad-cta-content">
            <div className="ad-cta-text">
              <strong>Can't decide what to explore?</strong>
              <span>Our travel experts are here to help you choose the perfect experience based on your interests.</span>
            </div>
            <div className="ad-cta-contacts">
              <div className="ad-cta-contact">
                <Phone size={18} />
                <div>
                  <strong>+91 98765 43210</strong>
                  <span>Call us anytime</span>
                </div>
              </div>
              <div className="ad-cta-contact">
                <Mail size={18} />
                <div>
                  <strong>info@travelvista.com</strong>
                  <span>We reply within 24 hrs</span>
                </div>
              </div>
              <div className="ad-cta-contact">
                <Clock size={18} />
                <div>
                  <strong>24x7 Customer Support</strong>
                  <span>Always here for you</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section className="ad-contact-section">
        <div className="ad-container">
          <div className="ad-contact-wrapper">
            <div className="ad-contact-info">
              <h2>Plan Your Perfect Journey</h2>
              <p>Tell us your travel preferences and our experts will help you plan the best experience.</p>
              <ul>
                <li><Check size={16} /> Personalized Recommendations</li>
                <li><Check size={16} /> Best Prices Guaranteed</li>
                <li><Check size={16} /> Hassle-free Travel Planning</li>
                <li><Check size={16} /> 100% Safe & Secure</li>
              </ul>
            </div>
            <form className="ad-contact-form" onSubmit={handleSubmit}>
              <div className="ad-form-row">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
              </div>
              <div className="ad-form-row">
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {DESCRIPTIONS.map((d) => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>
              <div className="ad-form-row">
                <select name="destination" value={formData.destination} onChange={handleChange}>
                  <option value="">Select Destination</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="kerala">Kerala</option>
                  <option value="goa">Goa</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="himachal">Himachal Pradesh</option>
                  <option value="kashmir">Jammu & Kashmir</option>
                  <option value="uttarakhand">Uttarakhand</option>
                </select>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
              </div>
              <div className="ad-form-row">
                <select name="travelers" value={formData.travelers} onChange={handleChange}>
                  <option value="">Number of Travelers</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-5">3-5 People</option>
                  <option value="6-10">6-10 People</option>
                  <option value="10+">10+ People</option>
                </select>
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={1}></textarea>
              </div>
              <button type="submit" className="ad-submit-btn">
                <Send size={16} /> Get Free Quote
              </button>
              <p className="ad-form-note">Your information is safe with us. We respect your privacy.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
