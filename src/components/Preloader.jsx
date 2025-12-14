import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap'; // Standard import

const Preloader = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const progressRef = useRef(null);
  const numberRef = useRef(null);

  // useLayoutEffect prevents visual glitches on load
  useLayoutEffect(() => {
    // 1. Lock Scroll immediately
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Cleanup & Unlock Scroll
          document.body.style.overflow = '';
          gsap.set(containerRef.current, { display: "none" });
        }
      });

      // --- STEP 1: FAST LOADING (1.2s) ---
      // Hum direct DOM ko update kar rahe hain, React State ko nahi. No Lag.
      tl.to(numberRef.current, {
        innerText: 100,
        duration: 1.2, 
        snap: { innerText: 1 }, // Round numbers
        ease: "power3.inOut", // Fast start, fast end
        onUpdate: function() {
          // Direct width update (Very Fast)
          const val = Math.ceil(this.targets()[0].innerText);
          if (progressRef.current) {
             progressRef.current.style.width = `${val}%`;
          }
        }
      });

      // --- STEP 2: QUICK FADE OUT CONTENT (-0.3s overlap) ---
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      }, "-=0.3"); // Loading khatam hone se pehle hi fade start ho jayega

      // --- STEP 3: SLIDE UP CURTAIN (GPU Accelerated) ---
      tl.to(containerRef.current, {
        yPercent: -100, // 'height' se 10x smoother hota hai 'yPercent'
        duration: 0.8,
        ease: "power4.inOut",
      }, "-=0.2"); // Seamless transition

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen bg-[#050505] z-[9999] flex flex-col items-center justify-center overflow-hidden will-change-transform"
    >
      
      {/* Texture for Premium Feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* --- CONTENT WRAPPER --- */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        
        {/* Header Text */}
        <div className="mb-6 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">
                Digital Success
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-mono tracking-[0.3em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0078f0] animate-pulse" />
                Initializing...
            </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
            {/* Moving Bar */}
            <div 
                ref={progressRef}
                className="h-full bg-gradient-to-r from-[#0078f0] to-[#ff9f20] w-0"
                style={{ width: '0%' }} // Initial width
            />
        </div>

        {/* Percentage Counter */}
        <div className="flex justify-between w-full text-white font-mono text-sm font-bold opacity-80">
            <span>00</span>
            <span ref={numberRef}>0</span>
        </div>

      </div>

      {/* Footer Text */}
      <div ref={(el) => gsap.set(el, { opacity: 0.3 })} className="absolute bottom-8 text-white text-[9px] uppercase tracking-widest pointer-events-none">
          Indore • MP • India
      </div>

    </div>
  );
};

export default Preloader;