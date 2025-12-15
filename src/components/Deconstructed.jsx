import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Code2, Smartphone, Palette, Search, ShoppingBag, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: "01", title: "Web Dev", desc: "MERN & Next.js Scalable Architectures", icon: Code2, img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1000&auto=format&fit=crop" },
  { id: "02", title: "Mobile Apps", desc: "Native iOS & Android Solutions", icon: Smartphone, img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop" },
  { id: "03", title: "UI/UX Design", desc: "Award Winning User Interfaces", icon: Palette, img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop" },
  { id: "04", title: "SEO Growth", desc: "Rank #1 on Google Search", icon: Search, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" },
  { id: "05", title: "E-Commerce", desc: "Shopify & Custom Stores", icon: ShoppingBag, img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop" },
  { id: "06", title: "Marketing", desc: "High ROI PPC Campaigns", icon: Rocket, img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1000&auto=format&fit=crop" },
];

export default function ServicesScroll() {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Dynamic calculation: Total Width of track - Viewport Width
      // This ensures we scroll exactly to the end, no matter the screen size
      const getScrollAmount = () => {
        let trackWidth = sliderRef.current.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(sliderRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${sliderRef.current.scrollWidth - window.innerWidth}`, 
          invalidateOnRefresh: true, // Recalculates on resize (Mobile to Desktop switch)
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    // 1. Main Container (No overflow hidden here to allow sticky to work)
    <div ref={componentRef} className="bg-[#050505] relative w-full h-screen overflow-hidden flex flex-col">
      
      {/* 2. TOP SECTION: Title */}
      {/* Static Height, never overlaps */}
      <div className="w-full px-6 md:px-12 pt-10 pb-4 md:pt-12 shrink-0 z-20">
         <div className="flex items-center gap-3 mb-2">
            <div className="h-[2px] w-10 bg-blue-500"></div>
            <span className="text-blue-400 uppercase tracking-widest text-xs font-bold">Services</span>
         </div>
         <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight">
            What We <br/> Deliver
         </h2>
      </div>

      {/* 3. BOTTOM SECTION: The Slider Window */}
      {/* flex-grow fills the remaining height. overflow-hidden hides the horizontal scrollbar */}
      <div className="flex-grow w-full relative flex items-center overflow-hidden">
        
        {/* 4. THE TRACK: Moves Left */}
        {/* w-fit ensures it takes the width of all cards combined */}
        <div ref={sliderRef} className="flex gap-6 md:gap-12 px-6 md:px-12 w-fit h-[55vh] md:h-[60vh]">
            
            {/* Intro Text Block */}
            <div className="w-[80vw] md:w-[25vw] h-full flex-shrink-0 flex flex-col justify-center border-r border-white/10 pr-8">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                   Our expertise lies in building digital products that scale. <br/>
                   <span className="text-white font-bold mt-2 block">Swipe to explore &rarr;</span>
                </p>
            </div>

            {/* Cards Loop */}
            {services.map((service, index) => (
                <div 
                    key={index} 
                    className="relative w-[85vw] md:w-[30vw] h-full flex-shrink-0 group rounded-3xl overflow-hidden border border-white/10 bg-[#111]"
                >
                    {/* Image: No Grayscale, Full Color */}
                    <div className="absolute inset-0">
                        <img 
                            src={service.img} 
                            alt={service.title} 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Gradient Overlay for Text Readability Only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                    </div>

                    {/* ID Number */}
                    <div className="absolute top-6 right-6 text-5xl font-black text-white/10 z-10">
                        {service.id}
                    </div>

                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
                        <div className="mb-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                             <service.icon size={22} />
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase">
                            {service.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-300 line-clamp-3">
                            {service.desc}
                        </p>
                    </div>
                </div>
            ))}
            
            {/* Spacer at the end to ensure last card isn't glued to the edge */}
            <div className="w-[5vw] flex-shrink-0" />
        </div>
      </div>
      
    </div>
  );
}