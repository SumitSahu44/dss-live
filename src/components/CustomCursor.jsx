import React, { useState, useEffect, useRef } from 'react';

export default function CursorFollower() {
  const followerRef = useRef(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const followerPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafId = useRef(null);

  useEffect(() => {
    const ease = 0.18;

    // Lerp function for smooth trailing
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop
    const animate = () => {
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, ease);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, ease);

      if (followerRef.current) {
        let scale = 1;
        if (isClicking) {
          scale = 1.6;
        } else if (isHovering) {
          scale = 2;
        }
        
        followerRef.current.style.transform = 
          `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate3d(-50%, -50%, 0) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Mouse down/up handlers
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hover handlers for interactive elements
    const handleMouseOver = (e) => {
      const interactiveElement = e.target.closest('a, button, input, textarea, select, [role="button"], .clickable');
      if (interactiveElement) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const interactiveElement = e.target.closest('a, button, input, textarea, select, [role="button"], .clickable');
      if (interactiveElement) {
        setIsHovering(false);
      }
    };

    // Resize handler
    const handleResize = () => {
      mousePos.current.x = Math.min(window.innerWidth, Math.max(0, mousePos.current.x));
      mousePos.current.y = Math.min(window.innerHeight, Math.max(0, mousePos.current.y));
    };

    // Start animation
    rafId.current = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    // Cleanup
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, [isClicking, isHovering]);

  return (
    <>
      {/* Cursor Follower - Animated Circle */}
      <div
        ref={followerRef}
        className="hidden md:block fixed w-12 h-12 rounded-full pointer-events-none will-change-transform"
        style={{
          left: 0,
          top: 0,
          zIndex: 9999,
          mixBlendMode: 'difference',
          background: isHovering ? 'rgba(255,255,255,0.08)' : 'white',
          opacity: isClicking ? 0.9 : 1,
          filter: 'blur(0px)',
          transition: 'opacity 0.12s ease'
        }}
        aria-hidden="true"
      />

   
    </>
  );
}