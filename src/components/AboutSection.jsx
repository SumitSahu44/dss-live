import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { x: -300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current.children,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Counter Animation (Fixed & Smooth)
      counterRefs.current.forEach((el, i) => {
        if (!el) return;

        const target = el.querySelector("span");
        const finalValue = el.dataset.value; // "500+", "320+", "8+"
        let startValue = 0;

        // Extract number part only for counting
        const numericValue = parseInt(finalValue.replace(/\D/g, "")) || 0;

        gsap.to({ val: 0 }, {
          val: numericValue,
          duration: 2.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            const current = Math.round(this.targets()[0].val);
            target.innerText = current + (finalValue.includes("+") ? "+" : "") + (finalValue.includes("Years") ? " Years" : "");
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "500+", label: "Happy Clients" },
    { value: "320+", label: "Projects Done" },
    { value: "8+", label: "Years Strong" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black text-white py-32 overflow-hidden"
    >
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-80 h-80 bg-orange-600 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
              <img
                src="/images/apd-9.webp"
                alt="Our Team"
                className="w-full h-auto object-cover transition-all duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold text-lg">
              Since 2017
            </div>
          </div>

          {/* Right - Content */}
          <div ref={textRef} className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              We Don't Just Build Websites.
              <span className="block text-4xl md:text-5xl mt-4 text-zinc-400 font-light">
                We Build <span className="text-blue-400">Growth Machines</span>.
              </span>
            </h2>

            <p className="text-xl text-zinc-300 leading-relaxed">
              We're a team of creators, thinkers, and digital craftsmen who believe that every brand deserves to stand out — not just exist.
            </p>

            <p className="text-lg text-zinc-400 leading-relaxed">
              From startups to industry leaders, we've helped <strong>500+ brands</strong> transform their online presence into powerful revenue-generating assets. No templates. No shortcuts. Just pure strategy, creativity, and results.
            </p>

            {/* Stats Grid with Animated Counters */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  ref={(el) => (counterRefs.current[i] = el)}
                  data-value={stat.value}
                  className="text-center"
                >
                  <div className="text-5xl  font-black text-white">
                    <span>0</span>
                  </div>
                  <p className="text-zinc-400 mt-2 text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <blockquote className="text-2xl md:text-3xl font-medium italic text-zinc-200 border-l-4 border-blue-500 pl-6">
                "Your success is our success. Every pixel, every line of code — it's all built to make you win."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;