import React, { useEffect, useRef } from 'react';
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';
import { Star, Quote, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Pushpendra Pratap Yadav",
    role: "Founder, LithoVeda",
    content: "Our overall experience with the agency has been acceptable. The team maintains regular communication and delivers content as scheduled. Basic expectations have been met; however, we believe there is significant room for improvement in strategy planning, creative quality, and campaign performance. With more proactive ideas and better execution clarity, the partnership could be more impactful. We appreciate their effort and look forward to enhanced results in the upcoming months.",
    rating: 4,
    img: "./images/TestimonialClients/Pushpendra Pratap Yadav.jpeg"
  },
  {
    name: "Vandan",
    role: "Marketing Lead",
    content: "I had a great experience working with the DSS team. Their process was smooth, communication was clear, and they delivered exactly what I needed. I really appreciate their professionalism, attention to detail, and timely execution. Overall, DSS made the entire experience seamless and reliable — definitely recommend their services.",
    rating: 5,
    img: "./images/TestimonialClients/starlight.png"
  },
  {
    name: "Aakash Rathore",
    role: "CEO, FitoraShop",
    content: "The team completely optimized our e-commerce store from both a performance and user-experience perspective. Page speed improvements were clearly noticeable, the UI became more intuitive, and SEO foundations were strengthened effectively. Their approach was structured, transparent, and focused on long-term scalability. As a result, customer engagement improved and sales growth became more consistent. Overall, the collaboration added strong value to our brand’s digital presence.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Suman Verma",
    role: "Owner, SadaBahar Handloom",
    content: "The branding and photoshoot work delivered by the team was truly top-class and aligned perfectly with our brand values. They understood the authenticity of handloom products and represented it in a very refined and culturally respectful manner. The visuals feel premium yet genuine, helping customers connect emotionally with the brand. Their planning and execution were well-organized, making the entire experience smooth and professional.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Nikhil Sharma",
    role: "Director, Edmirai",
    content: "They developed a complete digital strategy for our learning platform with a clear focus on growth and user engagement. The team worked closely with us to understand our audience and business goals. Campaign execution was data-driven, and results were measurable over time. We observed steady growth in our user base and improved platform visibility. Their strategic clarity and consistency made a meaningful difference.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Ananya Gupta",
    role: "Co-Founder, MixNuts.in",
    content: "From packaging design to branding and paid advertising, the team delivered highly creative and market-relevant solutions. Every element was thoughtfully designed to align with our brand identity and customer expectations. Campaign optimization helped us achieve a ROAS of up to 4x, which was a significant milestone for us. Their communication was clear and proactive throughout the process. Truly an amazing and dependable team to work with.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Piyush Sanwaliya",
    role: "Artist, PiyushSanwaliyaArt.com",
    content: "They transformed my art portfolio into a highly professional and visually appealing website. The UI is clean, elegant, and perfectly complements my artwork. Since the launch, clients have started booking directly through the website, which has simplified my workflow significantly. The team was attentive to details and understood the artistic vision behind the project. I am extremely satisfied with the final outcome.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Rupnit Kaur",
    role: "Founder, Rupnit Photography Production",
    content: "The website design feels cinematic, premium, and perfectly aligned with my photography style. The visual layout highlights the portfolio beautifully and creates a strong first impression. After implementing SEO improvements, we noticed a clear increase in quality enquiries. Their understanding of aesthetics and performance balance is commendable. The entire project was handled with professionalism and creative clarity.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Harsh Thakur",
    role: "Co-Founder, Himbhavy",
    content: "They played a key role in strengthening the digital presence of our organic product brand. From content strategy to social media execution, everything was handled systematically. Growth on social platforms was consistent and engagement quality improved noticeably. The team remained responsive and open to feedback throughout the collaboration. Overall, their efforts helped us build stronger brand credibility online.",
    rating: 4,
    img: "https://images.unsplash.com/photo-1541534401786-2077d221aa47?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Riya Jain",
    role: "Owner, LittleNappy.in",
    content: "They provided a well-thought-out branding strategy tailored specifically for the baby products niche. The visuals were soft, clean, and premium, which helped build instant trust among parents. Messaging and design choices were aligned with safety and comfort expectations. Their structured execution made the process smooth and reliable. As a result, brand perception and customer confidence improved significantly.",
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