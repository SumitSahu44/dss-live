import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// --- 1. CRITICAL COMPONENTS (Load immediately for fast First Paint) ---
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import PremiumHero from './components/PremiumHero.jsx'
import TestimonialSection from './components/Testimonials.jsx'
import Preloader from './components/Preloader.jsx'
import { Link } from "react-router-dom";
// --- 2. LAZY LOAD HEAVY COMPONENTS (Load only when needed) ---
// Isse initial bundle size kam hoga aur browser hang nahi karega
const DssAbout = React.lazy(() => import('./components/DssAbout.jsx'))
const AchievementTimeline = React.lazy(() => import('./components/Achivements.jsx'))
const Deconstructed = React.lazy(() => import('./components/Deconstructed.jsx'))
const ZeroToHeroScroll = React.lazy(() => import('./Zero-t-Hero.jsx'))
const PortfolioShowcase = React.lazy(() => import('./components/PortfolioShowcase.jsx'))
const Clients = React.lazy(() => import('./components/Clients.jsx'))
const NewVisionMission = React.lazy(() => import('./components/NewVisionMission.jsx'))
const UGCTestimonials = React.lazy(() => import('./components/UGCTestimonials.jsx'))
const ContactSection = React.lazy(() => import('./components/ContactSection.jsx'))
const CreativeFooter = React.lazy(() => import('./components/CreativeFooter.jsx'))

const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy.jsx'))
const TermsAndConditions = React.lazy(() => import('./components/TermsAndConditions.jsx'))
// --- Simple Loading Fallback ---
const Loader = () => (
  <div style={{ height: '20vh', width: '100%', background: '#f5f2eb' }}></div>
)

const App = () => {

  // Optional: Agar aapne Lenis install nahi kiya hai to 'npm i @studio-freight/lenis' karein.
  // Ye fast scrolling pe white screen issue ko 90% fix kar deta hai.
  
 useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}, []);
  
  return (
    <>
   <BrowserRouter>
      <Preloader />
      <CustomCursor />
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="w-full overflow-hidden bg-[#f5f2eb]">
              <PremiumHero />

              <Suspense fallback={<Loader />}>
                <DssAbout />
                <Deconstructed />
                <AchievementTimeline />
                <PortfolioShowcase />
                <NewVisionMission />
                <Clients />
                <UGCTestimonials />
                <TestimonialSection />
                <ContactSection />
              </Suspense>
            </div>
          }
        />

        {/* Privacy Policy Page */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
         <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
      </Routes>

      <CreativeFooter />

      
</BrowserRouter>

    </>
  )
}

export default App