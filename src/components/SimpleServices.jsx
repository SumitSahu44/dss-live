import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Globe, Megaphone, Share2, Search, PenTool, ShoppingBag, 
  ArrowUpRight, CheckCircle2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Website Development",
    desc: "Professional website solutions designed to help your business grow. From modern designs to fully functional platforms.",
    icon: Globe,
    color: "#3b82f6", // Blue
    gradient: "from-blue-900/40 via-blue-950/20 to-transparent",
    link: "/website-design-and-website-development",
    features: ["Static & Dynamic", "WordPress & MERN", "Speed Optimization", "E-commerce Setup"]
  },
  {
    id: "02",
    title: "Digital Marketing (PPC)",
    desc: "Powerful PPC campaigns designed to bring you real, measurable growth. Reach the right audience fast.",
    icon: Megaphone,
    color: "#f97316", // Orange
    gradient: "from-orange-900/40 via-orange-950/20 to-transparent",
    link: "/performance-marketing-ppc",
    features: ["Meta & Google Ads", "Lead Generation", "Sales Funnels", "Retargeting & Scaling"]
  },
  {
    id: "03",
    title: "Social Media",
    desc: "Amplify your presence across platforms with creative storytelling and motion graphics.",
    icon: Share2,
    color: "#ec4899", // Pink
    gradient: "from-pink-900/40 via-pink-950/20 to-transparent",
    link: "/social-media-marketing",
    features: ["15 Posts/Month", "Reels & Motion", "Page Optimization", "Analytics Report"]
  },
  {
    id: "04",
    title: "SEO Optimization",
    desc: "Improve your website’s visibility and rankings. We ensure your site performs at its best.",
    icon: Search,
    color: "#22c55e", // Green
    gradient: "from-green-900/40 via-green-950/20 to-transparent",
    link: "/search-engine-optimization",
    features: ["Keyword Research", "On-Page SEO", "Backlink Building", "Ranking Reports"]
  },
  {
    id: "05",
    title: "Influencer & Branding",
    desc: "Crafting designs that truly represent you. From logos to full creative kits.",
    icon: PenTool,
    color: "#a855f7", // Purple
    gradient: "from-purple-900/40 via-purple-950/20 to-transparent",
    link: "/influencer-marketing",
    features: ["Logo Design", "Packaging", "Brochures", "Social Creative Kit"]
  },
  {
    id: "06",
    title: "E-commerce Setup",
    desc: "Seamless solutions to launch your store. We provide everything for a smooth shopping experience.",
    icon: ShoppingBag,
    color: "#eab308", // Yellow
    gradient: "from-yellow-900/40 via-yellow-950/20 to-transparent",
    link: "/e-commerce-applications",
    features: ["Shopify Setup", "Payment Gateways", "Product Listing", "Conversion Optimization"]
  }
];

const ServicesSection = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const cards = gsap.utils.toArray(".service-card");

    // Entrance Animation (Staggered Fade Up)
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const handleCardClick = (link) => {
    // Navigate to the link
    navigate(link);
    // If using standard anchor tags instead of react-router:
    // window.location.href = link;
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-20 px-4 md:px-8 bg-[#050505] overflow-hidden"
    >
      {/* Background Ambient Glows (DSS Brand Colors) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            The Power We <span className="text-blue-500">Deliver</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive digital solutions tailored to scale your business.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.link)}
              className="service-card group relative p-[1px] rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Border Gradient Overlay (Visible on Hover) */}
              <div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(145deg, ${item.color}40, transparent)` 
                }}
              />

              {/* Card Content Container */}
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-between overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors">
                
                {/* Hover Inner Glow */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${item.gradient} blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                <div>
                  {/* Icon & ID Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div 
                      className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors"
                      style={{ color: item.color }}
                    >
                      <item.icon size={28} />
                    </div>
                    <span className="text-2xl font-bold text-white/10 font-mono group-hover:text-white/20 transition-colors">
                      {item.id}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Features Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/5 rounded-full flex items-center gap-1.5"
                      >
                         {/* Tiny dot matching service color */}
                         <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                         {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <span className="text-sm font-medium text-white group-hover:tracking-wide transition-all duration-300">
                    Explore Service
                  </span>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                    style={{
                        // Optional: Dynamic button color on hover
                        // backgroundColor: 'var(--hover-bg)', 
                    }}
                  >
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-white" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;