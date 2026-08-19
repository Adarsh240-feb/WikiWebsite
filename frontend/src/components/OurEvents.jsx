import React, { useState } from "react";
import "./OurEvents.css";
import "./HomePage.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Event1Img from "../Images/events/event1/Event1.jpg";
import Event2Img from "../Images/events/event2/Event2.jpg";
import Event3Img from "../Images/events/event3/Event3.jpg";
import Event3Img1 from "../Images/events/event3/Event3 - 1.jpg";
import Event3Img2 from "../Images/events/event3/Event3 - 2.jpg";
import Event4Img from "../Images/events/event4/Event4.jpg";
import Event5Img from "../Images/events/event5/Event5.jpg";
import Event6Img from "../Images/events/event6/Event6.jpg";
import Event7Img from "../Images/events/event7/OpenSourceDay.jpeg";
import OptimizedImage from "./OptimizedImage";

const upcomingEvents = [
  {
    id: 7,
    title: "Open Source Day",
    date: "2026-08-21",
    location: "UIT Induction Hall",
    type: "Collaborative Session",
    typeColor: "#046599",
    description:
      "We're celebrating Open Source Day—a day dedicated to collaboration, community-driven innovation, and open access to knowledge organized in collaboration with Google Developer Groups (GDG) Prayagraj. Join us for engaging sessions, live demos, and interesting trivia around the world of open source.",
    tags: ["Open Source", "GDG", "Wikimedia", "Community"],
    images: [Event7Img],
    link: "https://luma.com/itystgpm",
    ctaText: "Register on Luma →",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Contribution Marathon",
    date: "2026-04-13 – 2026-04-17",
    location: "Online / UIT Prayagraj",
    type: "Marathon",
    typeColor: "#319967",
    description: (
      <>
        A week-long event focused on open-source contributions, team collaboration, and practical growth. Participants worked directly on real-world production projects—tackling bug fixes, implementing new features, and making impactful code contributions—while earning exclusive swags, certificates, badges, and recognition. Track contributions live on the{" "}
        <Link to="/MarathonBoard" style={{ color: "#046599", fontWeight: "600", textDecoration: "none" }}>
          Marathon Board ↗
        </Link>.
      </>
    ),
    tags: ["Open Source", "Marathon", "Contributions", "Swag"],
    images: [Event1Img],
  },
  {
    id: 2,
    title: "Wikipedia Birthday (WP25)",
    date: "2026-01-15",
    location: "UIT, Prayagraj",
    type: "Celebration",
    typeColor: "#991b1e",
    description:
      "A landmark celebration of 25 years of Wikipedia. The event featured a reflection on the history of free knowledge and a cake-cutting ceremony with the UGI student community.",
    tags: ["WP25", "Wikipedia", "Celebration", "Free Knowledge"],
    images: [Event2Img],
  },
  {
    id: 3,
    title: "Wiki x GDG-OC Collaborative Session",
    date: "2024-11-27",
    location: "UIT Seminar Hall",
    type: "Collaborative Session",
    typeColor: "#046599",
    description:
      "A joint session with GDG-OC focused on collaborative open-source contributions, featuring a session on Wikipedia and Wikimedia by Adarsh Kesharwani and a session on Flutter by Shivaansh Singh.",
    tags: ["GDG", "Wikimedia", "Flutter", "Open Source"],
    images: [Event3Img, Event3Img1, Event3Img2],
  },
  {
    id: 4,
    title: "Hacktoberfest Webinar",
    date: "2024-10-24",
    location: "Virtual",
    type: "Webinar",
    typeColor: "#7c3aed",
    description:
      "A virtual event providing guidance and mentorship on making successful open-source contributions during Hacktoberfest.",
    tags: ["Hacktoberfest", "Webinar", "Mentorship", "Git"],
    images: [Event4Img],
  },
  {
    id: 5,
    title: "Road to Wiki Session",
    date: "2024-10-13",
    location: "Virtual",
    type: "Session",
    typeColor: "#d97706",
    description:
      "An introductory session on how to get started with Wikimedia projects, including finding tasks and community guidelines.",
    tags: ["Road to Wiki", "Intro", "Wikimedia", "Guidelines"],
    images: [Event5Img],
  },
  {
    id: 6,
    title: "Wikimedia Ecosystem Setup",
    date: "2024-09-28",
    location: "Virtual",
    type: "Workshop",
    typeColor: "#319967",
    description:
      "A comprehensive hands-on workshop guiding participants through setting up their development environment for Gerrit and Phabricator.",
    tags: ["Environment Setup", "Gerrit", "Phabricator", "Hands-on"],
    images: [Event6Img],
  },
];

