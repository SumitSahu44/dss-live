import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Moving gradient glow
    //   gsap.to(glowRef.current, {
    //     xPercent: 150,
    //     ease: "none",
    //     scrollTrigger: {
    //       trigger: sectionRef.current,
    //       scrub: 1,
    //       start: "top bottom",
    //       end: "bottom top",
    //     },
    //   });

      // Title animation
      gsap.fromTo(
        titleRef.current.children,
        { y: 180, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );

      // Form fields stagger
      gsap.from(formRef.current.querySelectorAll(".form-field"), {
        y: 100,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden py-32"
    >
      {/* Animated Gradient Glow */}
      <div ref={glowRef} className="absolute inset-0 opacity-40 pointer-events-none">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0078f0] via-transparent to-[#ff6b00] blur-3xl translate-x-[-100%]" /> */}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Epic Title */}
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Let's Talk
            </span>
          </h2>
          <h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-none -mt-8">
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              Big Ideas
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left - Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <FiMail size={28} />
                </div>
                <div>
                  <p className="text-zinc-400">Email us</p>
                  <a href="mailto:hello@youragency.com" className="text-2xl font-bold hover:text-blue-400 transition-colors">
                    hello@youragency.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl">
                  <FiPhone size={28} />
                </div>
                <div>
                  <p className="text-zinc-400">Call us</p>
                  <a href="tel:+919876543210" className="text-2xl font-bold hover:text-orange-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-600 flex items-center justify-center shadow-xl">
                  <FiMapPin size={28} />
                </div>
                <div>
                  <p className="text-zinc-400">Visit us</p>
                  <p className="text-2xl font-bold">Mumbai • Delhi • Bangalore</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-3xl font-light text-zinc-300 leading-relaxed">
                Ready to turn your vision into reality? 
                <span className="block mt-4 text-4xl font-bold bg-gradient-to-r from-blue-400 to-orange-500 bg-clip-text text-transparent">
                  We're just one message away.
                </span>
              </p>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div ref={formRef}>
            <form
              action="https://formsubmit.co/hello@youragency.com" // Change to your email
              method="POST"
              className="space-y-6"
            >
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-8 py-6 text-lg bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-8 py-6 text-lg bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              <div className="form-field">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (e.g. Website Design)"
                  className="w-full px-8 py-6 text-lg bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              <div className="form-field">
                <textarea
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell us about your project..."
                  className="w-full px-8 py-6 text-lg bg-black/50 backdrop-blur-xl border border-zinc-800 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="form-field group relative w-full md:w-auto px-16 py-6 text-xl font-bold rounded-2xl overflow-hidden
                  bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500
                  shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 flex items-center justify-center gap-4"
              >
                <span>Send Message</span>
                <FiSend className="group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;