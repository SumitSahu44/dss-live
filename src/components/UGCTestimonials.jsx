import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UGCTestimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const glowRef = useRef(null);

  const testimonials = [
    { id: 1, video: "/videos/Video-793.mp4", name: "Rohan Sharma", company: "Starlight Solar" },
    { id: 2, video: "/videos/Video-793.mp4", name: "Vikram Singh", company: "MixNuts Premium" },
    { id: 3, video: "/videos/Video-793.mp4", name: "Ankit Patel", company: "Real Estate Pro" },
    { id: 4, video: "/videos/Video-793.mp4", name: "Mayank Jain", company: "TechVision" },
    { id: 5, video: "/videos/Video-793.mp4", name: "Suresh Kumar", company: "Luxury Brand" },
    { id: 6, video: "/videos/Video-793.mp4", name: "Deepak Mehta", company: "E-Commerce Giant" },
    { id: 7, video: "/videos/Video-793.mp4", name: "Rajesh Verma", company: "Digital Empire" },
    { id: 8, video: "/videos/Video-793.mp4", name: "Priya Mehta", company: "Fashion Hub" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Moving Gradient Glow (same as other sections)
      // gsap.to(glowRef.current, {
      //   xPercent: 150,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     scrub: 1,
      //     start: "top bottom",
      //     end: "bottom top",
      //   },
      // });

      // Epic Title Animation
      gsap.fromTo(
        titleRef.current.children,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards Staggered Entry + Hover Glow
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 180, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: i * 0.1,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover Lift + Intense Glow
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -20, scale: 1.05, duration: 0.6, ease: "power2.out" });
          // gsap.to(card.querySelector(".card-glow"), { opacity: 0.7, duration: 0.8 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.7 });
          // gsap.to(card.querySelector(".card-glow"), { opacity: 0, duration: 0.6 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden py-32"
    >
      {/* Animated Moving Gradient Glow */}
      <div ref={glowRef} className="absolute inset-0 opacity-40 pointer-events-none">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0078f0] via-transparent to-[#ff6b00] blur-3xl translate-x-[-100%]" /> */}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Massive Gradient Title */}
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Real Voices
            </span>
          </h2>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none -mt-8">
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
        </div>

        {/* Horizontal Scrolling Testimonials */}
        <div className="flex gap-10 overflow-x-auto scrollbar-hide px-10 md:px-20 pb-8">
          {testimonials.concat(testimonials.slice(0, 3)).map((t, i) => (
            <div
              key={i}
              id="testimonials"
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex-shrink-0 w-80 md:w-96 cursor-grab active:cursor-grabbing"
            >
              {/* Hover Glow */}
              {/* niceh clas me ad kr  bg-gradient-to-br from-[#0078f0]/60 to-[#ff6b00]/60  */}
              <div className="card-glow absolute -inset-2 rounded-3xl blur-3xl opacity-0 
               transition-opacity duration-700" />

              {/* Video Card */}
              {/* niceh class me  hover:border-[#0078f0]/70 hover:shadow-2xl hover:shadow-[#0078f0]/40 */}
              <div className="relative bg-black/80 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden 
                transition-all duration-700">
                
                <video
                  src={t.video}
                  className="w-full h-96 md:h-[520px] object-cover"
                  loop
                  muted
                  playsInline
                  autoPlay
                />

                {/* Gradient Overlay + Name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                    {t.name}
                  </h3>
                  <p className="text-xl font-semibold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent mt-1">
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="text-center mt-20">
          <p className="text-3xl md:text-4xl font-light text-zinc-300">
            Trusted by{" "}
            <span className="font-black text-5xl bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              500+
            </span>{" "}
            brands across{" "}
            <span className="font-black text-5xl bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              10+ countries
            </span>
          </p>
        </div>

        {/* Mobile Hint */}
        <div className="text-center mt-8 md:hidden">
          <p className="text-zinc-500 text-sm">← Swipe to see more →</p>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default UGCTestimonials;