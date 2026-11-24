import { Link } from "react-router-dom";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import "./Team.css";

import Hridyesh from "../Images/Hridyesh.jpg";
import Sarthak1 from "../Images/Sarthak1.jpg";
import GroupWiki from "../Images/wiki/group-wiki.jpg";
import AmitSir from "../Images/wiki/amit.jpg";
import Reeti from "../Images/wiki/reeti.jpg";
import Shivaansh from "../Images/Shivaansh.png";
import Adarsh from "../Images/Adarsh.jpg";
import Arpita from "../Images/Arpita.jpg";
import Manvi from "../Images/Manvi.jpg";
import gautam from "../Images/wiki/gautam.jpg";
import praveen from "../Images/wiki/praveen-web.jpg";
import rohit from "../Images/wiki/rohit.jpg";
import rahul from "../Images/wiki/rahul.jpg";

const iconMap = {
  meta: "fa-solid fa-globe",
  linkedin: "fa-brands fa-linkedin-in",
  github: "fa-brands fa-github",
  email: "fa-solid fa-envelope",
  phabricator: "fa-solid fa-bug",
  gerrit: "fa-solid fa-code-branch",
  gitlab: "fa-brands fa-gitlab",
  scholar: "fa-solid fa-graduation-cap",
};

const labelMap = {
  meta: "Meta-Wiki User Page",
  linkedin: "LinkedIn",
  github: "GitHub",
  email: "Email",
  phabricator: "Phabricator",
  gerrit: "Gerrit",
  gitlab: "GitLab",
  scholar: "Google Scholar",
};

