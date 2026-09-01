import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import CustomerLayout from './layouts/CustomerLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import HomePage from './pages/home/HomePage'
import DestinationsPage from './pages/destinations/DestinationsPage'
import DestinationDetail from './pages/destinations/DestinationDetail'
import PackagesPage from './pages/packages/PackagesPage'
import PackageDetail from './pages/packages/PackageDetail'
import HotelsPage from './pages/hotels/HotelsPage'
import HotelDetail from './pages/hotels/HotelDetail'
import ActivitiesPage from './pages/activities/ActivitiesPage'
import ActivityDetail from './pages/activities/ActivityDetail'
import BlogPage from './pages/blog/BlogPage'
import BlogDetail from './pages/blog/BlogDetail'
import OffersPage from './pages/offers/OffersPage'
import AboutPage from './pages/about/AboutPage'
import ContactPage from './pages/contact/ContactPage'
import PlanTripPage from './pages/home/PlanTripPage'
import MenuLandingPage from './pages/menu/MenuLandingPage'
import IndiaPage from './pages/india/IndiaPage'
import AllDescriptionsPage from './pages/india/AllDescriptionsPage'
import InternationalPage from './pages/international/InternationalPage'
import CountryPage from './pages/international/CountryPage'
import InternationalDestPage from './pages/international/InternationalDestPage'
import InternationalPlacesPage from './pages/international/InternationalPlacesPage'
import InternationalActivitiesPage from './pages/international/InternationalActivitiesPage'
import InternationalCitiesPage from './pages/international/InternationalCitiesPage'
import HolidayPage from './pages/holiday/HolidayPage'
import HolidayCategoryPage from './pages/holiday/HolidayCategoryPage'
import DomesticHoneymoonPage from './pages/holiday/DomesticHoneymoonPage'
import InternationalHoneymoonPage from './pages/holiday/InternationalHoneymoonPage'
import BeachHoneymoonPage from './pages/holiday/BeachHoneymoonPage'
import HillStationHoneymoonPage from './pages/holiday/HillStationHoneymoonPage'
import LuxuryHoneymoonPage from './pages/holiday/LuxuryHoneymoonPage'
import AdventureHoneymoonPage from './pages/holiday/AdventureHoneymoonPage'
import BudgetHoneymoonPage from './pages/holiday/BudgetHoneymoonPage'
import HoneymoonPackagesPage from './pages/holiday/HoneymoonPackagesPage'
import MICEPage from './pages/mice/MICEPage'
import MICEDestinationPage from './pages/mice/MICEDestinationPage'
import CorporateTravelPage from './pages/mice/CorporateTravelPage'
import MICESupportPage from './pages/mice/MICESupportPage'
import WeddingPage from './pages/wedding/WeddingPage'
import RajasthanWeddingPage from './pages/wedding/RajasthanWeddingPage'
import MedicalTourismPage from './pages/medical/MedicalTourismPage'
import GujaratPage from './pages/gujarat/GujaratPage'
import RajasthanPage from './pages/rajasthan/RajasthanPage'
import MaharashtraPage from './pages/maharashtra/MaharashtraPage'
import GoaPage from './pages/goa/GoaPage'
import KeralaPage from './pages/kerala/KeralaPage'
import TamilNaduPage from './pages/tamil-nadu/TamilNaduPage'
import HimachalPradeshPage from './pages/himachal/HimachalPradeshPage'
import UttarakhandPage from './pages/uttarakhand/UttarakhandPage'
import KarnatakaPage from './pages/karnataka/KarnatakaPage'
import JammuKashmirPage from './pages/jammu-kashmir/JammuKashmirPage'
import UttarPradeshPage from './pages/uttar-pradesh/UttarPradeshPage'
import MadhyaPradeshPage from './pages/madhya-pradesh/MadhyaPradeshPage'
import WestBengalPage from './pages/west-bengal/WestBengalPage'
import AndamanPage from './pages/andaman/AndamanPage'
import NorthEastPage from './pages/north-east/NorthEastPage'
import CityDetail from './pages/cities/CityDetail'
import InternationalCityDetail from './pages/cities/InternationalCityDetail'
import InternationalPackagesPage from './pages/international/InternationalPackagesPage'
import InternationalPackagePage from './pages/international/InternationalPackagePage'

