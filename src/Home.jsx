import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PremiumHero from "./components/PremiumHero.jsx";
import TestimonialSection from "./components/Testimonials.jsx";
import WhyChooseDSS from "./components/WhyChooseDSS.jsx";
const DssAbout = React.lazy(() => import("./components/DssAbout.jsx"));
const AchievementTimeline = React.lazy(() => import("./components/Achivements.jsx"));
const Deconstructed = React.lazy(() => import("./components/Deconstructed.jsx"));
// const PortfolioShowcase = React.lazy(() => import("./components/PortfolioShowcase.jsx"));
import PortfolioShowcasenew from "./components/PortfolioShowcasenew.jsx";
const Clients = React.lazy(() => import("./components/Clients.jsx"));
const NewVisionMission = React.lazy(() => import("./components/NewVisionMission.jsx"));
const UGCTestimonials = React.lazy(() => import("./components/UGCTestimonials.jsx"));
// const ContactSection = React.lazy(() => import("./components/ContactSection.jsx"));
import  DssPhilosophy from "./components/DssPhilosophy.jsx";
import HeroBg from "./components/HeroBg.jsx";

/* ✅ PRO Loader – black, no white flash */
const Loader = () => (
  <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  /* ✅ Wait till DOM fully ready */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /* ✅ Perfect hash scroll */
  useEffect(() => {
    if (location.hash && isReady) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location, isReady]);

  /* ✅ Stop white flash while lazy components load */
  if (!isReady) {
    return <Loader />;
  }

  return (
    <div className="w-full overflow-hidden bg-[#050505] text-white">
      {/* 1️⃣ Hero */}
      <section id="hero">
        {/* <PremiumHero /> */}
        <HeroBg />
      </section>

      <Suspense fallback={<Loader />}>
        {/* 2️⃣ About */}
        <section id="about">
          <DssAbout />
        </section>

        {/* 3️⃣ Services */}
        <section id="services">
          <Deconstructed />
        </section>

        {/* 4️⃣ Work / Timeline */}
        <section id="work">
          <AchievementTimeline />
        </section>

        {/* 5️⃣ Portfolio */}
        <section id="portfolio">
          <PortfolioShowcasenew />
        </section>


       <WhyChooseDSS />

        {/* 6️⃣ Vision & Mission */}
        <section id="visionmission">
          <NewVisionMission />
        </section>

        {/* 7️⃣ Clients */}
        <section id="clients">
          <Clients />
        </section>



   {/* 6️⃣ Vision & Mission */}
        <section id="dssphilosophy">
          <DssPhilosophy />
        </section>



        {/* 8️⃣ UGC Testimonials */}
        {/* <section id="ugc">
          <UGCTestimonials />
        </section> */}

        {/* 9️⃣ Normal Testimonials */}
        <section id="testimonials">
          <TestimonialSection />
        </section>




        {/* 🔟 Contact */}
        {/* <section id="contact">
          <ContactSection />
        </section> */}
      </Suspense>
    </div>
  );
};

export default Home;
