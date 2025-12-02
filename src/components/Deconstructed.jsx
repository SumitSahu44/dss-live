import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Brand Strategy",
    desc: "We define the blueprint for your market dominance using data-driven insights.",
    theme: "from-gray-800 to-black",
    accent: "text-gray-400",
  },
  {
    id: "02",
    title: "UI/UX Design",
    desc: "Crafting intuitive, pixel-perfect digital experiences that users love.",
    theme: "from-blue-900 to-black",
    accent: "text-blue-400",
  },
  {
    id: "03",
    title: "Web Development",
    desc: "Building robust, scalable, and high-performance technical infrastructure.",
    theme: "from-emerald-900 to-black",
    accent: "text-emerald-400",
  },
  {
    id: "04",
    title: "Motion & 3D",
    desc: "Immersive animations that bring your digital presence to life.",
    theme: "from-purple-900 to-black",
    accent: "text-purple-400",
  },
  {
    id: "05",
    title: "Mobile Apps",
    desc: "Native and cross-platform solutions for iOS and Android ecosystems.",
    theme: "from-orange-900 to-black",
    accent: "text-orange-400",
  },
  {
    id: "06",
    title: "Growth Marketing",
    desc: "Scaling your business through targeted organic and paid acquisition channels.",
    theme: "from-cyan-900 to-black",
    accent: "text-cyan-400",
  }
];

export default function StackServices() {
  const containerRef = useRef(null);
  const stackWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const counterRef = useRef(null); // Direct DOM manipulation ke liye

  // --- OPTIMIZED MOUSE TILT ---
  // GSAP quickTo is more performant for continuous values than standard .to()
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (stackWrapperRef.current) {
        xTo.current = gsap.quickTo(stackWrapperRef.current, "rotationY", { duration: 0.5, ease: "power2.out" });
        yTo.current = gsap.quickTo(stackWrapperRef.current, "rotationX", { duration: 0.5, ease: "power2.out" });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!xTo.current || !yTo.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2; 
    const y = (e.clientY / innerHeight - 0.5) * 2; 
    
    // Efficiently update values
    xTo.current(x * 8);
    yTo.current(-y * 8);
  };

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    let ctx = gsap.context(() => {
      
      // --- INITIAL STATE ---
      // Heavy 'filter: blur' hata diya kyunki wo mobile pe lag karta hai.
      // Uski jagah opacity/brightness use kiya.
      cards.forEach((card, i) => {
        gsap.set(card, { 
          zIndex: i, 
          scale: i === totalCards - 1 ? 1 : 0.9 + (i * 0.01), 
          y: i === totalCards - 1 ? 0 : 15 * (totalCards - 1 - i), 
          // filter: 'blur(...)' REMOVED for performance
          filter: i === totalCards - 1 ? 'brightness(1)' : 'brightness(0.5)', 
          transformOrigin: 'center bottom',
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.5, 
          onUpdate: (self) => {
            // OPTIMIZATION: NO REACT STATE UPDATE HERE
            // Direct textContent update is 100x faster and doesn't cause re-renders
            if (counterRef.current) {
                const progress = self.progress;
                const index = Math.min(Math.floor(progress * totalCards), totalCards - 1);
                const currentNum = index + 1;
                counterRef.current.textContent = `0${currentNum}`;
            }
          }
        }
      });

      // --- ANIMATION LOGIC ---
      for (let i = totalCards - 1; i > 0; i--) {
        
        // 1. Fly Away (Top Card)
        tl.to(cards[i], {
          y: -window.innerHeight * 1.2, 
          rotationX: -45,              
          z: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
          willChange: 'transform, opacity' // Browser hint
        });

        // 2. Bring Focus (Card Below)
        tl.to(cards[i - 1], {
          scale: 1,              
          y: 0,                  
          filter: 'brightness(1)', // Cheaper than blur
          duration: 0.8,
          ease: "power2.out",
          willChange: 'transform, filter'
        }, "<0.1"); 
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full pt-6 pb-6 bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      
      {/* --- BACKGROUND (Optimized: Static Gradients instead of Blur effects inside DOM if possible) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Reduced blur radius slightly to reduce rasterization cost */}
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-[#0078f0] rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-[#ff9f20] rounded-full blur-[100px] opacity-15" />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* --- HEADER --- */}
      <div className="absolute top-8 md:top-10 z-20 text-center w-full px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-3 drop-shadow-lg">
          Our Services
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#0078f0] to-transparent mx-auto rounded-full" />
      </div>

      {/* --- OPTIMIZED PROGRESS COUNTER --- */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4 items-center">
         <div className="text-white/20 text-sm font-mono rotate-90 origin-center translate-x-2">Step</div>
         <div className="w-[1px] h-12 bg-white/10" />
         
         {/* Direct DOM Ref for performance */}
         <span ref={counterRef} className="text-2xl font-bold text-white tabular-nums">01</span>
         
         <div className="w-[1px] h-12 bg-white/10" />
         <span className="text-sm font-bold text-white/30">06</span>
      </div>

      {/* --- CARDS STACK CONTAINER --- */}
      <div 
        ref={stackWrapperRef}
        className="relative z-10 mt-16 w-[85vw] h-[55vh] md:w-[420px] md:h-[580px]"
        style={{ perspective: '1200px' }} 
      >
        
        <div className="relative w-full h-full transform-style-3d">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`absolute inset-0 rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br ${service.theme}`}
              style={{ 
                boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 25px 60px -15px rgba(0,0,0,0.6)',
                willChange: 'transform, opacity' // Browser hint
              }}
            >
              
              {/* 1. TOP SECTION */}
              <div className="flex justify-between items-start w-full relative z-10">
                <span className={`text-7xl md:text-8xl font-black opacity-20 tracking-tighter select-none ${service.accent}`}>
                  {service.id}
                </span>
                
                <div className={`px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-widest text-white/80`}>
                  Expertise
                </div>
              </div>

              {/* 2. BACKGROUND GLOW (Simpler div instead of blur filter if possible) */}
               {/* Removing blur here as it's inside a moving card */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10 ${service.accent.replace('text', 'bg')}`} />

              {/* 3. BOTTOM SECTION */}
              <div className="relative z-10 mt-auto">
                <div className={`w-12 h-1 mb-6 rounded-full ${service.accent.replace('text', 'bg')}`} />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-[1.1]">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                  {service.desc}
                </p>

                <div className={`mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer group ${service.accent}`}>
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-[2rem]" />
            </div>
          ))}
        </div>
        
      </div>

    </section>
  );
}