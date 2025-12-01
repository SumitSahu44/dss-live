import React, { useState, useEffect, useRef } from "react";
import gsap from "https://esm.sh/gsap";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // --- SMART SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if at the very top OR scrolling UP
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling DOWN -> Hide
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu on scroll
      } else {
        // Scrolling UP -> Show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // --- MOBILE MENU ANIMATION ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Glass Container */}
        <div className="absolute inset-0border-b border-white/10" />
        
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0078f0] to-transparent opacity-50" />

        <div className="container mx-auto px-6 py-4 relative z-10 flex items-center justify-between">
          
          {/* --- LOGO --- */}
          <a href="#" className="flex items-center gap-2 group">
            {/* Replace src with your actual logo path */}
            <div className="w-20 h-20 flex items-center justify-center  overflow-hidden group-hover:border-[#0078f0] transition-colors">
               {/* Placeholder for Logo Image */}
               <img 
                 src="/images/Logo DSS RGB-01.png" 
                 alt="Logo" 
                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
               />
            </div>
          
          </a>

          {/* --- DESKTOP LINKS --- */}
          <div className="hidden md:flex items-center gap-8">
            {['Work', 'Services', 'About', 'Insights'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff9f20] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* --- CTA BUTTON & MOBILE TOGGLE --- */}
          <div className="flex items-center gap-4">
            
            {/* Desktop CTA */}
            <a 
              href="#contact" 
              className="hidden md:flex group relative px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Let's Talk</span>
              <div className="absolute inset-0 bg-[#0078f0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
            >
              <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        <div 
          ref={mobileMenuRef} 
          className="md:hidden overflow-hidden h-0 bg-[#050505] border-b border-white/10"
        >
          <div className="flex flex-col items-center gap-6 py-8">
            {['Work', 'Services', 'About', 'Insights'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="text-lg font-medium text-gray-300 hover:text-[#0078f0] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Project
            </a>
          </div>
        </div>

      </nav>
    </>
  );
}