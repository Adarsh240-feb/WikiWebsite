import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import "./About.css";
import banner from "../Images/wiki/banner.png";
import groupPhoto from "../Images/wiki/group-wiki.jpg";
import sessionAudience from "../Images/wiki/audience-gdg.jpg";
import wikiLogo from "../Images/wiki/logo.png";

const missionPoints = [
  "Advocate for the vision of free knowledge within academic and student communities across the Uttar Pradesh region.",
  "Equip students with both technical engineering and content creation skills for contributing to Wikimedia projects.",
  "Host practical workshops, hackathons, and cohort mentoring sessions that guide real upstream contributions.",
  "Build lasting connections between student developers and the international Wikimedia and open-source movements.",
];

const story = [
  {
    year: "2024",
    title: "Chapter Founded at UIT, Prayagraj",
    text: "Hridyesh Gupta establishes WikiClub Tech – United Institute of Technology to connect student learning with the global open-source movement.",
  },
  {
    year: "Sep 2024",
    title: "Road to Wiki · Cohort 1",
    text: "Four members are selected from 260+ applicants across 7+ institutions for intensive MediaWiki engineering and graduation in Gurgaon.",
  },
  {
    year: "Sep–Nov 2025",
    title: "Foundational Campus Clinics",
    text: "Hands-on workshops introduce Wikipedia, Wikimedia Commons, Gerrit, Phabricator, Hacktoberfest, and Flutter to UIT students.",
  },
  {
    year: "Jan 2026",
    title: "Wikipedia 25th Birthday Celebration",
    text: "The chapter hosts a campus-wide celebration of 25 years of free human knowledge with the wider UGI academic community.",
  },
  {
    year: "2026",
    title: "National Hackathons & Scholarships",
    text: "Members earn Wiki Conference India scholarships, organizer appointments, Indic Wiki Hackathon selections, and Outreachy/OKI internships.",
  },
  {
    year: "2026–27",
    title: "Active Leadership Roster",
    text: "Chapter Envoy & Technical Lead Gautam Kumar Maurya coordinates ongoing technical tracks and student development clinics.",
  },
];

