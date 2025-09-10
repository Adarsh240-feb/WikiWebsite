import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import WikiL from "../Images/WikiL.png";
import WikiD from "../Images/WikiD.jpg";
import WikiH from "../Images/WikiH.jpg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "/Question" },
];

function About() {
  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <div className="logo-section">
            <div className="logo-placeholder">
              <img
                src={WikiL}
                alt="WikiClub Tech Logo"
                className="logo-image"
              />
            </div>
          </div>
          <nav className="nav-links">
            {navLinks.map((link, idx) => (
              <Link to={link.path} className="nav-item" key={idx}>
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="main-content">
          <section className="about-section">
            <div className="section-header">
              <h2 className="heading">What We Are ? </h2>
            </div>
            <div className="content-with-image">
              <div className="text-content">
                <ul className="program-details-list">
                  <li>
                    <strong>Innovation Hub:</strong> We are a student-led tech community at UIT, a space dedicated to fostering open knowledge and collaboration.
                  </li>
                  <li>
                    <strong>Practical Learning:</strong> We believe in learning by doing. Our focus is on practical application, collaborative projects, and a supportive, hands-on environment.
                  </li>
                  <li>
                    <strong>Mentorship & Networking:</strong> We provide a platform for you to find mentors, build your professional portfolio, and forge lasting connections with fellow tech enthusiasts.
                  </li>
                  <li>
                    <strong>Continuous Growth:</strong> We are a resource for every stage of your journey, offering the guidance and community you need to continuously grow, whether you are a beginner or an experienced developer.
                  </li>
                </ul>
              </div>
              <div className="image-content">
                <img src={WikiD} alt="WikiClub Tech Description" className="about-image" />
              </div>
            </div>
          </section>

          <hr className="divider" />

          <section className="special-section">
            <div className="section-header">
              <h2 className="heading">Why We Are Special ? </h2>
            </div>
            <div className="content-with-image">
              <div className="image-content">
                <img src={WikiH} alt="WikiClub Tech Highlight" className="about-image" />
              </div>
              <div className="text-content">
                <ul className="program-details-list">
                  <li>
                    The only <b>WikiClubTech Hub</b> in Uttar Pradesh, leading and supporting all state WikiClubTech from UIT.
                  </li>
                  <li>
                    A community that goes beyond classrooms, combining technology, open knowledge, and real-world projects.
                  </li>
                  <li>
                    Helps you build future-ready skills like leadership, collaboration, and open-source contribution.
                  </li>
                  <li>
                    A place where students transform into contributors, innovators, and changemakers with lasting impact.                  </li>
                  <li>
                    Offers global exposure through Wikimedia and open-source, adding strong value to your career journey.
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <hr className="divider" />
        </main>
      </div>
    </>
  );
}

export default About;