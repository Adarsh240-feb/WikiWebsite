import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import "./OurEvents.css";

import Hack3 from "../Images/meta/hack3.png";
import Hack2 from "../Images/meta/hack2.png";
import Hack1 from "../Images/meta/hack1.png";
import OsdPoster from "../Images/meta/osd-poster.jpg";
import MarathonPoster from "../Images/meta/marathon-poster.jpg";
import Wp25Poster from "../Images/meta/wp25-poster.jpg";
import PosterGdg from "../Images/meta/poster-gdg.jpg";
import PosterWebinar from "../Images/meta/poster-webinar.jpg";
import PosterRoadToWiki from "../Images/meta/poster-roadtowiki.jpg";
import SessionCore from "../Images/wiki/session-core.jpg";
import OsdPhoto from "../Images/wiki/oss-day.jpg";
import Wp25Photo from "../Images/wiki/wp25.jpg";

const events = [
  {
    id: 10,
    title: "Hacktoberfest Hack Day 3.0: Inter-College Grand Finale",
    year: "2026",
    date: "18 Oct 2026 · 11:00 AM – 4:00 PM",
    location: "UIT Prayagraj",
    type: "Hacktoberfest",
    kind: "Grand Finale",
    tone: "green",
    summary:
      "The grand finale of the Hacktoberfest series welcomed student teams from regional and distant college campuses. Envoy Gautam Kumar Maurya introduced WikiClub Tech, Wikimedia, and Commons contribution pathways. Teams competed across open-source and Gemma tracks.",
    description:
      "The culmination of Hacktoberfest at United Institute of Technology! Student developer teams presented live functional open-source projects. Gautam Kumar Maurya guided participants on proper repository structuring, CC licensing for Commons media, and upstream patch preparation. Categories included Best Open Source Project and Best Use of Gemma (Google's open AI model).",
    highlight: {
      title: "Grand Finale Prize Tracks & Jury",
      text: "Prize tracks included 'Best Open Source Project' and 'Best Use of Gemma'. Winning teams were awarded certificates, official swag, and direct mentorship recommendations.",
    },
    tags: ["Hacktoberfest", "Grand Finale", "Gemma", "Open Source"],
    images: [Hack3],
    links: [
      {
        label: "Official Meta-Wiki Event Page",
        href: "https://meta.wikimedia.org/wiki/WikiClub_Tech_-_UIT/Events/Hacktoberfest_Hack_Day_3.0",
      },
      {
        label: "45 Photos on Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/Category:Hacktoberfest_Hack_Day_2026_by_WikiClub_Tech_UIT_%E2%80%93_Edition_3.0",
      },
    ],
  },
  {
    id: 9,
    title: "Hacktoberfest Hack Day 2.0: Project Building & Evaluation",
    year: "2026",
    date: "17 Oct 2026 · 10:00 AM – 4:00 PM",
    location: "UIT Prayagraj",
    type: "Hacktoberfest",
    kind: "Code Sprint",
    tone: "green",
    summary:
      "A full-day open-source build sprint and project evaluation session. Envoy Gautam Kumar Maurya guided participating teams through Git contribution workflows, Commons practices, and live pitches before jury evaluator Mr. Kushagra Dwivedi.",
    description:
      "Teams spent six hours architecting pull requests, debugging dependencies, and polishing documentation. Kushagra Dwivedi provided structured evaluations assessing code quality, commit clarity, and open-source licensing compliance.",
    highlight: {
      title: "Jury Evaluations by Mr. Kushagra Dwivedi",
      text: "Evaluations focused on adherence to Git conventions, meaningful commit messages, modular architecture, and real-world applicability.",
    },
    tags: ["Hacktoberfest", "Git", "Code Sprint", "Evaluation"],
    images: [Hack2],
    links: [
      {
        label: "Official Meta-Wiki Event Page",
        href: "https://meta.wikimedia.org/wiki/WikiClub_Tech_-_UIT/Events/Hacktoberfest_Hack_Day_2.0",
      },
      {
        label: "40 Photos on Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/Category:Hacktoberfest_Hack_Day_2026_by_WikiClub_Tech_UIT_%E2%80%93_Edition_2.0",
      },
    ],
  },
  {
    id: 8,
    title: "Hacktoberfest Hack Day 1.0: Opening Ceremony & Sprint",
    year: "2026",
    date: "16 Oct 2026 · 11:00 AM – 4:30 PM",
    location: "UIT Prayagraj",
    type: "Hacktoberfest",
    kind: "Inaugural Sprint",
    tone: "green",
    summary:
      "The inaugural edition graced by Dean Academics, Dr. Abhishek Malviya (HOD CSE), and Dr. Dhananjay Sharma (HOD CSE). Envoy Gautam Kumar Maurya delivered the keynote introducing WikiClub Tech and open-source contribution roadmaps.",
    description:
      "Inaugurated the 3-day Hacktoberfest hackathon series at United Institute of Technology. Students were introduced to the Wikimedia Movement, licensing fundamentals on Wikimedia Commons, and how to identify good first issues in open-source projects.",
    highlight: {
      title: "Leadership Keynote & Inauguration",
      text: "Addressed by Dean Academics and Department Heads, underscoring the vital role of open-source literacy in academic and industrial computing.",
    },
    tags: ["Hacktoberfest", "Keynote", "Wikimedia", "Inaugural Sprint"],
    images: [Hack1],
    links: [
      {
        label: "Official Meta-Wiki Event Page",
        href: "https://meta.wikimedia.org/wiki/WikiClub_Tech_-_UIT/Events/Hacktoberfest_Hack_Day_1.0",
      },
      {
        label: "16 Photos on Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/Category:Hacktoberfest_Hack_Day_2026_by_WikiClub_Tech_UIT_%E2%80%93_Edition_1.0",
      },
    ],
  },
  {
    id: 7,
    title: "Open Source Day — WikiClub Tech × GDG Prayagraj",
    year: "2026",
    date: "21 Aug 2026 · Full Day",
    location: "UIT Prayagraj",
    type: "Collaboration",
    kind: "GDG Collaboration",
    tone: "blue",
    summary:
      "A celebration of open-source collaboration, community innovation, and open access to knowledge organised jointly with Google Developer Groups (GDG) Prayagraj, featuring live demos and interactive trivia.",
    description:
      "Hands-on curriculum exploring Git workflows, Gerrit for MediaWiki patches, and open-source toolchains. Over 150 students participated in architecture discussions and technical trivia sessions.",
    highlight: {
      title: "Curriculum & Tools Explored",
      text: "Comprehensive walkthrough of Gerrit, Git branching, Phabricator issue tracking, and contributing to Wikimedia repositories.",
    },
    tags: ["Open Source", "GDG Prayagraj", "Live Demos", "Community"],
    images: [OsdPoster, OsdPhoto],
    links: [
      {
        label: "Official Meta-Wiki Event Page",
        href: "https://meta.wikimedia.org/wiki/WikiClub_Tech_-_UIT/Events/Open_Source_Day",
      },
      {
        label: "Registration & Agenda Archive",
        href: "https://meta.wikimedia.org/wiki/Event:IIITH-OKI/WikiClub_Tech/Open_Source_Day_-_WikiClub_Tech_UIT",
      },
    ],
  },
  {
    id: 6,
    title: "Contribution Marathon 2026",
    year: "2026",
    date: "13 – 17 Apr 2026",
    location: "Online & Campus",
    type: "Marathon",
    kind: "One-Week Sprint",
    tone: "green",
    summary:
      "A week-long sprint on open-source code contributions, team collaboration, and practical growth. Participants resolved real production issues and shipped upstream patches.",
    description:
      "Student teams tackled production tasks across open-source repositories, tracking accepted pull requests and leaderboard rankings on campus.",
    highlight: {
      title: "Live Marathon Board",
      text: "Integrated with the campus leaderboard to recognise merged commits, documentation improvements, and verified pull requests.",
    },
    tags: ["Open Source", "Marathon", "Leaderboard", "Patches"],
    images: [MarathonPoster],
    links: [{ label: "View Marathon Board", to: "/MarathonBoard" }],
  },
  {
    id: 5,
    title: "Wikipedia 25th Birthday Celebration",
    year: "2026",
    date: "15 Jan 2026",
    location: "UIT Prayagraj",
    type: "Celebration",
    kind: "Global Milestone",
    tone: "red",
    summary:
      "A landmark celebration of 25 years of Wikipedia and a quarter-century of free human knowledge, featuring an orientation on the movement and commemorative cake-cutting with the UGI student community.",
    description:
      "Celebrating 25 years since Wikipedia was launched on January 15, 2001. Highlights included discussions on digital knowledge preservation, linguistic diversity, and Wikimedia projects.",
    highlight: {
      title: "Quarter-Century Milestone",
      text: "Commemorating 25 years of volunteer editors building the largest collective encyclopaedia in human history.",
    },
    tags: ["WP25", "Wikipedia", "Free Knowledge", "Celebration"],
    images: [Wp25Poster, Wp25Photo],
    links: [
      {
        label: "Official Meta-Wiki Event Page",
        href: "https://meta.wikimedia.org/wiki/Event:Wikipedia_25_-_B%27Day_Celebration_by_WikiClub_Tech_-_UIT",
      },
    ],
  },
  {
    id: 4,
    title: "Wiki × GDG On Campus Joint Meetup",
    year: "2025",
    date: "27 Nov 2025",
    location: "UIT Prayagraj",
    type: "Workshop",
    kind: "Joint Meetup",
    tone: "blue",
    summary:
      "A joint open-source meetup featuring sessions on Wikipedia and Wikimedia contributions by Adarsh Kesharwani and Flutter app development by Shivaansh Singh.",
    description:
      "Bridging open content and mobile engineering: students explored how open-source APIs and Wikipedia content integrate into modern Flutter applications.",
    tags: ["Wikimedia", "Flutter", "GDG-OC", "Meetup"],
    images: [PosterGdg],
  },
  {
    id: 3,
    title: "Hacktoberfest Virtual Mentorship Webinar",
    year: "2025",
    date: "26 Oct 2025",
    location: "Virtual Session",
    type: "Workshop",
    kind: "Virtual Mentorship",
    tone: "blue",
    summary:
      "A virtual mentorship clinic on repository discovery, issue claiming, commit message formatting, and creating production pull requests during Hacktoberfest.",
    description:
      "Experienced mentors explained how to find beginner-friendly tagged issues (good first issue) and how to communicate effectively with international repository maintainers.",
    tags: ["Hacktoberfest", "Git", "Pull Requests", "Mentorship"],
    images: [PosterWebinar],
  },
  {
    id: 2,
    title: "Road to Wiki Foundational Orientation",
    year: "2025",
    date: "3 Oct 2025",
    location: "UIT Prayagraj",
    type: "Workshop",
    kind: "Orientation",
    tone: "green",
    summary:
      "An introductory orientation on contributing to Wikimedia projects, understanding community culture, and finding beginner-friendly tasks.",
    description:
      "Kicked off the Road to Wiki cohort initiative, giving students a clear roadmap for Wikimedia participation and mentorship access.",
    tags: ["Road to Wiki", "Orientation", "Community", "Beginner Tasks"],
    images: [PosterRoadToWiki],
  },
  {
    id: 1,
    title: "Ecosystem Setup & Toolchain Clinic",
    year: "2025",
    date: "28 Sep 2025",
    location: "UIT Prayagraj",
    type: "Workshop",
    kind: "Hands-on Clinic",
    tone: "blue",
    summary:
      "A hands-on developer clinic guiding participants through local developer toolchains, Gerrit setup, and Phabricator account configuration.",
    description:
      "Step-by-step guidance on creating Wikimedia developer accounts, configuring SSH keys, and setting up Git review hooks.",
    tags: ["Gerrit", "Phabricator", "Toolchain", "Hands-on"],
    images: [SessionCore],
  },
];

