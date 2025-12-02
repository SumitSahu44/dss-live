import React, { useEffect, useRef } from 'react';
// CDN Imports for environment compatibility
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    phase: "Inception",
    title: "The Spark",
    desc: "A raw, unpolished idea. It's dark, messy, but alive.",
    width: "w-[85vw] md:w-[400px]", 
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrWzmOmGNO_CaehHXel6Olobwq0JxzyZILw&s",
    theme: "grayscale brightness-75",
    accent: "text-gray-400 border-gray-500"
  },
  {
    id: "02",
    phase: "Structure",
    title: "Blueprint",
    desc: "Order emerges from chaos. We define the skeleton.",
    width: "w-[85vw] md:w-[500px]", 
    img: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
    theme: "grayscale-0 saturate-50",
    accent: "text-blue-400 border-blue-500"
  },
  {
    id: "03",
    phase: "Identity",
    title: "Visual Soul",
    desc: "Color, typography, and voice give it a heartbeat.",
    width: "w-[85vw] md:w-[600px]", 
    img: "https://miro.medium.com/v2/resize:fit:1400/1*1ThxzpUlojLUu_OKiYkMAg.jpeg",
    theme: "saturate-100 contrast-100",
    accent: "text-purple-400 border-purple-500"
  },
  {
    id: "04",
    phase: "Velocity",
    title: "Market Force",
    desc: "Launching with precision. The world takes notice.",
    width: "w-[85vw] md:w-[700px]", 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    theme: "saturate-150 brightness-110",
    accent: "text-orange-400 border-orange-500"
  },
  {
    id: "05",
    phase: "Dominance",
    title: "The Legacy",
    desc: "The standard by which others are measured.",
    width: "w-[85vw] md:w-[900px]", 
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    theme: "contrast-125 brightness-110",
    accent: "text-yellow-400 border-yellow-400"
  }
];

export default function BrandProcess() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    
    // GSAP Context ensures cleanups are handled perfectly in React
    let ctx = gsap.context(() => {
      
      // OPTIMIZED: Function-based value for responsiveness
      // Calculates how much to scroll based on track width
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 100); 
      };

      // 1. Horizontal Scroll Tween
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        force3D: true, // Forces GPU Acceleration (Critical for preventing white screen)
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`, 
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates on resize
          anticipatePin: 1, // Smoothens the pinning action
          fastScrollEnd: true // Prevents glitches on fast scrolling
        }
      });

      // 2. Progress Bar
      gsap.fromTo(progressBarRef.current, 
        { scaleX: 0, transformOrigin: "left center" },
        { 
          scaleX: 1, 
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1
          }
        }
      );

      // 3. Image Parallax (Optimized)
      const images = gsap.utils.toArray('.process-img');
      images.forEach((img) => {
        gsap.to(img, {
          xPercent: 15,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#050505] relative text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Noise Texture (Fixed position to avoid repaint) */}
      <div 
        className="fixed inset-0 pt-6 pointer-events-none opacity-20 z-50 mix-blend-overlay"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          willChange: "opacity"
        }}
      />

      {/* --- TOP PROGRESS BAR --- */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
         <div 
           ref={progressBarRef} 
           className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
           style={{ transform: 'scaleX(0)' }}
         />
      </div>

      {/* --- MAIN PINNED CONTAINER (Header + Cards) --- */}
      <div ref={containerRef} className="relative h-screen flex flex-col justify-center bg-[#050505] overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* 1. FIXED HEADER */}
        <div className="flex-none h-[25vh] md:h-[30vh] flex flex-col justify-center items-center text-center px-6 relative z-10 border-b border-white/5">
           <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-2 will-change-transform">
             EVOLUTION
           </h2>
           <div className="flex items-center gap-3 text-gray-500 text-xs font-mono uppercase tracking-[0.2em]">
             <span>Scroll</span>
             <div className="w-8 h-[1px] bg-gray-700" />
             <span>Witness The Growth</span>
           </div>
        </div>

        {/* 2. SCROLLING TRACK (Moves Horizontally) */}
        <div className="flex-1 flex items-center w-full relative z-10">
            <div 
              ref={trackRef} 
              className="flex items-center pl-[5vw] pr-[20vw] gap-6 md:gap-12 will-change-transform" // will-change is crucial here
            >
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`process-item relative shrink-0 ${step.width} h-[55vh] md:h-[60vh] group overflow-hidden border border-white/10 bg-[#111] transition-all duration-500 hover:border-white/30`}
                >
                  
                  {/* 1. IMAGE LAYER */}
                  <div className={`w-full h-full ${step.theme} transition-all duration-700 relative overflow-hidden`}>
                      <img 
                        src={step.img} 
                        alt={step.title}
                        loading="lazy" // Lazy load
                        decoding="async"
                        className="process-img w-[130%] h-full object-cover transition-transform duration-700 scale-105 will-change-transform"
                      />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                  </div>

                  {/* 2. GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                  {/* 3. CONTENT */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20">
                    <div className={`text-5xl md:text-7xl font-black opacity-10 absolute -top-16 left-6 select-none transition-opacity group-hover:opacity-20 ${step.accent.split(' ')[0]}`}>
                       {step.id}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                       <div className={`w-2 h-2 rounded-full ${step.accent.includes('blue') ? 'bg-blue-500' : step.accent.includes('purple') ? 'bg-purple-500' : step.accent.includes('orange') ? 'bg-orange-500' : step.accent.includes('yellow') ? 'bg-yellow-400' : 'bg-gray-500'}`} />
                       <span className={`text-xs font-bold uppercase tracking-[0.2em] ${step.accent.split(' ')[0]}`}>
                          {step.phase}
                       </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-md border-l border-white/20 pl-4">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* FINAL CTA */}
              <div className="relative shrink-0 w-[80vw] md:w-[600px] h-[55vh] md:h-[60vh] flex items-center justify-center border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                 <div className="text-center p-8">
                    <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">What's Next?</p>
                    <h3 className="text-5xl md:text-7xl font-black text-white leading-none mb-8">
                      BUILD YOUR<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500">LEGACY.</span>
                    </h3>
                    <button className="group relative px-8 py-3 bg-white text-black font-bold uppercase tracking-widest overflow-hidden hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all duration-300">
                      <span className="relative z-10">Start Project</span>
                    </button>
                 </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}