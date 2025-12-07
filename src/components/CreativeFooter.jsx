import React, { useEffect, useRef } from "react";

// Using CDN imports for GSAP
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Reveal Footer Content
      gsap.fromTo(footerRef.current.children, 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      // 2. Big Text Parallax
      gsap.to(".footer-bg-text", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#050505] text-white pt-20 md:pt-32 pb-10 overflow-hidden font-sans border-t border-white/5"
    >
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
         
         {/* Gradient Mesh */}
         <div className="absolute bottom-0 left-[-20%] w-[60vw] h-[60vw] bg-[#0078f0]/10 rounded-full blur-[150px]" />
         <div className="absolute top-0 right-[-20%] w-[60vw] h-[60vw] bg-[#ff9f20]/10 rounded-full blur-[150px]" />

         {/* MASSIVE BACKGROUND TEXT */}
         <div className="footer-bg-text absolute bottom-0 left-0 w-full text-center pointer-events-none select-none overflow-hidden">
            <h1 className="text-[25vw] font-black text-white/[0.02] leading-none tracking-tighter">
               DSS
            </h1>
         </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- 1. BIG CALL TO ACTION --- */}
        <div ref={ctaRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 pb-16 md:pb-24 border-b border-white/10">
           <div className="max-w-3xl">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                 READY TO <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">SCALE UP?</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl">
                 Let's build something that defines your industry. Schedule a call with our strategy team today.
              </p>
           </div>
           
           {/* CTA Button */}
           <a href="#contact" className="group relative mt-8 md:mt-0 inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden rounded-full transition-transform hover:scale-105">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Project</span>
              <div className="absolute inset-0 bg-[#0078f0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
           </a>
        </div>

        {/* --- 2. MAIN GRID LINKS --- */}
        {/* Mobile: 2 Columns Grid | Desktop: 12 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16 md:mb-24">
           
           {/* Column 1: Brand Info (Full width on mobile) */}
           <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
              <div className="text-2xl font-black tracking-tighter uppercase">
                 DSS<span className="text-[#0078f0]">.</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                 DSS Digital Success Solutions LLP. We are a digital innovation agency crafting world-class experiences.
              </p>
              
              {/* Address Section */}
              <div className="mt-2 text-gray-400 text-sm leading-relaxed">
                <p className="font-bold text-white mb-1 uppercase tracking-wider text-xs">Headquarters</p>
                <p>PLOT NO. 22, Scheme No 53,</p>
                <p>Vijay Nagar, Indore,</p>
                <p>Madhya Pradesh – 452010</p>
              </div>
           </div>

           {/* Column 2: Sitemap */}
           <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 md:mb-6">Explore</h4>
              <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-sm">
                 {['Home', 'Work', 'Services','Insights', 'Contact'].map(item => (
                    <li key={item}>
                       <a href={`#${item.toLowerCase()}`}  className="hover:text-[#ff9f20] transition-colors flex items-center gap-2 group">
                          <span className="w-0 group-hover:w-2 h-[1px] bg-[#ff9f20] transition-all duration-300" />
                          {item}
                       </a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Column 3: Services */}
           <div className="col-span-1 md:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 md:mb-6">Services</h4>
              <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-sm">
                 {['Website Development', 'Digital Marketing', 'Social Media Management', 'SEO Optimization', 'Branding & Designing'].map(item => (
                    <li key={item}>
                       <a href="#" className="hover:text-[#0078f0] transition-colors">
                          {item}
                       </a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Column 4: Contact & Socials */}
           <div className="col-span-1 md:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 md:mb-6">Connect</h4>
              
              {/* Emails */}
              <div className="flex flex-col gap-1 mb-6">
                  <a href="mailto:Info@digitalsuccesssolutions.in" className="text-gray-400 hover:text-[#0078f0] transition-colors text-sm break-all">
                    Info@digitalsuccesssolutions.in
                  </a>
                  <a href="mailto:business@digitalsuccesssolutions.in" className="text-gray-400 hover:text-[#0078f0] transition-colors text-sm break-all">
                    business@digitalsuccesssolutions.in
                  </a>
              </div>

              {/* Phones */}
              <div className="flex flex-col gap-1 mb-6">
                <a href="tel:+916264398990" className="text-white hover:text-[#ff9f20] transition-colors font-mono">
                    +91 62643 98990
                </a>
                <a href="tel:+918718980114" className="text-white hover:text-[#ff9f20] transition-colors font-mono">
                    +91 87189 80114
                </a>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                 {['Li', 'Tw', 'In', 'Fb'].map((social, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                       {social}
                    </a>
                 ))}
              </div>
           </div>

        </div>

        {/* --- 3. BOTTOM BAR (Legal) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600 font-mono uppercase tracking-wider gap-4 md:gap-0">
           <div className="flex gap-6">
              <span>© 2024 DSS Digital Success Solutions LLP</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-6 md:gap-8">
             <Link to="/Privacy-Policy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/TermsAndConditions" className="hover:text-white transition-colors">Terms of Service</Link>
              <a href="https://www.digitalsuccesssolutions.in" target="_blank" rel="noreferrer" className="hover:text-[#0078f0] transition-colors">
                www.digitalsuccesssolutions.in
              </a>
           </div>
        </div>

      </div>
    </footer>
  );
}