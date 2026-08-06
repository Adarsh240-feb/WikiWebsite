import React, { useState } from "react";
import "./Achievements.css";
import "./HomePage.css";
import GroupWiki from "../Images/GroupWiki.png";
import Card1 from "../Images/Card1.png";
import Card2 from "../Images/Card2.jpg";
import Card3 from "../Images/Card3.png";
import achievement1 from "../Images/achievements/achievement1/achievement1.png";
import achievement1_2 from "../Images/achievements/achievement1/achievement1 - 2.jpeg";
import achievement1_3 from "../Images/achievements/achievement1/achievement1 - 3.jpeg";
import achievement2 from "../Images/achievements/achievement2/achievement2.jpeg";
import Reeti from "../Images/Reeti.png";
import Manvi from "../Images/Manvi.jpg";
import Somya from "../Images/Somya.jpg";
import Sidebar from "./Sidebar";
import OptimizedImage from "./OptimizedImage";

const achievements = [
  {
    id: 1,
    category: "Hackathons",
    badge: "💻",
    badgeColor: "#319967",
    title: "Indic Wiki Hackathon — Selected & Participated",
    subtitle: "National Wikimedia Open-Source Hackathon",
    description:
      "Reeti Singh from WikiClub Tech UIT was selected for the Indic Wiki Hackathon. Participants worked on specialized open-source tools, MediaWiki extensions, and localized knowledge projects to empower Indian language Wikimedia communities.",
    highlights: [
      "Reeti Singh selected among top open-source contributors across India",
      "Built tools and MediaWiki scripts for Indic languages",
      "Collaborated with senior Wikimedia developers & mentors",
    ],
    // Array of image sources. Can hold 1 or 2 posters/photos.
    images: [achievement1, achievement1_2, achievement1_3],
    tags: ["Indic Wiki", "Hackathon", "MediaWiki", "Open Source"],
    year: "2026",
  },
  {
    id: 2,
    category: "National Conference",
    badge: "🎟️",
    badgeColor: "#d97706",
    title: "Wiki Conference India — Scholarships & Volunteers",
    subtitle: "National Wikimedia Conference (WCI)",
    description:
      "A major milestone for our club: Reeti Singh and Sarthak Singh were awarded prestigious full scholarships to attend Wiki Conference India, while Adarsh Kesharwani and Shivaansh Singh were selected as official event volunteers to help manage national conference tracks.",
    highlights: [
      "Full Scholarships: Reeti Singh & Sarthak Singh",
      "Official Event Volunteers: Adarsh Kesharwani & Shivaansh Singh",
      "Represented WikiClub Tech UIT on a national platform",
      "Engaged in technical sessions, workshops, and networking",
    ],
    images: [achievement2],
    tags: ["WCI", "Scholarship", "Volunteers", "National Event"],
    year: "2026",
  },
  {
    id: 3,
    category: "OKI Internship",
    badge: "🔬",
    badgeColor: "#046599",
    title: "Outreachy & OKI Internship Selections",
    subtitle: "Paid Open Knowledge & Open Source Internships",
    description:
      "Manvi Kesarwani, Reeti Singh, and Somya Yadav from WikiClub Tech UIT were selected for prestigious open-source internship programs including OKI (Open Knowledge Internship) and Outreachy. Selected interns receive stipend support while contributing to globally impactful open knowledge projects.",
    highlights: [
      "Selected Interns: Manvi Kesarwani, Reeti Singh & Somya Yadav",
      "Selected for competitive paid open-source internships (OKI & Outreachy)",
      "Stipend-supported full project cycle development",
      "Contributions merged into core open-source repositories",
    ],
    images: [Reeti, Manvi, Somya],
    tags: ["OKI Internship", "Outreachy", "Open Knowledge", "Paid Mentorship"],
    year: "2026",
  },
  {
    id: 4,
    category: "Road to Wiki Program",
    badge: "🏛️",
    badgeColor: "#991b1e",
    title: "Road to Wiki Program — Cohort 1",
    subtitle: "WikiClub Tech [IN] × Wikimedia Foundation",
    description:
      "A comprehensive cohort-based educational program developed through collaboration between WikiClub Tech [IN] and the Wikimedia Foundation. Out of 260+ applicants from 7+ institutions, Sarthak Singh, Hridyesh Gupta (Founder of WikiClub Tech UIT), Shivaansh Singh, and Avarti Rastogi were selected for RTW Cohort 1, participating in intensive MediaWiki training and a 2-day graduation ceremony in Gurgaon.",
    highlights: [
      "Selected Members: Sarthak Singh, Hridyesh Gupta (Founder), Shivaansh Singh & Avarti Rastogi",
      "Selected for RTW Cohort 1 out of 260+ applicants evaluated from 7+ institutions",
      "Program kick-off: September 27, 2024",
      "Graduation ceremony: Feb 27–28, Gurgaon (sponsored by Wikimedia Foundation)",
      "Hands-on MediaWiki setup & expert-led technical masterclasses",
    ],
    images: [GroupWiki],
    tags: ["Wikimedia Foundation", "Open Source", "Cohort Program"],
    year: "2025",
  },
];

