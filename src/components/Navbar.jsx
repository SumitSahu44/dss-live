import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ChevronDown, Globe, Megaphone, Share2, Search, Users, ShoppingBag } from "lucide-react";

export default function Navbar() {
  // --- STATE ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // --- SERVICES DATA ---
  const services = [
    { name: "Website Development", path: "/website-design-and-website-development", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10" },
    { name: "Performance Marketing", path: "/performance-marketing-ppc", icon: Megaphone, color: "text-orange-400", bg: "bg-orange-500/10" },
    { name: "Social Media", path: "/social-media-marketing", icon: Share2, color: "text-pink-400", bg: "bg-pink-500/10" },
    { name: "SEO Optimization", path: "/search-engine-optimization", icon: Search, color: "text-green-400", bg: "bg-green-500/10" },
    { name: "Influencer Marketing", path: "/influencer-marketing", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
    { name: "E-Commerce Apps", path: "/e-commerce-applications", icon: ShoppingBag, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ];

  // --- DESKTOP DROPDOWN ANIMATION (Smoother Logic) ---
  useEffect(() => {
    const el = dropdownRef.current;
    if (isServicesOpen) {
      // Kill previous animations to stop flickering
      gsap.killTweensOf(el);
      gsap.to(el, { 
        autoAlpha: 1, // Handles opacity + visibility
        y: 0, 
        display: "grid", 
        duration: 0.3, 
        ease: "power2.out",
        overwrite: true 
      });
    } else {
      gsap.to(el, { 
        autoAlpha: 0, 
        y: 10, 
        display: "none", 
        duration: 0.2, 
        overwrite: true 
      });
    }
  }, [isServicesOpen]);

  // --- MOBILE MENU ANIMATION ---
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const overlay = menuOverlayRef.current;

    if (isMobileMenuOpen) {
      gsap.to(overlay, { autoAlpha: 1, duration: 0.3 });
      gsap.to(menu, { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
    } else {
      gsap.to(menu, { y: -20, opacity: 0, duration: 0.25, ease: "power3.in" });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25 });
    }
  }, [isMobileMenuOpen]);

  // --- NAVIGATION HANDLER ---
  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    navigate(path);
    window.scrollTo(0, 0); 
  };

  return (
    <>
      {/* --- MAIN NAVBAR (Absolute) --- */}
      <nav
        ref={navRef}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto md:min-w-[700px] max-w-7xl rounded-full"
      >
        {/* Glass Background */}
        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

        <div className="relative px-6 py-3 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center z-20 mr-8">
            <img
              src="/images/logo.png"
              alt="Brand Logo"
              className="h-10 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1">
            <button 
                onClick={() => handleNavClick("/")} 
                className="px-5 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 uppercase tracking-wide"
            >
                Home
            </button>
            <button 
                onClick={() => handleNavClick("/about")} 
                className="px-5 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 uppercase tracking-wide"
            >
                Who We Are
            </button>
            
            {/* Services Dropdown Trigger (Wrapper with Event Handlers) */}
            <div 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
            >
                <button 
                    className={`px-5 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 uppercase tracking-wide flex items-center gap-1 ${isServicesOpen ? "text-white bg-white/10" : ""}`}
                >
                    Services <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>

                {/* --- INVISIBLE BRIDGE (The Fix for Flickering) --- */}
                {/* Ye invisible box button aur menu ke beech ka gap bharta hai */}
                <div className="absolute top-full left-0 w-full h-6 bg-transparent z-50"></div>

                {/* MEGA MENU DROPDOWN */}
                <div 
                    ref={dropdownRef}
                    className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[600px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 grid grid-cols-2 gap-4 shadow-2xl origin-top z-[60]"
                    style={{ display: 'none', opacity: 0, visibility: 'hidden' }}
                >
                    {/* Decorative Arrow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-t border-l border-white/10 rotate-45" />

                    {services.map((service, i) => (
                        <div 
                            key={i}
                            onClick={(e) => { e.stopPropagation(); handleNavClick(service.path); }}
                            className="group/card flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${service.bg} ${service.color} group-hover/card:scale-110 transition-transform`}>
                                <service.icon size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white group-hover/card:text-blue-400 transition-colors">{service.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
              <button 
                onClick={() => handleNavClick("/PortfolioPage")} 
                className="px-5 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 uppercase tracking-wide"
            >
                Portfolio
            </button>
           
          </div>

          {/* CTA + HAMBURGER */}
          <div className="flex items-center gap-3 z-20 ml-auto">
            <Link to="/LetsConnect">
                <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#0078f0] hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,120,240,0.5)]">
                Let’s Talk
                </button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-white/10 rounded-full border border-white/5 active:scale-95 transition-transform"
            >
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`w-4 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
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
        className="fixed top-24 left-4 right-4 z-40 md:hidden bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 opacity-0 -translate-y-4 shadow-2xl max-h-[80vh] overflow-y-auto"
      >
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => handleNavClick("/")} 
            className="text-lg font-medium text-gray-400 hover:text-white w-full text-left py-3 border-b border-white/5 uppercase tracking-wide active:text-white"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick("/about")} 
            className="text-lg font-medium text-gray-400 hover:text-white w-full text-left py-3 border-b border-white/5 uppercase tracking-wide active:text-white"
          >
            Who We Are
          </button>
          
          {/* Mobile Services Accordion */}
          <div className="w-full border-b border-white/5">
            <button 
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="text-lg font-medium text-gray-400 hover:text-white w-full text-left py-3 uppercase tracking-wide flex justify-between items-center"
            >
                Services <ChevronDown size={16} className={`transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileServicesOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
                <div className="grid grid-cols-1 gap-3 pl-4 border-l border-white/10 ml-4">
                    {services.map((service, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleNavClick(service.path)}
                            className="text-left text-sm text-gray-400 py-2 hover:text-white flex items-center gap-3 transition-colors"
                        >
                            <service.icon size={16} className={service.color} />
                            {service.name}
                        </button>
                    ))}
                </div>
            </div>
          </div>

          <button 
            onClick={() => handleNavClick("/contact-us")} 
            className="text-lg font-medium text-gray-400 hover:text-white w-full text-left py-3 border-b border-white/5 uppercase tracking-wide active:text-white"
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick("/LetsConnect")}
            className="mt-6 w-full py-4 bg-[#0078f0] text-white font-bold text-center rounded-xl uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-transform"
          >
            Start Project
          </button>
        </nav>
      </div>
    </>
  );
}