import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Trophy, Target, Rocket, BarChart3, Loader2 } from "lucide-react";
import Globe from "react-globe.gl";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// --- THEME COLORS ---
const THEME = {
  primary: "#3b82f6", // Bright Blue
  accent: "#f97316",  // Vibrant Orange
  bg: "#050505",      // Deep Black
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const globeContainerRef = useRef(null);
  const globeRef = useRef();
  
  const [globeDimensions, setGlobeDimensions] = useState({ width: 600, height: 600 });
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  // --- DATA ---
  const globeData = useMemo(() => {
    const INDORE = { name: "Indore HQ", lat: 22.7196, lng: 75.8577, color: THEME.accent, size: 1.2 };
    
    const locations = [
      { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
      { name: "Delhi", lat: 28.7041, lng: 77.1025 },
      { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Singapore", lat: 1.3521, lng: 103.8198 },
      { name: "New York", lat: 40.7128, lng: -74.0060 },
    ];

    const arcs = locations.map(loc => ({
      startLat: INDORE.lat,
      startLng: INDORE.lng,
      endLat: loc.lat,
      endLng: loc.lng,
      color: [THEME.accent, THEME.primary]
    }));

    return { 
      points: [INDORE, ...locations], 
      arcs, 
      rings: [INDORE]
    };
  }, []);

  useEffect(() => {
    // 1. Resize Handler
    const handleResize = () => {
      if (globeContainerRef.current) {
        setGlobeDimensions({
          width: globeContainerRef.current.offsetWidth,
          height: globeContainerRef.current.offsetHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // 2. GSAP Animations
    const ctx = gsap.context(() => {
      gsap.fromTo(".anim-text", 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(".glass-card", 
        { y: 60, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)",
          scrollTrigger: { trigger: cardsRef.current, start: "top 90%" }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- GLOBE READY HANDLER ---
  const handleGlobeReady = () => {
    setIsGlobeReady(true);
    if (globeRef.current) {
      // Auto-rotate setting
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8;
      
      // *** CHANGE 1: DISABLE ZOOM (Fix Size) ***
      globeRef.current.controls().enableZoom = false; 

      // Focus Camera on India/Indore initially
      globeRef.current.pointOfView({ lat: 22, lng: 80, altitude: 1.8 }, 1000); 
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#050505] text-white overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* --- CHANGE 2: CLEAN BACKGROUND (Removed Blue/Orange Blobs) --- */}
      {/* Only kept a subtle gradient for depth, but removed the colored balls */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/20 via-[#050505] to-[#050505]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- MAIN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* LEFT: CONTENT */}
          <div className="pr-0 lg:pr-10">
            <div className="anim-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
              <MapPin size={14} /> 5+ Years of Excellence
            </div>

            <h1 className="anim-text text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
              We are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Best Digital Marketing</span> Company in Indore.
            </h1>

            <p className="anim-text text-lg text-gray-400 leading-relaxed mb-8 border-l-4 border-orange-500 pl-6">
              Our 5-year-old digital marketing company provides leading services in Indore, where we've delivered real growth to major brands through 
              <span className="text-white font-semibold"> social media marketing, SEO, and creative marketing.</span>
            </p>
              <div className="anim-text flex flex-wrap gap-4">
             <Link to={"/LetsConnect"} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                Start Your Growth
              </Link>

              <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                
                {/* --- 3 Stacked Images --- */}
                <div className="flex -space-x-3">
                  <img 
                    src="/images/TestimonialClients/p1.jpeg" 
                    alt="Brand 1" 
                    className="w-8 h-8 rounded-full border-2 border-black object-cover"
                  />
                  <img 
                    src="/images/TestimonialClients/p2.jpeg" 
                    alt="Brand 2" 
                    className="w-8 h-8 rounded-full border-2 border-black object-cover"
                  />
                  <img 
                    src="/images/TestimonialClients/p1.png" 
                    alt="Brand 3" 
                    className="w-8 h-8 rounded-full border-2 border-black object-cover"
                  />
                </div>

                <span className="text-sm font-medium">Trusted by 500+ Clients</span>
              </div>
            </div>
          </div>

          {/* RIGHT: GLOBE (Fixed Size Container) */}
          <div 
            ref={globeContainerRef} 
            // Fixed height ensures consistent layout size
            className="relative h-[350px] md:h-[600px] w-full flex items-center justify-center grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          >
             
             {!isGlobeReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
             )}

             <div className={`transition-opacity duration-1000 ${isGlobeReady ? 'opacity-100' : 'opacity-0'}`}>
                <Globe
                    ref={globeRef}
                    width={globeDimensions.width}
                    height={globeDimensions.height}
                    backgroundColor="rgba(0,0,0,0)"
                    onGlobeReady={handleGlobeReady}
                    
                    // Visuals
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    atmosphereColor={THEME.primary}
                    atmosphereAltitude={0.15} // Slightly reduced atmosphere for cleaner look
                    
                    // Points
                    pointsData={globeData.points}
                    pointColor="color"
                    pointAltitude={0.05}
                    pointRadius={(d) => d.name === "Indore HQ" ? 1.0 : 0.4}
                    pointLabel="name"

                    // Rings
                    ringsData={globeData.rings}
                    ringColor={() => THEME.accent}
                    ringMaxRadius={8}
                    ringPropagationSpeed={3}
                    ringRepeatPeriod={800}

                    // Arcs
                    arcsData={globeData.arcs}
                    arcColor="color"
                    arcDashLength={0.4}
                    arcDashGap={2}
                    arcDashAnimateTime={1500}
                    arcStroke={0.5}
                />
             </div>
          </div>
        </div>

        {/* --- CARDS SECTION --- */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<BarChart3 />} 
            title="Data-Driven Planning" 
            desc="We leverage the latest innovations and data to elevate your brand to the top of Indore's competitive market."
            color="blue"
          />
          <FeatureCard 
            icon={<Target />} 
            title="SEO & Creative Strategy" 
            desc="Expert professionals dedicated to getting you ranked #1 with creative strategies that convert traffic into revenue."
            color="orange"
          />
          <FeatureCard 
            icon={<Rocket />} 
            title="5 Years of Growth" 
            desc="A legacy of delivering real growth to major brands. We don't just market; we build sustainable digital assets."
            color="blue"
          />
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENT ---
function FeatureCard({ icon, title, desc, color }) {
  const isOrange = color === "orange";
  const accentColor = isOrange ? "text-orange-500" : "text-blue-500";
  const borderColor = isOrange ? "group-hover:border-orange-500/50" : "group-hover:border-blue-500/50";
  const bgGlow = isOrange ? "bg-orange-500/10" : "bg-blue-500/10";

  return (
    <div className={`glass-card group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${borderColor}`}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-2xl ${bgGlow} ${accentColor}`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {desc}
      </p>
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${isOrange ? "from-orange-500/5 to-transparent" : "from-blue-500/5 to-transparent"}`} />
    </div>
  );
}