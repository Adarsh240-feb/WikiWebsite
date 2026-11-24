export default function PageHero({ eyebrow, title, lede, aside, photo, children }) {
  return (
    <section
      className={`page-hero${photo ? " page-hero--photo" : ""}`}
      style={photo ? { "--page-photo": `url("${photo}")` } : undefined}
    >
      {photo && <div className="page-hero__bg" aria-hidden="true" />}
      <div className="wrap page-hero__inner">
        <div className="page-hero__copy">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lede && <p className="page-hero__lede">{lede}</p>}
          {children}
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  );
}
