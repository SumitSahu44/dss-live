import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import RichAdmin from "./components/AdminPanel.jsx";
// Lazy Loaded Pages
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy.jsx"));
const TermsAndConditions = React.lazy(() => import("./components/TermsAndConditions.jsx"));

/* ================= SCROLL CONTROLLER ================= */
function ScrollController() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const App = () => {
  /* ================= GLOBAL SCHEMA ================= */

    /* ================= GLOBAL SCHEMA ================= */
const isAdmin = location.pathname === "/adminsurendraseo";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digital Success Solutions",
    "alternateName": "DSS",
    "url": "https://digitalsuccesssolutions.in",
    "logo": "https://digitalsuccesssolutions.in/logo.png",
    "description":
      "Digital Success Solutions is a full-service digital marketing agency providing SEO, PPC, social media marketing, web development, ecommerce solutions, and branding services.",
    "foundingDate": "2022",
    "sameAs": [
      "https://www.facebook.com/p/Digital-Success-Solutions-61567317789854/",
      "https://www.instagram.com/digitalsuccess_solutions/",
      "https://www.linkedin.com/company/digital-success-solutions-dss/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "availableLanguage": ["English"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Digital Success Solutions",
    "url": "https://digitalsuccesssolutions.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target":
        "https://digitalsuccesssolutions.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };


  return (
    <BrowserRouter>

      {/* ========== GLOBAL SEO + SCHEMA ========== */}
    <Helmet>
  <title>Digital Success Solutions – Digital Marketing Agency</title>
  <meta
    name="description"
    content="Digital Success Solutions helps businesses grow with SEO, PPC, social media marketing, web development, ecommerce solutions and branding."
  />

  <script type="application/ld+json">
    {JSON.stringify(organizationSchema)}
  </script>

  <script type="application/ld+json">
    {JSON.stringify(websiteSchema)}
  </script>
</Helmet>


      {/* Scroll Logic */}
      <ScrollController />

      {/* Global Components */}
      <Preloader />
      <CustomCursor />
      {/* Navbar sirf tab dikhega jab route admin wala nahi hoga */}
      {!isAdmin && <Navbar />}

      {/* Routes */}
      <Suspense fallback={<div className="h-screen w-full bg-[#050505]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfoliopage" element={<PortfolioPage />} />

          {/* Services */}
          <Route path="/website-design-and-website-development" element={<Webdev />} />
          <Route path="/performance-marketing-ppc" element={<PerformanceMarketing />} />
          <Route path="/social-media-marketing" element={<SocialMediaMarketing />} />
          <Route path="/search-engine-optimization" element={<SearchEngineOptimization />} />
          <Route path="/influencer-marketing" element={<InfluencerMarketing />} />
          <Route path="/e-commerce-applications" element={<ECommerceApplications />} />

          {/* Blogs */}
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:title" element={<BlogDetail />} />

          {/* Legal + Contact */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/LetsConnect" element={<LetsConnect />} />
          <Route path="/contact-us" element={<LetsConnect />} />


          <Route path="/adminsurendraseo" element={<RichAdmin />} />
        </Routes>
      </Suspense>

    {/* Footer sirf tab dikhega jab route admin wala nahi hoga */}
      {!isAdmin && <CreativeFooter />}
    </BrowserRouter>
  );
};

export default App;
