import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionMissionReveal() {
  const containerRef = useRef(null);
  const missionSectionRef = useRef(null);
  const visionContentRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const missionSection = missionSectionRef.current;
    const visionContent = visionContentRef.current;

    let ctx = gsap.context(() => {
      
      // 1. SETUP: Initial positions
      gsap.set(missionSection, { xPercent: 100 }); 
      gsap.set(visionContent, { scale: 1, opacity: 1, filter: 'blur(0px)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          // FIXED: Reduced from 250% to 150%. 
          // Animation jaldi khatam hogi aur next section turant aa jayega.
          end: '+=150%', 
          pin: true,
          scrub: 1, // Thoda snappy banaya hai (1 vs 1.5)
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // 2. ANIMATION SEQUENCE
      tl
        // Step A: Vision fade out
        .to(visionContent, {
          scale: 0.9,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1,
          ease: 'power1.inOut',
        })
        
        // Step B: Mission slides in (Overlapping)
        .to(missionSection, {
          xPercent: 0, 
          duration: 1, // Adjusted duration to match scroll length
          ease: 'power2.out',
        }, "-=0.8"); // Vision ke jaane se pehle hi Mission aa jayega

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black relative z-10">
      {/* PARENT CONTAINER - Pinned during scroll */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">

        {/* --- SECTION 1: VISION (Bottom Layer) --- */}
        <div className="absolute inset-0 w-full h-full bg-[#050505] flex items-center justify-center p-6 md:p-20 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0078f0]/15 blur-[120px] rounded-full pointer-events-none" />
          
          <div ref={visionContentRef} className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 max-w-7xl w-full items-center will-change-transform">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-[#0078f0] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">The Future</h2>
              <h1 className="text-5xl md:text-8xl font-bold text-white leading-none">
                OUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-white/60">VISION</span>
              </h1>
              <div className="h-1.5 md:h-2 w-24 md:w-32 bg-[#0078f0] rounded-full mt-4" />
            </div>

            <div className="text-gray-400 text-sm md:text-lg leading-relaxed space-y-4 border-l border-white/10 pl-6 md:pl-8 h-[60vh] overflow-y-auto md:h-auto scrollbar-hide">
              <p>
                To build a future where every startup, small business, and growing brand in India 
                has the power to <strong className="text-white">stand strong in the digital world.</strong>
              </p>
              <p>
                We want to support founders whose dreams are big but resources are limited. 
                Many young businesses never reach their true potential because they cannot afford 
                the level of digital presence and branding they need. <span className="text-white italic">Our vision is to remove that barrier.</span>
              </p>
              <p>
                 We aim to create powerful, affordable digital solutions that turn ideas into brands, 
                 give confidence to early-stage entrepreneurs, and help Indian businesses grow in a digital-first economy.
              </p>
            </div>
          </div>

          <h1 className="absolute bottom-[-2%] left-[-2%] text-[18vw] font-black text-white/[0.03] pointer-events-none select-none leading-none">
            VISION
          </h1>
        </div>

        {/* --- SECTION 2: MISSION (Top Layer - Slides In) --- */}
        <div
          ref={missionSectionRef}
          className="absolute inset-0 w-full h-full bg-[#ff9f20] text-black flex items-center justify-center p-6 md:p-20 z-20 will-change-transform"
          style={{ boxShadow: '-50px 0 100px rgba(0,0,0,0.5)' }} 
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 max-w-7xl w-full items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1 text-gray-900 text-sm md:text-lg leading-relaxed space-y-4 border-l-4 border-black pl-6 md:pl-8 h-[60vh] overflow-y-auto md:h-auto scrollbar-hide">
              <p className="font-bold text-xl md:text-2xl">
                Our mission is to create real impact, not just complete projects.
              </p>
              <p>
                We want to help businesses from every industry—services, e-commerce, manufacturing, healthcare, 
                education, finance, real estate and more—grow with clarity and reach.
              </p>
              <p>
                We focus on supporting <strong className="underline decoration-black decoration-2 underline-offset-2">early-stage entrepreneurs</strong> who want to build something meaningful 
                but struggle with the high cost of marketing. Through impactful websites and performance-driven marketing, 
                we help them grow faster, compete better, and build trust.
              </p>
            </div>

            <div className="order-1 md:order-2 space-y-4 md:space-y-6 text-left md:text-right">
              <h2 className="text-black/60 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">The Impact</h2>
              <h1 className="text-5xl md:text-8xl font-black text-black leading-none">
                OUR <br />
                <span className="text-white drop-shadow-sm">MISSION</span>
              </h1>
              <div className="h-1.5 md:h-2 w-24 md:w-32 bg-black rounded-full mt-4 ml-0 md:ml-auto" />
            </div>
          </div>

          <h1 className="absolute top-[-2%] right-[-2%] text-[18vw] font-black text-black/[0.05] pointer-events-none select-none leading-none">
            MISSION
          </h1>
        </div>

      </div>

    </div>
  );
}