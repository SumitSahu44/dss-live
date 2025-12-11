import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuOverlayRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // --- SHOW / HIDE ON SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- MOBILE MENU ANIMATION ---
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const overlay = menuOverlayRef.current;

    if (isMobileMenuOpen) {
      gsap.to(overlay, { autoAlpha: 1, duration: 0.3 });
      gsap.to(menu, { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
      gsap.fromTo(
        ".mobile-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.3, delay: 0.1 }
      );
    } else {
      gsap.to(menu, { y: -20, opacity: 0, duration: 0.25, ease: "power3.in" });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25 });
    }
  }, [isMobileMenuOpen]);

  // ✅ UNIVERSAL NAVIGATION FIX - Works from any page
  const goToSection = (hash) => {
    setIsMobileMenuOpen(false);

    // If not on home page → navigate to home with hash
    if (location.pathname !== "/") {
      // Navigate to home page with hash in URL
      // Use React Router's navigate with hash option for proper handling
      const hashValue = hash.startsWith('#') ? hash.substring(1) : hash;
      navigate({ pathname: "/", hash: hashValue }, { replace: false });
      return;
    }

    // Already on home page → update URL and scroll
    // The Home component's useHashScroll hook will handle the actual scrolling
    window.history.pushState(null, "", hash);
    
    // Trigger scroll immediately if element exists, otherwise Home's hook will handle it
    const scrollToElement = (attempt = 0) => {
      const el = document.querySelector(hash);
      if (el) {
        const rect = el.getBoundingClientRect();
        const isRendered = rect.height > 0 || el.offsetHeight > 0;
        
        if (isRendered) {
          const offsetTop = el.offsetTop - 100;
          window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: "smooth"
          });
        } else if (attempt < 5) {
          // Quick retry for immediate scroll if already on page
          setTimeout(() => scrollToElement(attempt + 1), 200);
        }
      } else if (attempt < 5) {
        setTimeout(() => scrollToElement(attempt + 1), 200);
      }
    };
    
    scrollToElement();
  };

  const navLinks = ["work", "services", "portfolio", "about"];

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"}
          w-[90%] md:w-auto md:min-w-[600px] max-w-6xl rounded-full`}
      >
        <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" />

        <div className="relative px-6 py-3 md:py-2 flex items-center justify-between">
          {/* LOGO */}
          <button onClick={() => goToSection("#hero")} className="flex items-center z-20">
            <img
              src="/images/logo.png"
              alt="Brand Logo"
              className="h-12 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </button>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5 border border-white/5 ml-4">
            {/* {navLinks.map((name) => (
              <button
                key={name}
                onClick={() => goToSection(`#${name}`)}
                className="px-5 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))} */}
            <Link to={"/#services"} className="px-5 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
              Services
            </Link>
            <Link to={"/#portfolio"} className="px-5 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
              Portfolio
            </Link>
            <Link to={"/#about"} className="px-5 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
              About
            </Link>
          </div>

          {/* CTA + HAMBURGER */}
          <div className="flex items-center gap-3 z-20">
            <button
              onClick={() => goToSection("#contact")}
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#0078f0] hover:text-white transition-all duration-300"
            >
              Let’s Talk
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-white/10 rounded-full border border-white/5"
            >
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden opacity-0 invisible"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className="fixed top-24 left-4 right-4 z-40 md:hidden bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 opacity-0 -translate-y-4 shadow-2xl"
      >
        <nav className="flex flex-col items-center gap-4">
          {navLinks.map((name) => (
            <button
              key={name}
              onClick={() => goToSection(`#${name}`)}
              className="mobile-link text-lg font-medium text-gray-400 hover:text-white w-full text-center py-2 border-b border-white/5"
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}

          <button
            onClick={() => goToSection("#contact")}
            className="mobile-link mt-2 w-full py-3 bg-[#0078f0] text-white font-bold text-center rounded-xl uppercase text-xs tracking-widest"
          >
            Start Project
          </button>
        </nav>
      </div>
    </>
  );
}
