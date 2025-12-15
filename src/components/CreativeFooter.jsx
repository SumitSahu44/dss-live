import React, { useRef } from "react"; // useEffect hata diya kyunki ab animation nahi hai
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons Import
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6"; 

export default function Footer() {
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to navigate to sections (works from any page)
  const goToSection = (hash) => {
    if (location.pathname !== "/") {
      const hashValue = hash.startsWith('#') ? hash.substring(1) : hash;
      navigate({ pathname: "/", hash: hashValue }, { replace: false });
    } else {
      // Update URL hash
      window.history.pushState(null, "", hash);
      
      // Try immediate scroll, Home's useHashScroll will handle if element not ready
      const scrollToElement = (attempt = 0) => {
        const el = document.querySelector(hash);
        if (el) {
          const rect = el.getBoundingClientRect();
          const isRendered = rect.height > 0 || el.offsetHeight > 0;
          
          if (isRendered) {
            const offsetTop = el.offsetTop - 100;
            window.scrollTo({
              top: Math.max(0, offsetTop),
              behavior: "smooth"
            });
          } else if (attempt < 5) {
            setTimeout(() => scrollToElement(attempt + 1), 200);
          }
        } else if (attempt < 5) {
          setTimeout(() => scrollToElement(attempt + 1), 200);
        }
      };
      
      scrollToElement();
    }
  };

  // --- SOCIAL MEDIA LINKS ---
  const socialLinks = [
    { 
      icon: <FaLinkedinIn size={14} />, 
      href: "https://www.linkedin.com/company/digital-success-solutions-dss/", 
      label: "LinkedIn" 
    },
    { 
      icon: <FaXTwitter size={14} />, 
      href: "https://twitter.com/your-handle", 
      label: "X (Twitter)" 
    },
    { 
      icon: <FaInstagram size={16} />, 
      href: "https://www.instagram.com/digitalsuccess_solutions/", 
      label: "Instagram" 
    },
    { 
      icon: <FaFacebookF size={14} />, 
      href: "https://www.facebook.com/p/Digital-Success-Solutions-61567317789854/", 
      label: "Facebook" 
    },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#050505] text-white pt-20 pb-10 overflow-hidden font-sans border-t border-white/5"
    >
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
         
         {/* Gradient Mesh */}
         <div className="absolute bottom-0 left-[-20%] w-[50vw] h-[50vw] bg-[#0078f0]/5 rounded-full blur-[120px]" />
         <div className="absolute top-0 right-[-20%] w-[50vw] h-[50vw] bg-[#ff9f20]/5 rounded-full blur-[120px]" />

         {/* BACKGROUND TEXT */}
         <div className="absolute bottom-0 left-0 w-full text-center pointer-events-none select-none overflow-hidden">
            <h1 className="text-[15vw] font-black text-white/[0.03] leading-none tracking-tighter">
               DSS
            </h1>
         </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- 1. CALL TO ACTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-16 border-b border-white/10">
           <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-4">
                 READY TO <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">SCALE UP?</span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 font-light max-w-md">
                 Let's build something that defines your industry. Schedule a call with our strategy team today.
              </p>
           </div>
           
           {/* CTA Button */}
           <Link to="/LetsConnect" className="group relative mt-8 md:mt-0 inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs md:text-sm overflow-hidden rounded-full transition-transform hover:scale-105">
       
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Project</span>
              <div className="absolute inset-0 bg-[#0078f0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        
           </Link>
        </div>

        {/* --- 2. MAIN GRID LINKS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
           
           {/* Column 1: Brand Info */}
           <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
              <div className="text-xl md:text-2xl font-black tracking-tighter uppercase">
                 DSS<span className="text-[#0078f0]">.</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                 DSS Digital Success Solutions LLP. We are a digital innovation agency crafting world-class experiences.
              </p>
              
              <div className="mt-2 text-gray-400 text-sm leading-relaxed">
                <p className="font-bold text-white mb-1 uppercase tracking-wider text-xs">Headquarters</p>
                <p>PLOT NO. 22, Scheme No 53,</p>
                <p>Vijay Nagar, Indore,</p>
                <p>Madhya Pradesh – 452010</p>
              </div>
           </div>

           {/* Column 2: Sitemap */}
           <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Explore</h4>
              <ul className="flex flex-col gap-3 text-gray-400 text-sm">
  <li>
    <Link to="/" className="hover:text-[#ff9f20] transition-colors flex items-center gap-2 group">
      <span className="w-0 group-hover:w-2 h-[1px] bg-[#ff9f20] transition-all duration-300" />
      Home
    </Link>
  </li>

  <li>
    <Link to="/about" className="hover:text-[#ff9f20] transition-colors flex items-center gap-2 group">
      <span className="w-0 group-hover:w-2 h-[1px] bg-[#ff9f20] transition-all duration-300" />
      Who We Are
    </Link>
  </li>

  <li>
    <Link to="/PortfolioPage" className="hover:text-[#ff9f20] transition-colors flex items-center gap-2 group">
      <span className="w-0 group-hover:w-2 h-[1px] bg-[#ff9f20] transition-all duration-300" />
      Portfolio
    </Link>
  </li>

   <li>
    <Link to="/LetsConnect" className="hover:text-[#ff9f20] transition-colors flex items-center gap-2 group">
      <span className="w-0 group-hover:w-2 h-[1px] bg-[#ff9f20] transition-all duration-300" />
      Lets Talk
    </Link>
  </li>
</ul>

           </div>

           {/* Column 3: Services */}
           <div className="col-span-1 md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Services</h4>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
  <li>
    <Link to="/website-design-and-website-development" className="hover:text-[#0078f0] transition-colors">
      Website Development
    </Link>
  </li>
  <li>
    <Link to="/performance-marketing-ppc" className="hover:text-[#0078f0] transition-colors">
      Performance Marketing
    </Link>
  </li>
  <li>
    <Link to="/social-media-marketing" className="hover:text-[#0078f0] transition-colors">
      Social Media
    </Link>
  </li>
  <li>
    <Link to="/search-engine-optimization" className="hover:text-[#0078f0] transition-colors">
      SEO Optimization
    </Link>
  </li>
  <li>
    <Link to="/influencer-marketing" className="hover:text-[#0078f0] transition-colors">
      Influencer Marketing
    </Link>
  </li>
  <li>
    <Link to="/e-commerce-applications" className="hover:text-[#0078f0] transition-colors">
      E-Commerce Apps
    </Link>
  </li>
</ul>

           </div>

           {/* Column 4: Contact & Socials */}
           <div className="col-span-1 md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Connect</h4>
              
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
                <a href="tel:+916264398990" className="text-white hover:text-[#ff9f20] transition-colors font-mono text-sm">
                    +91 62643 98990
                </a>
                <a href="tel:+918718980114" className="text-white hover:text-[#ff9f20] transition-colors font-mono text-sm">
                    +91 87189 80114
                </a>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                 {socialLinks.map((social, i) => (
                    <a 
                       key={i} 
                       href={social.href}
                       target="_blank" 
                       rel="noopener noreferrer"
                       aria-label={social.label}
                       className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0078f0] hover:border-[#0078f0] transition-all duration-300"
                    >
                       {social.icon}
                    </a>
                 ))}
              </div>
           </div>

        </div>

        {/* --- 3. BOTTOM BAR (Legal) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] md:text-xs text-gray-600 font-mono uppercase tracking-wider gap-4 md:gap-0">
           <div className="flex gap-6">
              <span>© 2025 DSS Digital Success Solutions LLP</span>
           </div>
           
           <div className="flex flex-wrap justify-center gap-6 md:gap-8">
             <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
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