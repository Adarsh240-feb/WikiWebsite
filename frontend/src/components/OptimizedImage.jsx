import React, { useState, useRef, useEffect } from "react";
import "./OptimizedImage.css";

/**
 * OptimizedImage component that provides:
 * - Lazy loading with IntersectionObserver
 * - Blur-up placeholder effect while loading
 * - Smooth fade-in animation when loaded
 * - Proper alt text handling
 */
function OptimizedImage({ src, alt, className = "", style = {}, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className={`optimized-image-container ${className}`}
      style={style}
    >
      {/* Placeholder shimmer */}
      {!isLoaded && (
        <div className="optimized-image-placeholder">
          <div className="optimized-image-shimmer" />
        </div>
      )}

      {/* Actual image - only load src when in view */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`optimized-image ${isLoaded ? "optimized-image--loaded" : ""}`}
          onLoad={handleLoad}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
}

export default OptimizedImage;
