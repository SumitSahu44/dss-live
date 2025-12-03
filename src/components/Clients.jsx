import React, { useRef, useEffect, useState } from 'react';
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClientsGrid() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const rafRef = useRef(null);

  // --- 1. GENERATE LOGOS (4.png to 44.png) ---
  // Hamne useMemo ya simple constant isliye nahi banaya taaki ye dynamic rahe.
  const logos = Array.from({ length: 41 }, (_, i) => {
    const id = i + 4; // Starts from 4
    return {
      id: id,
      name: `Client ${id}`,
      // Note: Make sure images are in your public/assets folder or change path accordingly
      src: `/images/clients/${id}.png` 
    };
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Reveal
      gsap.fromTo(".client-header-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        }
      );

      // 2. Grid Items Stagger Reveal (Waterfall Effect)
      gsap.fromTo(cardsRef.current,
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        {
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 0.6, 
          stagger: {
            amount: 1,
            grid: "auto",
            from: "center"
          }, 
          ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" }
        }
      );

    }, containerRef);

    return () => {
        ctx.revert();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // --- OPTIMIZED MOUSE FLASHLIGHT LOGIC ---
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
        const cards = cardsRef.current;
        if(!cards) return;

        // Mouse position relative to viewport is fine, 
        // but we need relative to card for the internal gradient.
        cards.forEach((card) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        rafRef.current = null;
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#020205] py-24 px-4 md:px-8 overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
    >
      
      {/* --- BACKGROUND AMBIENCE (Theme Match) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        {/* Blue Glow Top Left */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0078f0]/10 rounded-full blur-[180px] mix-blend-screen" />
        {/* Orange Glow Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#ff9f20]/10 rounded-full blur-[180px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="client-header-reveal flex items-center justify-center gap-3 mb-4">
               <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#0078f0]"></span>
               <span className="text-[#0078f0] text-xs font-bold tracking-[0.2em] uppercase">Trusted Ecosystem</span>
               <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#0078f0]"></span>
            </div>
            
            <h2 className="client-header-reveal text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
               Powering the <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">World's Best.</span>
            </h2>
            
            <p className="client-header-reveal text-gray-500 text-sm md:text-base">
                Join 40+ industry leaders who trust our digital craftsmanship.
            </p>
        </div>

        {/* --- THE GRID (Responsive: 2 -> 3 -> 4 -> 6 cols) --- */}
        {/* 'gap-[1px]' creates the sharp grid lines because the parent is bg-white/10 */}
        <div 
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1px] bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {logos.map((logo, i) => (
            <div
              key={logo.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative h-32 sm:h-40 bg-[#050505] hover:bg-[#0a0a0a] transition-colors duration-500 flex items-center justify-center p-6"
            >
              
              {/* 1. FLASHLIGHT BORDER REVEAL */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(
                    600px circle at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.1), 
                    transparent 40%
                  )`
                }}
              />

              {/* 2. INNER COLORED GLOW (Blue/Orange Mix) */}
              <div 
                 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                 style={{
                   background: `radial-gradient(
                     400px circle at var(--mouse-x) var(--mouse-y), 
                     ${i % 2 === 0 ? 'rgba(0, 120, 240, 0.08)' : 'rgba(255, 159, 32, 0.08)'}, 
                     transparent 40%
                   )`
                 }}
              />

              {/* 3. LOGO CONTAINER */}
              <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                 
                 {/* Placeholder Logic for Demo (Remove 'onError' in production if guaranteed) */}
                 <img 
                   src={logo.src} 
                   alt={logo.name}
                   className="max-w-[70%] max-h-[60%] object-contain filter  group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
                   onError={(e) => {
                     // Fallback if image not found (Just for demo visualization)
                     e.target.style.display = 'none';
                     e.target.nextSibling.style.display = 'flex';
                   }}
                 />
                 
                 {/* Fallback Text if image 4.png etc is missing locally */}
                 <div className="hidden absolute inset-0 flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                        {logo.id}
                    </span>
                 </div>
              </div>

            </div>
          ))}
        </div>
        
        {/* Bottom Fade for nicer scroll exit */}
        <div className="h-24 w-full bg-gradient-to-t from-[#020205] to-transparent absolute bottom-0 left-0 pointer-events-none" />

      </div>
    </section>
  );
}