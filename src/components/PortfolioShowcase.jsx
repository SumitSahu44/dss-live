import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PortfolioShowcase = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const glowRef = useRef(null);

  const projects = [
    { id: 1, title: "Starlight Solar", full: "/images/starlightsolar.png" },
    { id: 2, title: "Sadabahar Handloom", full: "/images/sadabahaar.png" },
    { id: 3, title: "Lithoveda", full: "/images/lithoveda.png" },
    { id: 4, title: "Vanya Resort", full: "/images/vanya.png" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Moving Gradient Glow Background
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

      // Big Title Animation (same as CreativeAgency)
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

      // Portfolio Cards Staggered Entry
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 200, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.6,
            delay: i * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover lift + glow
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -20,
            scale: 1.04,
            duration: 0.6,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".card-glow"), {
            opacity: 0.6,
            duration: 0.8,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.7 });
          gsap.to(card.querySelector(".card-glow"), { opacity: 0, duration: 0.6 });
        });
      });

      // Auto-scroll on hover (tumhara wala feature)
      document.querySelectorAll(".scroll-img").forEach((imgBox) => {
        let scrollInterval = null;
        let pos = 0;

        const startScroll = () => {
          const img = imgBox.querySelector("img");
          if (!img || scrollInterval) return;

          const imgHeight = img.scrollHeight;
          const boxHeight = imgBox.clientHeight;
          const maxScroll = imgHeight - boxHeight;
          if (maxScroll <= 20) return;

          scrollInterval = setInterval(() => {
            pos += 1.4;
            if (pos >= maxScroll + 100) pos = -100;
            imgBox.scrollTop = pos;
          }, 16);
        };

        const stopScroll = () => {
          clearInterval(scrollInterval);
          scrollInterval = null;
          pos = 0;
          imgBox.scrollTop = 0;
        };

        imgBox.addEventListener("mouseenter", startScroll);
        imgBox.addEventListener("mouseleave", stopScroll);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen bg-black text-white overflow-hidden py-32"
    >
      {/* Animated Gradient Glow (same as agency section) */}
      <div ref={glowRef} className="absolute inset-0 opacity-40 pointer-events-none">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0078f0] via-transparent to-[#ff6b00] blur-3xl translate-x-[-100%]" /> */}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Epic Title */}
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Our Work
            </span>
          </h2>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none -mt-8">
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              Speaks Louder
            </span>
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative cursor-pointer"
            >
              {/* Card Hover Glow */}
              <div className="card-glow absolute -inset-1 rounded-3xl blur-2xl opacity-0 
                bg-gradient-to-br from-[#0078f0]/50 to-[#ff6b00]/50 transition-opacity duration-700" />

              {/* Main Card */}
              <div className="relative bg-black/80 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden 
                transition-all duration-700 hover:border-[#0078f0]/60 hover:shadow-2xl hover:shadow-[#0078f0]/40">
                
                {/* Image with Auto Scroll */}
                <div className="scroll-img h-96 md:h-[520px] overflow-hidden relative">
                  <img
                    src={project.full}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Title Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className={`text-4xl md:text-5xl font-black tracking-tight
                    ${i % 2 === 0
                      ? 'bg-gradient-to-r from-blue-400 to-blue-200'
                      : 'bg-gradient-to-r from-orange-300 to-orange-500'
                    } bg-clip-text text-transparent`}>
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scroll-img::-webkit-scrollbar {
          display: none;
        }
        .scroll-img {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PortfolioShowcase;