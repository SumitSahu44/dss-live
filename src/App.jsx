import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import CustomCursor from "./components/CustomCursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Preloader from "./components/Preloader.jsx";
import CreativeFooter from "./components/CreativeFooter.jsx";
import Home from "./Home.jsx";

const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy.jsx"));
const TermsAndConditions = React.lazy(() =>
  import("./components/TermsAndConditions.jsx")
);

// ✅ GLOBAL HASH SCROLL FIX
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const timeout = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 600); // wait for lazy components

    return () => clearTimeout(timeout);
  }, [hash, pathname]);

  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToHash /> {/* ✅ this fixes everything */}

      <Preloader />
      <CustomCursor />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
      </Routes>

      <CreativeFooter />
    </BrowserRouter>
  );
};

export default App;
