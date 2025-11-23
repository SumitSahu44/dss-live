import React from 'react'
import Navbar from './components/Navbar.jsx'
// import HeroSection from './components/HeroSection.jsx'
// import Hero from './components/Hero.jsx'
import NewHero from './components/NewHero.jsx'
import SatisfactionText from './components/SatisfactionText.jsx'
import CreativeAgencySection from './components/CreativeAgencySection.jsx'
import UGCTestimonials from './components/UGCTestimonials.jsx'
import PremiumHero from './components/PremiumHero.jsx'
import CustomCursor from './components/CustomCursor.jsx'
// import InfiniteServicesMarquee from './components/InfiniteServicesMarquee.jsx'
// import BeyondPixelsSection from './components/BeyondPixelsSection.jsx'
import PortfolioShowcase from './components/PortfolioShowcase.jsx'
import CreativeFooter from './components/CreativeFooter.jsx'
import ContactSection from './components/ContactSection.jsx'
import AboutSection from './components/AboutSection.jsx'

const App = () => {
  return (
    <div>
      <CustomCursor  />
      <Navbar />
      <PremiumHero />
      <AboutSection />
      {/* <NewHero /> */}
      {/* <Hero /> */}
      <SatisfactionText />
      <CreativeAgencySection />
      <PortfolioShowcase />
      {/* <BeyondPixelsSection /> */}
      {/* <InfiniteServicesMarquee /> */}
      <UGCTestimonials />
      <ContactSection />
      <CreativeFooter />
    </div>
  )
}

export default App