const eventTypes = ["All", "Marathon", "Celebration", "Collaborative Session", "Webinar", "Session", "Workshop"];

function OurEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
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

  const filteredPast =
    activeFilter === "All"
      ? pastEvents
      : pastEvents.filter((e) => e.type === activeFilter);

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
      <div className="container">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="main-content">

          {/* Page Header */}
          <div className="ev-page-header">
            <div className="ev-page-header-text">
              <h1 className="ev-page-title">
                <span className="ev-accent-red">Our</span>{" "}
                <span className="ev-accent-green">Events</span>
              </h1>
              <p className="ev-page-subtitle">
                Workshops, ceremonies, hackathons, and webinars — here's a living record of what WikiClub Tech UIT has organized.
              </p>
            </div>
            <div className="ev-page-icon">📅</div>
          </div>

          {/* Upcoming Events */}
          <section className="ev-section">
            <div className="ev-section-heading">
              <span className="ev-section-badge ev-badge-upcoming">🔔 Upcoming</span>
              <h2 className="ev-section-title">Upcoming Events</h2>
            </div>
            {upcomingEvents.length === 0 ? (
              <div className="ev-empty">
                <div className="ev-empty-icon">🗓️</div>
                <p className="ev-empty-text">
                  No upcoming events scheduled right now. Follow our socials to stay updated!
                </p>
                <div className="ev-social-cta">
                  <a
                    href="https://www.instagram.com/wikiclubtech.uit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ev-social-btn ev-btn-ig"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/company/wikitech-uit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ev-social-btn ev-btn-li"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ) : (
              <div className="ev-timeline">
                {upcomingEvents.map((event, index) => (
                  <div className="ev-timeline-item" key={event.id}>
                    <div className="ev-timeline-dot" style={{ background: event.typeColor }} />
                    {index < upcomingEvents.length - 1 && <div className="ev-timeline-line" />}
                    
                    {/* Horizontal Card Layout (Text on Left, Poster on Right) */}
                    <div className="ev-timeline-card ev-card-horizontal">
                      
                      {/* Left Side: Event Details */}
                      <div className="ev-card-left">
                        <div className="ev-timeline-meta">
                          <span>📅 {event.date}</span>
                          <span>📍 {event.location}</span>
                        </div>
                        <h3 className="ev-timeline-title">{event.title}</h3>
                        <span
                          className="ev-type-pill"
                          style={{ background: event.typeColor }}
                        >
                          {event.type}
                        </span>
                        <div className="ev-timeline-desc">{event.description}</div>

                        {event.link && (
                          <div style={{ marginBottom: "14px" }}>
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "8px 18px",
                                borderRadius: "8px",
                                background: "#046599",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: "0.88rem",
                                textDecoration: "none"
                              }}
                            >
                              {event.ctaText || "Register on Luma →"}
                            </a>
                          </div>
                        )}

                        <div className="ev-timeline-tags">
                          {event.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="ev-tag"
                              style={{ borderColor: event.typeColor, color: event.typeColor }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Event Cover Poster */}
                      <div className="ev-card-right">
                        <div className="ev-posters-grid">
                          {event.images && event.images.length > 0 ? (
                            <div
                              className="ev-poster-wrap"
                              onClick={() => openGallery(event.images, 0, event.title)}
                            >
                              <OptimizedImage
                                src={event.images[0]}
                                alt={`${event.title} Cover Poster`}
                                className="ev-poster-img"
                              />
                              <div className="ev-poster-zoom-hint">
                                <span>🔍 View All ({event.images.length})</span>
                              </div>
                              {event.images.length > 1 && (
                                <div className="ev-gallery-badge">
                                  📸 {event.images.length} Photos
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="ev-poster-placeholder">
                              <span className="ev-ph-icon">🖼️</span>
                              <span className="ev-ph-text">Poster Slot</span>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past Events */}
          <section className="ev-section">
            <div className="ev-section-heading">
              <span className="ev-section-badge ev-badge-past">📚 Past Events</span>
              <h2 className="ev-section-title">Recent Events</h2>
            </div>

            {/* Filters */}
            <div className="ev-filters">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  className={`ev-filter-btn ${activeFilter === type ? "ev-filter-btn--active" : ""}`}
                  onClick={() => setActiveFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            {filteredPast.length === 0 ? (
              <div className="ev-empty">
                <p className="ev-empty-text">No events in this category yet.</p>
              </div>
            ) : (
              <div className="ev-timeline">
                {filteredPast.map((event, index) => (
                  <div className="ev-timeline-item" key={event.id}>
                    <div className="ev-timeline-dot" style={{ background: event.typeColor }} />
                    {index < filteredPast.length - 1 && <div className="ev-timeline-line" />}
                    
                    {/* Horizontal Card Layout (Text on Left, Poster on Right) */}
                    <div className="ev-timeline-card ev-card-horizontal">
                      
                      {/* Left Side: Event Details */}
                      <div className="ev-card-left">
                        <div className="ev-timeline-meta">
                          <span>📅 {event.date}</span>
                          <span>📍 {event.location}</span>
                        </div>
                        <h3 className="ev-timeline-title">{event.title}</h3>
                        <span
                          className="ev-type-pill"
                          style={{ background: event.typeColor }}
                        >
                          {event.type}
                        </span>
                        <div className="ev-timeline-desc">{event.description}</div>

                        <div className="ev-timeline-tags">
                          {event.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="ev-tag"
                              style={{ borderColor: event.typeColor, color: event.typeColor }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Event Cover Poster */}
                      <div className="ev-card-right">
                        <div className="ev-posters-grid">
                          {event.images && event.images.length > 0 ? (
                            <div
                              className="ev-poster-wrap"
                              onClick={() => openGallery(event.images, 0, event.title)}
                            >
                              <OptimizedImage
                                src={event.images[0]}
                                alt={`${event.title} Cover Poster`}
                                className="ev-poster-img"
                              />
                              <div className="ev-poster-zoom-hint">
                                <span>🔍 View All ({event.images.length})</span>
                              </div>
                              {event.images.length > 1 && (
                                <div className="ev-gallery-badge">
                                  📸 {event.images.length} Photos
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="ev-poster-placeholder">
                              <span className="ev-ph-icon">🖼️</span>
                              <span className="ev-ph-text">Poster Slot</span>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="ev-cta-section">
            <div className="ev-cta-card">
              <div className="ev-cta-icon">✨</div>
              <h3 className="ev-cta-title">Have an event to add?</h3>
              <p className="ev-cta-desc">
                If you've participated in an event representing WikiClub Tech UIT,
                reach out to our team to get it listed here!
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kesharwaniadarsh24@gmail.com&su=Event%20Submission%20%7C%20WikiClub%20Tech%20UIT"
                target="_blank"
                rel="noopener noreferrer"
                className="ev-cta-btn"
              >
                📬 Contact Us
              </a>
            </div>
          </section>

        </main>
      </div>

      {/* Lightbox Gallery Modal */}
      {galleryModal && (
        <div className="ev-modal-overlay" onClick={closeGallery}>
          {/* Top Right Close Button */}
          <button
            className="ev-modal-close-btn"
            onClick={closeGallery}
            title="Close (Esc)"
          >
            ✕
          </button>

          {/* Left & Right Viewport Navigation Arrows */}
          {galleryModal.images.length > 1 && (
            <>
              <button
                className="ev-modal-nav-btn ev-modal-nav-prev"
                onClick={showPrev}
                title="Previous Photo (Left Arrow)"
              >
                ‹
              </button>
              <button
                className="ev-modal-nav-btn ev-modal-nav-next"
                onClick={showNext}
                title="Next Photo (Right Arrow)"
              >
                ›
              </button>
            </>
          )}

          {/* Central Modal Content */}
          <div className="ev-modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryModal.images[galleryModal.currentIndex]}
              alt={`${galleryModal.title} Photo ${galleryModal.currentIndex + 1}`}
              className="ev-modal-img"
            />

            <div className="ev-modal-caption">
              <span>{galleryModal.title}</span>
              {galleryModal.images.length > 1 && (
                <span className="ev-modal-counter">
                  {galleryModal.currentIndex + 1} / {galleryModal.images.length}
                </span>
              )}
            </div>

            {/* Thumbnail Navigation Row */}
            {galleryModal.images.length > 1 && (
              <div className="ev-modal-thumbnails">
                {galleryModal.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className={`ev-modal-thumb ${
                      i === galleryModal.currentIndex ? "ev-modal-thumb--active" : ""
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

export default OurEvents;

