import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  // Ensure the browser doesn't restore previous scroll automatically
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
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
      // Always attempt window scroll
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

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
    // After microtasks (helps when images/components finish mounting)
    const timeoutId = setTimeout(scrollToTop, 0);

    return () => clearTimeout(timeoutId);
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
      const isSidebarLink = anchor.closest('.sidebar') || anchor.closest('.nav-links') || anchor.classList.contains('nav-item');
      if (isFooterLink || isSidebarLink) {
        // Defer to end of tick to allow any routing logic to run first
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          const containers = document.querySelectorAll('main,.main-content,.mainContentContainer,.Team-content,.content-wrapper,.pageContainer,.container');
          containers.forEach((node) => {
            try { if (node && typeof node.scrollTop === 'number') node.scrollTop = 0; } catch (_) {}
          });
        }, 0);
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}