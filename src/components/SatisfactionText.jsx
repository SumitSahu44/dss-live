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

    // Starting positions (down + fade)
    gsap.set(upper, { y: 120, opacity: 0 });
    gsap.set(lower, { y: 120, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%", // section jaisi hi dikhne lage
        end: "bottom 80%", // hide hone se pehle tak
        scrub: 1.2,
        // markers: true,
      },
    });

    // ✨ BOTH TEXT APPEAR WHEN SECTION ENTERS
    tl.to(upper, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });

    tl.to(
      lower,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1"
    );

    // ✨ SCROLL KARTE HI:
    // UPPER → LEFT TOUCH
    tl.to(upper, {
      x: -window.innerWidth / 3, // left edge ke paas
      ease: "power2.inOut",
      duration: 1.5,
    });

    // LOWER → RIGHT TOUCH
    tl.to(
      lower,
      {
        x: window.innerWidth / 3, // right edge ke paas
        ease: "power2.inOut",
        duration: 1.5,
      },
      "-=1.2"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center 
      bg-black text-white overflow-hidden px-4"
    >
      <div className="text-center leading-tight drop-shadow-xl">
        <h1
          ref={upperRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight
          bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text"
        >
          Your Satisfaction
        </h1>

        <h1
          ref={lowerRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight
          bg-gradient-to-r from-orange-300 to-orange-500 text-transparent bg-clip-text"
        >
          Is Our Success
        </h1>
      </div>
    </div>
  );
};

export default SatisfactionText;
