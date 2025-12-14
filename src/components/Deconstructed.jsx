import React, { useLayoutEffect, useRef, useState } from 'react';
import { Globe, Megaphone, Share2, Search, PenTool, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. ORIGINAL FULL DATA ---
const services = [
  {
    id: "01",
    title: "Website Development",
    desc: "Professional website solutions designed to help your business grow. From modern designs to fully functional platforms, we build what your brand needs.",
    icon: Globe,
    theme: "from-blue-900 via-blue-950 to-black",
    accent: "text-blue-400",
    bgAccent: "rgba(59, 130, 246, 0.4)",
    link: "/website-design-and-website-development",
    features: ["Static & Dynamic Websites", "WordPress, Shopify, MERN", "SSL, Hosting, Speed Opt", "Admin Panel Development", "E-commerce Store Setup", "Fully Responsive + SEO"]
  },
  {
    id: "02",
    title: "Digital Marketing (PPC)",
    desc: "Powerful PPC campaigns designed to bring you real, measurable growth. From targeted ads to data-driven strategies, we help you reach the right audience fast.",
    icon: Megaphone,
    theme: "from-orange-900 via-orange-950 to-black",
    accent: "text-orange-400",
    bgAccent: "rgba(249, 115, 22, 0.4)",
    link: "/performance-marketing-ppc",
    features: ["Facebook & Instagram Ads", "Google Ads (Search, Display)", "Lead Generation", "Sales Funnels", "Audience Targeting", "Retargeting & Scaling"]
  },
  {
    id: "03",
    title: "Social Media",
    desc: "Professional social media solutions designed to grow your brand and engage your audience. We amplify your presence across platforms.",
    icon: Share2,
    theme: "from-pink-900 via-pink-950 to-black",
    accent: "text-pink-400",
    bgAccent: "rgba(236, 72, 153, 0.4)",
    link: "/social-media-marketing",
    features: ["12–15 Posts per month", "Reels & Motion Graphics", "Creative Storytelling", "Brand Consistency", "Page Optimization", "Monthly Analytics Report"]
  },
  {
    id: "04",
    title: "SEO Optimization",
    desc: "Professional SEO solutions designed to improve your website’s visibility and rankings. We ensure your site performs at its best.",
    icon: Search,
    theme: "from-green-900 via-green-950 to-black",
    accent: "text-green-400",
    bgAccent: "rgba(34, 197, 94, 0.4)",
    link: "/search-engine-optimization",
    features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Backlink Building", "Local SEO", "Ranking Reports"]
  },
  {
    id: "05",
    title: "Influencer Marketing",
    desc: "Professional branding and design solutions crafted to define your brand’s identity. We create designs that truly represent you.",
    icon: PenTool,
    theme: "from-purple-900 via-purple-950 to-black",
    accent: "text-purple-400",
    bgAccent: "rgba(168, 85, 247, 0.4)",
    link: "/influencer-marketing",
    features: ["Logo Design", "Packaging Design", "Catalogues", "Visiting Cards", "Brochures & Flyers", "Social Media Creative Kit"]
  },
  {
    id: "06",
    title: "E-commerce Setup",
    desc: "Seamless e-commerce solutions tailored to launch and grow your online store. We provide everything you need to create a smooth shopping experience.",
    icon: ShoppingBag,
    theme: "from-yellow-900 via-yellow-950 to-black",
    accent: "text-yellow-400",
    bgAccent: "rgba(234, 179, 8, 0.4)",
    link: "/e-commerce-applications",
    features: ["Shopify Store Setup", "Payment Gateway Integration", "Delivery Partner Setup", "Product Listing", "Conversion Optimization"]
  },
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const stackWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  
  // State for active card
  const [activeCard, setActiveCard] = useState(1);
  const activeCardRef = useRef(1); 

  // --- ANIMATION LOGIC (Optimized) ---
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const totalCards = cards.length;

      // Initial Setup
      cards.forEach((card, i) => {
        gsap.set(card, { 
          zIndex: totalCards - i, 
          scale: i === 0 ? 1 : 1 - (i * 0.04), 
          yPercent: i === 0 ? 0 : 6 * i,
          filter: i === 0 ? 'blur(0px) brightness(1)' : `blur(${i * 2}px) brightness(${1 - (i * 0.15)})`, 
          opacity: 1,
          transformOrigin: "center bottom",
          force3D: true 
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalCards * 100}%`,
          pin: true,
          scrub: 1, 
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.3, max: 0.6 },
            delay: 0,
            ease: "power2.inOut", 
          },
          onUpdate: (self) => {
             // Optimized Update to reduce re-renders
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

      // Animation Loop
      cards.forEach((card, i) => {
          if (i === totalCards - 1) return;
          const nextCard = cards[i+1];
          
          tl.to(card, {
              yPercent: -120, 
              scale: 0.9,
              opacity: 0,
              filter: 'blur(8px) brightness(0.5)',
              duration: 1,
              ease: "power2.inOut"
          }, i);

          if (nextCard) {
              tl.to(nextCard, {
                  yPercent: 0,
                  scale: 1,
                  filter: 'blur(0px) brightness(1)',
                  opacity: 1,
                  duration: 1,
                  ease: "power2.inOut"
              }, i);
          }
          
          const futureCard = cards[i+2];
          if (futureCard) {
            tl.to(futureCard, {
                scale: 1 - (1 * 0.04),
                yPercent: 6,
                filter: 'blur(2px) brightness(0.85)',
                duration: 1,
                ease: "power2.inOut"
            }, i);
          }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse Tilt
  const handleMouseMove = (e) => {
    if (!stackWrapperRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 8; 
    const y = (e.clientY / innerHeight - 0.5) * 8; 

    gsap.to(stackWrapperRef.current, {
      rotationY: x, 
      rotationX: -y, 
      duration: 1, 
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
      if (!stackWrapperRef.current) return;
      gsap.to(stackWrapperRef.current, { rotationY: 0, rotationX: 0, duration: 1 });
  };

  const currentService = services[activeCard - 1] || services[0];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="services"
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] transition-all duration-1000 ease-in-out opacity-20 blur-[100px]"
            style={{
                background: `radial-gradient(circle, ${currentService.bgAccent} 0%, rgba(0,0,0,0) 70%)`,
                willChange: 'background' 
            }}
        />

        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-125" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/50 to-[#050505]" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 w-full max-w-[1600px] h-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-10">  
        
        {/* LEFT COLUMN: Text */}
        <div className="hidden md:flex flex-1 flex-col justify-center h-full pr-10 relative">
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

          <div className="relative mt-8">
             <span className="text-[120px] lg:text-[180px] font-black text-white/5 leading-none select-none absolute -top-10 -left-6 lg:-top-24 lg:-left-10 transition-all duration-700 ease-out">
               {currentService.id}
             </span>
             <div className="relative z-10 pl-6 border-l-2 border-white/10 backdrop-blur-sm">
               <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
                 {currentService.desc}
               </p>
             </div>
          </div>
        </div>

        {/* CENTER COLUMN: CARD STACK */}
        <div className="flex flex-col w-full md:w-[450px] items-center justify-center h-full pt-10 md:pt-0">
          
          <div className="md:hidden text-center mb-6">
             <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
             <p className="text-white/40 text-xs uppercase tracking-widest">Swipe to explore</p>
          </div>

          <div 
            ref={stackWrapperRef}
            className="relative w-full aspect-[3/4] max-w-[360px] md:max-w-none md:w-[420px] md:h-[640px]" // Increased height for full content
            style={{ perspective: '1200px' }} 
          >
            <div className="relative w-full h-full transform-style-3d">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                    <div
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    onClick={() => navigate(service.link)}
                    className={`absolute inset-0 rounded-[2rem] p-6 md:p-8 flex flex-col border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br ${service.theme} cursor-pointer group hover:border-white/30 transition-colors duration-300`}
                    style={{ 
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 20px 50px -10px rgba(0,0,0,0.5)',
                        willChange: 'transform, opacity, filter', 
                        backfaceVisibility: 'hidden' 
                    }}
                    >
                    
                    <div className="relative z-20 flex flex-col h-full pointer-events-none">
                        <div className="flex justify-between items-start w-full shrink-0">
                            <span className={`text-5xl md:text-7xl font-black opacity-20 tracking-tighter select-none ${service.accent}`}>
                            {service.id}
                            </span>
                            
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 ${service.accent}`}>
                                <Icon size={24} />
                            </div>
                        </div>

                        {/* Middle Content - Full Features */}
                        <div className="my-auto py-4">
                            <div className="flex flex-col gap-2.5">
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
                            <div className={`w-12 h-1 mb-4 rounded-full bg-gradient-to-r ${service.theme}`} />
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                            {service.title}
                            </h3>
                            <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed mb-4 line-clamp-2">
                              {service.desc}
                            </p>
                            
                            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${service.accent} transition-transform duration-300 group-hover:translate-x-2`}>
                            <span>View Details</span>
                            <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>

                    <div className={`absolute -right-10 -top-10 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none`} 
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
                   <div 
                      key={idx} 
                      onClick={() => navigate(s.link)}
                      className={`group flex items-center gap-6 transition-all duration-500 ease-out cursor-pointer ${isActive ? 'translate-x-4' : 'hover:translate-x-2'}`}
                   >
                      <div className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 box-content ${isActive ? `bg-[#050505] border-${s.accent.split('-')[1]}-500 scale-110` : 'bg-[#050505] border-white/20 group-hover:border-white/50'}`}>
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
  );
}