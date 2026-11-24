import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import "./Gallery.css";

import SessionEco from "../Images/wiki/session-eco.jpg";
import SessionGerrit from "../Images/wiki/session-gerrit.jpg";
import SessionCore from "../Images/wiki/session-core.jpg";
import SessionQuiz from "../Images/wiki/session-quiz.jpg";
import AudienceGdg from "../Images/wiki/audience-gdg.jpg";
import OpenSourceDay from "../Images/wiki/oss-day.jpg";
import Wikipedia25 from "../Images/wiki/wp25.jpg";

const snapshots = [
  {
    title: "Intro to Ecosystem",
    description: "An introduction to the Wikimedia ecosystem during a campus outreach session.",
    image: SessionEco,
    category: "Sessions & Workshops",
  },
  {
    title: "Technical Workshop",
    description: "A session introducing Gerrit code review and Phabricator project planning.",
    image: SessionGerrit,
    category: "Sessions & Workshops",
  },
  {
    title: "Core Presentation",
    description: "A core presentation on Wikimedia projects, licensing, and community values.",
    image: SessionCore,
    category: "Sessions & Workshops",
  },
  {
    title: "Engagement Quiz",
    description: "An interactive quiz keeping the student audience engaged with open knowledge.",
    image: SessionQuiz,
    category: "Sessions & Workshops",
  },
];

const featured = [
  {
    title: "Community Power",
    description:
      "Audience participation during the WikiClub Tech × GDG On Campus UIT session in Prayagraj.",
    image: AudienceGdg,
    tone: "blue",
    category: "Featured Moments",
  },
  {
    title: "Open Source Day",
    description:
      "Celebrating collaboration, community innovation and open access to knowledge with GDG Prayagraj at United Institute of Technology.",
    image: OpenSourceDay,
    tone: "green",
    category: "Featured Moments",
  },
  {
    title: "Wikipedia 25",
    description:
      "A quarter century of free knowledge celebrated with the UGI student community at United Institute of Technology, Prayagraj.",
    image: Wikipedia25,
    tone: "red",
    category: "Celebrations",
  },
];

const focusAreas = [
  "Overview of Wikimedia projects, licensing standards, and community values",
  "Gerrit code review and Phabricator project planning for technical collaboration",
  "Hands-on environment setup and student contributor workflows",
];

const albumCategories = ["All", "Featured Moments", "Sessions & Workshops", "Celebrations"];

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState("All");
  const [gallery, setGallery] = useState(null);

  const allPhotos = useMemo(() => {
    return [...featured, ...snapshots];
  }, []);

  const displayedPhotos = useMemo(() => {
    if (activeAlbum === "All") return allPhotos;
    return allPhotos.filter((p) => p.category === activeAlbum);
  }, [activeAlbum, allPhotos]);

  const openGallery = (images, index, title) => setGallery({ images, index, title });

  return (
    <div className="gallery-page">
      {/* 1. Cinematic Deep Green Hero */}
      <section className="gallery-page-hero">
        <div className="wrap gallery-page-hero__inner">
          <div className="gallery-page-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              COMMUNITY ARCHIVE & MOMENTS
            </span>
            <h1>Moments That Move Knowledge Forward.</h1>
            <p className="gallery-page-hero__lede">
              Visual highlights from our technical workshops, open-source sprints, outreach sessions,
              and community celebrations at United Institute of Technology, Prayagraj.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>{allPhotos.length}</strong>
              <span>Curated Photos</span>
            </div>
            <div className="page-hero__stat">
              <strong>CC BY-SA</strong>
              <span>Freely Licensed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Outreach Sessions Overview */}
      <section className="section">
        <div className="wrap">
          <div className="gallery-intro">
            <div className="gallery-intro__copy">
              <p className="eyebrow eyebrow--green">CAMPUS OUTREACH</p>
              <h2 className="section-title">Bridging Campus and the Wikimedia Ecosystem.</h2>
              <p className="section-lede">
                WikiClub Tech organised a series of on-campus sessions at United Institute of Technology,
                Prayagraj, designed to connect student developers with global Wikimedia workflows.
              </p>

              <button
                type="button"
                className="gallery-intro__media"
                onClick={() =>
                  openGallery(
                    snapshots.map((s) => s.image),
                    0,
                    "Session snapshots"
                  )
                }
                aria-label="Open session snapshots gallery"
              >
                <img
                  src={SessionEco}
                  alt="WikiClub Tech UIT presentation introducing the Wikimedia ecosystem"
                  loading="lazy"
                />
                <span className="gallery-intro__badge">
                  📷 View 4 Session Snapshots ↗
                </span>
              </button>
            </div>

            <aside className="gallery-focus">
              <p className="eyebrow eyebrow--green">CORE FOCUS AREAS</p>
              <h3>What Every Session Covered</h3>
              <ul className="check-list gallery-focus__list">
                {focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="gallery-focus__note">
                <span>ℹ️</span>
                <p>
                  All photographs are archived on Wikimedia Commons and released under the CC BY-SA 4.0
                  license for global community reuse.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 3. Filterable Album Showcase */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow eyebrow--green">PHOTO ARCHIVE</p>
              <h2 className="section-title">Visual Highlights.</h2>
            </div>

            {/* Album Tabs */}
            <div className="gallery-album-tabs">
              {albumCategories.map((album) => (
                <button
                  key={album}
                  type="button"
                  className={`filter-btn${activeAlbum === album ? " is-active" : ""}`}
                  onClick={() => setActiveAlbum(album)}
                >
                  {album}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Displayed Photos */}
          <div className="snapshot-grid">
            {displayedPhotos.map((photo, index) => (
              <Reveal
                as="button"
                type="button"
                className="snapshot-card"
                key={photo.title}
                delay={index * 60}
                variant="zoom"
                onClick={() =>
                  openGallery(
                    displayedPhotos.map((p) => p.image),
                    index,
                    photo.title
                  )
                }
              >
                <span className="snapshot-card__media">
                  <img src={photo.image} alt={photo.title} loading="lazy" />
                  <span className="snapshot-card__zoom" aria-hidden="true">
                    🔍
                  </span>
                </span>
                <span className="snapshot-card__body">
                  <strong>{photo.title}</strong>
                  <span>{photo.description}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Wikimedia Commons Credit Callout */}
      <section className="section">
        <div className="wrap">
          <Reveal
            className="home-cta"
            variant="zoom"
            style={{ "--band-photo": `url("${AudienceGdg}")` }}
          >
            <div className="home-cta__copy">
              <p className="eyebrow eyebrow--light">COMMONS REPOSITORY</p>
              <h2>Explore the Full Photo Category on Wikimedia Commons.</h2>
              <p>
                Every activity photograph is preserved with complete metadata and attribution
                under the WikiClub Tech UIT category on Wikimedia Commons.
              </p>
            </div>
            <div className="btn-row home-cta__actions">
              <a
                href="https://commons.wikimedia.org/wiki/Category:WikiClub_Tech_UIT"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--light btn--lg"
              >
                View Commons Category ↗
              </a>
              <a
                href="https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-light btn--lg"
              >
                Meta-Wiki Gallery ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {gallery && (
        <Lightbox
          images={gallery.images}
          index={gallery.index}
          title={gallery.title}
          onChange={(index) => setGallery((current) => ({ ...current, index }))}
          onClose={() => setGallery(null)}
        />
      )}
    </div>
  );
}
