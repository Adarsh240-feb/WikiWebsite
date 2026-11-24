import { Link } from "react-router-dom";
import "./Footer.css";
import bannerLogo from "../Images/wiki/banner.png";
import footerWatermark from "../Images/footer-banner.png";
import metaIcon from "../Images/metawiki.svg";

const explore = [
  { name: "Home", to: "/" },
  { name: "About the club", to: "/About" },
  { name: "Events", to: "/OurEvents" },
  { name: "Get Involved", to: "/get-involved" },
  { name: "Gallery", to: "/Gallery" },
  { name: "Achievements", to: "/Achievements" },
  { name: "Our team", to: "/Team" },
];

const community = [
  { name: "Contribution leaderboard", to: "/ContributionMeter" },
  { name: "Marathon board", to: "/MarathonBoard" },
  { name: "FAQ & contact", to: "/Question" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Background Brand Watermark with tuned transparency */}
      <div className="footer__watermark" aria-hidden="true">
        <img src={footerWatermark} alt="" className="footer__watermark-img" />
      </div>

      <div className="wrap footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-chip">
            <img src={bannerLogo} alt="WikiClub Tech UIT" />
          </span>
          <p className="footer__about">
            A student-led Wikimedia affiliate at United Institute of Technology, Prayagraj —
            building open knowledge, open-source skills and the next generation of contributors.
          </p>
          <div className="footer__social">
            <a
              href="https://www.instagram.com/wikiclubtech.uit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WikiClub Tech UIT on Instagram"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/company/wikitech-uit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WikiClub Tech UIT on LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
            </a>
            <a href="mailto:gkmwin563@gmail.com" aria-label="Email WikiClub Tech UIT">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
            </a>
            <a
              href="https://meta.wikimedia.org/wiki/WikiClub_Tech/WikiClub_Tech_UIT"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WikiClub Tech UIT on Meta-Wiki"
              className="footer__meta"
            >
              <img src={metaIcon} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className="footer__col" aria-label="Explore">
          <h3>Explore</h3>
          <ul>
            {explore.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Community">
          <h3>Community</h3>
          <ul>
            {community.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
            <li>
              <a href="https://www.wikiclubtech.org/" target="_blank" rel="noopener noreferrer">
                WikiClub Tech [IN] ↗
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__col footer__contact">
          <h3>Connect</h3>
          <address>
            United Institute of Technology
            <br />
            Naini, Prayagraj
            <br />
            Uttar Pradesh, India
          </address>
          <ul>
            <li>
              <a href="mailto:gkmwin563@gmail.com">gkmwin563@gmail.com</a>
            </li>
            <li>
              <a
                href="https://commons.wikimedia.org/wiki/Category:WikiClub_Tech_UIT"
                target="_blank"
                rel="noopener noreferrer"
              >
                Photo gallery on Commons ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap footer__bottom">
        <p>
          © {new Date().getFullYear()} WikiClub Tech – United Institute of Technology, Prayagraj.
        </p>
        <p className="footer__license">
          Content available under
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
            CC BY-SA 4.0
          </a>
          <span className="footer__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
      </div>
    </footer>
  );
}
