import React, { useEffect, useRef } from 'react';
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';
import { Star, Quote, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Rohit Mehra",
    role: "Founder, LithoVeda",
    content: "LithoVeda ki website aur branding inhone next level bana di. Engagement 3x ho gaya and sale bhi boost hui. Highly satisfied!",
    rating: 5,
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Priya Nivedita",
    role: "Marketing Lead, JeevanShaadi.com",
    content: "Digital campaigns bahut hi targeted the. Leads quality improve hui and conversion rate almost double ho gaya.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Aakash Rathore",
    role: "CEO, FitoraShop",
    content: "Inhone hamara e-commerce store completely optimize kar diya. Page speed, UI & SEO — sab improve hua. Sales boost clearly dikhti hai.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Suman Verma",
    role: "Owner, SadaBahar Handloom",
    content: "Branding aur photoshoot ka kaam top-class tha. Handloom ki authenticity bilkul sahi tarike se represent hui.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Nikhil Sharma",
    role: "Director, Edmirai",
    content: "Hamare learning platform ki complete digital strategy banai. Result measurable tha and user base fast grow hua.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Ananya Gupta",
    role: "Co-Founder, MixNuts.in",
    content: "Packaging design, branding aur ads sab super creative the. ROAS 4x tak pahunch gaya. Amazing team!",
    rating: 5,
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Piyush Sanwaliya",
    role: "Artist, PiyushSanwaliyaArt.com",
    content: "Mere art portfolio ko itna professional bana diya ki clients directly website se book karne lage. Loved the UI.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Rupnit Kaur",
    role: "Founder, Rupnit Photography Production",
    content: "Website ka design cinematic and premium lagta hai. SEO ke baad enquiries kaafi increase ho gayi.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Harsh Thakur",
    role: "Co-Founder, Himbhavy",
    content: "Inhone hamare organic product brand ka digital presence strong bana diya. Social media growth excellent thi.",
    rating: 4,
    img: "https://images.unsplash.com/photo-1541534401786-2077d221aa47?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Riya Jain",
    role: "Owner, LittleNappy.in",
    content: "Baby products niche ke liye perfect branding strategy mili. Visuals soft, clean aur premium the. Parents trust easily build hua.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200"
  }
];

const ReviewCard = ({ review }) => (
  <div className="w-[350px] md:w-[450px] p-6 md:p-8 mx-4 rounded-3xl bg-[#0a0a0a] border border-white/5 relative group hover:border-[#0078f0]/30 transition-colors duration-500">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
    
    <div className="relative z-10 flex flex-col h-full">
      {/* Stars & Icon */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={`${i < review.rating ? 'fill-[#ff9f20] text-[#ff9f20]' : 'fill-gray-800 text-gray-800'}`} 
            />
          ))}
        </div>
        <Quote size={32} className="text-white/10 group-hover:text-[#0078f0]/20 transition-colors" />
      </div>

      {/* Content */}
      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 flex-1">
        "{review.content}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#0078f0] transition-colors">
          <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm">{review.name}</h4>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function TestimonialSection() {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Row 1 Animation (Left to Right)
      gsap.to(row1Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40, // Speed (Higher = Slower)
        ease: "linear",
      });

      // Row 2 Animation (Right to Left)
      gsap.fromTo(row2Ref.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 45, // Slightly different speed for natural feel
          ease: "linear",
        }
      );

      // Header Fade In
      gsap.from(".testimonial-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0078f0]/10 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* --- HEADER --- */}
      <div className="text-center mb-20 will-change-transform">
          <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-6">
             <div className="w-12 h-[1px] bg-gray-700" />
             <span>Tetimonials</span>
             <div className="w-12 h-[1px] bg-gray-700" />
          </div>

          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none text-white mix-blend-exclusion">
             Trusted by<br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Visionaries.</span>
          </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-light">
          Don't just take our word for it. Here is what founders, CEOs, and market leaders say about building their legacy with us.
        </p>
        </div>
      


      {/* --- MARQUEE ROWS --- */}
      <div className="relative w-full">
        
        {/* Side Fade Gradients (To hide edges smoothly) */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex mb-8 w-max" ref={row1Ref}>
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`row1-${i}`} review={review} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-max" ref={row2Ref}>
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`row2-${i}`} review={review} />
          ))}
        </div>

      </div>

    </section>
  );
}