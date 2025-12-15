import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, BarChart3, Users, Smartphone, Layers, UserCheck, MapPin, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Updated Data: Why Choose Us
const features = [
  {
    number: "01",
    icon: BarChart3,
    title: "Indore Digital Marketing Experts",
    desc: "We deliver sustainable growth through advanced strategies and an analytics-driven approach. Our robust planning helps achieve every business goal, ensuring your brand dominates the Indore market.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" // Analytics/Growth
  },
  {
    number: "02",
    icon: Users,
    title: "Reliable Support & Retention",
    desc: "Professional support and timely execution are our core values. We support your brand 24x7. Our high customer retention rate proves that our results-review service and regular updates keep clients happy.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" // Support Team
  },
  {
    number: "03",
    icon: Smartphone,
    title: "Custom-Choice Channels",
    desc: "Every business receives personalized SEO, PPC, and social media channel strategies. We help creative brands stand out in Indore's competitive market by targeting the right audience on the right platform.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" // Social Media
  },
  {
    number: "04",
    icon: Layers,
    title: "Comprehensive Solutions",
    desc: "We offer integrated solutions for website development, content creation, and comprehensive digital visibility. Get all your digital marketing needs fulfilled on a single, powerful platform.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" // All in one/Tech
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "100% Transparency",
    desc: "No hidden costs. No confusing reports. We keep all campaign results, project updates, and pricing open. You get complete clarity on every rupee spent and every lead generated.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" // Transparency/Glass
  },
  {
    number: "06",
    icon: UserCheck,
    title: "Dedicated Marketing Manager",
    desc: "Every client gets a dedicated expert who manages communication, strategy, execution, and reporting. We collaborate closely with you to understand your specific business challenges.",
    color: "text-[#0078f0]", 
    img: "https://media.istockphoto.com/id/2163365819/photo/group-of-business-persons-talking-in-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=QYpmadCi2vj6XNxuF2kZilI9k8dXfi8KLMjqDpxuO6U=" // Professional Manager
  },
  {
    number: "07",
    icon: Lightbulb,
    title: "Measurable, Data-Driven Results",
    desc: "Our ads are designed to generate real business results — not just clicks. We optimize campaigns daily using premium tools and automation to ensure the highest ROI for your business.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" // ROI/Results
  },
  {
    number: "08",
    icon: MapPin,
    title: "Proven Indore Experience",
    desc: "We understand Indore’s market deeply — from local businesses to service providers, real estate, coaching institutes, and startups. We know what works in this city.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1596568359553-a56de6970068?auto=format&fit=crop&q=80&w=800" // Local/City
  }
];

export default function WhyChooseSection() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#faq") {
      const section = document.getElementById("faq");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [hash]);

  useEffect(() => {
    const container = containerRef.current;
    
    let ctx = gsap.context(() => {
      
      // Central Line Animation
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: 'top 60%', 
            end: 'bottom 80%',
            scrub: 0.5,
          }
        }
      );

      // Card Items Animation
      const items = gsap.utils.toArray('.feature-item');
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { autoAlpha: 0, y: 50 }, 
          { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8,
            ease: 'power3.out',
            willChange: 'transform, opacity', 
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse' 
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#050505] py-24 px-4 overflow-hidden relative" id="why-choose-us">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#ff9f20]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#0078f0]/5 rounded-full blur-[100px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      </div>

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-20 relative z-10">
        <h2 className="text-[#ff9f20] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 border border-[#ff9f20]/20 inline-block px-4 py-1 rounded-full bg-[#ff9f20]/5 backdrop-blur-sm">
          Why Choose DSS
        </h2>
        <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
          Your Digital Marketing <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f20] via-white to-[#0078f0]">
            Partner in Indore
          </span>
        </h3>
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          We combine local expertise with global standards to deliver measurable growth, transparency, and advanced performance strategies.
        </p>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative min-h-[100vh]">
        
        {/* --- CENTRAL LINE --- */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full" />
        <div 
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#ff9f20] via-[#ff9f20] to-[#0078f0] -translate-x-1/2 rounded-full shadow-[0_0_15px_#ff9f20]"
          style={{ 
            height: '100%', 
            transformOrigin: 'top center', 
            transform: 'scaleY(0)', 
            willChange: 'transform' 
          }} 
        />

        {/* --- FEATURE STEPS --- */}
        <div className="space-y-16 md:space-y-24 pb-20">
          {features.map((item, i) => {
            const isEven = i % 2 === 0;
            const Icon = item.icon;
            
            return (
              <div 
                key={i} 
                className={`feature-item relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                style={{ opacity: 0 }} 
              >
                
                {/* 1. CONTENT SIDE */}
                <div className="flex-1 w-full pl-12 md:pl-0 md:px-12 mb-8 md:mb-0">
                  <div className={`relative p-6 md:p-8 rounded-2xl bg-[#111] border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all duration-300 group ${isEven ? 'md:text-right' : 'text-left'}`}>
                    
                    {/* Background Number */}
                    <span className={`text-8xl font-black opacity-[0.03] absolute -top-8 ${isEven ? 'right-4 md:left-4' : 'right-4'} text-white select-none pointer-events-none font-sans`}>
                      {item.number}
                    </span>
                    
                    {/* Icon & Title */}
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                        <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                            <Icon size={24} />
                        </div>
                        <h4 className={`text-xl md:text-2xl font-bold text-white ${item.color}`}>
                        {item.title}
                        </h4>
                    </div>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed relative z-10">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* 2. CENTER DOT */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#050505] border-2 border-white/20 z-20 shadow-[0_0_20px_black]">
                  <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-[#ff9f20]' : 'bg-[#0078f0]'} animate-pulse`} />
                </div>

                {/* 3. IMAGE SIDE */}
                <div className="flex-1 w-full pl-12 md:pl-0 md:px-12">
                  <div className="relative rounded-2xl overflow-hidden aspect-video group border border-white/10 shadow-2xl transform-gpu">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0 will-change-transform"
                    />
                    
                    {/* Mobile Badge */}
                    <div className="md:hidden absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-white font-bold text-xs border border-white/10">
                      {item.title}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}