const leaders = [
  {
    name: "Gautam Kumar Maurya",
    role: "Chapter Envoy & Technical Lead",
    image: gautam,
    metaLink: "https://meta.wikimedia.org/wiki/User:Gkm563",
    description:
      "Provides overall leadership and strategic direction to WikiClub Tech – UIT. Drives upstream MediaWiki core and CI contributions, coordinates technical workshops, and represents the community across national and international forums.",
    links: [
      { type: "meta", href: "https://meta.wikimedia.org/wiki/User:Gkm563" },
      { type: "email", href: "mailto:gkmwin563@gmail.com" },
      { type: "github", href: "https://github.com/gkm563" },
      { type: "linkedin", href: "https://www.linkedin.com/in/gkm563" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/p/Gkm563/" },
      { type: "gerrit", href: "https://gerrit.wikimedia.org/r/q/owner:13319" },
      { type: "gitlab", href: "https://gitlab.wikimedia.org/gkm563" },
    ],
  },
  {
    name: "Harsh Srivastava",
    role: "Chapter Co-Envoy",
    image: null,
    description:
      "Supports chapter leadership in internal operations, team coordination, logistics planning, and cross-functional execution of student development sprints and Wikimedia community meetups.",
    links: [
      { type: "email", href: "mailto:harshsrivastavaishere@gmail.com" },
      { type: "github", href: "https://github.com/WikiClubTechUIT" },
      { type: "linkedin", href: "https://www.linkedin.com/company/wikiclubtechuit" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/tag/wikiclub_tech_uit/" },
      { type: "gerrit", href: "https://gerrit.wikimedia.org" },
      { type: "gitlab", href: "https://gitlab.wikimedia.org" },
    ],
  },
];

const domainLeads = [
  {
    name: "Anchal Pandey",
    role: "Technical Lead",
    image: null,
    description:
      "Directs technical initiatives, supports code contributions to open projects, and oversees student developer bootcamps and hands-on clinics.",
    links: [
      { type: "email", href: "mailto:anchopandey9305@gmail.com" },
      { type: "github", href: "https://github.com/Anchal-Pandey1" },
      { type: "linkedin", href: "https://www.linkedin.com/in/anchal-pandey-25692b371/" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/p/Techancho/" },
    ],
  },
  {
    name: "Aradhaya Kesharwani",
    role: "Design Lead",
    image: null,
    description:
      "Leads the community's creative direction, visual branding, hackathon posters, digital banners, and participant certificate artwork.",
    links: [
      { type: "email", href: "mailto:aradhyakeshri2007@gmail.com" },
      { type: "github", href: "https://github.com/Aradhaya01" },
      { type: "linkedin", href: "https://www.linkedin.com/in/aradhaya-kesharwani-83b779371/" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/p/Aradhyarrrr" },
    ],
  },
  {
    name: "Aagman Pal",
    role: "Event Management Lead",
    image: null,
    description:
      "Coordinates event logistics, auditorium setups, attendee registrations, speaker hospitality, and inter-college collaboration pathways.",
    links: [
      { type: "email", href: "mailto:aagmanpal@gmail.com" },
      { type: "github", href: "https://github.com/aagmanpal" },
      { type: "linkedin", href: "https://www.linkedin.com/in/aagman-pal" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/p/aagmanpal/" },
    ],
  },
  {
    name: "Pranvi",
    role: "Social Media Lead",
    image: null,
    description:
      "Manages the chapter's digital channels, public announcements, social coverage, and student outreach engagement across social platforms.",
    links: [
      { type: "email", href: "mailto:pranvikumar006@gmail.com" },
      { type: "github", href: "https://github.com/WikiClubTechUIT" },
    ],  },
];

const volunteers = [
  {
    name: "Praveen Singh",
    role: "Volunteer Contributor",
    image: praveen,
    metaLink: "https://meta.wikimedia.org/wiki/User:Praveen5638",
    description:
      "Contributing to chapter sessions, technical support and Wikimedia knowledge activities.",
    links: [
      { type: "meta", href: "https://meta.wikimedia.org/wiki/User:Praveen5638" },
      { type: "email", href: "mailto:jdsvm.praveen.8757@gmail.com" },
      { type: "github", href: "https://github.com/praveen5638" },
      { type: "linkedin", href: "https://www.linkedin.com/in/praveen-singh-463231309" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/p/praveen5638" },
    ],
  },
  {
    name: "Rohit Pal",
    role: "Volunteer Contributor",
    image: rohit,
    metaLink: "https://meta.wikimedia.org/wiki/User:Rohitpal08",
    description:
      "Active community volunteer supporting open-source event sprints and peer development clinics.",
    links: [
      { type: "meta", href: "https://meta.wikimedia.org/wiki/User:Rohitpal08" },
      { type: "email", href: "https://meta.wikimedia.org/wiki/Special:EmailUser/Rohitpal08" },
      { type: "github", href: "https://github.com/rohitpal00015-prog" },
      { type: "linkedin", href: "https://linkedin.com/in/rohit-pal-98230131a" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/p/Rohitpal08/" },
    ],
  },
  {
    name: "Rahul Kushwaha",
    role: "Volunteer Contributor",
    image: rahul,
    metaLink: "https://meta.wikimedia.org/wiki/User:Rahulera",
    description:
      "Assisting with Wikimedia Commons media uploads, hackathon logistics and campus outreach.",
    links: [
      { type: "meta", href: "https://meta.wikimedia.org/wiki/User:Rahulera" },
      { type: "email", href: "mailto:r.a.kushwaha005@gmail.com" },
      { type: "github", href: "https://github.com/Rahulera" },
      { type: "phabricator", href: "https://phabricator.wikimedia.org/p/Rahulera/" },
    ],
  },
];

const heritage = [
  {
    name: "Dr. Amit Kumar Tiwari",
    role: "Faculty Advisor",
    image: AmitSir,
    description:
      "Head of the Computer Science & Engineering department at UIT, Prayagraj. With 16+ years of academic experience and a Ph.D. in Computer Science, he has supported the club's research culture and technical growth since its founding.",
    links: [
      { type: "linkedin", href: "https://www.linkedin.com/in/dr-amit-kumar-tiwari-518654113/" },
      { type: "scholar", href: "https://scholar.google.com/citations?hl=en&user=Wn3Ac80AAAAJ" },
    ],
  },
  {
    name: "Hridyesh Gupta",
    role: "Founder",
    image: Hridyesh,
    description:
      "Founded WikiClub Tech – UIT to bridge academic learning and the global open-source movement, creating technical mentorship pathways for students across the region.",
    links: [
      { type: "linkedin", href: "https://www.linkedin.com/in/hridyesh-gupta/" },
      { type: "github", href: "http://github.com/hridyesh-gupta" },
    ],
  },
  {
    name: "Sarthak Singh",
    role: "Mentor",
    image: Sarthak1,
    description:
      "A Flutter and Dart specialist with 20+ hackathons and research experience, guiding the core team and contributors on technical best practice and community organising.",
    links: [
      { type: "linkedin", href: "http://www.linkedin.com/in/sarthak-singh-/" },
      { type: "github", href: "https://github.com/SarthakSingh2003/" },
    ],
  },
];

const archive = [
  { name: "Reeti Singh", role: "Founding Envoy", image: Reeti },
  { name: "Shivaansh Singh", role: "Founding Co-Envoy", image: Shivaansh },
  { name: "Adarsh Kesharwani", role: "Technical Lead", image: Adarsh },
  { name: "Arpita Jain", role: "Management Lead", image: Arpita },
  { name: "Manvi Kesarwani", role: "Social Media Lead", image: Manvi },
];

const archiveVolunteers = [
  "Somya Yadav · Social Media",
  "Shiksha · Visual Design & Branding",
  "Neelima Srivastava · Event Coordination",
  "Suhani Shukla · Event Coordination",
  "Priyanshika Upadhyay · Event Coordination",
  "Arohi Singh · Report Writing & Technical Support",
];

const avatarPalette = [
  ["#006699", "#003a56"],
  ["#339966", "#26714c"],
  ["#990000", "#730000"],
  ["#0b6a8f", "#00496e"],
];

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SocialLinks({ links, name }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="member-card__links">
      {links.map((link) => (
        <a
          key={link.type + link.href}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={`${name} on ${labelMap[link.type]}`}
          title={labelMap[link.type]}
        >
          <i className={iconMap[link.type]} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function Avatar({ name, image, index, className = "" }) {
  if (image) {
    return (
      <img
        className={className}
        src={image}
        alt={name}
        loading="lazy"
        style={{ objectPosition: "center 25%" }}
      />
    );
  }

  const [from, to] = avatarPalette[index % avatarPalette.length];
  return (
    <span
      className={`member-avatar ${className}`}
      style={{ "--av-from": from, "--av-to": to }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

function MemberCard({ person, index, compact = false }) {
  return (
    <Reveal
      as="article"
      className={`member-card${compact ? " member-card--compact" : ""}`}
      variant="up"
      delay={Math.min(index * 60, 360)}
    >
      <div className="member-card__media">
        <Avatar name={person.name} image={person.image} index={index} className="member-card__photo" />
      </div>
      <div className="member-card__body">
        <span className="member-card__role">{person.role}</span>
        <h3>
          {person.metaLink ? (
            <a
              href={person.metaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="member-name-link"
              title={`${person.name}'s Meta-Wiki user page`}
            >
              {person.name} <span className="meta-arrow" aria-hidden="true">↗</span>
            </a>
          ) : (
            person.name
          )}
        </h3>
        <p>{person.description}</p>
        <SocialLinks links={person.links} name={person.name} />
      </div>
    </Reveal>
  );
}

export default function Team() {
  return (
    <div className="team-page">
      <section className="team-page-hero">
        <div className="wrap team-page-hero__inner">
          <div className="team-page-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              LEADERSHIP & CONTRIBUTORS
            </span>
            <h1>The People Behind the Progress.</h1>
            <p className="team-page-hero__lede">
              The students, mentors and faculty who drive open knowledge, technical contribution,
              and community mentorship at United Institute of Technology, Prayagraj.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>2026–27</strong>
              <span>Current Chapter Roster</span>
            </div>
            <div className="page-hero__stat">
              <strong>UIT</strong>
              <span>Prayagraj, UP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Chapter leadership</p>
              <h2 className="section-title">Leading the chapter.</h2>
            </div>
            <span className="chip chip--green">Team 2026–27</span>
          </div>

          <div className="leader-grid">
            {leaders.map((leader, index) => (
              <Reveal
                as="article"
                className="leader-card"
                key={leader.name}
                variant="up"
                delay={index * 90}
              >
                <div className="leader-card__media">
                  <Avatar
                    name={leader.name}
                    image={leader.image}
                    index={index}
                    className="leader-card__photo"
                  />
                </div>
                <div className="leader-card__body">
                  <span className="leader-card__role">{leader.role}</span>
                  <h3>
                    {leader.metaLink ? (
                      <a
                        href={leader.metaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="member-name-link"
                        title={`${leader.name}'s Meta-Wiki user page`}
                      >
                        {leader.name} <span className="meta-arrow" aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      leader.name
                    )}
                  </h3>
                  <p>{leader.description}</p>
                  <SocialLinks links={leader.links} name={leader.name} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow eyebrow--green">Domain leads</p>
            <h2 className="section-title">Operations &amp; tracks.</h2>
            <p className="section-lede">
              Each track is led by a student who owns its programmes, workshops and outcomes.
            </p>
          </div>

          <div className="team-grid">
            {domainLeads.map((member, index) => (
              <MemberCard person={member} index={index + 2} key={member.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow eyebrow--red">Community champions</p>
            <h2 className="section-title">Our active volunteers.</h2>
            <p className="section-lede">
              The student contributors supporting ground activities, media documentation and peer
              guidance.
            </p>
          </div>

          <div className="team-grid team-grid--three">
            {volunteers.map((member, index) => (
              <MemberCard person={member} index={index + 1} key={member.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Heritage &amp; foundations</p>
            <h2 className="section-title">Who built the foundation.</h2>
          </div>

          <div className="team-grid team-grid--three">
            {heritage.map((person, index) => (
              <MemberCard person={person} index={index + 1} key={person.name} />
            ))}
          </div>

          <details className="team-archive">
            <summary>
              <span>
                <strong>Previous team · 2025 founding cohort</strong>
                <span>Honouring the leaders who established the chapter</span>
              </span>
              <span className="team-archive__toggle" aria-hidden="true">+</span>
            </summary>

            <div className="team-archive__body">
              <div className="team-grid team-grid--archive">
                {archive.map((person, index) => (
                  <figure className="archive-card" key={person.name}>
                    <div className="archive-card__media">
                      <Avatar
                        name={person.name}
                        image={person.image}
                        index={index}
                        className="archive-card__photo"
                      />
                    </div>
                    <figcaption>
                      <span>{person.role}</span>
                      <strong>{person.name}</strong>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="archive-volunteers">
                <h3>Founding volunteers</h3>
                <ul>
                  {archiveVolunteers.map((volunteer) => (
                    <li key={volunteer}>{volunteer}</li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal
            className="team-cta photo-cta"
            variant="zoom"
            style={{ "--band-photo": `url("${GroupWiki}")` }}
          >
            <div>
              <p className="eyebrow">Join the team</p>
              <h2>Want to lead a track or volunteer?</h2>
              <p>
                New contributors are welcome every semester — technical, design, events, social
                media or documentation. Start with a session and grow into a role.
              </p>
            </div>
            <div className="btn-row">
              <Link to="/get-involved" className="btn btn--primary">
                Get involved <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <a
                href="https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Team"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                Team on Meta-Wiki ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