function Achievements() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(1);
  const [galleryModal, setGalleryModal] = useState(null); // { images: [], currentIndex: 0, title: "" }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const openGallery = (images, initialIndex, title) => {
    if (images && images.length > 0) {
      setGalleryModal({ images, currentIndex: initialIndex, title });
    }
  };

  const closeGallery = () => setGalleryModal(null);

  const showPrev = (e) => {
    e?.stopPropagation();
    setGalleryModal((prev) =>
      prev
        ? {
            ...prev,
            currentIndex:
              prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1,
          }
        : null
    );
  };

  const showNext = (e) => {
    e?.stopPropagation();
    setGalleryModal((prev) =>
      prev
        ? {
            ...prev,
            currentIndex:
              prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1,
          }
        : null
    );
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!galleryModal) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    if (galleryModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [galleryModal]);

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
      <div className="container">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="main-content">

          {/* Page Header */}
          <div className="ach-page-header">
            <div className="ach-page-header-text">
              <h1 className="ach-page-title">
                <span className="ach-accent-red">Our</span>{" "}
                <span className="ach-accent-green">Achievements</span>
              </h1>
              <p className="ach-page-subtitle">
                From hackathon selections to national scholarships and flagship programs — here's what our community has achieved together.
              </p>
            </div>
            <div className="ach-page-trophy">🏆</div>
          </div>

          {/* Achievement Cards */}
          <div className="ach-cards-list">
            {achievements.map((ach) => (
              <div
                className={`ach-card ${expandedCard === ach.id ? "ach-card--open" : ""}`}
                key={ach.id}
              >
                <div
                  className="ach-card-header"
                  style={{ borderLeftColor: ach.badgeColor }}
                  onClick={() => setExpandedCard(expandedCard === ach.id ? null : ach.id)}
                >
                  <span
                    className="ach-card-badge"
                    style={{ background: ach.badgeColor + "18", color: ach.badgeColor }}
                  >
                    {ach.badge} {ach.category}
                  </span>
                  <div className="ach-card-header-text">
                    <h2 className="ach-card-title">{ach.title}</h2>
                    <p className="ach-card-sub">{ach.subtitle}</p>
                  </div>
                  <span className="ach-card-year" style={{ background: ach.badgeColor }}>
                    {ach.year}
                  </span>
                  <button
                    className="ach-card-toggle"
                    style={{ color: ach.badgeColor }}
                    aria-label={expandedCard === ach.id ? "Collapse" : "Expand"}
                  >
                    {expandedCard === ach.id ? "▲" : "▼"}
                  </button>
                </div>

                {expandedCard === ach.id && (
                  <div className="ach-card-body">
                    {/* Media / Poster Cover Area */}
                    <div className="ach-card-media-grid">
                      {ach.images && ach.images.length > 0 ? (
                        <div
                          className="ach-card-img-wrap"
                          onClick={() => openGallery(ach.images, 0, ach.title)}
                        >
                          <OptimizedImage
                            src={ach.images[0]}
                            alt={`${ach.title} Cover Photo`}
                            className="ach-card-img"
                          />
                          <div className="ach-card-zoom-hint">
                            <span>🔍 View All ({ach.images.length})</span>
                          </div>
                          {ach.images.length > 1 && (
                            <div className="ach-gallery-badge">
                              📸 {ach.images.length} Photos
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="ach-card-img-placeholder">
                          <span className="ach-placeholder-icon">📸</span>
                          <span className="ach-placeholder-text">Photo / Poster Slot</span>
                        </div>
                      )}
                    </div>

                    <div className="ach-card-info">
                      <p className="ach-card-desc">{ach.description}</p>
                      <h4 className="ach-card-hl-title" style={{ color: ach.badgeColor }}>
                        Key Highlights
                      </h4>
                      <ul className="ach-card-hl-list">
                        {ach.highlights.map((h, i) => (
                          <li key={i} className="ach-card-hl-item">
                            <span style={{ color: ach.badgeColor }}>◆</span> {h}
                          </li>
                        ))}
                      </ul>
                      <div className="ach-card-tags">
                        {ach.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="ach-card-tag"
                            style={{ borderColor: ach.badgeColor, color: ach.badgeColor }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* Lightbox Gallery Modal */}
      {galleryModal && (
        <div className="ach-modal-overlay" onClick={closeGallery}>
          {/* Top Right Close Button */}
          <button
            className="ach-modal-close-btn"
            onClick={closeGallery}
            title="Close (Esc)"
          >
            ✕
          </button>

          {/* Left & Right Viewport Navigation Arrows */}
          {galleryModal.images.length > 1 && (
            <>
              <button
                className="ach-modal-nav-btn ach-modal-nav-prev"
                onClick={showPrev}
                title="Previous Photo (Left Arrow)"
              >
                ‹
              </button>
              <button
                className="ach-modal-nav-btn ach-modal-nav-next"
                onClick={showNext}
                title="Next Photo (Right Arrow)"
              >
                ›
              </button>
            </>
          )}

          {/* Central Modal Content */}
          <div className="ach-modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryModal.images[galleryModal.currentIndex]}
              alt={`${galleryModal.title} Photo ${galleryModal.currentIndex + 1}`}
              className="ach-modal-img"
            />

            <div className="ach-modal-caption">
              <span>{galleryModal.title}</span>
              {galleryModal.images.length > 1 && (
                <span className="ach-modal-counter">
                  {galleryModal.currentIndex + 1} / {galleryModal.images.length}
                </span>
              )}
            </div>

            {/* Thumbnail Navigation Row */}
            {galleryModal.images.length > 1 && (
              <div className="ach-modal-thumbnails">
                {galleryModal.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className={`ach-modal-thumb ${
                      i === galleryModal.currentIndex ? "ach-modal-thumb--active" : ""
                    }`}
                    onClick={() =>
                      setGalleryModal((prev) => (prev ? { ...prev, currentIndex: i } : null))
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Achievements;

