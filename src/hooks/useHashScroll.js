import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle hash-based scrolling with support for lazy-loaded components
 * Uses IntersectionObserver to detect when target element is actually rendered
 */
export const useHashScroll = (hash, options = {}) => {
  const {
    offset = 100, // Navbar offset
    maxAttempts = 20,
    initialDelay = 300,
    retryDelay = 200,
    enabled = true
  } = options;

  const observerRef = useRef(null);
  const timeoutRef = useRef(null);
  const attemptRef = useRef(0);

  useEffect(() => {
    if (!hash || !enabled) return;

    const scrollToElement = () => {
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const element = document.querySelector(hash);
      
      if (!element) {
        // Element not found, retry
        if (attemptRef.current < maxAttempts) {
          attemptRef.current += 1;
          timeoutRef.current = setTimeout(
            scrollToElement,
            initialDelay + (retryDelay * attemptRef.current)
          );
        }
        return;
      }

      // Check if element is rendered (has dimensions)
      const rect = element.getBoundingClientRect();
      const isRendered = rect.height > 0 || element.offsetHeight > 0;

      if (!isRendered) {
        // Element exists but not rendered, use IntersectionObserver
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting || entry.boundingClientRect.height > 0) {
                // Element is now visible/rendered
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                  const offsetTop = targetElement.offsetTop - offset;
                  window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                  });
                }
                if (observerRef.current) {
                  observerRef.current.disconnect();
                }
              }
            });
          },
          { threshold: 0.01 }
        );

        observerRef.current.observe(element);

        // Fallback: if IntersectionObserver doesn't fire, retry
        if (attemptRef.current < maxAttempts) {
          attemptRef.current += 1;
          timeoutRef.current = setTimeout(
            scrollToElement,
            retryDelay * (attemptRef.current + 1)
          );
        }
        return;
      }

      // Element is rendered, scroll to it
      const offsetTop = element.offsetTop - offset;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });

      // Reset attempt counter on success
      attemptRef.current = 0;
    };

    // Start scrolling after a small delay to let DOM settle
    timeoutRef.current = setTimeout(scrollToElement, initialDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      attemptRef.current = 0;
    };
  }, [hash, enabled, offset, maxAttempts, initialDelay, retryDelay]);
};

