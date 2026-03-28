import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';

const BlogDetail = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://digitalsuccesssolutions.in/php_backend/api/read_single.php?title=${title}`
        );
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [title]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold bg-white">Loading Content...</div>;
  if (!blog) return <div className="h-screen flex items-center justify-center font-bold bg-white">Blog not found.</div>;

  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* --- HERO SECTION --- 
          pt-[100px] add kiya hai taaki content navbar ke niche se start ho 
      */}
      <div className="relative min-h-[85vh] w-full bg-gray-900 flex flex-col pt-[100px]"> 
        
        {/* Background Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col h-full justify-between pb-16 md:pl-24 md:pb-24 flex-grow">
          
          {/* Back Button - Ab ye hamesha 100px ke niche se start hoga */}
          <div className="mt-4">
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-all group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
            </Link>
          </div>

          {/* Title & Meta */}
          <div className="max-w-4xl mt-12 md:mt-20">
            <div className="mb-6 flex flex-wrap gap-3 items-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/20">
                {blog.category || "General"}
              </span>
              <span className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <FiClock /> 5 Min Read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.15] mb-8 tracking-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center font-bold text-white shadow-xl">
                {blog.author ? blog.author.charAt(0) : "A"}
              </div>
              <div className="text-sm">
                <p className="text-white font-bold text-base md:text-lg">{blog.author || "DSS Team"}</p>
                <p className="text-white/60 uppercase tracking-widest text-[10px]">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN BLOG CONTENT --- */}
      <div className="relative bg-white">
        <div className="px-6 py-12 md:py-24">
          <div className="max-w-3xl mx-auto">
            
            <style>{`
              .blog-content {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                word-wrap: break-word;
              }
              .blog-content h1, .blog-content h2, .blog-content h3 {
                color: #000;
                font-weight: 800;
                margin-top: 3rem;
                margin-bottom: 1.5rem;
                line-height: 1.2;
              }
              .blog-content h2 { font-size: 2rem; }
              
              .blog-content p { 
                font-size: 1.15rem; 
                line-height: 1.9; 
                margin-bottom: 2rem; 
                color: #2d3748;
              }
              
              .blog-content img { 
                width: 100%; 
                border-radius: 20px; 
                margin: 3.5rem 0;
                box-shadow: 0 20px 40px rgba(0,0,0,0.08);
              }
              
              .blog-content ul { 
                padding-left: 1rem; 
                margin-bottom: 2rem; 
              }
              .blog-content li {
                position: relative;
                padding-left: 1.5rem;
                margin-bottom: 1rem;
                font-size: 1.15rem;
                color: #2d3748;
              }
              .blog-content li::before {
                content: "";
                position: absolute;
                left: 0;
                top: 12px;
                width: 8px;
                height: 8px;
                background: #2563eb;
                border-radius: 50%;
              }

              .blog-content blockquote { 
                border-left: 6px solid #2563eb; 
                padding: 2.5rem; 
                font-style: italic; 
                font-size: 1.4rem;
                color: #1a202c; 
                background: #f1f5f9; 
                border-radius: 0 16px 16px 0; 
                margin: 4rem 0; 
              }

              @media (max-width: 768px) {
                .blog-content h2 { font-size: 1.6rem; }
                .blog-content p { font-size: 1.05rem; line-height: 1.8; }
                .blog-content blockquote { padding: 1.5rem; font-size: 1.1rem; }
              }
            `}</style>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* --- SHARE & FOOTER --- */}
            <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row gap-8 justify-between items-center">
              <div>
                <p className="font-black text-2xl">Liked this article?</p>
                <p className="text-gray-500 text-sm">Spread the word with your network.</p>
              </div>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'LinkedIn'].map((platform) => (
                  <button key={platform} className="px-6 py-3 rounded-full border border-gray-200 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;