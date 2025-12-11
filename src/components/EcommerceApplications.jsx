import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// --- CUSTOMIZE CONTENT HERE (ECOMMERCE SPECIFIC) ---
const serviceData = {
  id: "ecommerce-applications",
  title: "E-commerce Applications",
  subtitle: "Shop. Sell. Scale.",
  description:
    "We build more than just online stores; we build high-converting digital marketplaces. From custom headless commerce solutions to optimized Shopify setups, we ensure your customers enjoy a seamless shopping experience from landing to checkout.",
  features: [
    {
      title: "Custom Storefronts",
      desc: "Break free from templates. We design unique, brand-centric shopping experiences using Headless Commerce architectures (Next.js/Shopify) for ultimate speed and flexibility.",
    },
    {
      title: "Conversion Optimization",
      desc: "Every pixel is designed to sell. We implement psychological triggers, streamlined checkout flows, and lightning-fast loading speeds to maximize your ROAS.",
    },
    {
      title: "Payment & Logistics",
      desc: "Seamless integration of global payment gateways (Stripe, Razorpay, PayPal) and automated shipping solutions to handle operations on autopilot.",
    },
    {
      title: "Inventory Management",
      desc: " robust backend systems that track stock in real-time, automate reordering, and sync across multiple sales channels (Amazon, Instagram, Web).",
    },
  ],
  process: [
    { number: "01", step: "Business Analysis", text: "Understanding your product lines, target audience, and operational flow to choose the right tech stack." },
    { number: "02", step: "UX/UI Architecture", text: "Designing intuitive user journeys, product filtering, and mobile-first layouts that reduce cart abandonment." },
    { number: "03", step: "Development & API", text: "Building the core store, integrating secure payment gateways, and connecting CRM/ERP systems." },
    { number: "04", step: "Launch & Scale", text: "Rigorous testing of transactions, server scaling for high traffic, and final deployment." },
  ],
  techStack: ["Shopify Plus", "WooCommerce", "Magento", "Next.js Commerce", "Stripe", "Razorpay", "Strapi CMS"],
};

const EcommerceApplications = () => {
  const containerRef = useRef(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- 1. SAFE GSAP LOADING ---
  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) {
          setIsGsapReady(true);
          return;
        }
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const script = document.createElement("script");
            script.src = src; script.async = true; script.onload = resolve; script.onerror = reject;
            document.body.appendChild(script);
          });
        };
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
        setIsGsapReady(true);
      } catch (error) { console.error("GSAP loading failed", error); }
    };
    loadGsap();
  }, []);

  // --- 2. ANIMATIONS ---
  useEffect(() => {
    if (!isGsapReady || !containerRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Title Parallax
      gsap.fromTo(".svc-title-char", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: "power4.out" }
      );

      // Feature Cards Fade Up
      gsap.utils.toArray(".feature-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });

      // Process Line Animation
      gsap.fromTo(".process-line",
        { height: "0%" },
        {
          height: "100%", ease: "none",
          scrollTrigger: {
            trigger: ".process-container",
            start: "top center",
            end: "bottom center",
            scrub: 1,
          }
        }
      );

      // Process Items Reveal
      gsap.utils.toArray(".process-item").forEach((item) => {
        gsap.fromTo(item,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isGsapReady]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020205] text-white overflow-hidden pt-24 pb-20">
      
      {/* --- BACKGROUND (Amber/Gold Tint for Commerce/Value) --- */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2e1c05] via-[#050505] to-black z-0 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-24 mt-12 md:mt-20">
            <div className="flex items-center gap-3 mb-6">
                 {/* Changed to Amber/Yellow */}
                 <div className="h-[1px] w-12 bg-amber-500/50"></div>
                 <span className="text-amber-400 uppercase tracking-[0.2em] text-sm font-semibold">{serviceData.subtitle}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
                {serviceData.title.split(" ").map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-4">
                        <span className="svc-title-char inline-block">{word}</span>
                    </span>
                ))}
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-zinc-800 pl-6 svc-title-char opacity-0 translate-y-4">
                {serviceData.description}
            </p>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
            {serviceData.features.map((feature, i) => (
                <div key={i} className="feature-card group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                        {/* Amber Arrow */}
                        <svg className="w-8 h-8 text-amber-500 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </div>
                    {/* Amber Icon Background */}
                    <div className="w-12 h-12 bg-amber-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
            ))}
        </div>

        {/* --- PROCESS SECTION --- */}
        <div className="process-container relative grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Sticky Title */}
            <div className="hidden lg:block sticky top-32 h-fit">
                <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 mb-6">Development <br/>Cycle</h2>
                <p className="text-zinc-400 text-lg max-w-xs">From concept to checkout, we build systems that generate revenue.</p>
                <div className="mt-12">
                   <HashLink smooth to="/#contact">
                        <button className="px-8 py-3 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest font-bold">
                            Build My Store
                        </button>
                    </HashLink>
                </div>
            </div>

            {/* Steps List */}
            <div className="relative pl-8 border-l border-zinc-800">
                {/* Amber Line Overlay */}
                <div className="process-line absolute left-[-1px] top-0 w-[2px] bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>

                <div className="flex flex-col gap-12 lg:gap-24">
                    {serviceData.process.map((item, i) => (
                        <div key={i} className="process-item relative">
                            {/* Amber Number Badge */}
                            <span className="absolute -left-[45px] top-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#020205] border border-amber-500/50 text-amber-400 text-xs font-bold">
                                {item.number}
                            </span>
                            <h3 className="text-3xl font-bold text-white mb-2">{item.step}</h3>
                            <p className="text-zinc-400">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- TECH STACK MARQUEE / TAGS --- */}
        <div className="mb-32">
            <h3 className="text-center text-sm uppercase tracking-widest text-zinc-500 mb-8">E-commerce Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {serviceData.techStack.map((tech, i) => (
                    <span key={i} className="px-6 py-2 rounded-full bg-white/5 border border-white/5 text-zinc-300 text-sm md:text-base hover:border-amber-500/50 hover:text-white transition-colors cursor-default">
                        {tech}
                    </span>
                ))}
            </div>
        </div>

       
      </div>
    </div>
  );
};

export default EcommerceApplications;