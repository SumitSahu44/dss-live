import React, { useEffect, useRef } from 'react';
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionMissionReveal() {
  const containerRef = useRef(null);
  const missionSectionRef = useRef(null);
  const visionContentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const missionSection = missionSectionRef.current;
    const visionContent = visionContentRef.current;
    
    let ctx = gsap.context(() => {
      
      // SINGLE TIMELINE (Sab kuch ek saath control hoga)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%', // Scroll distance thoda adjust kiya for better feel
          pin: true,
          scrub: 1, // Smoothness ke liye
          anticipatePin: 1
        }
      });

      // Animation Steps:
      // Jaise hi scroll start hoga, Vision thoda fade/scale hoga aur Mission aana shuru hoga
      
      tl.to(visionContent, {
        scale: 0.9,       // Thoda piche bhejne ka effect
        opacity: 0.2,     // Dheere dheere gayab
        duration: 1,
        ease: "power1.out"
      })
      .to(missionSection, {
        x: '0%',          // Right se center slide
        ease: "power1.inOut", 
        duration: 1       // Vision ke fade hone ke saath hi ye slide hoga
      }, "<");            // symbol "<" ka matlab hai: Previous animation ke saath start karo

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black" id="visionmission">
      
      {/* --- MAIN CONTAINER (Pinned) --- */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">

        {/* =========================================
            LAYER 1: OUR VISION (Base Layer) 
           ========================================= */}
        <div className="absolute inset-0 w-full h-full bg-[#050505] flex items-center justify-center p-8 md:p-20">
          
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0078f0]/10 blur-[150px] rounded-full pointer-events-none" />
          
          {/* Ref added here for animation */}
          <div ref={visionContentRef} className="relative z-10 grid md:grid-cols-2 gap-12 max-w-7xl w-full items-center origin-center">
            
            <div className="space-y-6">
              <h2 className="text-[#0078f0] font-bold tracking-widest uppercase text-sm">The Dream</h2>
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-none">
                OUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-white/50">VISION</span>
              </h1>
              <div className="h-2 w-32 bg-[#0078f0] rounded-full mt-4" />
            </div>

            <div className="text-gray-300 text-lg md:text-xl leading-relaxed space-y-6 border-l border-white/10 pl-8">
              <p>
                To build a future where every startup, small business, and growing brand in India 
                has the power to <strong className="text-white">stand strong in the digital world.</strong>
              </p>
              <p>
                We want to support founders whose dreams are big but resources are limited. 
                Many young businesses never reach their true potential because they cannot afford 
                the level of digital presence and branding they need.
              </p>
            </div>

          </div>
          
          <h1 className="absolute bottom-[-5%] left-[-5%] text-[20vw] font-black text-white/[0.02] pointer-events-none select-none">
            VISION
          </h1>
        </div>


        {/* =========================================
            LAYER 2: OUR MISSION (Sliding Panel) 
           ========================================= */}
        <div 
          ref={missionSectionRef}
          className="absolute inset-0 w-full h-full bg-[#ff9f20] text-black flex items-center justify-center p-8 md:p-20 translate-x-[100%] z-20"
          style={{
             boxShadow: '-50px 0 100px rgba(0,0,0,0.5)'
          }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 max-w-7xl w-full items-center">
            
            <div className="order-2 md:order-1 text-gray-900 text-lg md:text-xl leading-relaxed space-y-6 border-l-4 border-black pl-8">
              <p className="font-bold text-2xl">
                Our mission is to create real impact.
              </p>
              <p>
                We focus on supporting early-stage entrepreneurs who want to build something meaningful. 
                Our goal is to empower Indian businesses, strengthen the startup ecosystem, 
                and contribute to <strong className="underline decoration-black">Startup India</strong>.
              </p>
            </div>

            <div className="order-1 md:order-2 space-y-6 text-right">
              <h2 className="text-black/60 font-bold tracking-widest uppercase text-sm">The Action</h2>
              <h1 className="text-6xl md:text-8xl font-black text-black leading-none">
                OUR <br />
                <span className="text-white">MISSION</span>
              </h1>
              <div className="h-2 w-32 bg-black rounded-full mt-4 ml-auto" />
            </div>

          </div>

          <h1 className="absolute top-[-5%] right-[-5%] text-[20vw] font-black text-black/[0.05] pointer-events-none select-none">
            MISSION
          </h1>

        </div>

      </div>
    </div>
  );
}