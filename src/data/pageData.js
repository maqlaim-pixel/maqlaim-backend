// ══════════════════════════════════════════════════════════════════════
// PAGE DATA — All sub-category pages for mega menu links
// Each entry maps a URL slug to its page content
// ══════════════════════════════════════════════════════════════════════

// ── India: Destinations ─────────────────────────────────────────────
export const INDIA_DESTINATIONS = {
  'popular':    { title: 'Popular Destinations',   emoji: '⭐', desc: 'Most visited and loved destinations across India', highlights: ['Taj Mahal', 'Goa Beaches', 'Jaipur Forts', 'Kerala Backwaters'] },
  'heritage':   { title: 'Heritage Destinations',  emoji: '🏛️', desc: 'Explore India\'s rich cultural and architectural heritage',   highlights: ['Forts & Palaces', 'UNESCO Sites', 'Ancient Temples', 'Historic Cities'] },
  'religious':  { title: 'Religious Destinations', emoji: '🕉️', desc: 'Sacred pilgrimage sites and spiritual destinations',         highlights: ['Varanasi', 'Rishikesh', 'Amritsar', 'Madurai'] },
  'hill-stations': { title: 'Hill Stations',      emoji: '⛰️', desc: 'Cool retreats in the mountains for relaxation',            highlights: ['Shimla', 'Manali', 'Ooty', 'Munnar'] },
  'beaches':    { title: 'Beach Destinations',     emoji: '🏖️', desc: 'Sun, sand and sea at India\'s finest beaches',             highlights: ['Goa', 'Andaman', 'Kovalam', 'Gokarna'] },
  'wildlife':   { title: 'Wildlife Destinations',  emoji: '🐾', desc: 'National parks and wildlife sanctuaries',                  highlights: ['Ranthambore', 'Jim Corbett', 'Kaziranga', 'Sundarbans'] },
  'weekend':    { title: 'Weekend Getaways',       emoji: '🚗', desc: 'Quick escapes for the perfect weekend break',              highlights: ['Nearby Hill Stations', 'Beach Resorts', 'Heritage Towns', 'Nature Retreats'] },
  'offbeat':    { title: 'Offbeat Destinations',   emoji: '🌿', desc: 'Hidden gems away from the tourist crowds',                 highlights: ['Spiti Valley', 'Ziro Valley', 'Mawlynnong', 'Chopta'] },
  'attractions': { title: 'Famous Attractions',    emoji: '🎯', desc: 'Must-see landmarks and iconic places in India',            highlights: ['Taj Mahal', 'Red Fort', 'Gateway of India', 'Hawa Mahal'] },
  'default':    { title: 'India Destinations',     emoji: '🇮🇳', desc: 'Explore incredible destinations across India',             highlights: ['Heritage', 'Beaches', 'Mountains', 'Wildlife'] },
}

// ── India: Places to Visit ──────────────────────────────────────────
export const INDIA_PLACES = {
  'top':          { title: 'Top Places to Visit',    emoji: '⭐', desc: 'The most recommended places across India',          highlights: ['Taj Mahal', 'Varanasi Ghats', 'Hawa Mahal', 'Meenakshi Temple'] },
  'heritage':     { title: 'Heritage Sites',         emoji: '🏛️', desc: 'Historical and architectural heritage sites',       highlights: ['Red Fort', 'Qutub Minar', 'Hampi', 'Khajuraho'] },
  'temples':      { title: 'Temples & Religious',    emoji: '🕉️', desc: 'Sacred temples and religious sites',                highlights: ['Golden Temple', 'Kashi Vishwanath', 'Brihadeeswarar', 'Somnath'] },
  'beaches':      { title: 'Beaches',                emoji: '🏖️', desc: 'Beautiful beaches across the coastline',           highlights: ['Calangute', 'Varkala', 'Radhanagar', 'Puri'] },
  'national-parks': { title: 'National Parks',       emoji: '🦁', desc: 'Wildlife sanctuaries and national parks',          highlights: ['Ranthambore', 'Corbett', 'Kaziranga', 'Periyar'] },
  'lakes':        { title: 'Lakes & Waterfalls',     emoji: '💧', desc: 'Scenic lakes and majestic waterfalls',             highlights: ['Dal Lake', 'Naini Lake', 'Jog Falls', 'Athirapally'] },
  'hill-stations': { title: 'Hill Stations',         emoji: '🏔️', desc: 'Cool mountain retreats and hill stations',         highlights: ['Shimla', 'Manali', 'Darjeeling', 'Coorg'] },
  'museums':      { title: 'Museums',                emoji: '🏛️', desc: 'World-class museums and galleries',                highlights: ['National Museum Delhi', 'Indian Museum Kolkata', 'CSMVS Mumbai'] },
  'historical':   { title: 'Historical Places',      emoji: '📜', desc: 'Places of great historical significance',          highlights: ['Hawa Mahal', 'Charminar', 'Victoria Memorial', 'Sanchi Stupa'] },
  'default':      { title: 'Places to Visit in India', emoji: '📍', desc: 'Discover the best places across India',           highlights: ['Heritage', 'Temples', 'Beaches', 'Wildlife'] },
}

