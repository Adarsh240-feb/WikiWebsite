import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal, { CountUp } from "./Reveal";
import "./HomePage.css";

import heroEco from "../Images/wiki/session-eco.jpg";
import heroAudience from "../Images/wiki/audience-gdg.jpg";
import heroCore from "../Images/wiki/session-core.jpg";
import galleryOss from "../Images/wiki/oss-day.jpg";
import galleryWp25 from "../Images/wiki/wp25.jpg";
import galleryQuiz from "../Images/wiki/session-quiz.jpg";
import galleryGerrit from "../Images/wiki/session-gerrit.jpg";
import hackFinale from "../Images/meta/hack3.png";
import hackSprint from "../Images/meta/hack2.png";
import hackOpening from "../Images/meta/hack1.png";
import founder from "../Images/Hridyesh.jpg";
import mentor from "../Images/Sarthak1.jpg";
import envoy from "../Images/wiki/gautam.jpg";
import officialEmblem from "../Images/wiki/logo.png";

const stats = [
  { value: "2024", label: "Chapter founded at UIT, Prayagraj", tone: "red" },
  { value: "10", label: "Events & workshops archived", tone: "green" },
  { value: "9+", label: "Verified cohort contributors", tone: "blue" },
  { value: "260+", label: "Applicants reached by Road to Wiki", tone: "tricolor" },
];

const pillars = [
  {
    num: "01",
    tag: "COMMUNITY",
    title: "Fostering Community",
    text: "A vibrant, student-led collective dedicated to global knowledge sharing, mutual learning, and open academic collaboration.",
    tone: "blue",
    icon: <i className="fa-solid fa-users" aria-hidden="true" />,
  },
  {
    num: "02",
    tag: "UPSTREAM CODE",
    title: "Technical Contribution",
    text: "Contributing upstream code to MediaWiki and Wikimedia libraries via Gerrit code reviews and Phabricator sprint workflows.",
    tone: "green",
    icon: <i className="fa-solid fa-code" aria-hidden="true" />,
  },
  {
    num: "03",
    tag: "FREE KNOWLEDGE",
    title: "Knowledge Outreach",
    text: "Promoting public participation in Wikipedia, Wikidata, Wikimedia Commons, and exploring ethical AI within Wikimedia.",
    tone: "red",
    icon: <i className="fa-solid fa-earth-americas" aria-hidden="true" />,
  },
  {
    num: "04",
    tag: "MENTORSHIP",
    title: "Skill Development",
    text: "Hands-on workshops, Git clinics, and cohort mentorship sessions that turn curious students into confident open-source contributors.",
    tone: "deep",
    icon: <i className="fa-solid fa-graduation-cap" aria-hidden="true" />,
  },
];

const initiatives = [
  {
    tone: "blue",
    title: "Wiki × GDG On Campus Collaboration",
    text: "Dedicated workshops and open-source clinics in partnership with Google Developer Groups to prepare students for GSoC and national programs.",
  },
  {
    tone: "red",
    title: "Empowering Women in Tech",
    text: "Technical webinars and mentorship tracks promoting women's participation and leadership in open-source software and Wikimedia spaces.",
  },
  {
    tone: "green",
    title: "Open Source Tools Sessions",
    text: "Hands-on clinics on Git, Gerrit, Phabricator, and command-line tools that streamline real developer contribution workflows.",
  },
];

const featuredEvents = [
  {
    title: "Hacktoberfest Hack Day 3.0",
    date: "18 Oct 2026",
    type: "Grand Finale",
    tone: "red",
    image: hackFinale,
    text: "Teams competed across open-source tracks with jury evaluations, technical showcases, and winner ceremonies.",
  },
  {
    title: "Hacktoberfest Hack Day 2.0",
    date: "17 Oct 2026",
    type: "Code Sprint",
    tone: "blue",
    image: hackSprint,
    text: "A full-day build sprint featuring Git workflows and live jury evaluations by Kushagra Dwivedi.",
  },
  {
    title: "Hacktoberfest Hack Day 1.0",
    date: "16 Oct 2026",
    type: "Opening Keynote",
    tone: "green",
    image: hackOpening,
    text: "The flagship Hacktoberfest series opened with keynotes on Wikimedia, Commons licensing, and contribution roadmaps.",
  },
];

const photoMoments = [
  {
    title: "Community Power",
    desc: "Audience participation during the WikiClub Tech × GDG On Campus UIT session in Prayagraj.",
    image: heroAudience,
    tag: "Featured Moment",
    tone: "green",
  },
  {
    title: "Wikipedia 25 Celebration",
    desc: "A quarter-century celebration of free knowledge held at United Institute of Technology, Prayagraj.",
    image: galleryWp25,
    tag: "Milestone",
    tone: "red",
  },
  {
    title: "Ecosystem Outreach",
    desc: "Introducing students to Wikimedia content projects and open-source contribution mechanisms.",
    image: heroEco,
    tag: "Workshop",
    tone: "blue",
  },
  {
    title: "Gerrit & Phabricator Clinic",
    desc: "Hands-on workflow guidance for Git commits, Change-Id, and patch submission.",
    image: galleryGerrit,
    tag: "Technical Session",
    tone: "deep",
  },
];