const initiatives = [
  {
    title: "Road to Wiki",
    tone: "Flagship",
    text: "A 2–3 month cohort-based mentorship guiding selected students into Wikimedia open-source projects with verified certificates, internships and mentorship.",
  },
  {
    title: "Wiki × GDG On Campus Collaboration",
    tone: "Partnership",
    text: "Dedicated workshops and resources with Google Developer Groups, preparing students for Google Summer of Code (GSoC) and other open-source programmes.",
  },
  {
    title: "Empowering Women in Tech",
    tone: "Community",
    text: "Technical webinars and mentorship programmes that promote women's participation and leadership in technology and open-source contribution.",
  },
  {
    title: "Open Source Tools Sessions",
    tone: "Workshop",
    text: "Practical clinics on Git, Gerrit and Phabricator that streamline real upstream contribution workflows and build confidence.",
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* 1. Cinematic Deep Green Hero */}
      <section className="about-page-hero">
        <div className="wrap about-page-hero__inner">
          <div className="about-page-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              ABOUT WIKICLUB TECH · UIT
            </span>
            <h1>Technology for a More Open World.</h1>
            <p className="about-page-hero__lede">
              WikiClub Tech – United Institute of Technology is a student-led Wikimedia affiliate
              group based in Prayagraj, India, promoting open knowledge, open-source technologies,
              and collaborative engineering across the Uttar Pradesh region.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>2024</strong>
              <span>Founded at UIT, Prayagraj</span>
            </div>
            <div className="page-hero__stat">
              <strong>UP Hub</strong>
              <span>Regional Student Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="section">
        <div className="wrap">
          <div className="about-lead">
            <Reveal className="about-lead__text" variant="left">
              <p className="eyebrow eyebrow--green">COMMUNITY IDENTITY</p>
              <h2 className="section-title section-title--bar">
                Bridging Campus Learning and Global Open Knowledge.
              </h2>
              <p className="section-lede">
                The chapter serves as a regional technological and knowledge hub for students of Uttar Pradesh.
                Founded by Hridyesh Gupta and mentored by Sarthak Singh, it provides a comprehensive environment
                where students collaborate effectively and contribute directly to open knowledge.
              </p>
              <p className="about-lead__body">
                Guided by the Wikimedia movement's core values, members learn how Wikipedia, Wikidata,
                Wikimedia Commons, and MediaWiki operate under the hood — and then contribute back upstream:
                researching articles, releasing educational media, fixing bugs, and submitting patches via Gerrit.
              </p>
              <div className="btn-row" style={{ marginTop: 26 }}>
                <Link to="/Team" className="btn btn--primary">
                  Meet the Team <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://meta.wikimedia.org/wiki/WikiClub_Tech/WikiClub_Tech_UIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                >
                  Meta-Wiki Community Page ↗
                </a>
              </div>
            </Reveal>

            <Reveal className="about-lead__media" variant="right" delay={100}>
              <figure className="figure-frame media-zoom">
                <img src={groupPhoto} alt="WikiClub Tech UIT community members together" loading="lazy" />
              </figure>
              <div className="about-badge">
                <img src={wikiLogo} alt="" aria-hidden="true" />
                <div>
                  <strong>Wikimedia Affiliate</strong>
                  <span>WikiClub Tech · UIT</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal as="figure" className="about-banner media-zoom" variant="zoom" delay={80}>
            <img src={banner} alt="WikiClub Tech official community banner" loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* 3. Four Core Mission Points */}
      <section className="section section--alt">
        <div className="wrap">
          <Reveal className="section-head section-head--center" variant="up">
            <p className="eyebrow eyebrow--green">OUR MISSION</p>
            <h2 className="section-title">What We Stand For.</h2>
            <p className="section-lede">
              The four foundational pillars guiding our student programs and outreach.
            </p>
          </Reveal>

          <div className="mission-grid">
            {missionPoints.map((point, index) => (
              <Reveal as="article" className="mission-card" key={point} delay={index * 70}>
                <span className="mission-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{point}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Timeline: Our Story */}
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow eyebrow--red">OUR STORY</p>
            <h2 className="section-title">From a First Edit to National Impact.</h2>
            <p className="section-lede">
              The chapter grew from an ambitious campus initiative into a recognized community with
              national hackathon participants, conference scholarships, and international fellows.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link to="/Achievements" className="btn btn--secondary">
                Explore Achievements <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="split__media">
            <figure className="figure-frame figure-frame--tilt">
              <img src={sessionAudience} alt="Students attending an open-source event at UIT" loading="lazy" />
            </figure>
          </div>
        </div>

        <div className="wrap" style={{ marginTop: "clamp(36px, 5vw, 60px)" }}>
          <ol className="timeline">
            {story.map((item, index) => (
              <Reveal as="li" className="timeline__item" key={item.title} delay={index * 60}>
                <p className="timeline__year">{item.year}</p>
                <div className="timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Documented Initiatives */}
      <section className="section section--alt">
        <div className="wrap">
          <Reveal className="section-head section-head--split" variant="up">
            <div>
              <p className="eyebrow eyebrow--green">CAMPUS PROGRAMMES</p>
              <h2 className="section-title">Our Initiatives.</h2>
            </div>
            <span className="chip chip--green">Open to all UIT students</span>
          </Reveal>

          <div className="initiative-list">
            {initiatives.map((item, index) => (
              <Reveal as="article" className="initiative-row" key={item.title} delay={index * 70}>
                <span className="initiative-row__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="initiative-row__body">
                  <div className="initiative-row__top">
                    <h3>{item.title}</h3>
                    <span className={`chip ${item.tone === "Flagship" ? "chip--green" : "chip--blue"}`}>
                      {item.tone}
                    </span>
                  </div>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Deep Green Contribution Callout */}
      <section className="section">
        <div className="wrap">
          <Reveal
            className="home-cta"
            variant="zoom"
            style={{ "--band-photo": `url("${sessionAudience}")` }}
          >
            <div className="home-cta__copy">
              <p className="eyebrow eyebrow--light">CONNECT WITH US</p>
              <h2>United Institute of Technology, Prayagraj.</h2>
              <p>
                Naini, Prayagraj, Uttar Pradesh — we meet on campus and collaborate online.
                Explore our guided contribution pathways or reach out to co-host an event.
              </p>
            </div>
            <div className="btn-row home-cta__actions">
              <Link to="/get-involved" className="btn btn--light btn--lg">
                Start Contributing <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/Question" className="btn btn--outline-light btn--lg">
                Contact &amp; FAQ
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
