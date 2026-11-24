import { useState, useMemo } from "react";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import "./Achievements.css";

import GroupWiki from "../Images/wiki/group-wiki.jpg";
import achievement1 from "../Images/achievements/achievement1/achievement1.png";
import achievement1_2 from "../Images/achievements/achievement1/achievement1 - 2.jpeg";
import achievement1_3 from "../Images/achievements/achievement1/achievement1 - 3.jpeg";
import achievement2 from "../Images/achievements/achievement2/achievement2.jpeg";
import Gautam from "../Images/wiki/gautam.jpg";
import Rtw2Collage from "../Images/meta/rtw2-collage.jpg";
import IndicCollage from "../Images/meta/indic-collage.jpg";
import WciCollage from "../Images/meta/wci-collage.jpg";
import Rtw1Collage from "../Images/meta/rtw1-collage.jpg";

const achievements = [
  {
    id: 1,
    category: "Road to Wiki Cohort",
    title: "Road to Wiki Program — Cohort 2 Completion",
    subtitle: "WikiClub Tech [IN] × Wikimedia Foundation · 2026",
    tone: "green",
    description:
      "Building on the inaugural edition, Cohort 2 guided student contributors through production MediaWiki core engineering, Gerrit peer review workflows and Wikimedia Commons tool development.",
    highlights: [
      "Expanded campus participation across software development and technical documentation",
      "Hands-on peer mentoring led by previous cohort alumni and technical leads",
      "Production patches and tooling deployed for regional Wikimedia initiatives",
    ],
    images: [Rtw2Collage, GroupWiki],
    tags: ["Wikimedia Foundation", "MediaWiki", "Gerrit", "Cohort Program"],
    year: "2026",
    proofUrl: "https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Achievements",
  },
  {
    id: 2,
    category: "International Mentorship",
    title: "EduWiki Hub Mentorship Program — Cohort 2 Selection",
    subtitle: "Wikipedia & Education User Group · Global Fellowship",
    tone: "blue",
    description:
      "Chapter Envoy Gautam Kumar Maurya from United Institute of Technology (UIT), Prayagraj, was selected as an official Mentee in Cohort 2 of the international EduWiki Hub Mentorship Program, organised under the Wikipedia & Education User Group.",
    highlights: [
      "Gautam Kumar Maurya featured in the official EduWiki Hub international mentee roster",
      "Representing WikiClub Tech UIT and Uttar Pradesh on an international educational platform",
      "Collaborating with global mentors on open knowledge integration in higher education",
      "Officially felicitated and celebrated by UIT Prayagraj leadership",
    ],
    images: [Gautam],
    tags: ["EduWiki Hub", "Mentorship", "Wikipedia & Education", "Global"],
    year: "2026",
    proofUrl: "https://meta.wikimedia.org/wiki/Wikipedia_%26_Education_User_Group/EduWiki_Hub/Mentorship_program/Cohort_2",
  },
  {
    id: 3,
    category: "National Hackathons",
    title: "Indic Wiki Hackathon — Selected & Participated",
    subtitle: "National Wikimedia open-source hackathon",
    tone: "green",
    description:
      "Reeti Singh from WikiClub Tech UIT was selected for the Indic Wiki Hackathon, working on open-source tools, MediaWiki extensions and localised knowledge preservation to empower Indian-language Wikimedia projects.",
    highlights: [
      "Selected among top open-source contributors across India",
      "Engineered automation scripts and MediaWiki tools for Indic languages",
      "Direct collaboration and code review with veteran Wikimedia developers",
    ],
    images: [IndicCollage, achievement1, achievement1_2, achievement1_3],
    tags: ["Indic Wiki", "Hackathon", "MediaWiki", "Open Source"],
    year: "2026",
    proofUrl: "https://meta.wikimedia.org/wiki/Indic_Wiki_Hackathon",
  },
  {
    id: 4,
    category: "National Conferences",
    title: "Wiki Conference India — Scholarships & Organiser Roles",
    subtitle: "National Wikimedia conference (WCI)",
    tone: "red",
    description:
      "A major milestone for the chapter: Reeti Singh and Sarthak Singh received full competitive scholarships, while Adarsh Kesharwani and Shivaansh Singh were selected as official conference organisers.",
    highlights: [
      "Full scholarships awarded: Reeti Singh & Sarthak Singh",
      "Official event organisers: Adarsh Kesharwani & Shivaansh Singh",
      "Represented WikiClub Tech UIT on a premier national forum",
    ],
    images: [WciCollage, achievement2],
    tags: ["WCI", "Scholarship", "Organisers", "National Event"],
    year: "2026",
    proofUrl: "https://meta.wikimedia.org/wiki/WikiConference_India_2023",
  },
  {
    id: 5,
    category: "Paid Internships",
    title: "Outreachy & OKI Internship Selections",
    subtitle: "Funded open knowledge & software engineering internships",
    tone: "blue",
    description:
      "Student contributors from WikiClub Tech UIT successfully qualified for prestigious paid internship programs with Outreachy and Open Knowledge India, earning international recognition and stipends for open-source contributions.",
    highlights: [
      "Qualified for competitive global open-source internships",
      "Worked on core Wikimedia software, documentation, and tooling",
      "Verified proof of impact and institutional certificates",
    ],
    images: [Rtw1Collage, GroupWiki],
    tags: ["Outreachy", "OKI", "Internships", "Paid"],
    year: "2025",
    proofUrl: "https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Achievements",
  },
];

