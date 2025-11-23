import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiTarget, FiCode, FiVolume2, FiFigma, FiFilm, FiTrendingUp } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const CreativeAgencySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Moving Gradient Glow (Blue to Orange)
      // gsap.to(glowRef.current, {
      //   xPercent: 150,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     scrub: 1,
      //     start: "top bottom",
      //     end: "bottom top",
      //   }
      // });

      // Title Animation
      gsap.fromTo(titleRef.current.children, {
        y: 200,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.8,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      });

      // Cards Staggered Entry
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, {
          y: 200,
          opacity: 0,
          scale: 0.8,
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          delay: i * 0.12,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });

        // Hover Effect
        // card.addEventListener("mouseenter", () => {
        //   gsap.to(card, { 
        //     y: -20, 
        //     scale: 1.05, 
        //     duration: 0.5,
        //     boxShadow: "0 0 60px rgba(0, 120, 240, 0.4)"
        //   });
        // });
        // card.addEventListener("mouseleave", () => {
        //   gsap.to(card, { y: 0, scale: 1, duration: 0.6, boxShadow: "none" });
        // });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Brand Strategy", icon: <FiTarget size={38} /> },
    { title: "Web Development", icon: <FiCode size={38} /> },
    { title: "Digital Marketing", icon: <FiVolume2 size={38} /> },
    { title: "UI/UX Design", icon: <FiFigma size={38} /> },
    { title: "Motion Graphics", icon: <FiFilm size={38} /> },
    { title: "SEO & Growth", icon: <FiTrendingUp size={38} /> },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white overflow-hidden py-24" id="services">
      {/* Animated Gradient Background */}
      <div ref={glowRef} className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0078f0] via-transparent to-[#ff6b00] blur-3xl translate-x-[-100%]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              We Craft
            </span>
          </h2>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none -mt-8">
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              Digital Mastery
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative cursor-pointer"
            >
              {/* Card Glow */}
              {/* bg-gradient-to-br from-[#0078f0]/40 to-[#ff6b00]/40 */} {/* ye line ki classniche k div me lagani hai if glow cahiye */}
              <div className="absolute -inset- rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-black/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 h-full transition-all duration-700 hover:border-[#0078f0]/60 hover:shadow-2xl hover:shadow-[#0078f0]/30">
                <div className={`w-20 h-20 rounded-2xl mb-8 flex items-center justify-center text-white
                  ${i % 2 === 0 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-orange-500 to-orange-600'
                  } shadow-xl`}>
                  {service.icon}
                </div>

                <h3 className={`text-3xl md:text-4xl font-bold mb-4
                  ${i % 2 === 0 
                    ? 'bg-gradient-to-r from-blue-400 to-blue-200' 
                    : 'bg-gradient-to-r from-orange-300 to-orange-500'
                  } bg-clip-text text-transparent`}>
                  {service.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  Transforming ideas into powerful digital experiences with cutting-edge technology and creative vision.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeAgencySection;