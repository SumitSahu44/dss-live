import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// --- COMPONENTS ---
import CustomCursor from "./components/CustomCursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Preloader from "./components/Preloader.jsx";
import CreativeFooter from "./components/CreativeFooter.jsx";
import Home from "./Home.jsx";
import AboutPage from "./components/AboutPage.jsx";
import PortfolioPage from "./components/PortfolioPage.jsx";
// --- PAGES ---

import PerformanceMarketing from "./components/PerformanceMarketing.jsx";
import SocialMediaMarketing from "./components/SocialMediaMarketing.jsx";
import SearchEngineOptimization from "./components/SeoOptimization.jsx";
import InfluencerMarketing from "./components/InfluencerMarketing.jsx";
import ECommerceApplications from "./components/EcommerceApplications.jsx"; 
import Webdev from "./components/Webdev.jsx";
import LetsConnect from "./components/LetsConnect.jsx";
// Lazy Loaded Pages (Inke liye Suspense zaroori hai)
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy.jsx"));
const TermsAndConditions = React.lazy(() => import("./components/TermsAndConditions.jsx"));

// ✅ ULTIMATE SCROLL HANDLER (Top + Hash)
function ScrollController() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Agar URL me #hash hai (Jaise /#contact)
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500); // Thoda delay taaki content load ho jaye
    } 
    // Agar normal page change hai (Jaise Home -> Services)
    else {
      window.scrollTo(0, 0); // PAGE KO TOP PE FEK DO
    }
  }, [pathname, hash]);

  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      {/* 1. Scroll Logic sabse upar */}
      <ScrollController />

      {/* 2. Global Components */}
      <Preloader />
      <CustomCursor />
      <Navbar />

      {/* 3. Routes with Suspense (Loading State) */}
      <Suspense fallback={<div className="h-screen w-full bg-[#050505]"></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/About" element={<AboutPage />} />
            <Route path="/PortfolioPage" element={<PortfolioPage />} />
                 {/* Services Routes */}
          <Route path="/website-design-and-website-development" element={<Webdev />} />
           <Route path="/performance-marketing-ppc" element={<PerformanceMarketing />} />
            <Route path="/social-media-marketing" element={<SocialMediaMarketing />} />
             <Route path="/search-engine-optimization" element={<SearchEngineOptimization />} />
              <Route path="/influencer-marketing" element={<InfluencerMarketing />} />
               <Route path="/e-commerce-applications" element={<ECommerceApplications />} />
          
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="/LetsConnect" element={<LetsConnect />} />
          
        </Routes>
      </Suspense>

      <CreativeFooter />
    </BrowserRouter>
  );
};

export default App;