const leadership = [
  {
    name: "Hridyesh Gupta",
    role: "Founder",
    tone: "red",
    text: "Established WikiClub Tech UIT to build open-source and Wikimedia mentorship pipelines.",
    image: founder,
  },
  {
    name: "Sarthak Singh",
    role: "Mentor",
    tone: "blue",
    text: "Guiding contributors on upstream contribution standards, Gerrit reviews, and open-source best practice.",
    image: mentor,
  },
  {
    name: "Gautam Kumar Maurya",
    role: "Chapter Envoy (2026–27)",
    tone: "green",
    metaLink: "https://meta.wikimedia.org/wiki/User:Gkm563",
    text: "Leading the student chapter, coordinating events, and driving technical outreach across campus.",
    image: envoy,
  },
];

export default function HomePage() {
  const [globeHovered, setGlobeHovered] = useState(false);

  return (
    <div className="home-container">
      {/* 0. Signature Wikimedia Tricolor Ribbon */}
      <div className="tricolor-ribbon" aria-hidden="true" />

      {/* 1. Cinematic Split Hero */}
      <section className="home-hero">
        <div className="home-hero__bg-mesh" aria-hidden="true" />
        <div className="wrap home-hero__grid">
          {/* Left Column: 55-60% */}
          <div className="home-hero__copy">
            <div className="home-hero__eyebrow-badge hero-anim" style={{ "--hero-delay": "50ms" }}>
              <span className="tricolor-dots" aria-hidden="true">
                <span className="dot dot--red" />
                <span className="dot dot--green" />
                <span className="dot dot--blue" />
              </span>
              <span>WIKICLUB TECH · UNITED INSTITUTE OF TECHNOLOGY</span>
            </div>

            <h1 className="home-hero__title" aria-label="Open Knowledge. Open Possibilities.">
              <span className="hero-line">Open Knowledge.</span>
              <span className="hero-line">
                Open <span className="accent-tricolor">Possibilities.</span>
              </span>
            </h1>

            <p className="home-hero__lede hero-anim" style={{ "--hero-delay": "180ms" }}>
              WikiClub Tech – United Institute of Technology connects students with the global
              Wikimedia movement, open-source development, and collaborative learning.
              From your very first Wikipedia citation to merged patches on Gerrit.
            </p>

            <div className="btn-row home-hero__actions hero-anim" style={{ "--hero-delay": "280ms" }}>
              <Link to="/OurEvents" className="btn btn--primary btn--lg">
                Explore Our Events <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/get-involved" className="btn btn-hero-white btn--lg">
                <span className="btn-dot-red" aria-hidden="true" /> Start Contributing
              </Link>
            </div>

            <div className="home-hero__meta-strip hero-anim" style={{ "--hero-delay": "360ms" }}>
              <div className="home-hero__location">
                <span className="geo-icon">📍</span>
                <span>United Institute of Technology · Prayagraj</span>
              </div>
              <span className="geo-coords">25.4358° N, 81.8463° E</span>
            </div>
          </div>

          {/* Right Column: 40-45% - Authentic Community Showcase Card (About Page Design Style) */}
          <div className="home-hero__showcase-zone">
            <div className="hero-showcase-card">
              <div className="tricolor-hairline" aria-hidden="true" />
              <div className="hero-showcase-card__media media-zoom">
                <img
                  src={heroAudience}
                  alt="WikiClub Tech UIT community session in Prayagraj"
                  loading="eager"
                />
                <div className="hero-showcase-badge">
                  <img src={officialEmblem} alt="WikiClub Tech UIT emblem" />
                  <div>
                    <strong>Wikimedia Affiliate</strong>
                    <span>United Institute of Technology</span>
                  </div>
                </div>
              </div>

              <div className="hero-showcase-card__body">
                <div className="hero-showcase-card__tag-row">
                  <span className="chip chip--green">Campus Chapter</span>
                  <span className="chip chip--blue">Prayagraj, UP</span>
                  <span className="chip chip--red">Free Knowledge</span>
                </div>
                <h3>Building the Open Knowledge Pipeline</h3>
                <p>
                  Connecting student developers and editors directly with upstream MediaWiki core,
                  Wikimedia Commons, and collaborative regional hackathons.
                </p>
                <div className="hero-showcase-stats">
                  <div className="hero-showcase-stat stat--green">
                    <strong>15+</strong>
                    <span>Tech Clinics</span>
                  </div>
                  <div className="hero-showcase-stat stat--blue">
                    <strong>30+</strong>
                    <span>Merged Patches</span>
                  </div>
                  <div className="hero-showcase-stat stat--red">
                    <strong>260+</strong>
                    <span>Students Mentored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Verified Metrics Banner */}
      <section className="home-stats" aria-label="Club at a glance">
        <div className="wrap">
          <Reveal className="stat-grid" variant="up">
            {stats.map((stat) => (
              <div className={`stat stat--${stat.tone}`} key={stat.label}>
                <span className="stat__value">
                  <CountUp value={stat.value} />
                </span>
                <p className="stat__label">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 3. Section A — Community Mission Editorial Statement */}
      <section className="section">
        <div className="wrap split">
          <Reveal className="split__media" variant="left">
            <figure className="figure-frame media-zoom">
              <img
                src={galleryWp25}
                alt="WikiClub Tech UIT students celebrating Wikipedia's 25th birthday"
                loading="lazy"
              />
            </figure>
            <blockquote className="mission-note">
              “Advocating the vision of free knowledge within academic and student communities.”
            </blockquote>
          </Reveal>

          <Reveal variant="right" delay={90}>
            <p className="eyebrow eyebrow--green">WHO WE ARE</p>
            <h2 className="section-title section-title--bar">A Campus Hub for Open Knowledge in Motion.</h2>
            <p className="section-lede">
              Founded by Hridyesh Gupta at United Institute of Technology, Prayagraj, WikiClub Tech
              empowers students to collaborate with the international Wikimedia movement. We provide the
              technical workshops, open-source clinics, and mentorship needed to create verified contributors.
            </p>
            <ul className="check-list">
              <li><strong>Fostering Community:</strong> Fostering global knowledge sharing and open collaboration.</li>
              <li><strong>Technical Upstream Code:</strong> Hands-on Git, Gerrit, and Phabricator contribution workflows.</li>
              <li><strong>Knowledge Outreach:</strong> Engaging with Wikipedia, Wikidata, Commons, and Wikimedia AI initiatives.</li>
              <li><strong>Skill Development:</strong> Structured clinics and cohort-based mentorship.</li>
            </ul>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link to="/About" className="btn btn--primary">
                About Our Chapter <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <a
                href="https://meta.wikimedia.org/wiki/WikiClub_Tech/WikiClub_Tech_UIT"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                Meta-Wiki Documentation ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Section B — What We Do: Four Core Pillars */}
      <section className="section section--alt">
        <div className="wrap">
          <Reveal className="section-head section-head--center" variant="up">
            <p className="eyebrow eyebrow--green">FOUR ACTIVITY PILLARS</p>
            <h2 className="section-title section-title--bar">What We Do.</h2>
            <p className="section-lede">
              From an undergraduate's first verified Wikipedia citation to reviewed code on Gerrit,
              we guide each step of the student journey.
            </p>
          </Reveal>

          <div className="feature-grid">
            {pillars.map((pillar, index) => (
              <Reveal
                as="article"
                className={`feature-card feature-card--${pillar.tone}`}
                key={pillar.title}
                delay={index * 80}
              >
                <div className="feature-card__top">
                  <span className="icon-chip">{pillar.icon}</span>
                  <span className={`pillar-tag pillar-tag--${pillar.tone}`}>{pillar.num} · {pillar.tag}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section C — Verified Initiatives Asymmetric Grid */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head section-head--split" variant="up">
            <div>
              <p className="eyebrow eyebrow--green">CAMPUS PROGRAMMES</p>
              <h2 className="section-title section-title--bar">Key Initiatives.</h2>
            </div>
            <a
              href="https://meta.wikimedia.org/wiki/WikiClub_Tech/WikiClub_Tech_UIT#Initiatives"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--sm"
            >
              Meta-Wiki Source ↗
            </a>
          </Reveal>

          <div className="initiative-grid">
            {/* Flagship: Road to Wiki */}
            <Reveal as="article" className="initiative initiative--flagship" variant="zoom">
              <div className="tricolor-hairline" aria-hidden="true" />
              <div>
                <span className="chip chip--green">Flagship Programme</span>
                <h3>Road to Wiki</h3>
                <p>
                  A 2–3 month cohort-based mentorship guiding selected students to contribute
                  directly to Wikimedia open-source projects, gain verified certificates, and access
                  internship pathways.
                </p>
                <ul className="check-list">
                  <li>2–3 months of structured technical mentorship</li>
                  <li>Verified certificates and recognition</li>
                  <li>Direct contribution to MediaWiki and Wikimedia libraries</li>
                </ul>
              </div>
              <div className="flagship-stats">
                <div className="flagship-stat stat--blue">
                  <strong>2–3</strong>
                  <span>Months duration</span>
                </div>
                <div className="flagship-stat stat--red">
                  <strong>260+</strong>
                  <span>Applicants reached</span>
                </div>
                <div className="flagship-stat stat--green">
                  <strong>Cohort 2</strong>
                  <span>Completed</span>
                </div>
              </div>
            </Reveal>

            {initiatives.map((item, index) => (
              <Reveal
                as="article"
                className={`initiative initiative--${item.tone}`}
                key={item.title}
                delay={100 + index * 80}
              >
                <span className={`initiative__num initiative__num--${item.tone}`} aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section D — Featured Event Spotlight */}
      <section className="section section--alt">
        <div className="wrap">
          <Reveal className="section-head section-head--split" variant="up">
            <div>
              <p className="eyebrow eyebrow--red">EVENT DOCUMENTATION</p>
              <h2 className="section-title section-title--bar">Featured Hackathons & Sessions.</h2>
            </div>
            <Link to="/OurEvents" className="btn btn--secondary btn--sm">
              All Archived Events <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="event-mini-grid">
            {featuredEvents.map((event, index) => (
              <Reveal
                as={Link}
                to="/OurEvents"
                className={`event-mini event-mini--${event.tone}`}
                key={event.title}
                delay={index * 90}
              >
                <div className="event-mini__media media-zoom">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  <span className={`chip chip--solid event-mini__badge chip--${event.tone}`}>{event.type}</span>
                </div>
                <div className="event-mini__body">
                  <p className={`event-mini__date event-mini__date--${event.tone}`}>{event.date}</p>
                  <h3>{event.title}</h3>
                  <p className="event-mini__text">{event.text}</p>
                  <span className="event-mini__more">
                    View Documentation <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section F — Photo Story Preview */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head section-head--split" variant="up">
            <div>
              <p className="eyebrow eyebrow--green">COMMUNITY ARCHIVE</p>
              <h2 className="section-title section-title--bar">Moments That Moved Knowledge Forward.</h2>
            </div>
            <Link to="/Gallery" className="btn btn--secondary btn--sm">
              Open Complete Gallery <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="photo-moments-grid">
            {photoMoments.map((item, index) => (
              <Reveal as="article" className={`photo-moment-card photo-moment-card--${item.tone}`} key={item.title} delay={index * 80}>
                <div className="photo-moment-card__img media-zoom">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className={`photo-moment-card__tag photo-moment-card__tag--${item.tone}`}>{item.tag}</span>
                </div>
                <div className="photo-moment-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section G — Founder & Mentorship Preview */}
      <section className="section section--alt">
        <div className="wrap">
          <Reveal className="section-head section-head--split" variant="up">
            <div>
              <p className="eyebrow eyebrow--green">LEADERSHIP</p>
              <h2 className="section-title section-title--bar">The People Behind the Movement.</h2>
            </div>
            <Link to="/Team" className="btn btn--secondary btn--sm">
              Full Team Roster <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="people-grid">
            {leadership.map((person, index) => (
              <Reveal
                className={`person-mini person-mini--${person.tone}`}
                key={person.name}
                delay={index * 90}
                variant="up"
              >
                <div className="person-mini__img media-zoom">
                  <img src={person.image} alt={person.name} loading="lazy" />
                </div>
                <div>
                  <span className={`chip chip--${person.tone}`} style={{ marginBottom: "8px" }}>{person.role}</span>
                  <h3>
                    {person.metaLink ? (
                      <a
                        href={person.metaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="member-name-link"
                        title={`${person.name}'s Meta-Wiki user page`}
                      >
                        {person.name} <span className="meta-arrow" aria-hidden="true" style={{ fontSize: "0.8em", color: "var(--brand-green)" }}>↗</span>
                      </a>
                    ) : (
                      person.name
                    )}
                  </h3>
                  <p>{person.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Section H — Full-Bleed Deep Green Contribution CTA */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <Reveal
            className="home-cta"
            variant="zoom"
            style={{ "--band-photo": `url("${heroAudience}")` }}
          >
            <div className="tricolor-hairline" aria-hidden="true" />
            <div className="home-cta__copy">
              <p className="eyebrow eyebrow--light">START YOUR JOURNEY</p>
              <h2>Ready to contribute to open knowledge?</h2>
              <p>
                Whether you write, photograph, research, or code — explore our guided
                onboarding learning hub to discover the exact Wikimedia path for your skills.
              </p>
            </div>
            <div className="btn-row home-cta__actions">
              <Link to="/get-involved" className="btn btn--light btn--lg">
                Explore How to Contribute <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <a
                href="https://meta.wikimedia.org/wiki/WikiClub_Tech/WikiClub_Tech_UIT"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-light btn--lg"
              >
                Meta-Wiki Community Page ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