// Generic Dynamic Pages
import IndiaSubPage from './pages/india/IndiaSubPage'
import IndiaCitiesPage from './pages/india/IndiaCitiesPage'
import ExperiencesPage from './pages/india/ExperiencesPage'
import TravelGuidesPage from './pages/india/TravelGuidesPage'
import HolidaySubPage from './pages/holiday/HolidaySubPage'
import MICESubPage from './pages/mice/MICESubPage'
import WeddingSubPage from './pages/wedding/WeddingSubPage'
import MedicalSubPage from './pages/medical/MedicalSubPage'
import PackageSubPage from './pages/packages/PackageSubPage'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard'
import MyBookings from './pages/customer/MyBookings'
import Wishlist from './pages/customer/Wishlist'
import ProfilePage from './pages/customer/ProfilePage'
import CustomerReviews from './pages/customer/CustomerReviews'
import MyEnquiries from './pages/customer/MyEnquiries'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDestinations from './pages/admin/AdminDestinations'
import AdminPackages from './pages/admin/AdminPackages'
import AdminHotels from './pages/admin/AdminHotels'
import AdminActivities from './pages/admin/AdminActivities'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminBookings from './pages/admin/AdminBookings'
import AdminLeads from './pages/admin/AdminLeads'
import AdminClientInterests from './pages/admin/AdminClientInterests'
import AdminReviews from './pages/admin/AdminReviews'
import AdminApprovalCenter from './pages/admin/AdminApprovalCenter'
import AdminSettings from './pages/admin/AdminSettings'
import AdminPackageForm from './pages/admin/packages/AdminPackageForm'
import AdminDestinationForm from './pages/admin/AdminDestinationForm'
import AdminHotelForm from './pages/admin/AdminHotelForm'
import AdminActivityForm from './pages/admin/AdminActivityForm'
import AdminBlogForm from './pages/admin/AdminBlogForm'
import AdminInvoices from './pages/admin/AdminInvoices'
import AdminInvoiceForm from './pages/admin/AdminInvoiceForm'
import AdminInvoicePreview from './pages/admin/AdminInvoicePreview'
import InvoicePage from './pages/customer/InvoicePage'
import DynamicDestinationPage from './pages/destinations/DynamicDestinationPage'
import NotFoundPage from './pages/NotFoundPage'

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600" /></div>
  if (!user) return <LoginPage />
  if (requireAdmin && !['super_admin', 'admin', 'content_manager', 'editor'].includes(user.role)) return <div className="p-8 text-center"><h1 className="text-2xl font-bold text-red-600">Access Denied</h1><p>You don't have permission.</p></div>
  return children
}

