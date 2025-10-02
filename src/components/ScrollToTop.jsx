import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  // Ensure the browser doesn't restore previous scroll automatically
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const scrollToTop = () => {
      // If there's a hash, attempt to scroll to that element; otherwise scroll to top
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        }
      }
      // Always attempt window/document scroll
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      try { document.scrollingElement && (document.scrollingElement.scrollTop = 0); } catch(_) {}
      try { document.documentElement && (document.documentElement.scrollTop = 0); } catch(_) {}
      try { document.body && (document.body.scrollTop = 0); } catch(_) {}

      // Additionally reset common scrollable containers used in pages
      const scrollableSelectors = [
        'main',
        '.main-content',
        '.mainContentContainer',
        '.Team-content',
        '.content-wrapper',
        '.pageContainer',
        '.container',
      ];
      const nodes = document.querySelectorAll(scrollableSelectors.join(','));
      nodes.forEach((node) => {
        try {
          if (node && typeof node.scrollTop === 'number') {
            node.scrollTop = 0;
          }
        } catch (_) {
          // ignore
        }
      });
    };

    // Immediate attempt
    scrollToTop();
    // Next frame (helps after layout reflow)
    requestAnimationFrame(scrollToTop);
    // After microtasks and slight delays (helps when images/components finish mounting)
    const t0 = setTimeout(scrollToTop, 0);
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 120);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [location.pathname, location.hash]);

  // Force scroll to top on footer and sidebar link clicks, even if route doesn't change
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target && (e.target.closest ? e.target.closest('a') : null);
      if (!anchor) return;
      
      const isFooterLink = anchor.closest('.footer-right') ||
        anchor.classList.contains('footer-link1') ||
        anchor.classList.contains('footer-link2') ||
        anchor.classList.contains('footer-link3') ||
        anchor.classList.contains('footer-link4');
      
      // Special handling for Team and FAQ links
      const isTeamLink = anchor.getAttribute('href') === '/Team' || anchor.textContent.trim() === 'Team';
      const isFAQLink = anchor.getAttribute('href') === '/Question' || anchor.textContent.trim() === 'FAQ';
      const isSidebarLink = anchor.closest('.sidebar') || anchor.closest('.nav-links') || anchor.classList.contains('nav-item');
      
      if (isFooterLink || isSidebarLink || isTeamLink || isFAQLink) {
        // Don't prevent default navigation - let React Router handle it first
        // Only scroll after navigation is complete
        const delay = (isTeamLink || isFAQLink) ? 150 : 100; // Extra delay for Team/FAQ links
        setTimeout(() => {
          // Check if we're still on the same page or if navigation happened
          const href = anchor.getAttribute('href');
          if (href && (href.startsWith('/') || href.startsWith('#'))) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            const containers = document.querySelectorAll('main,.main-content,.mainContentContainer,.Team-content,.content-wrapper,.pageContainer,.container');
            containers.forEach((node) => {
              try { if (node && typeof node.scrollTop === 'number') node.scrollTop = 0; } catch (_) {}
            });
          }
        }, delay);
      }
    };
    
    // Use passive event listener to not interfere with navigation
    document.addEventListener('click', onClick, { passive: true });
    return () => document.removeEventListener('click', onClick, { passive: true });
  }, []);

  return null;
}