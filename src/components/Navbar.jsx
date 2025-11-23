import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  // Smooth scroll
  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      duration: 1.3,
      scrollTo: { y: `#${sectionId}`, offsetY: 90 },
      ease: "power3.inOut",
    });
    setIsMenuOpen(false);
  };

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 150) {
        setIsVisible(false);
      } else if (current < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${lastScrollY > 100 ? "bg-black/70 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-6 py-1">
          <div className="flex items-center justify-between">
            {/* Logo Image - Left */}
            <div
              onClick={() => scrollToSection("home")}
              className="cursor-pointer"
            >
              <img
                src="/images/Logo DSS RGB-01.png" // Apna logo yahan daal do
                alt="Your Agency"
                className="h-20 w-auto object-contain"
              />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative text-white text-sm font-medium tracking-wide transition-all duration-300
                    after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                    after:bg-gradient-to-r after:from-blue-400 after:to-orange-500 
                    after:rounded-full after:transition-all after:duration-500
                    hover:after:w-full hover:text-white"
                >
                  {link.name}
                </button>
              ))}

              {/* CTA */}
              <button
                onClick={() => scrollToSection("contact")}
                className="ml-6 px-6 py-2.5 text-sm font-bold text-white rounded-lg
                  bg-[#0078f0] hover:to-orange-500 
                  shadow-lg hover:shadow-blue-500/30 
                  transition-all duration-300"
              >
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl text-white"
            >
              {isMenuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 pt-20">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-4xl font-bold tracking-tight"
            >
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  i % 2 === 0
                    ? "from-blue-400 to-blue-200"
                    : "from-orange-300 to-orange-500"
                }`}
              >
                {link.name}
              </span>
            </button>
          ))}

          <button
            onClick={() => scrollToSection("contact")}
            className="mt-8 px-12 py-4 text-xl font-bold rounded-xl bg-gradient-to-r from-blue-600 to-orange-600"
          >
            Start Project
          </button>
        </div>
      )}

      {/* Spacer for content */}
      {/* <div className="h-20 md:h-24" /> */}
    </>
  );
};

export default Navbar;