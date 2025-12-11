import React, { useLayoutEffect, useRef, useState } from 'react'; // useLayoutEffect is key here
import { Globe, Megaphone, Share2, Search, PenTool, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register Plugin outside component to avoid re-registration issues
gsap.registerPlugin(ScrollTrigger);

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
  const [activeCard, setActiveCard] = useState(1);
  const activeCardRef = useRef(1);
  const navigate = useNavigate();

  // --- ANIMATION LOGIC (UseLayoutEffect for smoother paint) ---
  useLayoutEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    let ctx = gsap.context(() => {
      
      // 1. INITIAL SETUP
      // Pehle card ko perfectly center rakho, baaki ko thoda neeche aur chota
      cards.forEach((card, i) => {
        gsap.set(card, { 
          zIndex: totalCards - i, 
          scale: i === 0 ? 1 : 1 - (i * 0.05), // Subtle scale difference
          y: i === 0 ? 0 : 40, // Sirf 40px neeche, taaki jump na kare
          filter: i === 0 ? 'blur(0px) brightness(1)' : `blur(${i * 2}px) brightness(${1 - (i * 0.15)})`, 
          opacity: i === 0 ? 1 : 0.6, // Peeche wale thode dim
          transformOrigin: "center bottom"
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top", // Section top hit karte hi pin ho jayega
          end: `+=${totalCards * 120}%`, // Scroll duration thoda badhaya for smoothness
          pin: true,
          scrub: 1, // 0.5 ki jagah 1 kiya taaki buttery smooth feel aaye
          anticipatePin: 1,
          onUpdate: (self) => {
             // Logic to sync sidebar active state
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
          
          // Current Card Exit
          // Hum isse screen ke bahar nahi fekenge, bas fade aur scale down karenge
          tl.to(card, {
              y: -50, // Sirf thoda sa upar jayega
              scale: 0.85,
              opacity: 0,
              filter: 'blur(10px) brightness(0.5)',
              duration: 1,
              ease: "power2.inOut"
          }, i);

          // Next Card Entry
          if (nextCard) {
              tl.to(nextCard, {
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px) brightness(1)',
                  opacity: 1,
                  duration: 1,
                  ease: "power2.inOut"
              }, i); // 'i' means ye dono animations saath me hongi
          }
          
          // Future Card Preparation (Queue me aana)
          const futureCard = cards[i+2];
          if (futureCard) {
            tl.to(futureCard, {
                scale: 1 - (1 * 0.05),
                y: 40,
                opacity: 0.6,
                filter: 'blur(2px) brightness(0.85)',
                duration: 1,
                ease: "power2.inOut"
            }, i);
          }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse tilt effect (Optimized)
  const handleMouseMove = (e) => {
    if (!stackWrapperRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 5; 
    const y = (e.clientY / innerHeight - 0.5) * 5; 

    gsap.to(stackWrapperRef.current, {
      rotationY: x, 
      rotationX: -y, 
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
      if (!stackWrapperRef.current) return;
      gsap.to(stackWrapperRef.current, { rotationY: 0, rotationX: 0, duration: 1 });
  };

  const currentService = services[activeCard - 1] || services[0];
  const handleNavClick = (link) => navigate(link);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="services"
      onMouseLeave={handleMouseLeave}
      // Fixed: h-screen ki jagah explicit styling aur padding fix
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans"
      style={{ isolation: 'isolate', paddingTop: '0px', paddingBottom: '40px' }} 
    >
      
      {/* --- BACKGROUND GLOW & NOISE --- */}
      {/* Background ko ensure karne ke liye white flash na aaye */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
        
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] transition-all duration-1000 ease-linear opacity-20"
            style={{
                background: `radial-gradient(circle, ${currentService.bgAccent} 0%, rgba(0,0,0,0) 70%)`,
                mixBlendMode: 'screen' 
            }}
        />
        
        <div 
            className="absolute top-[60%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] transition-all duration-1000 ease-linear opacity-10"
            style={{
                background: `radial-gradient(circle, ${currentService.bgAccent} 0%, rgba(0,0,0,0) 60%)`,
                mixBlendMode: 'plus-lighter'
            }}
        />

        <div className="absolute inset-0 opacity-[0.07]" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', filter: 'contrast(120%) brightness(100%)' }} />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/50 to-[#050505]" />
      </div>

      {/* --- CONTENT --- */}
      {/* Adjusted padding here */}
     <div className="relative z-10 w-full max-w-[1600px] h-full 
      flex flex-col items-center justify-start 
      md:flex-row md:justify-between 
      px-4 sm:px-6 md:px-12 pt-10 md:pt-0">  
        
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
               <p className="text-gray-400 text-lg max-w-sm leading-relaxed border-l-2 border-white/10 pl-6">
                 Scroll through our specialized services designed to elevate your brand in the digital landscape.
               </p>
             </div>
          </div>
        </div>

        {/* CENTER COLUMN: CARD STACK */}
        {/* Added some top margin on mobile to push cards down slightly */}
        <div className="flex flex-col md:flex-shrink-0 w-full md:w-[450px] flex items-center justify-center h-full mt-4 md:mt-0">
          
          <div className="md:hidden text-center mb-6">
             <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
             <div className="text-white/40 text-sm">Tap card to explore</div>
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
                    onClick={() => navigate(service.link)}
                    // Added bg-black fallback to gradient to prevent transparency issues
                    className={`absolute inset-0 rounded-[2rem] p-6 md:p-8 flex flex-col border border-white/10 shadow-2xl overflow-hidden bg-[#050505] bg-gradient-to-br ${service.theme} will-change-transform cursor-pointer hover:border-white/30 transition-colors`}
                    style={{ 
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 20px 50px -10px rgba(0,0,0,0.5)',
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
                            <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed mb-4 line-clamp-2">
                            {service.desc}
                            </p>

                            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest group ${service.accent}`}>
                            <span>Explore Details</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

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
                   <div 
                      key={idx} 
                      onClick={() => handleNavClick(s.link)} 
                      className={`group flex items-center gap-6 transition-all duration-500 ease-out cursor-pointer ${isActive ? 'translate-x-4' : 'hover:translate-x-1'}`}
                   >
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
  );
}