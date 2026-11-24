import { useEffect } from "react";
import "./Lightbox.css";

export default function Lightbox({ images, index, onChange, onClose, title }) {
  const hasMultiple = images.length > 1;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMultiple) {
        onChange(index === 0 ? images.length - 1 : index - 1);
      }
      if (event.key === "ArrowRight" && hasMultiple) {
        onChange(index === images.length - 1 ? 0 : index + 1);
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [hasMultiple, images.length, index, onChange, onClose]);

  const showPrev = (event) => {
    event.stopPropagation();
    onChange(index === 0 ? images.length - 1 : index - 1);
  };

  const showNext = (event) => {
    event.stopPropagation();
    onChange(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close gallery">
        ✕
      </button>

      {hasMultiple && (
        <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={showPrev} aria-label="Previous photo">
          ‹
        </button>
      )}

      <figure className="lightbox__stage" onClick={(event) => event.stopPropagation()}>
        <img src={images[index]} alt={`${title} — photo ${index + 1}`} className="lightbox__img" />
        <figcaption className="lightbox__caption">
          <span>{title}</span>
          {hasMultiple && (
            <span className="lightbox__counter">
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
        {hasMultiple && (
          <div className="lightbox__thumbs">
            {images.map((image, thumbIndex) => (
              <button
                type="button"
                key={thumbIndex}
                className={`lightbox__thumb${thumbIndex === index ? " is-active" : ""}`}
                onClick={() => onChange(thumbIndex)}
                aria-label={`Show photo ${thumbIndex + 1}`}
              >
                <img src={image} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
      </figure>

      {hasMultiple && (
        <button type="button" className="lightbox__nav lightbox__nav--next" onClick={showNext} aria-label="Next photo">
          ›
        </button>
      )}
    </div>
  );
}