// ── India: Things to Do ─────────────────────────────────────────────
export const INDIA_THINGS_TO_DO = {
  'adventure':    { title: 'Adventure Activities',   emoji: '🏔️', desc: 'Thrilling adventures across India',             highlights: ['Paragliding in Bir', 'Bungee in Rishikesh', 'Trekking in Ladakh', 'River Rafting'] },
  'wildlife':     { title: 'Wildlife Safari',         emoji: '🦁', desc: 'Spot tigers, elephants and exotic wildlife',    highlights: ['Jeep Safari', 'Bird Watching', 'Elephant Safari', 'Boat Safari'] },
  'water-sports': { title: 'Water Sports',            emoji: '🏄', desc: 'Exciting water activities and sports',          highlights: ['Scuba Diving', 'Snorkeling', 'Jet Ski', 'Kayaking'] },
  'trekking':     { title: 'Trekking & Hiking',       emoji: '🥾', desc: 'Explore trails through mountains and forests',  highlights: ['Chadar Trek', 'Valley of Flowers', 'Rohtang Pass', 'Kedarkantha'] },
  'camping':      { title: 'Camping',                 emoji: '⛺', desc: 'Under-the-stars camping experiences',          highlights: ['Rishikesh Camping', 'Ladakh Camping', 'Jungle Camps', 'Desert Camps'] },
  'pilgrimage':   { title: 'Pilgrimage Tours',        emoji: '🙏', desc: 'Sacred spiritual journeys',                     highlights: ['Char Dham', 'Amarnath', 'Kumbh Mela', 'Rameshwaram'] },
  'culture':      { title: 'Cultural Experiences',    emoji: '🎭', desc: 'Immerse in Indian art, music and dance',       highlights: ['Folk Dance', 'Classical Music', 'Art Galleries', 'Village Tours'] },
  'shopping':     { title: 'Shopping',                emoji: '🛍️', desc: 'Shop for handicrafts, textiles and souvenirs',  highlights: ['Jaipur Bazaars', 'Delhi Markets', 'Kashmiri Shawls', 'Silk Sarees'] },
  'food':         { title: 'Food Experiences',        emoji: '🍛', desc: 'Savor the incredible diversity of Indian cuisine', highlights: ['Street Food', 'Thali Meals', 'Spice Markets', 'Cooking Classes'] },
  'default':      { title: 'Things to Do in India',   emoji: '🎯', desc: 'Endless activities and experiences await',      highlights: ['Adventure', 'Wildlife', 'Culture', 'Food'] },
}

// ── India: National Parks ───────────────────────────────────────────
export const INDIA_NATIONAL_PARKS = {
  'gir':          { title: 'Gir National Park',          emoji: '🦁', desc: 'Last home of the Asiatic Lion in Gujarat',             highlights: ['Asiatic Lions', 'Leopards', 'Bird Watching', 'Safari'] },
  'jim-corbett':  { title: 'Jim Corbett National Park',  emoji: '🐯', desc: 'India\'s oldest national park in Uttarakhand',          highlights: ['Bengal Tigers', 'Elephants', 'River Rafting', 'Safari'] },
  'ranthambore':  { title: 'Ranthambore National Park',  emoji: '🐆', desc: 'Famous tiger reserve in Rajasthan',                   highlights: ['Tiger Sightings', 'Fort Ruins', 'Lake Safaris', 'Photography'] },
  'kaziranga':    { title: 'Kaziranga National Park',    emoji: '🦏', desc: 'Home to the one-horned rhinoceros in Assam',           highlights: ['One-Horned Rhino', 'Elephants', 'Tigers', 'Birding'] },
  'bandhavgarh':  { title: 'Bandhavgarh National Park',  emoji: '🐅', desc: 'High density of tigers in Madhya Pradesh',             highlights: ['Tiger Capital', 'White Tigers', 'Fort Trek', 'Safari'] },
  'sundarbans':   { title: 'Sundarbans National Park',   emoji: '🐊', desc: 'Mangrove forest and Royal Bengal Tigers in WB',        highlights: ['Bengal Tigers', 'Mangroves', 'Crocodiles', 'Boat Safari'] },
  'pench':        { title: 'Pench National Park',        emoji: '🐃', desc: 'Inspiration for The Jungle Book in MP',                highlights: ['Tigers', 'Wild Dogs', 'Sloth Bears', 'Birding'] },
  'default':      { title: 'National Parks of India',     emoji: '🏞️', desc: 'India\'s incredible wildlife sanctuaries',            highlights: ['Tigers', 'Rhinos', 'Elephants', 'Birds'] },
}

// ── India: Experiences ──────────────────────────────────────────────
export const INDIA_EXPERIENCES = {
  'adventure': { title: 'Adventure Experiences',  emoji: '🏔️', desc: 'Adrenaline-pumping activities across India',       highlights: ['Trekking', 'Rafting', 'Paragliding', 'Bungee Jumping'] },
  'wildlife':  { title: 'Wildlife Experiences',    emoji: '🐾', desc: 'Close encounters with India\'s incredible fauna',  highlights: ['Tiger Safari', 'Bird Watching', 'Elephant Rides', 'Whale Watching'] },
  'culture':   { title: 'Culture & Heritage',      emoji: '🎭', desc: 'Immerse in India\'s 5000-year old culture',        highlights: ['Festivals', 'Folk Arts', 'Temple Visits', 'Village Stays'] },
  'food':      { title: 'Food & Cuisine',          emoji: '🍛', desc: 'A culinary journey through India\'s diverse flavors', highlights: ['Street Food', 'Thali', 'Spice Tours', 'Cooking Classes'] },
  'spiritual': { title: 'Spiritual Experiences',   emoji: '🕉️', desc: 'Find peace and spiritual awakening',               highlights: ['Yoga Retreats', 'Meditation', 'Ganga Aarti', 'Ashram Stays'] },
  'luxury':    { title: 'Luxury Experiences',      emoji: '👑', desc: 'Premium travel with world-class hospitality',      highlights: ['Palace Hotels', 'Luxury Trains', 'Spa Retreats', 'Private Tours'] },
  'family':    { title: 'Family Friendly',         emoji: '👨‍👩‍👧‍👦', desc: 'Fun activities for the whole family',              highlights: ['Theme Parks', 'Wildlife', 'Beaches', 'Hill Stations'] },
  'default':   { title: 'Experiences in India',    emoji: '✨', desc: 'Curated experiences for every kind of traveler',   highlights: ['Adventure', 'Culture', 'Wildlife', 'Spiritual'] },
}

