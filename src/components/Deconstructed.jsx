import React, { useEffect, useRef, useState } from 'react';
import { Globe, Megaphone, Share2, Search, PenTool, ShoppingBag, MapPin, ArrowRight, Check } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Website Development",
    desc: "Professional website solutions designed to help your business grow. From modern designs to fully functional platforms.",
    icon: Globe,
    theme: "from-blue-900 via-blue-950 to-black",
    accent: "text-blue-400",
    bgAccent: "rgba(59, 130, 246, 0.4)",
    features: ["Static & Dynamic Websites", "WordPress, Shopify, MERN", "SSL, Hosting, Speed Opt", "E-commerce Store Setup"]
  },
  {
    id: "02",
    title: "Digital Marketing (PPC)",
    desc: "Powerful PPC campaigns designed to bring you real, measurable growth. Targeted ads to data-driven strategies.",
    icon: Megaphone,
    theme: "from-orange-900 via-orange-950 to-black",
    accent: "text-orange-400",
    bgAccent: "rgba(249, 115, 22, 0.4)",
    features: ["Facebook & Instagram Ads", "Google Ads (Search, Display)", "Lead Generation", "Sales Funnels"]
  },
  {
    id: "03",
    title: "Social Media Mgmt",
    desc: "Professional social media solutions designed to grow your brand and engage your audience.",
    icon: Share2,
    theme: "from-pink-900 via-pink-950 to-black",
    accent: "text-pink-400",
    bgAccent: "rgba(236, 72, 153, 0.4)",
    features: ["12–15 Posts per month", "Reels & Motion Graphics", "Creative Storytelling", "Page Optimization"]
  },
  {
    id: "04",
    title: "SEO Optimization",
    desc: "Improve your website’s visibility and rankings. We ensure your site performs at its best on search engines.",
    icon: Search,
    theme: "from-green-900 via-green-950 to-black",
    accent: "text-green-400",
    bgAccent: "rgba(34, 197, 94, 0.4)",
    features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Backlink Building"]
  },
  {
    id: "05",
    title: "Branding & Design",
    desc: "Crafted to define your brand’s identity. We create designs that truly represent you and stand out.",
    icon: PenTool,
    theme: "from-purple-900 via-purple-950 to-black",
    accent: "text-purple-400",
    bgAccent: "rgba(168, 85, 247, 0.4)",
    features: ["Logo Design", "Packaging Design", "Catalogues", "Visiting Cards"]
  },
  {
    id: "06",
    title: "E-commerce Setup",
    desc: "Seamless e-commerce solutions tailored to launch and grow your online store smoothly.",
    icon: ShoppingBag,
    theme: "from-yellow-900 via-yellow-950 to-black",
    accent: "text-yellow-400",
    bgAccent: "rgba(234, 179, 8, 0.4)",
    features: ["Shopify Store Setup", "Payment Gateway", "Delivery Setup", "Product Listing"]
  },
  {
    id: "07",
    title: "Local Business Growth",
    desc: "Strategies designed to boost your local business presence and attract more customers in your area.",
    icon: MapPin,
    theme: "from-red-900 via-red-950 to-black",
    accent: "text-red-400",
    bgAccent: "rgba(239, 68, 68, 0.4)",
    features: ["GMB Profile Setup", "Local SEO", "Review Management", "Local Ads"]
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null); // New wrapper ref
  const stackWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCard, setActiveCard] = useState(1);
  const activeCardRef = useRef(1);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- SAFE GSAP LOADING ---
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
                const script = document.createElement('script');
                script.src = src; script.async = true; script.onload = resolve; script.onerror = reject;
                document.body.appendChild(script);
            });
        };
        if (!window.gsap) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        if (!window.ScrollTrigger) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        setIsGsapReady(true);
      } catch (error) { console.error("GSAP loading failed", error); }
    };
    loadGsap();
  }, []);

  // --- ANIMATION LOGIC ---
  useEffect(() => {
    if (!isGsapReady || !containerRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    // Refresh ScrollTrigger to ensure positions are correct immediately
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      
      // 1. INITIAL SETUP
      cards.forEach((card, i) => {
        gsap.set(card, { 
          zIndex: totalCards - i, 
          scale: i === 0 ? 1 : 1 - (i * 0.05), 
          y: i === 0 ? 0 : 35 * i, 
          filter: i === 0 ? 'blur(0px) brightness(1)' : `blur(${i * 2}px) brightness(${1 - (i * 0.15)})`, 
          opacity: 1,
          transformOrigin: "center bottom"
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          // Increased length for smoother, less "tight" scroll
          end: `+=${totalCards * 150}%`, 
          pin: true,
          pinSpacing: true,
          scrub: 1.5, // Slower scrub for smoother feel (was 1)
          anticipatePin: 1, 
          
          // ADDED SNAP: This gives that "one slide per slide" feel
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.3, max: 0.6 },
            delay: 0.1, // Wait a tiny bit before snapping
            ease: "power2.inOut" // Smooth snap curve
          },

          onUpdate: (self) => {
             const progress = self.progress;
             const rawIndex = Math.round(progress * (totalCards - 1));
             const safeIndex = Math.min(Math.max(rawIndex + 1, 1), totalCards);
             if (activeCardRef.current !== safeIndex) {
                 activeCardRef.current = safeIndex;
                 setActiveCard(safeIndex);
             }
          }
        }
      });

      // 2. ANIMATION LOOP
      cards.forEach((card, i) => {
          if (i === totalCards - 1) return;

          const nextCard = cards[i+1];
          
          // Animate Current Card OUT
          tl.to(card, {
              y: -window.innerHeight * 1.2, // Slide further up to clear screen
              scale: 0.9,
              opacity: 0,
              filter: 'blur(8px) brightness(0.5)', // Performance friendly blur
              duration: 1,
              ease: "power2.inOut" // Slightly smoother ease
          }, i);

          // Animate Next Card IN
          if (nextCard) {
              tl.to(nextCard, {
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px) brightness(1)',
                  opacity: 1,
                  duration: 1,
                  ease: "power2.inOut"
              }, i);
          }
          
          // Animate Future Cards (The stack effect)
          const futureCard = cards[i+2];
          if (futureCard) {
            tl.to(futureCard, {
                scale: 1 - (1 * 0.05),
                y: 35, // Move into "on deck" position
                filter: 'blur(2px) brightness(0.85)',
                duration: 1,
                ease: "power2.inOut"
            }, i);
          }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isGsapReady]);

  // Mouse tilt (Performance Optimized)
  const handleMouseMove = (e) => {
    if (!stackWrapperRef.current || !window.gsap) return;
    // Debounce or reduce calculation frequency if still lagging
    requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 3; // Reduced for subtle effect
        const y = (e.clientY / innerHeight - 0.5) * 3; 
        window.gsap.to(stackWrapperRef.current, {
            rotationY: x, 
            rotationX: -y, 
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
        });
    });
  };

  const currentService = services[activeCard - 1] || services[0];

  return (
    // WRAPPER: Ensures background is ALWAYS black during pin to avoid white flash
    <div ref={wrapperRef} className="w-full bg-[#050505] relative">
        
        <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        id="services"
        className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans"
        style={{ isolation: 'isolate' }} 
        >
        
        {/* --- BACKGROUND ELEMENTS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
            {/* Base Background */}
            <div className="absolute inset-0 bg-[#050505]" />
            
            {/* Dynamic Glow */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] transition-all duration-1000 ease-linear opacity-20 will-change-transform"
                style={{
                    background: `radial-gradient(circle, ${currentService.bgAccent} 0%, rgba(0,0,0,0) 70%)`,
                    mixBlendMode: 'screen' 
                }}
            />

            {/* Grain & Grid */}
            <div className="absolute inset-0 opacity-[0.05]" 
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/50 to-[#050505]" />
        </div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 w-full max-w-[1600px] h-full flex flex-col items-center justify-start md:flex-row md:justify-between px-4 sm:px-6 md:px-12 py-10">  
            
            {/* LEFT COLUMN */}
            <div className="hidden md:flex flex-1 flex-col justify-center h-full pr-10">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-[2px] w-12 bg-white/30"></div>
                    <span className="text-white/50 uppercase tracking-[0.2em] text-sm">Our Expertise</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                    Our <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    Services
                    </span>
                </h2>
            </div>

            <div className="relative">
                <span className="text-[120px] lg:text-[180px] font-black text-white/5 leading-none select-none absolute -top-10 -left-6 lg:-top-20 lg:-left-10 transition-all duration-500">
                {currentService.id}
                </span>
                <div className="relative z-10 mt-12">
                <p className="text-gray-400 text-lg max-w-sm leading-relaxed border-l-2 border-white/10 pl-6 h-24">
                    {/* Added key to force fade animation on text change if desired, or keep static */}
                   <span key={currentService.id} className="animate-fadeIn">
                       {currentService.desc}
                   </span>
                </p>
                </div>
            </div>
            </div>

            {/* CENTER COLUMN: CARD STACK */}
            <div className="flex flex-col md:flex-shrink-0 w-full md:w-[450px] flex items-center justify-center h-full pt-10 md:pt-0">
            
            <div className="md:hidden text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
                <div className="text-white/40 text-sm animate-pulse">Swipe Up to Explore</div>
            </div>

            <div 
                ref={stackWrapperRef}
                className="relative w-full aspect-[3/4] md:w-[400px] md:h-[600px] lg:w-[420px] lg:h-[620px]"
                style={{ perspective: '1200px' }} 
            >
                <div className="relative w-full h-full transform-style-3d">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className={`absolute inset-0 rounded-[2rem] p-6 md:p-8 flex flex-col border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br ${service.theme} will-change-transform`}
                        style={{ 
                            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 20px 50px -10px rgba(0,0,0,0.5)',
                        }}
                        >
                        {/* Content */}
                        <div className="relative z-20 flex flex-col h-full">
                            <div className="flex justify-between items-start w-full shrink-0">
                                <span className={`text-5xl md:text-7xl font-black opacity-20 tracking-tighter select-none ${service.accent}`}>
                                {service.id}
                                </span>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 ${service.accent}`}>
                                    <Icon size={24} />
                                </div>
                            </div>

                            <div className="my-auto py-4">
                                <div className="flex flex-col gap-3">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`p-0.5 rounded-full bg-white/10 shrink-0 ${service.accent}`}>
                                                <Check size={12} />
                                            </div>
                                            <span className="text-white/90 text-sm font-medium tracking-wide leading-tight">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto shrink-0">
                                <div className={`w-12 h-1 mb-5 rounded-full bg-gradient-to-r ${service.theme}`} />
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                {service.title}
                                </h3>
                                
                                <div className={`mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer group ${service.accent}`}>
                                <span>Explore Details</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className={`absolute -right-10 -top-10 w-64 h-64 rounded-full opacity-20 blur-3xl`} 
                             style={{ background: service.bgAccent }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        </div>
                    );
                })}
                </div>
            </div>
            </div>

            {/* RIGHT COLUMN: NAVIGATION */}
            <div className="hidden md:flex flex-1 flex-col justify-center h-full pl-16">
                <div className="flex flex-col gap-5 relative">
                <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/10" />
                {services.map((s, idx) => {
                    const isActive = idx + 1 === activeCard;
                    return (
                        <div key={idx} className={`group flex items-center gap-6 transition-all duration-500 ease-out ${isActive ? 'translate-x-4' : 'hover:translate-x-1'}`}>
                        <div className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${isActive ? `bg-[#050505] border-${s.accent.split('-')[1]}-500 scale-125` : 'bg-[#050505] border-white/20 group-hover:border-white/50'}`}>
                            {isActive && <div className={`absolute inset-0 m-auto w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: s.bgAccent }} />}
                        </div>
                        <span className={`text-lg font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                            {s.title}
                        </span>
                        </div>
                    )
                })}
                </div>
            </div>

        </div>
        </section>
        
        {/* --- DUMMY NEXT COMPONENT (To show smooth transition) --- */}
        <div className="w-full h-[50vh] bg-[#050505] border-t border-white/5 flex items-center justify-center relative z-20">
             <div className="text-center">
                 <h2 className="text-white text-4xl font-bold mb-4 opacity-50">Next Section Starts Here</h2>
                 <p className="text-white/30">Seamless transition without white flashes.</p>
             </div>
        </div>

    </div>
  );
}