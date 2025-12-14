import React, { useRef, useLayoutEffect } from "react";
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UGCTestimonials = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  const testimonials = [
    { 
      id: 1, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=600&h=1066", 
      name: "Rohan Sharma", 
      role: "Founder, SolarTech" 
    },
    { 
      id: 2, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600&h=1066",
      name: "Vikram Singh", 
      role: "CEO, MixNuts" 
    },
    { 
      id: 3, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=1066",
      name: "Ankit Patel", 
      role: "Realtor" 
    },
    { 
      id: 4, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=1066",
      name: "Mayank Jain", 
      role: "CTO, TechVision" 
    },
    { 
      id: 5, 
      video: "/videos/Video-793.mp4", 
      poster: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600&h=1066",
      name: "Suresh Kumar", 
      role: "Director, Luxe" 
    },
  ];

  // --- ANIMATIONS ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Fade In
      gsap.fromTo(".ugc-header",
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".ugc-header", start: "top 85%" }
        }
      );

      // 2. Cards Stagger In
      gsap.fromTo(cardsRef.current,
        { x: 100, opacity: 0, scale: 0.9 },
        {
          x: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 80%"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- SMART VIDEO HANDLER ---
  const handleMouseEnter = async (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const video = card.querySelector('video');
    const playBtn = card.querySelector('.play-btn');

    gsap.to(card, { y: -10, scale: 1.02, duration: 0.4, ease: "power2.out" });
    gsap.to(playBtn, { opacity: 0, scale: 0.5, duration: 0.3 });

    if (video) {
        try {
            if (video.readyState === 0) video.load(); 
            video.muted = true; 
            await video.play();
        } catch (err) {
            console.log("Hover play interrupted");
        }
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const video = card.querySelector('video');
    const playBtn = card.querySelector('.play-btn');

    gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(playBtn, { opacity: 1, scale: 1, duration: 0.3 });

    if (video) {
        video.pause();
        video.currentTime = 0; 
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-24 font-sans overflow-hidden"
    >
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#0078f0]/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-[#ff9f20]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- HEADER --- */}
       
        <div className="text-center mb-20 will-change-transform">
          <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-6">
             <div className="w-12 h-[1px] bg-gray-700" />
             <span>Client Love</span>
             <div className="w-12 h-[1px] bg-gray-700" />
          </div>

          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none text-white mix-blend-exclusion">
            Real Stories. <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Real Impact.</span>
          </h2>
        
        </div>

        {/* --- SCROLL CONTAINER --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-12 px-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => (cardsRef.current[i] = el)}
              // ✅ FIXED: Merged all classes into one string
              className="group relative cursor-pointer w-[280px] md:w-[320px] aspect-[9/16] flex-shrink-0 snap-center"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              
              {/* --- CARD BODY --- */}
              <div className="w-full h-full bg-[#111] rounded-[1.5rem] overflow-hidden border border-white/10 relative shadow-2xl">
                
                {/* 1. VIDEO */}
                <video
                  src={t.video}
                  poster={t.poster}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loop
                  muted
                  playsInline
                  preload="none" 
                />

                {/* 2. OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* 3. PLAY BUTTON */}
                <div className="play-btn absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110">
                       <svg className="w-5 h-5 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                           <path d="M8 5v14l11-7z" />
                       </svg>
                    </div>
                </div>

                {/* 4. INFO */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                   <h3 className="text-xl font-bold text-white leading-tight mb-1">
                     {t.name}
                   </h3>
                   <p className="text-xs font-mono text-[#ff9f20] tracking-wider uppercase opacity-80">
                     {t.role}
                   </p>
                </div>

              </div>

            </div>
          ))}
          
          <div className="w-4 flex-shrink-0" />
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </section>
  );
};

export default UGCTestimonials;