// ── Holiday Sub-Categories ──────────────────────────────────────────
export const HOLIDAY_ADVENTURE = {
  'trekking':  { title: 'Trekking Holidays',  emoji: '🥾', desc: 'Explore mountain trails and scenic routes',          highlights: ['Himalayan Treks', 'Western Ghats', 'Valley of Flowers', 'Chadar Trek'] },
  'camping':   { title: 'Camping Holidays',    emoji: '⛺', desc: 'Camp under the stars in stunning locations',        highlights: ['Rishikesh', 'Ladakh', 'Coorg', 'Spiti Valley'] },
  'wildlife':  { title: 'Wildlife Adventures',  emoji: '🦁', desc: 'Safari holidays in India\'s best parks',           highlights: ['Ranthambore', 'Corbett', 'Kaziranga', 'Pench'] },
  'water':     { title: 'Water Adventure',      emoji: '🌊', desc: 'Rafting, diving and water sports holidays',        highlights: ['River Rafting', 'Scuba Diving', 'Snorkeling', 'Kayaking'] },
  'mountain':  { title: 'Mountain Adventures',  emoji: '🏔️', desc: 'Mountain biking, climbing and exploration',         highlights: ['Ladakh', 'Spiti', 'Uttarakhand', 'Sikkim'] },
  'desert':    { title: 'Desert Adventures',    emoji: '🏜️', desc: 'Camel safaris and desert camping',                 highlights: ['Jaisalmer', 'Thar Desert', 'Rann of Kutch', 'Sam Dunes'] },
  'winter':    { title: 'Winter Adventures',    emoji: '❄️', desc: 'Snow treks and winter sports',                     highlights: ['Skiing in Auli', 'Snow Trek Kedarkantha', 'Snow Leopard Trek', 'Ice Skating Shimla'] },
  'default':   { title: 'Adventure Holidays',   emoji: '🎒', desc: 'Thrilling adventure holiday packages',             highlights: ['Trekking', 'Camping', 'Wildlife', 'Water Sports'] },
}

export const HOLIDAY_BEACH = {
  'getaways':    { title: 'Beach Getaways',       emoji: '🏖️', desc: 'Quick beach escape packages',              highlights: ['Goa', 'Gokarna', 'Varkala', 'Pondicherry'] },
  'island':      { title: 'Island Holidays',      emoji: '🏝️', desc: 'Island paradise vacation packages',        highlights: ['Andaman', 'Lakshadweep', 'Havelock', 'Neil Island'] },
  'tropical':    { title: 'Tropical Beach Holidays', emoji: '🌴', desc: 'Tropical beach vacation packages',      highlights: ['Kerala', 'Goa', 'Andaman', 'Nicobar'] },
  'luxury':      { title: 'Luxury Beach Holidays', emoji: '👑', desc: 'Premium beach resort packages',            highlights: ['Leela Kerala', 'Taj Exotica', 'Alila Diwa', 'Kumarakom'] },
  'budget':      { title: 'Budget Beach Holidays', emoji: '💰', desc: 'Affordable beach vacation packages',      highlights: ['Gokarna', 'Varkala', 'Puri', 'Mahabalipuram'] },
  'water-sports': { title: 'Water Sports Holidays', emoji: '🏄', desc: 'Action-packed water sports packages',    highlights: ['Scuba Diving', 'Jet Ski', 'Parasailing', 'Snorkeling'] },
  'default':     { title: 'Beach Holidays',        emoji: '🌊', desc: 'Sun, sand and sea holiday packages',      highlights: ['Goa', 'Andaman', 'Kerala', 'Gokarna'] },
}

export const HOLIDAY_SPIRITUAL = {
  'pilgrimage': { title: 'Pilgrimage Tours',     emoji: '🙏', desc: 'Sacred pilgrimage holiday packages',      highlights: ['Char Dham', 'Amarnath', 'Sabarimala', 'Tirupati'] },
  'temples':    { title: 'Temple Tours',          emoji: '🛕', desc: 'Explore ancient temples across India',     highlights: ['Meenakshi', 'Brihadeeswarar', 'Konark', 'Khajuraho'] },
  'retreats':   { title: 'Spiritual Retreats',    emoji: '🧘', desc: 'Peaceful retreats for the soul',          highlights: ['Rishikesh', 'Dharamshala', 'Mcleodganj', 'Kodaikanal'] },
  'meditation': { title: 'Meditation Holidays',   emoji: '🕉️', desc: 'Learn and practice meditation',            highlights: ['Isha Foundation', 'Art of Living', 'Vipassana', 'Osho'] },
  'yoga':       { title: 'Yoga Holidays',         emoji: '🧘‍♀️', desc: 'Yoga retreats and teacher training',     highlights: ['Rishikesh', 'Kerala', 'Goa', 'Mysore'] },
  'festival':   { title: 'Festival Holidays',     emoji: '🎉', desc: 'Celebrate India\'s vibrant festivals',    highlights: ['Diwali', 'Holi', 'Dussehra', 'Navratri'] },
  'default':    { title: 'Spiritual & Religious',  emoji: '🕉️', desc: 'Spiritual journey holiday packages',     highlights: ['Pilgrimage', 'Yoga', 'Meditation', 'Temples'] },
}

