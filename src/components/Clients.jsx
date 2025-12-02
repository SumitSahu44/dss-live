import React, { useRef, useEffect } from 'react';
// Using CDN imports
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Logos (Using high-quality white versions for dark mode)
const brands = [
  { id: 1, name: "Spotify", src: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
  { id: 2, name: "Slack", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
  { id: 3, name: "Airbnb", src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
  { id: 4, name: "Netflix", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id: 5, name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" },
  { id: 6, name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { id: 7, name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" },
  { id: 8, name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" },
];

export default function Clients() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const rafRef = useRef(null); // Ref for Request Animation Frame

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Entrance
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          force3D: true,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
        }
      );

      // 2. Grid Stagger Entrance
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.05, 
          ease: "back.out(1.5)",
          force3D: true,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        }
      );

      // 3. Floating Logos Animation (Continuous)
      cardsRef.current.forEach((card, i) => {
        const logo = card.querySelector('.brand-logo');
        gsap.to(logo, {
          y: -5,
          duration: 1.5 + Math.random(), // Randomize duration
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random(),
          force3D: true // Smooth movement
        });
      });

    }, containerRef);

    return () => {
        ctx.revert();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // --- OPTIMIZED FLASHLIGHT EFFECT ---
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    // Use cancelAnimationFrame to ensure we only run once per frame (Throttling)
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
        const cards = cardsRef.current;
        const { clientX, clientY } = e;

        cards.forEach((card) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            // Update CSS variables directly
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        rafRef.current = null; // Reset for next frame
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[80vh] bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden font-sans selection:bg-blue-500/30"
    >
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{ 
                backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
                willChange: 'opacity'
            }} 
        />
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#0078f0]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-[#ff9f20]/10 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        
        {/* --- HEADER --- */}
        <div ref={headerRef} className="text-center mb-20 will-change-transform">
            <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.3em] mb-6">
               <div className="w-12 h-[1px] bg-gray-700" />
               <span>Ecosystem</span>
               <div className="w-12 h-[1px] bg-gray-700" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mix-blend-exclusion">
               TRUSTED BY<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">GIANTS.</span>
            </h2>
        </div>

        {/* --- PREMIUM FLASHLIGHT GRID --- */}
        {/* We use gap-[1px] to create the grid lines effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5 rounded-2xl overflow-hidden p-[1px] shadow-2xl">
          
          {brands.map((brand, i) => (
            <div
              key={brand.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative h-48 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors duration-300 flex items-center justify-center overflow-hidden will-change-transform"
            >
              
              {/* 1. FLASHLIGHT BORDER REVEAL (Follows Mouse) */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(
                    600px circle at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.06), 
                    transparent 40%
                  )`
                }}
              />

              {/* 2. INNER GLOW SPOT (Follows Mouse) */}
              <div 
                 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                 style={{
                   background: `radial-gradient(
                     400px circle at var(--mouse-x) var(--mouse-y), 
                     rgba(0, 120, 240, 0.15), 
                     transparent 40%
                   )`
                 }}
              />

              {/* 3. LOGO CONTAINER */}
              <div className="relative z-10 p-8 w-full h-full flex flex-col items-center justify-center">
                 
                 {/* Logo */}
                 <img 
                   src={brand.src} 
                   alt={brand.name}
                   loading="lazy"    // Lazy load
                   decoding="async"
                   width="80"        // Explicit sizing
                   height="80"
                   className="brand-logo w-16 md:w-20 h-16 md:h-20 object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 will-change-transform"
                   style={{
                     filter: 'grayscale(100%) brightness(0.6)',
                   }}
                   onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%) drop-shadow(0 0 20px rgba(255,255,255,0.2))'}
                   onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) brightness(0.6)'}
                 />

                 {/* Brand Name (Hidden initially, slides up on hover) */}
                 <div className="absolute bottom-6 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      {brand.name}
                    </span>
                 </div>

              </div>

            </div>
          ))}
        </div>

        {/* --- BOTTOM TEXT --- */}
        <div className="text-center mt-16 flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm font-light">
              Powering next-gen experiences for world-class teams.
          </p>
          <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0078f0]" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff9f20]" />
          </div>
        </div>

      </div>
    </section>
  );
}