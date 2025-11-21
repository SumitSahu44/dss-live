import React from 'react'
import Navbar from './components/Navbar.jsx'
// import HeroSection from './components/HeroSection.jsx'
// import Hero from './components/Hero.jsx'
import NewHero from './components/NewHero.jsx'
import SatisfactionText from './components/SatisfactionText.jsx'
import CreativeAgencySection from './components/CreativeAgencySection.jsx'
import UGCTestimonials from './components/UGCTestimonials.jsx'
import PremiumHero from './components/PremiumHero.jsx'
// import InfiniteServicesMarquee from './components/InfiniteServicesMarquee.jsx'
// import BeyondPixelsSection from './components/BeyondPixelsSection.jsx'
// import PortfolioShowcase from './components/PortfolioShowcase.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <PremiumHero />
      {/* <NewHero /> */}
      {/* <Hero /> */}
      <SatisfactionText />
      <CreativeAgencySection />
      {/* <PortfolioShowcase /> */}
      {/* <BeyondPixelsSection /> */}
      {/* <InfiniteServicesMarquee /> */}
      <UGCTestimonials />
    </div>
  )
}

export default App
