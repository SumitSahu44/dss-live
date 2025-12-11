import React, { useEffect, useRef, useState, useMemo } from 'react';
import { HashLink } from "react-router-hash-link";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const statsRef = useRef([]);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- 1. SAFE GSAP LOADING ---
  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) {
          setIsGsapReady(true);
          return;
        }
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
                const script = document.createElement('script');
                script.src = src; script.async = true; script.onload = resolve; script.onerror = reject;
                document.body.appendChild(script);
            });
        };
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        setIsGsapReady(true);
      } catch (error) { console.error("GSAP loading failed", error); }
    };
    loadGsap();
  }, []);

  // --- 2. COORDINATES ---
  const stats = useMemo(() => {
    return [
        { number: "950+", label: "Happy Clients", x: -280, y: -190 }, 
        { number: "5+", label: "Years Exp.", x: 280, y: -200 },       
        { number: "1600+", label: "Projects", x: -340, y: -40 },        
        { number: "40+", label: "Industry", x: 340, y: -50 },            
        { number: "₹10Cr+", label: "Revenue", x: -220, y: 100 },       
        { number: "4.9", label: "Rating", x: 220, y: 100 },           
    ];
  }, []);

  // --- 3. ANIMATION LOGIC (FIXED: STATIC POSITIONS) ---
  useEffect(() => {
    if (!isGsapReady || !sectionRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const statsEls = statsRef.current;

    let ctx = gsap.context(() => {
      
      // 1. SETUP: Cards ko seedha unki jagah pe rakh do (No Center Positioning)
      statsEls.forEach((el, i) => {
         if(!el || !stats[i]) return;
         
         gsap.set(el, {
            x: stats[i].x, // Seedha apni coordinates pe
            y: stats[i].y, 
            left: "50%",   // Reference center se
            top: "50%",    
            xPercent: -50, 
            yPercent: -50,
            scale: 0.8,    // Thoda chota start hoga
            opacity: 0,    // Chupa hua
            position: "absolute"
         });
      });

      // 2. REVEAL ANIMATION (Wahi ke wahi Pop-up honge)
      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 70%",
        }
      });

      statsTl.to(statsEls, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1, // Ek ke baad ek aayenge
        ease: "back.out(1.2)", // Thoda sa bounce effect
      });

      // 3. FLOATING LOOP (Sirf Y-axis movement)
      statsEls.forEach((stat, i) => {
        // Random delay taaki sab ek robot ki tarah na hilein
        const randomDelay = Math.random() * 2;
        
        gsap.to(stat, {
          y: `+=${15}`, // Apni jagah se 15px neeche jayega fir wapas aayega
          duration: 2 + Math.random(), // 2 se 3 second ka smooth time
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: randomDelay, // Reveal hone ke baad turant start na ho
        });
      });

      // Text Animations
      gsap.fromTo(".hero-title .char-line", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(".hero-cta", 
        { scale: 0.9, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)", delay: 0.6 }
      );

    }, sectionRef);

    setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => ctx.revert();
  }, [isGsapReady, stats]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen pt-32 md:pt-40 overflow-hidden flex flex-col items-center justify-start px-4 md:px-6 bg-[#020205]"
    >
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a192f] via-[#050505] to-black z-0 pointer-events-none" />
      
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-700/20 blur-[150px] rounded-full z-0 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-800/10 blur-[180px] rounded-full z-0 pointer-events-none mix-blend-screen" />

      {/* --- CREATIVE HERO CONTENT --- */}
      <h1 className="hero-title text-center z-20 mb-12 max-w-6xl relative">
        <div className="flex justify-center mb-6 overflow-hidden">
             <div className="hero-cta inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#ff9f20] opacity-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f20] animate-pulse" />
                Creative Digital Agency
             </div>
        </div>

        <div className="overflow-hidden">
            <div className="char-line block text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter text-zinc-300 leading-[1.1]">
                We <span style={{color:"#0078f0"}} className="italic font-serif">Craft</span> Digital
            </div>
        </div>
        <div className="overflow-hidden">
            <div className="char-line block text-6xl md:text-8xl lg:text-[8.5rem] font-black tracking-tighter uppercase leading-[1]">
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent drop-shadow-2xl">
                    Presence
                </span>
            </div>
        </div>
        <div className="overflow-hidden mt-2">
             <p className="char-line text-zinc-400 text-sm md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                Turning bold ideas into functional realities with code & creativity.
             </p>
        </div>
      </h1>

      <div className="hero-cta z-20 mb-24 relative opacity-0">
        <HashLink smooth to="/#contact">
          <button className="group relative px-10 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]">
            <div className="absolute inset-0 bg-[#0078f0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
              Start Your Journey
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </HashLink>
      </div>

      {/* --- IMAGE & FLOATING STATS --- */}
      <div ref={imageContainerRef} className="relative w-full max-w-6xl mx-auto z-10 pb-32">
        
        {/* Main Image Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 backdrop-blur-sm group will-change-transform aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600" 
              alt="Creative Team"
              loading="eager"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[20%] hover:grayscale-0"
            />
        </div>

        {/* Floating Stats - FIXED & STATIC INITIALLY */}
        {stats.map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            // data attributes hata diye, zaroorat nahi hai ab
            className="hidden md:flex flex-col items-center justify-center
                       absolute z-[50] 
                       /* Glass Style */
                       bg-white/5 backdrop-blur-xl 
                       border border-white/10 hover:border-white/20
                       rounded-2xl p-4 min-w-[130px]
                       shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                       will-change-transform cursor-default
                       opacity-0" // Initially invisible
            style={{ left: "50%", top: "50%" }} // Base position, GSAP will move it
          >
            <div className="text-2xl font-black text-white tracking-tight drop-shadow-md">
              {stat.number}
            </div>
            <div className="text-zinc-400 font-bold text-[10px] tracking-widest uppercase mt-1">
              {stat.label}
            </div>
            
            {/* Subtle bottom highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>
        ))}

        {/* Mobile Stats Grid */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-8 px-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-md">
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;