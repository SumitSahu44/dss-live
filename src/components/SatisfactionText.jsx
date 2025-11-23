import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SatisfactionText = () => {
  const containerRef = useRef(null);
  const upperRef = useRef(null);
  const lowerRef = useRef(null);

  useEffect(() => {
    const upper = upperRef.current;
    const lower = lowerRef.current;

    // Initial hidden state
    gsap.set([upper, lower], { y: 150, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",        // Mobile pe bhi perfect entry
        end: "bottom 20%",        // Zyada scroll tak visible
        scrub: 1.2,
        // markers: true,         // Remove in production
      },
    });

    // Text fade in + slide up
    tl.to(upper, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });

    tl.to(
      lower,
      {
        y: 0,
        opacity: 1,
        duration: 1,
      },
      "-=0.8"
    );

    // Responsive horizontal slide based on viewport width
    const moveDistance = () => {
      if (window.innerWidth < 640) return window.innerWidth * 0.4; // Mobile: thoda kam slide
      if (window.innerWidth < 1024) return window.innerWidth * 0.35;
      return window.innerWidth / 3;
    };

    // Upper text → left
    tl.to(upper, {
      x: () => -moveDistance(),
      ease: "power2.inOut",
      duration: 1.5,
    }, "-=0.8");

    // Lower text → right
    tl.to(lower, {
      x: () => moveDistance(),
      ease: "power2.inOut",
      duration: 1.5,
    }, "-=1.5");

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-32 md:py-40 lg:py-48 flex items-center justify-center 
                 bg-black text-white overflow-hidden px-6 border-t border-b border-gray-800"
    >
      <div className="text-center leading-tight">
        <h1
          ref={upperRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                     font-extrabold tracking-tighter
                     bg-gradient-to-r from-blue-400 to-blue-200 
                     text-transparent bg-clip-text"
        >
          Your Satisfaction
        </h1>

        <h1
          ref={lowerRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                     font-extrabold tracking-tighter mt-2 md:mt-4
                     bg-gradient-to-r from-orange-300 to-orange-500 
                     text-transparent bg-clip-text"
        >
          Is Our Success
        </h1>
      </div>
    </div>
  );
};

export default SatisfactionText;