const categories = [
  "All",
  "Road to Wiki Cohort",
  "International Mentorship",
  "National Hackathons",
  "National Conferences",
  "Paid Internships",
];

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(1);
  const [gallery, setGallery] = useState(null);

  const filteredAchievements = useMemo(() => {
    if (activeCategory === "All") return achievements;
    return achievements.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const openGallery = (images, index, title) => {
    if (images && images.length > 0) setGallery({ images, index, title });
  };

  return (
    <div className="achievements-page">
      {/* 1. Cinematic Deep Green Hero */}
      <section className="ach-hero">
        <div className="wrap ach-hero__inner">
          <div className="ach-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              VERIFIED IMPACT & OUTCOMES
            </span>
            <h1>Progress Worth Sharing.</h1>
            <p className="ach-hero__lede">
              Verified outcomes, national conference scholarships, hackathon victories,
              and open-source cohort milestones achieved by the students of WikiClub Tech – UIT, Prayagraj.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>{achievements.length}</strong>
              <span>Verified Milestones</span>
            </div>
            <div className="page-hero__stat">
              <strong>100%</strong>
              <span>Backed by Evidence</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main List & Category Filters */}
      <section className="section">
        <div className="wrap">
          {/* Category Filters */}
          <div className="ach-filters" role="group" aria-label="Filter achievements by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn${activeCategory === cat ? " is-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Achievements Accordion List */}
          <div className="ach-list">
            {filteredAchievements.map((item, idx) => {
              const isOpen = expandedId === item.id;
              return (
                <Reveal as="div" className={`ach-card${isOpen ? " is-open" : ""}`} key={item.id} delay={idx * 50}>
                  <button
                    type="button"
                    className="ach-card__header"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isOpen}
                  >
                    <span className={`ach-card__badge ach-card__badge--${item.tone}`}>
                      {item.category}
                    </span>

                    <div className="ach-card__heading">
                      <h2>{item.title}</h2>
                      <span>{item.subtitle}</span>
                    </div>

                    <span className="ach-card__year">{item.year}</span>

                    <span className="ach-card__toggle-icon" aria-hidden="true">
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className="ach-card__body">
                      <p className="ach-card__desc">{item.description}</p>

                      <ul className="ach-card__highlights">
                        {item.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "14px 0" }}>
                        {item.tags.map((t) => (
                          <span key={t} className="chip">
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Photo / Proof Thumbnails */}
                      {item.images && item.images.length > 0 && (
                        <div>
                          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>
                            Verified Documentation & Collages:
                          </span>
                          <div className="ach-card__thumbnails">
                            {item.images.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                type="button"
                                className="ach-card__thumb"
                                onClick={() => openGallery(item.images, imgIdx, item.title)}
                                aria-label={`View documentation image ${imgIdx + 1}`}
                              >
                                <img src={img} alt="" loading="lazy" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ marginTop: "22px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {item.proofUrl && (
                          <a
                            href={item.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary btn--sm"
                          >
                            View Source on Meta-Wiki ↗
                          </a>
                        )}
                        <button
                          type="button"
                          className="btn btn--secondary btn--sm"
                          onClick={() => openGallery(item.images, 0, item.title)}
                        >
                          Enlarge Documentation ({item.images.length})
                        </button>
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox for Proof & Collages */}
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
