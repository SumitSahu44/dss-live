import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandParallax() {
  const containerRef = useRef(null);
  const maskLayerRef = useRef(null);
  const dotsRef = useRef([]);
  
  // Mouse Position ref to decouple event listener from animation loop
  const mousePos = useRef({ x: 0, y: 0 });

  // Generate random data for dots (Blue, Orange, Mix)
  // useMemo/useRef ensures we don't recalculate on re-renders
  const dotsData = useRef([...Array(60)].map(() => { // Reduced from 100 to 60 for mobile performance (looks same)
    const colorRoll = Math.random();
    let colorClass = '';
    
    if (colorRoll < 0.4) {
      colorClass = 'bg-[#0078f0]';
    } else if (colorRoll < 0.8) {
      colorClass = 'bg-[#ff9f20]';
    } else {
      colorClass = 'bg-gradient-to-br from-[#0078f0] to-[#ff9f20]';
    }

    return {
      size: Math.random() * 4 + 2, 
      x: Math.random() * 100,
      y: Math.random() * 100,
      alpha: Math.random() * 0.6 + 0.3,
      duration: Math.random() * 15 + 10,
      depth: Math.random() * 0.5 + 0.1, 
      colorClass: colorClass
    };
  }));

  const infoPoints = [
    { 
      id: 1, title: "Strategy", desc: "Data-driven insights.", 
      pos: "top-[15%] left-1/2 -translate-x-1/2 md:translate-x-0 md:top-[32%] md:left-[28%]", 
      align: "text-center md:text-right" 
    },
    { 
      id: 2, title: "Design", desc: "Crafting visual identities.", 
      pos: "top-[28%] left-1/2 -translate-x-1/2 md:translate-x-0 md:top-[40%] md:right-[26%]", 
      align: "text-center md:text-left" 
    },
    { 
      id: 3, title: "Development", desc: "Robust & scalable tech.", 
      pos: "bottom-[28%] left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-[35%] md:left-[25%]", 
      align: "text-center md:text-right" 
    },
    { 
      id: 4, title: "Marketing", desc: "Stories that convert.", 
      pos: "bottom-[15%] left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-[30%] md:right-[28%]", 
      align: "text-center md:text-left" 
    },
  ];

  useEffect(() => {
    const maskLayer = maskLayerRef.current;
    const texts = gsap.utils.toArray('.agency-text');
    const ring = maskLayer.querySelector('.tech-ring');
    const dots = dotsRef.current;

    // --- GSAP CONTEXT (Performance Cleanup) ---
    let ctx = gsap.context(() => {

      // 1. MASK REVEAL ANIMATION
      // Set initial state
      gsap.set(maskLayer, { 
        '--mask-radius': '12vh',
        autoAlpha: 1
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1, // Smooth scrubbing
          anticipatePin: 1, // Prevents flicker on pin start
          fastScrollEnd: true, // Prevents white screen on fast scroll
          preventOverlaps: true
        }
      });

      // Expand Mask using custom property
      tl.to(maskLayer, { 
        '--mask-radius': '150vmax', 
        duration: 10, 
        ease: 'power1.inOut' 
      }, 0);

      // Rotate Ring
      tl.to(ring, {
        scale: 15,
        opacity: 0,
        rotation: 180,
        duration: 8,
        ease: 'power1.in',
        force3D: true // Force GPU
      }, 0);

      // Text Animations
      texts.forEach((text, i) => {
        const startTime = i * 2; 
        tl.fromTo(text, 
          { opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)', willChange: 'transform, opacity' },
          { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'back.out(1.7)' }, 
          startTime
        )
        .to(text, 
          { opacity: 0, scale: 1.1, filter: 'blur(10px)', duration: 1 }, 
          startTime + 2.5
        );
      });

      // Hide mask layer at end
      tl.to(maskLayer, { autoAlpha: 0, duration: 0.5 }, 9.5);


      // 2. AMBIENT DOTS ANIMATION (Optimized)
      dots.forEach((dot, i) => {
          if(!dot) return;
          const data = dotsData.current[i];

          // Ambient Float
          gsap.to(dot, {
              xPercent: "random(-400, 400)", // Reduced range for better performance
              yPercent: "random(-400, 400)", 
              duration: data.duration,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true
          });

          // Opacity Pulse
          gsap.to(dot, {
              opacity: 0.2,
              duration: Math.random() * 2 + 1,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: Math.random() * 2
          });
      });

    }); // End Context


    // 3. OPTIMIZED MOUSE INTERACTION (Ticker Loop)
    // Instead of firing GSAP on every 'mousemove', we update a ref variable,
    // and animate in a RequestAnimationFrame loop (gsap.ticker).
    const xCenter = window.innerWidth / 2;
    const yCenter = window.innerHeight / 2;

    const handleMouse = (e) => {
      mousePos.current.x = (e.clientX - xCenter);
      mousePos.current.y = (e.clientY - yCenter);
    };

    // Ticker runs at 60FPS automatically
    const tickerFunc = () => {
       const { x, y } = mousePos.current;
       
       dots.forEach((dot, i) => {
          if(!dot) return;
          const depth = dotsData.current[i].depth;
          const moveX = x * depth * -0.4;
          const moveY = y * depth * -0.4;

          // gsap.set is extremely fast compared to gsap.to
          gsap.set(dot, { x: moveX, y: moveY, overwrite: 'auto' });
       });
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    gsap.ticker.add(tickerFunc);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouse);
      gsap.ticker.remove(tickerFunc);
    };
  }, []);

  return (
    <div className="bg-[#050505] text-white">
      
      {/* PARALLAX SECTION */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">

        {/* Background Video (Optimized) */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-70"
            style={{ willChange: 'transform' }} // Hint browser
          >
            <source src="https://www.pexels.com/download/video/4919748/" type="video/mp4" />
          </video>
        </div>

        {/* MASK LAYER (Black Overlay + Galaxy) */}
        <div
          ref={maskLayerRef}
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden will-change-transform"
          style={{
            background: '#000000',
            // Optimized CSS Variable approach
            maskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 60px))',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent var(--mask-radius), black calc(var(--mask-radius) + 60px))',
          }}
        >
          {/* Inner Solid Border */}
          <div 
            className="absolute border border-[#0078f0]/40 rounded-full pointer-events-none"
            style={{
              width: 'calc(var(--mask-radius) * 2 + 10px)',
              height: 'calc(var(--mask-radius) * 2 + 10px)',
            }} 
          />

          {/* Outer Creative Tech Ring */}
          <div 
            className="tech-ring absolute rounded-full border border-dashed border-[#0078f0]/60 pointer-events-none"
            style={{
              width: 'calc(var(--mask-radius) * 2 + 60px)',
              height: 'calc(var(--mask-radius) * 2 + 60px)',
            }} 
          />

          {/* Galaxy Dots */}
          {dotsData.current.map((data, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className={`absolute rounded-full ${data.colorClass}`}
              style={{
                width: data.size + 'px',
                height: data.size + 'px',
                left: data.x + '%',
                top: data.y + '%',
                opacity: data.alpha,
                boxShadow: `0 0 12px ${data.colorClass.includes('orange') ? '#ff9f20' : '#0078f0'}`,
                willChange: 'transform',
                transform: 'translate3d(0,0,0)' // Force GPU
              }}
            />
          ))}
        </div>

        {/* TEXT LAYER */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {infoPoints.map((item) => (
            <div 
              key={item.id} 
              className={`agency-text absolute ${item.pos} ${item.align} w-full max-w-[90vw] md:w-auto md:max-w-md px-4`}
            >
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter mix-blend-difference will-change-transform">
                {item.title}
                <span className="text-[#0078f0] inline-block scale-150 leading-none">.</span>
              </h3>
              
              <div className={`flex items-center gap-3 justify-center ${item.align.includes('right') ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                <div className="hidden md:block h-[1px] w-12 bg-[#0078f0]/50" />
                <p className="text-xs md:text-sm font-light text-gray-300 uppercase tracking-[0.2em]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}