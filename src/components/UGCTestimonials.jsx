import React, { useEffect, useRef } from "react";
// Using CDN imports
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UGCTestimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  // BEST PRACTICE: Add 'poster' images (thumbnails) for videos.
  const testimonials = [
    { 
      id: 1, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=400", 
      name: "Rohan Sharma", 
      company: "Starlight Solar" 
    },
    { 
      id: 2, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400",
      name: "Vikram Singh", 
      company: "MixNuts Premium" 
    },
    { 
      id: 3, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      name: "Ankit Patel", 
      company: "Real Estate Pro" 
    },
    { 
      id: 4, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      name: "Mayank Jain", 
      company: "TechVision" 
    },
    { 
      id: 5, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400",
      name: "Suresh Kumar", 
      company: "Luxury Brand" 
    },
    { 
      id: 6, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      name: "Deepak Mehta", 
      company: "E-Commerce Giant" 
    },
    { 
      id: 7, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400",
      name: "Rajesh Verma", 
      company: "Digital Empire" 
    },
    { 
      id: 8, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      name: "Priya Mehta", 
      company: "Fashion Hub" 
    },
  ];

  useEffect(() => {
    // Force refresh to fix any layout shift issues
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

    const ctx = gsap.context(() => {
      
      // 1. Header Entrance
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          force3D: true, 
          scrollTrigger: { 
            trigger: titleRef.current, 
            start: "top 90%" 
          }
        }
      );

      // 2. Horizontal Scroll Container Entrance
      gsap.fromTo(scrollContainerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 85%"
          }
        }
      );

    }, sectionRef);

    return () => {
        ctx.revert();
        clearTimeout(timer);
    };
  }, []);

  // --- HANDLERS (Fixed: Using React Events instead of manual listeners) ---
  const handleMouseEnter = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const video = card.querySelector('video');
    const glow = card.querySelector('.glow-border');
    const overlay = card.querySelector('.video-overlay');
    const playBtn = card.querySelector('.play-btn');

    // Animation
    gsap.to(card, { y: -15, scale: 1.02, duration: 0.4, ease: "power2.out", force3D: true });
    gsap.to(glow, { opacity: 1, duration: 0.4 });
    gsap.to(overlay, { opacity: 0.2, duration: 0.4 }); 
    gsap.to(playBtn, { scale: 0, opacity: 0, duration: 0.3 });

    // Play Video (Safe Play)
    if(video) {
        if (video.readyState === 0) video.load(); // Load if not ready
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.log("Auto-play prevented:", error);
            });
        }
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const video = card.querySelector('video');
    const glow = card.querySelector('.glow-border');
    const overlay = card.querySelector('.video-overlay');
    const playBtn = card.querySelector('.play-btn');

    // Animation Reset
    gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out", force3D: true });
    gsap.to(glow, { opacity: 0, duration: 0.4 });
    gsap.to(overlay, { opacity: 0.6, duration: 0.4 });
    gsap.to(playBtn, { scale: 1, opacity: 1, duration: 0.3 });

    // Pause Video
    if(video) {
        video.pause();
        // Optional: Reset video to start
        video.currentTime = 0; 
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-32 font-sans selection:bg-blue-500/30"
    >
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div 
           className="absolute inset-0 opacity-20 mix-blend-overlay"
           style={{ 
             backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
             willChange: 'opacity' 
           }} 
         />
         
         {/* Grid */}
         <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem]" />
         </div>

         {/* Ambient Glows */}
         <div className="absolute top-1/3 left-[-10%] w-[40vw] h-[40vw] bg-[#0078f0]/15 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-0 right-[-10%] w-[40vw] h-[40vw] bg-[#ff9f20]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div ref={titleRef} className="text-center mb-20 will-change-transform">
          <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-6">
             <div className="w-12 h-[1px] bg-gray-700" />
             <span>Success Stories</span>
             <div className="w-12 h-[1px] bg-gray-700" />
          </div>

          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none text-white mix-blend-exclusion">
             REAL<br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">RESULTS.</span>
          </h2>
        </div>

        {/* --- HORIZONTAL SCROLL TRACK --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide px-4 md:px-10 pb-12 will-change-transform"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex-shrink-0 w-[85vw] md:w-[400px] cursor-pointer"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              
              {/* --- CARD CONTAINER --- */}
              <div className="relative h-[55vh] md:h-[550px] bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 transition-transform duration-500">
                
                {/* 1. GLOW BORDER */}
                <div className="glow-border absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 pointer-events-none z-20"
                     style={{ 
                       boxShadow: 'inset 0 0 40px rgba(0,120,240,0.3)',
                       border: '2px solid rgba(255,159,32,0.5)' 
                     }} 
                />

                {/* 2. VIDEO LAYER */}
                <video
                  src={t.video}
                  poster={t.poster}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out bg-gray-900"
                  loop
                  muted
                  playsInline
                  preload="metadata" // Changed to metadata for faster start
                />

                {/* 3. GRADIENT OVERLAY */}
                <div className="video-overlay absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity duration-500 z-10" />

                {/* 4. CONTENT */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30">
                  <div className="play-btn flex items-center gap-3 mb-2 transition-all duration-300">
                     <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                           <path d="M8 5v14l11-7z" />
                        </svg>
                     </div>
                     <span className="text-xs font-bold uppercase tracking-widest text-[#0078f0]">Hover to Play</span>
                  </div>

                  <h3 className="text-3xl font-bold text-white leading-tight mb-1">
                    {t.name}
                  </h3>
                  <p className="text-sm font-mono text-[#ff9f20] tracking-wider">
                    {t.company}
                  </p>
                </div>

              </div>

              {/* Reflection/Shadow underneath */}
              <div className="absolute -bottom-4 left-4 right-4 h-4 bg-[#0078f0]/20 blur-xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

            </div>
          ))}
          
          {/* Spacer */}
          <div className="w-10 flex-shrink-0" />
        </div>

        {/* --- STATS FOOTER --- */}
        <div className="text-center mt-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50">
           <div className="text-center">
              <div className="text-3xl font-black text-white">500+</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">Happy Clients</div>
           </div>
           <div className="hidden md:block w-[1px] h-8 bg-gray-700" />
           <div className="text-center">
              <div className="text-3xl font-black text-white">10+</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">Countries Served</div>
           </div>
        </div>

      </div>

      {/* Hide Scrollbar Utility */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default UGCTestimonials;