// ── International Packages ──────────────────────────────────────────
export const INTERNATIONAL_PACKAGES = {
  'uae':         { title: 'Dubai Packages',       emoji: '🇦🇪', desc: 'Luxury, adventure and shopping in Dubai & UAE',         highlights: ['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah', 'Gold Souk'] },
  'thailand':    { title: 'Thailand Packages',     emoji: '🇹🇭', desc: 'Temples, beaches and nightlife in Thailand',           highlights: ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai'] },
  'bali':        { title: 'Bali Packages',         emoji: '🇮🇩', desc: 'Tropical paradise in Indonesia',                       highlights: ['Ubud', 'Seminyak', 'Tanah Lot', 'Mount Batur'] },
  'singapore':   { title: 'Singapore Packages',    emoji: '🇸🇬', desc: 'Garden city and modern marvel',                        highlights: ['Marina Bay', 'Sentosa', 'Universal Studios', 'Orchard Road'] },
  'maldives':    { title: 'Maldives Packages',     emoji: '🇲🇻', desc: 'Overwater villas and crystal waters',                  highlights: ['Malé', 'Water Villas', 'Snorkeling', 'Sunset Cruises'] },
  'malaysia':    { title: 'Malaysia Packages',     emoji: '🇲🇾', desc: 'Diverse culture and natural beauty',                   highlights: ['Kuala Lumpur', 'Langkawi', 'Penang', 'Cameron Highlands'] },
  'vietnam':     { title: 'Vietnam Packages',      emoji: '🇻🇳', desc: 'History, cuisine and stunning landscapes',             highlights: ['Ha Long Bay', 'Hoi An', 'Ho Chi Minh', 'Hanoi'] },
  'europe':      { title: 'Europe Packages',       emoji: '🇪🇺', desc: 'Romantic cities and alpine scenery',                   highlights: ['Paris', 'Switzerland', 'Italy', 'London'] },
  'usa':         { title: 'USA Packages',          emoji: '🇺🇸', desc: 'Explore the land of opportunities',                    highlights: ['New York', 'Las Vegas', 'Grand Canyon', 'San Francisco'] },
  'australia':   { title: 'Australia Packages',    emoji: '🇦🇺', desc: 'Wildlife, reefs and iconic cities',                    highlights: ['Sydney', 'Great Barrier Reef', 'Melbourne', 'Gold Coast'] },
  'japan':       { title: 'Japan Packages',        emoji: '🇯🇵', desc: 'Ancient tradition meets futuristic innovation',        highlights: ['Tokyo', 'Kyoto', 'Osaka', 'Mount Fuji'] },
  'switzerland': { title: 'Swiss Packages',        emoji: '🇨🇭', desc: 'Alpine peaks and pristine lakes',                      highlights: ['Zurich', 'Interlaken', 'Lucerne', 'Jungfrau'] },
  'default':     { title: 'International Packages', emoji: '🌍', desc: 'Explore the world with curated packages',             highlights: ['Dubai', 'Thailand', 'Singapore', 'Europe'] },
}

// ── MICE Sub-Categories ─────────────────────────────────────────────
export const MICE_MEETINGS = {
  'board':     { title: 'Board Meetings',        emoji: '👔', desc: 'Executive board meeting planning and venues',        highlights: ['Luxury Venues', 'AV Setup', 'Catering', 'Transport'] },
  'team':      { title: 'Team Meetings',          emoji: '👥', desc: 'Team building and collaborative meeting spaces',    highlights: ['Conference Halls', 'Breakout Rooms', 'Team Activities', 'Tech Support'] },
  'corporate': { title: 'Corporate Meetings',     emoji: '🏢', desc: 'Professional corporate meeting solutions',          highlights: ['Premium Venues', 'Presentation Setup', 'Networking Spaces', 'Catering'] },
  'executive': { title: 'Executive Meetings',     emoji: '🤝', desc: 'High-level executive meeting planning',             highlights: ['Private Suites', 'Boardroom Setup', 'Concierge Service', 'Security'] },
  'agm':       { title: 'Annual General Meetings', emoji: '📊', desc: 'Large-scale AGM planning and execution',           highlights: ['Large Halls', 'Stage Setup', 'Live Streaming', 'Voting Systems'] },
  'launch':    { title: 'Product Launch Meetings', emoji: '🚀', desc: 'Memorable product launch events',                   highlights: ['Launch Venues', 'Media Setup', 'PR Support', 'Demo Areas'] },
  'strategy':  { title: 'Strategy Meetings',      emoji: '🎯', desc: 'Strategic planning offsite meetings',               highlights: ['Private Venues', 'Whiteboard Rooms', 'Outdoor Spaces', 'Facilitation'] },
  'default':   { title: 'Meetings & Conferences',  emoji: '📋', desc: 'Professional meeting planning services',            highlights: ['Venues', 'AV Support', 'Catering', 'Transport'] },
}

export const MICE_INCENTIVES = {
  'travel':        { title: 'Incentive Travel Programs', emoji: '✈️', desc: 'Reward your top performers with travel',         highlights: ['International Trips', 'Luxury Cruises', 'Adventure Tours', 'Wellness Retreats'] },
  'rewards':       { title: 'Employee Rewards',          emoji: '🏆', desc: 'Recognition and reward programs',               highlights: ['Gift Vouchers', 'Experience Days', 'Luxury Stays', 'Adventure Trips'] },
  'performance':   { title: 'Performance Rewards',       emoji: '🥇', desc: 'High-performance team reward packages',         highlights: ['Beach Resorts', 'Mountain Retreats', 'Cruise Trips', 'City Tours'] },
  'motivational':  { title: 'Motivational Trips',        emoji: '🔥', desc: 'Inspire and motivate through travel',           highlights: ['Adventure Camps', 'Wellness Retreats', 'Cultural Tours', 'Team Challenges'] },
  'corporate':     { title: 'Corporate Incentives',      emoji: '💼', desc: 'Corporate incentive travel solutions',          highlights: ['Offsite Venues', 'Group Activities', 'Award Ceremonies', 'Gala Dinners'] },
  'recognition':   { title: 'Recognition Programs',      emoji: '🎖️', desc: 'Employee recognition and appreciation',        highlights: ['Annual Events', 'Milestone Rewards', 'Peer Recognition', 'Leadership Awards'] },
  'default':       { title: 'Incentive Programs',        emoji: '🎁', desc: 'Reward and motivate your team',                 highlights: ['Travel', 'Rewards', 'Recognition', 'Motivation'] },
}

export const MICE_CONFERENCES = {
  'industry':     { title: 'Industry Conferences',    emoji: '🏭', desc: 'Large-scale industry conference planning',       highlights: ['Venue Selection', 'Speaker Management', 'Registration', 'Live Streaming'] },
  'business':     { title: 'Business Conferences',    emoji: '💼', desc: 'Professional business conference solutions',    highlights: ['Conference Halls', 'Workshop Rooms', 'Networking', 'Catering'] },
  'academic':     { title: 'Academic Conferences',    emoji: '🎓', desc: 'Academic and research conference planning',     highlights: ['Lecture Halls', 'Poster Sessions', 'Lab Tours', 'Publishing'] },
  'medical':      { title: 'Medical Conferences',     emoji: '🏥', desc: 'Healthcare conference and symposium planning',  highlights: ['Hospital Venues', 'CME Credits', 'Live Surgery', 'Exhibition'] },
  'tech':         { title: 'Tech Conferences',        emoji: '💻', desc: 'Technology conference and summit planning',     highlights: ['Hackathon Space', 'Demo Labs', 'Startup Stages', 'Tech Exhibits'] },
  'international': { title: 'International Conferences', emoji: '🌍', desc: 'Global conference coordination',              highlights: ['Multi-language', 'Visa Support', 'Airport Transfers', 'Hotel Block'] },
  'support':      { title: 'Conference Support',      emoji: '🛠️', desc: 'End-to-end conference support services',       highlights: ['AV Equipment', 'Stage Design', 'Simultaneous Translation', 'Catering'] },
  'default':      { title: 'Conferences',             emoji: '🎤', desc: 'Professional conference planning services',   highlights: ['Venues', 'AV', 'Catering', 'Support'] },
}

export const MICE_EXHIBITIONS = {
  'trade-shows':  { title: 'Trade Shows',          emoji: '🏪', desc: 'Trade show booth design and management',       highlights: ['Booth Design', 'Logistics', 'Staff Training', 'Lead Capture'] },
  'default':      { title: 'Exhibitions & Events',  emoji: '🎪', desc: 'Exhibition and event management services',    highlights: ['Booth Setup', 'Event Planning', 'Marketing', 'Support'] },
}

export const MICE_SUPPORT = {
  'venue':        { title: 'Venue Selection',       emoji: '🏛️', desc: 'Find the perfect venue for your event',      highlights: ['Hotel Venues', 'Convention Centers', 'Outdoor Spaces', 'Unique Venues'] },
  'planning':     { title: 'Event Planning',        emoji: '📋', desc: 'Complete event planning and coordination',  highlights: ['Timeline Management', 'Vendor Coordination', 'Budget Planning', 'Risk Management'] },
  'logistics':    { title: 'Logistics Management',  emoji: '🚛', desc: 'Seamless logistics for your events',         highlights: ['Transport', 'Accommodation', 'Equipment', 'On-site Management'] },
  'accommodation': { title: 'Accommodation',        emoji: '🏨', desc: 'Hotel and stay arrangements for attendees',  highlights: ['Hotel Blocks', 'Group Rates', 'VIP Suites', 'Budget Options'] },
  'av':           { title: 'Audio Visual Support',  emoji: '🎤', desc: 'Professional AV equipment and technicians',  highlights: ['Sound Systems', 'Projectors', 'LED Screens', 'Live Streaming'] },
  'decor':        { title: 'Theme & Décor',         emoji: '🎨', desc: 'Creative theming and decoration services',   highlights: ['Stage Design', 'Floral Arrangements', 'Lighting', 'Branding'] },
  'catering':     { title: 'Catering Services',     emoji: '🍽️', desc: 'Quality catering for events of all sizes',  highlights: ['Buffet Setup', 'VIP Dining', 'Dietary Options', 'Beverages'] },
  'default':      { title: 'MICE Support Services', emoji: '🤝', desc: 'End-to-end support for your events',        highlights: ['Venues', 'Planning', 'AV', 'Catering'] },
}

// ── Wedding Sub-Categories ──────────────────────────────────────────
export const WEDDING_INDIA = {
  'rajasthan':  { title: 'Rajasthan Weddings',  emoji: '🏰', desc: 'Royal palace weddings in the land of kings',        highlights: ['Udaipur Palaces', 'Jaipur Heritage', 'Jodhpur Forts', 'Lake Pichola'] },
  'goa':        { title: 'Goa Weddings',         emoji: '🏖️', desc: 'Beachside wedding celebrations',                    highlights: ['Beach Resorts', 'Chapel Weddings', 'Sunset Ceremonies', 'Portuguese Villas'] },
  'udaipur':    { title: 'Udaipur Weddings',     emoji: '🏯', desc: 'City of Lakes royal wedding',                       highlights: ['Lake Palace', 'City Palace', 'Jag Mandir', 'Fateh Prakash'] },
  'jaipur':     { title: 'Jaipur Weddings',      emoji: ' pink', desc: 'Pink city heritage weddings',                    highlights: ['Amber Fort', 'Rambagh Palace', 'Jai Mahal Palace', 'Samode'] },
  'jodhpur':    { title: 'Jodhpur Weddings',     emoji: '🏰', desc: 'Blue city fort weddings',                           highlights: ['Mehrangarh Fort', 'Umaid Bhawan', 'Taj Hari Mahal', 'Blue City'] },
  'kerala':     { title: 'Kerala Weddings',      emoji: '🌴', desc: 'Backwater and beach weddings',                      highlights: ['Houseboat Weddings', 'Beach Resorts', 'Temple Weddings', 'Backwater Venues'] },
  'maharashtra': { title: 'Maharashtra Weddings', emoji: '🏛️', desc: 'Heritage and beach weddings',                    highlights: ['Mumbai Hotels', 'Lavasa', 'Alibaug Beach', 'Lonavala'] },
  'himachal':   { title: 'Himachal Weddings',    emoji: '🏔️', desc: 'Mountain valley weddings',                          highlights: ['Manali', 'Shimla', 'Kasol', 'Chail'] },
  'kashmir':    { title: 'Kashmir Weddings',     emoji: '🏔️', desc: 'Paradise on Earth wedding',                         highlights: ['Dal Lake', 'Gulmarg', 'Pahalgam', 'Sonmarg'] },
  'ayodhya':    { title: 'Ayodhya Weddings',     emoji: '🛕', desc: 'Sacred city traditional wedding',                   highlights: ['Temple Ceremonies', 'Ram Mandir', 'Ganga Ghats', 'Traditional Rituals'] },
  'varanasi':   { title: 'Varanasi Weddings',    emoji: '🕉️', desc: 'Spiritual wedding on the Ganges',                   highlights: ['Ganga Ghats', 'Temple Weddings', 'Traditional Rituals', 'Heritage Hotels'] },
  'default':    { title: 'Weddings in India',    emoji: '💍', desc: 'Beautiful wedding destinations across India',      highlights: ['Rajasthan', 'Goa', 'Kerala', 'Kashmir'] },
}

export const WEDDING_VENUES = {
  'beach':    { title: 'Beachfront Venues',       emoji: '🏖️', desc: 'Say I do by the sea',                             highlights: ['Goa Beaches', 'Kerala Coast', 'Andaman Islands', 'Alibaug'] },
  'palace':   { title: 'Palace & Heritage',       emoji: '🏰', desc: 'Royal palace wedding venues',                     highlights: ['Udaipur', 'Jaipur', 'Jodhpur', 'Bikaner'] },
  'resort':   { title: 'Luxury Resort Venues',    emoji: '🏨', desc: 'Premium resort wedding venues',                   highlights: ['Taj Resorts', 'Leela', 'Oberoi', 'ITC'] },
  'garden':   { title: 'Garden & Outdoor',        emoji: '🌺', desc: 'Lush garden and outdoor venues',                  highlights: ['Farmhouse', 'Botanical Garden', 'Rooftop', 'Vineyard'] },
  'island':   { title: 'Island Venues',           emoji: '🏝️', desc: 'Island destination wedding venues',               highlights: ['Andaman', 'Lakshadweep', 'Havelock', 'Neil Island'] },
  'fort':     { title: 'Royal Forts',             emoji: '🏯', desc: 'Majestic fort wedding venues',                    highlights: ['Mehrangarh', 'Amber Fort', 'Chittorgarh', 'Kumbhalgarh'] },
  'backwater': { title: 'Backwater Venues',       emoji: '🛶', desc: 'Kerala backwater wedding venues',                 highlights: ['Kumarakom', 'Alleppey', 'Kovalam', 'Houseboats'] },
  'banquet':  { title: 'Banquet Halls',           emoji: '🏛️', desc: 'Grand banquet hall venues',                       highlights: ['Five Star Hotels', 'Convention Centers', 'Heritage Halls', 'Rooftop Venues'] },
  'vineyard': { title: 'Vineyard Venues',         emoji: '🍇', desc: 'Scenic vineyard wedding venues',                  highlights: ['Nashik', 'Sula Vineyards', 'Grover Zampa', 'Champagne Valley'] },
  'mountain': { title: 'Mountain Venues',         emoji: '🏔️', desc: 'Mountain top wedding venues',                     highlights: ['Manali', 'Shimla', 'Mussoorie', 'Coorg'] },
  'yacht':    { title: 'Boat & Yacht Venues',     emoji: '🛥️', desc: 'Luxury yacht and boat wedding venues',            highlights: ['Mumbai Yachts', 'Goa Boats', 'Kerala Houseboats', 'Lake Cruises'] },
  'default':  { title: 'Wedding Venues',          emoji: '💒', desc: 'Perfect venues for your dream wedding',          highlights: ['Beach', 'Palace', 'Resort', 'Mountain'] },
}

export const WEDDING_THEMES = {
  'royal':       { title: 'Royal Weddings',       emoji: '👑', desc: 'Majestic royal-themed celebrations',             highlights: ['Palace Décor', 'Elephant Procession', 'Royal Cuisine', 'Band Baaja'] },
  'beach':       { title: 'Beach Weddings',       emoji: '🏖️', desc: 'Casual and romantic beach ceremonies',           highlights: ['Sand Aisle', 'Sunset Ceremony', 'Tropical Flowers', 'Barefoot Reception'] },
  'boho':        { title: 'Boho Weddings',        emoji: '🌻', desc: 'Free-spirited bohemian celebrations',            highlights: ['Macramé Décor', 'Wildflowers', 'Fairy Lights', 'Outdoor Venues'] },
  'traditional': { title: 'Traditional Weddings',  emoji: '🪔', desc: 'Authentic Indian traditional ceremonies',        highlights: ['Mandap', 'Saptapadi', 'Mehendi', 'Haldi Ceremony'] },
  'modern':      { title: 'Modern Weddings',      emoji: '💎', desc: 'Sleek and contemporary celebrations',            highlights: ['Minimalist Décor', 'LED Lighting', 'Fusion Menu', 'Photo Booths'] },
  'intimate':    { title: 'Intimate Weddings',    emoji: '💕', desc: 'Small and intimate gatherings',                  highlights: ['Close Family', 'Personal Touch', 'Unique Venues', 'Custom Menu'] },
  'luxury':      { title: 'Luxury Weddings',      emoji: '✨', desc: 'Extravagant luxury celebrations',                highlights: ['Five Star Venues', 'Celebrity Performers', 'Imported Flowers', 'Designer Décor'] },
  'eco':         { title: 'Eco-friendly Weddings', emoji: '🌿', desc: 'Sustainable green celebrations',                highlights: ['Zero Waste', 'Local Flowers', 'Organic Menu', 'Solar Power'] },
  'pre-wedding': { title: 'Pre Wedding Shoots',   emoji: '📸', desc: 'Stunning pre-wedding photo shoots',              highlights: ['Location Scouting', 'Photographer', 'Videographer', 'Styling'] },
  'mehendi':     { title: 'Mehendi Ideas',        emoji: '🎨', desc: 'Beautiful mehendi ceremony ideas',               highlights: ['Mehendi Artists', 'Décor', 'Music', 'Mehendi Favors'] },
  'sangeet':     { title: 'Sangeet Ideas',        emoji: '🎵', desc: 'Musical sangeet night ideas',                    highlights: ['Dance Floor', 'Live Band', 'DJ', 'Lighting'] },
  'default':     { title: 'Wedding Themes',       emoji: '💒', desc: 'Perfect theme for your dream wedding',           highlights: ['Royal', 'Beach', 'Traditional', 'Modern'] },
}

// ── Medical Tourism ─────────────────────────────────────────────────
export const MEDICAL_TREATMENTS = {
  'cardiac':     { title: 'Cardiac Care',          emoji: '❤️', desc: 'World-class cardiac treatment at affordable cost',     highlights: ['Bypass Surgery', 'Angioplasty', 'Valve Replacement', 'Heart Transplant'] },
  'orthopedics': { title: 'Orthopedics',           emoji: '🦴', desc: 'Joint replacement and orthopedic treatments',         highlights: ['Knee Replacement', 'Hip Replacement', 'Spine Surgery', 'Sports Medicine'] },
  'oncology':    { title: 'Oncology (Cancer Care)', emoji: '🎗️', desc: 'Advanced cancer treatment and care',                 highlights: ['Chemotherapy', 'Radiation', 'Surgery', 'Immunotherapy'] },
  'neurology':   { title: 'Neurology & Neurosurgery', emoji: '🧠', desc: 'Expert neurological treatments',                 highlights: ['Brain Surgery', 'Spine Surgery', 'Epilepsy Treatment', 'Stroke Care'] },
  'transplant':  { title: 'Organ Transplant',      emoji: '🫀', desc: 'Successful organ transplant procedures',             highlights: ['Kidney Transplant', 'Liver Transplant', 'Heart Transplant', 'Bone Marrow'] },
  'ivf':         { title: 'IVF & Fertility',       emoji: '👶', desc: 'Advanced fertility treatment options',               highlights: ['IVF', 'IUI', 'Surrogacy', 'Egg Freezing'] },
  'cosmetic':    { title: 'Cosmetic & Plastic Surgery', emoji: '✨', desc: 'Aesthetic and reconstructive surgery',          highlights: ['Rhinoplasty', 'Liposuction', 'Facelift', 'Botox'] },
  'dental':      { title: 'Dental Care',           emoji: '🦷', desc: 'Comprehensive dental treatment packages',            highlights: ['Dental Implants', 'Root Canal', 'Teeth Whitening', 'Braces'] },
  'spine':       { title: 'Spine Surgery',         emoji: '🦴', desc: 'Advanced spine treatment and surgery',               highlights: ['Disc Replacement', 'Spinal Fusion', 'Minimally Invasive', 'Rehabilitation'] },
  'ayurveda':    { title: 'Ayurveda & Wellness',   emoji: '🌿', desc: 'Traditional Ayurvedic treatments and wellness',      highlights: ['Panchakarma', 'Ayurvedic Massage', 'Yoga Therapy', 'Meditation'] },
  'default':     { title: 'Medical Treatments',    emoji: '🏥', desc: 'World-class medical treatments in India',           highlights: ['Cardiac', 'Orthopedics', 'Oncology', 'Dental'] },
}

export const MEDICAL_GUIDE = {
  'why-india':     { title: 'Why Choose India',         emoji: '🇮🇳', desc: 'Reasons to choose India for medical treatment',   highlights: ['Affordable Cost', 'Expert Doctors', 'No Wait', 'English Speaking'] },
  'visa':          { title: 'Visa & Travel Info',        emoji: '📋', desc: 'Medical visa information and travel guidance',   highlights: ['Medical Visa', 'Documents', 'Flight Booking', 'Airport Transfer'] },
  'how-it-works':  { title: 'How It Works',              emoji: '🔄', desc: 'Step-by-step medical tourism process',           highlights: ['Consultation', 'Treatment Plan', 'Travel', 'Recovery'] },
  'cost':          { title: 'Cost of Treatment',         emoji: '💰', desc: 'Treatment costs and comparison',                 highlights: ['Price Comparison', 'Package Deals', 'EMI Options', 'Insurance'] },
  'insurance':     { title: 'Insurance Assistance',      emoji: '🛡️', desc: 'Medical insurance guidance',                     highlights: ['Claim Process', 'Coverage', 'Network Hospitals', 'Documentation'] },
  'accommodation': { title: 'Accommodation',             emoji: '🏨', desc: 'Stay options near hospitals',                    highlights: ['Patient Hotels', 'Guest Houses', 'Serviced Apartments', 'Budget Stays'] },
  'transport':     { title: 'Local Transportation',      emoji: '🚗', desc: 'Transportation during your stay',                highlights: ['Airport Pickup', 'Hospital Transfer', 'City Tours', 'Ambulance'] },
  'language':      { title: 'Language Assistance',        emoji: '🗣️', desc: 'Language support and translators',              highlights: ['Medical Interpreters', 'Multi-language', 'Translation Apps', 'Sign Language'] },
  'faqs':          { title: 'FAQs',                      emoji: '❓', desc: 'Frequently asked questions',                    highlights: ['Visa FAQs', 'Treatment FAQs', 'Safety FAQs', 'Payment FAQs'] },
  'default':       { title: 'Patient Guide',             emoji: '📖', desc: 'Complete guide for medical tourists',           highlights: ['Why India', 'Visa', 'Cost', 'Treatment'] },
}

// ── Holiday Category Defaults ───────────────────────────────────────
export const HOLIDAY_DEFAULTS = {
  'luxury':   { title: 'Luxury Holidays',   emoji: '👑', desc: 'Indulge in world-class stays and premium experiences', highlights: ['5-Star Resorts', 'Private Villas', 'Luxury Trains', 'Spa Retreats'] },
  'budget':   { title: 'Budget Holidays',    emoji: '💰', desc: 'Amazing holidays at the best prices',                 highlights: ['Affordable Stays', 'Group Tours', 'Off-season Deals', 'Budget Flights'] },
  'weekend':  { title: 'Weekend Holidays',   emoji: '🚗', desc: 'Short trips and quick getaways',                      highlights: ['Nearby Destinations', 'Quick Escapes', 'Nature Retreats', 'City Breaks'] },
  'group':    { title: 'Group Holidays',     emoji: '👥', desc: 'Perfect for friends, family reunions and large groups', highlights: ['Group Discounts', 'Team Activities', 'Shared Experiences', 'Custom Itineraries'] },
  'solo':     { title: 'Solo Holidays',      emoji: '🧳', desc: 'Travel solo and explore the world on your terms',     highlights: ['Safety Focused', 'Social Hostels', 'Solo-Friendly', 'Self-Guided Tours'] },
  'festival': { title: 'Festival Holidays',  emoji: '🎉', desc: 'Celebrate festivals with special holiday experiences', highlights: ['Diwali', 'Holi', 'Navratri', 'Dussehra'] },
}

// ── Package Category Defaults ───────────────────────────────────────
export const PACKAGE_DEFAULTS = {
  'luxury':  { title: 'Luxury Packages',  emoji: '👑', desc: 'Premium stays and exclusive experiences',        highlights: ['5-Star Hotels', 'Private Tours', 'Luxury Transport', 'Personal Concierge'] },
  'budget':  { title: 'Budget Packages',   emoji: '💰', desc: 'Affordable packages with great value',           highlights: ['Budget Hotels', 'Group Tours', 'Local Transport', 'Included Meals'] },
  'weekend': { title: 'Weekend Packages',  emoji: '🚗', desc: 'Quick weekend getaway packages',                 highlights: ['2-3 Day Trips', 'Nearby Destinations', 'Quick Escapes', 'Road Trips'] },
  'group':   { title: 'Group Packages',    emoji: '👥', desc: 'Packages for groups and large families',         highlights: ['Group Discounts', 'Team Activities', 'Shared Rooms', 'Customizable'] },
  'solo':    { title: 'Solo Travel Packages', emoji: '🧳', desc: 'Curated for the independent traveler',        highlights: ['Solo-Friendly', 'Social Experiences', 'Flexible Plans', 'Safety Assured'] },
}

// ── Default fallback for any unknown slug ───────────────────────────
export const DEFAULT_PAGE = {
  title: 'Coming Soon',
  emoji: '🚧',
  desc: 'This page is under development. Check back soon for amazing content!',
  highlights: ['Exciting Content', 'Coming Soon', 'Stay Tuned'],
}