const eventTypes = ["All", "Hacktoberfest", "Collaboration", "Marathon", "Celebration", "Workshop"];
const years = ["All", "2026", "2025"];

export default function OurEvents() {
  const [activeType, setActiveType] = useState("All");
  const [activeYear, setActiveYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [gallery, setGallery] = useState(null);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchType = activeType === "All" || ev.type === activeType;
      const matchYear = activeYear === "All" || ev.year === activeYear;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.summary.toLowerCase().includes(q) ||
        ev.tags.some((t) => t.toLowerCase().includes(q));
      return matchType && matchYear && matchQuery;
    });
  }, [activeType, activeYear, searchQuery]);

  const openGallery = (images, index, title) => {
    if (images && images.length > 0) setGallery({ images, index, title });
  };

  const handleClearFilters = () => {
    setActiveType("All");
    setActiveYear("All");
    setSearchQuery("");
  };

  return (
    <div className="events-page">
      {/* 1. Cinematic Deep Green Hero */}
      <section className="events-page-hero">
        <div className="wrap events-page-hero__inner">
          <div className="events-page-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              EVENTS & COMMUNITY ACTIVITIES
            </span>
            <h1>Where the Community Comes Together.</h1>
            <p className="events-page-hero__lede">
              A comprehensive documented archive of hackathons, open-source sprints,
              technical workshops, and Wikimedia celebrations hosted by WikiClub Tech – UIT, Prayagraj.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>{events.length}</strong>
              <span>Documented Activities</span>
            </div>
            <div className="page-hero__stat">
              <strong>100+</strong>
              <span>Photos on Commons</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Listing & Interactive Filter Controls */}
      <section className="section">
        <div className="wrap">
          {/* Controls Bar */}
          <div className="events-controls-bar">
            {/* Search Input */}
            <div className="events-search">
              <span className="events-search__icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search events by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search events"
              />
            </div>

            {/* Year Filters */}
            <div className="event-filters" role="group" aria-label="Filter by year">
              {years.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  className={`filter-btn${activeYear === yr ? " is-active" : ""}`}
                  onClick={() => setActiveYear(yr)}
                >
                  {yr === "All" ? "All Years" : yr}
                </button>
              ))}
            </div>

            {/* Type Filters */}
            <div className="event-filters" role="group" aria-label="Filter by type">
              {eventTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`filter-btn${activeType === t ? " is-active" : ""}`}
                  onClick={() => setActiveType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Chips & Results Count */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
            <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
              Showing <strong>{filteredEvents.length}</strong> of {events.length} archived events
            </span>
            {(activeType !== "All" || activeYear !== "All" || searchQuery) && (
              <button
                type="button"
                className="chip chip--green"
                onClick={handleClearFilters}
                style={{ cursor: "pointer", border: "1px solid var(--brand-green)" }}
              >
                Clear all filters ✕
              </button>
            )}
          </div>

          {/* Event Cards Grid */}
          {filteredEvents.length === 0 ? (
            <div className="empty-state" style={{ textAlign: "center", padding: "48px 0" }}>
              <h3>No events match your selected filters</h3>
              <p style={{ color: "var(--muted)", margin: "8px 0 20px" }}>
                Try searching for different terms or reset your active filters.
              </p>
              <button type="button" className="btn btn--secondary" onClick={handleClearFilters}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((ev, idx) => (
                <Reveal as="article" className="event-card" key={ev.id} delay={idx * 60}>
                  <div
                    className="event-card__media"
                    onClick={() => setSelectedEvent(ev)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedEvent(ev)}
                    aria-label={`View details for ${ev.title}`}
                  >
                    <img src={ev.images[0]} alt={ev.title} loading="lazy" />
                    <div className="event-card__badge-row">
                      <span className={`event-card__type event-card__type--${ev.tone}`}>
                        {ev.kind}
                      </span>
                      <span className="chip" style={{ background: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                        {ev.year}
                      </span>
                    </div>
                  </div>

                  <div className="event-card__body">
                    <div className="event-card__meta">
                      <span className="event-card__date">📅 {ev.date}</span>
                      <span>📍 {ev.location}</span>
                    </div>

                    <h3>{ev.title}</h3>
                    <p className="event-card__text">{ev.summary}</p>

                    <div className="event-card__tags">
                      {ev.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="event-card__footer">
                      <button
                        type="button"
                        className="btn btn--secondary btn--sm"
                        onClick={() => setSelectedEvent(ev)}
                      >
                        View Full Details ↗
                      </button>

                      <button
                        type="button"
                        style={{ background: "none", border: 0, color: "var(--brand-green)", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
                        onClick={() => openGallery(ev.images, 0, ev.title)}
                      >
                        📷 View Photos ({ev.images.length})
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Event Detail Modal */}
      {selectedEvent && (
        <div
          className="event-modal-overlay"
          onClick={() => setSelectedEvent(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal__header">
              <img src={selectedEvent.images[0]} alt={selectedEvent.title} />
              <button
                type="button"
                className="event-modal__close"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="event-modal__content">
              <span className={`chip chip--${selectedEvent.tone}`} style={{ marginBottom: "12px" }}>
                {selectedEvent.kind} · {selectedEvent.year}
              </span>
              <h2>{selectedEvent.title}</h2>

              <div className="event-modal__meta-row">
                <span>📅 <strong>Date:</strong> {selectedEvent.date}</span>
                <span>📍 <strong>Venue:</strong> {selectedEvent.location}</span>
                <span>🏷️ <strong>Category:</strong> {selectedEvent.type}</span>
              </div>

              <div className="event-modal__desc">
                {selectedEvent.description}
              </div>

              {selectedEvent.highlight && (
                <div className="event-modal__highlight-box">
                  <h4>🌟 {selectedEvent.highlight.title}</h4>
                  <p>{selectedEvent.highlight.text}</p>
                </div>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
                {selectedEvent.tags.map((t) => (
                  <span key={t} className="chip">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="event-modal__links">
                {selectedEvent.links &&
                  selectedEvent.links.map((link) =>
                    link.to ? (
                      <Link key={link.label} to={link.to} className="btn btn--primary">
                        {link.label} →
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                      >
                        {link.label} ↗
                      </a>
                    )
                  )}
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => openGallery(selectedEvent.images, 0, selectedEvent.title)}
                >
                  Open Photo Lightbox
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Lightbox View */}
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