export default function App() {
  return (
    <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* ── Public Routes ──────────────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/family" element={<PackageSubPage />} />
        <Route path="/packages/family/:subSlug" element={<PackageSubPage />} />
        <Route path="/packages/adventure" element={<PackageSubPage />} />
        <Route path="/packages/adventure/:subSlug" element={<PackageSubPage />} />
        <Route path="/packages/luxury" element={<PackageSubPage />} />
        <Route path="/packages/budget" element={<PackageSubPage />} />
        <Route path="/packages/weekend" element={<PackageSubPage />} />
        <Route path="/packages/group" element={<PackageSubPage />} />
        <Route path="/packages/solo" element={<PackageSubPage />} />
        <Route path="/packages/:slug" element={<PackageDetail />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:slug" element={<HotelDetail />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:slug" element={<ActivityDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/guides" element={<TravelGuidesPage />} />
        <Route path="/plan-trip" element={<PlanTripPage />} />
        {/* Dynamic menu landing pages — data from /api/menus/{slug} */}
        <Route path="/india" element={<IndiaPage />} />
        <Route path="/india/descriptions" element={<AllDescriptionsPage />} />
        <Route path="/india/cities" element={<IndiaCitiesPage />} />
        <Route path="/india/experiences" element={<ExperiencesPage />} />
        <Route path="/india/destinations" element={<IndiaSubPage />} />
        <Route path="/india/destinations/:subSlug" element={<IndiaSubPage />} />
        <Route path="/india/places" element={<IndiaSubPage />} />
        <Route path="/india/places/:subSlug" element={<IndiaSubPage />} />
        <Route path="/india/things-to-do" element={<IndiaSubPage />} />
        <Route path="/india/things-to-do/:subSlug" element={<IndiaSubPage />} />
        <Route path="/india/national-parks" element={<IndiaSubPage />} />
        <Route path="/india/national-parks/:subSlug" element={<IndiaSubPage />} />
        <Route path="/india/experiences/:subSlug" element={<IndiaSubPage />} />
        <Route path="/india/:destSlug" element={<MenuLandingPage />} />
        <Route path="/international" element={<InternationalPage />} />
        <Route path="/international/destinations" element={<InternationalDestPage />} />
        <Route path="/international/destinations/:catSlug" element={<InternationalDestPage />} />
        <Route path="/international/places" element={<InternationalPlacesPage />} />
        <Route path="/international/places/:placeSlug" element={<InternationalPlacesPage />} />
        <Route path="/international/cities" element={<InternationalCitiesPage />} />
        <Route path="/international/things-to-do" element={<InternationalActivitiesPage />} />
        <Route path="/international/things-to-do/:actSlug" element={<InternationalActivitiesPage />} />
        <Route path="/international/:destSlug/packages" element={<InternationalPackagePage />} />
        <Route path="/international/:destSlug" element={<CountryPage />} />
        <Route path="/holiday" element={<HolidayPage />} />
        <Route path="/holiday/:destSlug" element={<HolidayPage />} />
        <Route path="/holidays" element={<HolidayPage />} />
        <Route path="/holidays/adventure" element={<HolidaySubPage />} />
        <Route path="/holidays/adventure/:subSlug" element={<HolidaySubPage />} />
        <Route path="/holidays/beach" element={<HolidaySubPage />} />
        <Route path="/holidays/beach/:subSlug" element={<HolidaySubPage />} />
        <Route path="/holidays/spiritual" element={<HolidaySubPage />} />
        <Route path="/holidays/spiritual/:subSlug" element={<HolidaySubPage />} />
        <Route path="/holidays/luxury" element={<HolidaySubPage />} />
        <Route path="/holidays/budget" element={<HolidaySubPage />} />
        <Route path="/holidays/weekend" element={<HolidaySubPage />} />
        <Route path="/holidays/group" element={<HolidaySubPage />} />
        <Route path="/holidays/solo" element={<HolidaySubPage />} />
        <Route path="/holidays/festival" element={<HolidaySubPage />} />
        <Route path="/holidays/:typeSlug" element={<HolidayCategoryPage />} />
        <Route path="/holidays/domestic-honeymoon" element={<DomesticHoneymoonPage />} />
        <Route path="/holidays/international-honeymoon" element={<InternationalHoneymoonPage />} />
        <Route path="/holidays/beach-honeymoon" element={<BeachHoneymoonPage />} />
        <Route path="/holidays/hill-station-honeymoon" element={<HillStationHoneymoonPage />} />
        <Route path="/holidays/luxury-honeymoon" element={<LuxuryHoneymoonPage />} />
        <Route path="/holidays/adventure-honeymoon" element={<AdventureHoneymoonPage />} />
        <Route path="/holidays/budget-honeymoon" element={<BudgetHoneymoonPage />} />
        <Route path="/holidays/honeymoon-packages" element={<HoneymoonPackagesPage />} />
        <Route path="/holidays/:typeSlug/:subSlug" element={<HolidayCategoryPage />} />
        <Route path="/mice" element={<MICEPage />} />
        <Route path="/mice/destinations" element={<MICEDestinationPage />} />
        <Route path="/mice/destinations/:destSlug" element={<MICEDestinationPage />} />
        <Route path="/mice/corporate-travel" element={<CorporateTravelPage />} />
        <Route path="/mice/corporate-travel/:serviceSlug" element={<CorporateTravelPage />} />
        <Route path="/mice/support" element={<MICESupportPage />} />
        <Route path="/mice/support/:serviceSlug" element={<MICESupportPage />} />
        <Route path="/mice/meetings" element={<MICESubPage />} />
        <Route path="/mice/meetings/:subSlug" element={<MICESubPage />} />
        <Route path="/mice/incentives" element={<MICESubPage />} />
        <Route path="/mice/incentives/:subSlug" element={<MICESubPage />} />
        <Route path="/mice/conferences" element={<MICESubPage />} />
        <Route path="/mice/conferences/:subSlug" element={<MICESubPage />} />
        <Route path="/mice/exhibitions" element={<MICESubPage />} />
        <Route path="/mice/exhibitions/:subSlug" element={<MICESubPage />} />
        <Route path="/mice/events" element={<MICESubPage />} />
        <Route path="/mice/events/:subSlug" element={<MICESubPage />} />
        <Route path="/destination-wedding" element={<WeddingPage />} />
        <Route path="/destination-weddings" element={<WeddingPage />} />
        <Route path="/destination-wedding/:destSlug" element={<WeddingPage />} />
        <Route path="/destination-weddings/:destSlug" element={<WeddingPage />} />
        <Route path="/destination-weddings/india" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/india/:subSlug" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/international" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/international/:subSlug" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/venues" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/venues/:subSlug" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/themes" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/themes/:subSlug" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/guides" element={<WeddingSubPage />} />
        <Route path="/destination-weddings/guides/:subSlug" element={<WeddingSubPage />} />
        <Route path="/weddings/rajasthan" element={<RajasthanWeddingPage />} />
        <Route path="/medical-tourism" element={<MedicalTourismPage />} />
        <Route path="/medical-tourism/treatments" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/treatments/:subSlug" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/guide" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/guide/:subSlug" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/hospitals" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/hospitals/:subSlug" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/doctors" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/doctors/:subSlug" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/support" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/support/:subSlug" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/cities" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/india" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/india/:subSlug" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/compare" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/destinations" element={<MedicalSubPage />} />
        <Route path="/medical-tourism/:destSlug" element={<MedicalTourismPage />} />
        <Route path="/gujarat" element={<GujaratPage />} />
        <Route path="/rajasthan" element={<RajasthanPage />} />
        <Route path="/maharashtra" element={<MaharashtraPage />} />
        <Route path="/goa" element={<GoaPage />} />
        <Route path="/kerala" element={<KeralaPage />} />
        <Route path="/tamil-nadu" element={<TamilNaduPage />} />
        <Route path="/himachal-pradesh" element={<HimachalPradeshPage />} />
        <Route path="/uttarakhand" element={<UttarakhandPage />} />
        <Route path="/karnataka" element={<KarnatakaPage />} />
        <Route path="/jammu-kashmir" element={<JammuKashmirPage />} />
        <Route path="/uttar-pradesh" element={<UttarPradeshPage />} />
        <Route path="/madhya-pradesh" element={<MadhyaPradeshPage />} />
        <Route path="/west-bengal" element={<WestBengalPage />} />
        <Route path="/andaman" element={<AndamanPage />} />
        <Route path="/north-east" element={<NorthEastPage />} />
        <Route path="/india/:stateSlug/:citySlug" element={<CityDetail />} />
        <Route path="/international/:countrySlug/packages" element={<InternationalPackagesPage />} />
        <Route path="/international/:countrySlug/:citySlug" element={<InternationalCityDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Dynamic CMS destination page — catches any slug not matched above */}
        <Route path="/:destSlug" element={<DynamicDestinationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* ── Customer Routes ────────────────────────────────────── */}
      <Route element={<ProtectedRoute><CustomerLayout /></ProtectedRoute>}>
        <Route path="/account" element={<CustomerDashboard />} />
        <Route path="/account/profile" element={<ProfilePage />} />
        <Route path="/account/bookings" element={<MyBookings />} />
        <Route path="/account/wishlist" element={<Wishlist />} />
        <Route path="/account/reviews" element={<CustomerReviews />} />
        <Route path="/account/enquiries" element={<MyEnquiries />} />
        <Route path="/invoices/:id" element={<InvoicePage />} />
      </Route>

      {/* ── Admin Routes ───────────────────────────────────────── */}
      <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="destinations" element={<AdminDestinations />} />
        <Route path="destinations/new" element={<AdminDestinationForm />} />
        <Route path="destinations/edit/:id" element={<AdminDestinationForm />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="packages/new" element={<AdminPackageForm />} />
        <Route path="packages/edit/:id" element={<AdminPackageForm />} />
        <Route path="hotels" element={<AdminHotels />} />
        <Route path="hotels/new" element={<AdminHotelForm />} />
        <Route path="hotels/edit/:id" element={<AdminHotelForm />} />
        <Route path="activities" element={<AdminActivities />} />
        <Route path="activities/new" element={<AdminActivityForm />} />
        <Route path="activities/edit/:id" element={<AdminActivityForm />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="blogs/new" element={<AdminBlogForm />} />
        <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="client-interests" element={<AdminClientInterests />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="approvals" element={<AdminApprovalCenter />} />
        <Route path="invoices" element={<AdminInvoices />} />
        <Route path="invoices/create" element={<AdminInvoiceForm />} />
        <Route path="invoices/edit/:id" element={<AdminInvoiceForm />} />
        <Route path="invoices/preview/:id" element={<AdminInvoicePreview />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
