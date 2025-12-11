import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Performance Marketing",
    desc: "We don't just run ads; we print money for your business. Meta, Google, & LinkedIn campaigns optimized for high ROAS.",
    skills: ["PPC", "Meta Ads", "Conversion API", "Retargeting"],
    color: "from-[#ff9f20] to-[#ff7e5f]", // Orange Gradient
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "02",
    title: "Branding & Design",
    desc: "Crafting visual identities that leave a mark. From logos to brand guidelines, we ensure you look as good as you perform.",
    skills: ["Logo Design", "Brand Guidelines", "UI/UX", "Packaging"],
    color: "from-[#0078f0] to-[#00c6ff]", // Blue Gradient
    img: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "03",
    title: "Web Development",
    desc: "Blazing fast, SEO-optimized, and visually stunning websites. We build digital HQs that convert visitors into customers.",
    skills: ["React/Next.js", "Shopify", "Wordpress", "GSAP Animations"],
    color: "from-[#ff9f20] to-[#f7b733]",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "04",
    title: "Content Production",
    desc: "Storytelling through lens. High-quality reels, corporate shoots, and product photography that captures attention instantly.",
    skills: ["Video Editing", "Motion Graphics", "Reels Production", "Scripting"],
    color: "from-[#0078f0] to-[#4facfe]",
    img: "https://images.unsplash.com/photo-1574717432707-c17f30934053?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "05",
    title: "SEO & Growth",
    desc: "Ranking you where it matters. Our organic strategies ensure you stay on top of search results for the long run.",
    skills: ["Technical SEO", "Link Building", "Local SEO", "Content Strategy"],
    color: "from-[#ff9f20] to-[#fc4a1a]",
    img: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "06",
    title: "Influencer Marketing",
    desc: "Leveraging the power of voices. We connect your brand with creators who align with your vision and audience.",
    skills: ["Campaign Strategy", "Creator Vetting", "Negotiation", "Analytics"],
    color: "from-[#0078f0] to-[#00f260]",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
  }
];

export default function ServicesStack() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP Context for Cleanup
    let ctx = gsap.context(() => {
      
      // CARD SCALING EFFECT
      cardsRef.current.forEach((card, i) => {
        if(!card) return;
        
        // Is card ke aane par pichla card scale down hoga
        ScrollTrigger.create({
          trigger: card,
          start: "top top", 
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
             // Logic: Agle card ke aane par current card thoda peeche jayega
             // This logic creates the "stacking depth" feel
             const progress = self.progress;
             const scale = 1 - (progress * 0.05); // Thoda sa chota hoga
             const opacity = 1 - (progress * 0.2); // Thoda dark hoga
             
             // Hum current card ko animate nahi kar rahe, balki PREVIOUS cards ko loop me handle kar sakte hain
             // But simpler "Sticky" CSS handles positioning. GSAP adds flavor.
          }
        });

        // Advanced: Scale down the card as it goes up (Exit animation)
        gsap.to(card, {
          scale: 0.9,
          filter: "brightness(0.5)",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pinSpacing: false
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#050505] pb-24 relative">
      
      {/* Header Section */}
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <span className="text-[#ff9f20] font-bold tracking-[0.2em] uppercase text-sm">
          What We Do Best
        </span>
        <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-8">
          Our Services
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          We offer a comprehensive suite of digital solutions designed to scale your business from <span className="text-white">Zero to Hero</span>.
        </p>
      </div>

      {/* --- STACKING CARDS CONTAINER --- */}
      <div className="px-4 md:px-8 max-w-6xl mx-auto space-y-24 md:space-y-0 pb-20">
        
        {services.map((service, index) => {
          // Calculate top offset for stacking effect (Top: 100px, 120px, 140px...)
          // Mobile me normal spacing rahegi, Desktop me Sticky
          const topOffset = 100 + (index * 20); 

          return (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="sticky-card md:sticky rounded-3xl overflow-hidden border border-white/10 bg-[#0a0f1d] shadow-2xl"
              style={{ 
                top: `${topOffset}px`, // Dynamic Top Value for Stacking
                zIndex: index + 1 
              }}
            >
              
              <div className="grid md:grid-cols-2 min-h-[500px] md:h-[550px]">
                
                {/* LEFT: CONTENT */}
                <div className="p-8 md:p-16 flex flex-col justify-between relative overflow-hidden group">
                  
                  {/* Background Gradient Blob */}
                  <div className={`absolute top-[-50%] left-[-50%] w-[100%] h-[100%] bg-gradient-to-br ${service.color} opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                       <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${service.color} opacity-40`}>
                         {service.id}
                       </span>
                       <div className={`h-[2px] w-20 bg-gradient-to-r ${service.color}`} />
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {service.desc}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-3">
                      {service.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300 bg-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="relative z-10 mt-10">
                    <button className="group/btn flex items-center gap-2 text-white font-bold text-lg uppercase tracking-wider transition-all">
                      Learn More 
                      <span className={`bg-gradient-to-r ${service.color} rounded-full p-2 group-hover/btn:translate-x-2 transition-transform`}>
                         <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* RIGHT: IMAGE */}
                <div className="relative h-[300px] md:h-full overflow-hidden">
                   <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1d] z-10 opacity-50`} />
                   
                   {/* Gradient Overlay for Brand Color Tint */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 mix-blend-color z-10`} />

                   <img 
                     src={service.img} 
                     alt={service.title} 
                     className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[2s] ease-in-out"
                   />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* spacer to allow last card to be seen fully */}
      <div className="h-[20vh]" />

    </section>
  );
}