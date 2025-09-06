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
  { name: "FAQ", path: "#" },
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
                    <strong>Innovation Hub:</strong> We are more than just a club; we are a hub for innovation and collaboration. We provide a space where your ideas are valued and your skills are honed.
                  </li>
                  <li>
                    <strong>Practical Learning:</strong> Our unique approach focuses on practical application, collaborative projects, and a supportive community. We believe in learning by doing.
                  </li>
                  <li>
                    <strong>Mentorship & Networking:</strong> We're a place where you can find mentors, build your professional portfolio, and make lasting connections with fellow tech enthusiasts.
                  </li>
                  <li>
                    <strong>Continuous Growth:</strong> Whether you're a beginner or an experienced developer, WikiClub Tech provides the resources, guidance, and community you need to succeed and grow continuously.
                  </li>                  
                  <li>
                    <strong>Continuous Growth:</strong> Whether you're a beginner or an experienced developer, WikiClub Tech provides the resources, guidance, and community you need to succeed and grow continuously.
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
                    <strong>Innovation Hub:</strong> We are more than just a club; we are a hub for innovation and collaboration. We provide a space where your ideas are valued and your skills are honed.
                  </li>
                  <li>
                    <strong>Practical Learning:</strong> Our unique approach focuses on practical application, collaborative projects, and a supportive community. We believe in learning by doing.
                  </li>
                  <li>
                    <strong>Mentorship & Networking:</strong> We're a place where you can find mentors, build your professional portfolio, and make lasting connections with fellow tech enthusiasts.
                  </li>
                  <li>
                    <strong>Continuous Growth:</strong> Whether you're a beginner or an experienced developer, WikiClub Tech provides the resources, guidance, and community you need to succeed and grow continuously.
                  </li>
                  <li>
                    <strong>Continuous Growth:</strong> Whether you're a beginner or an experienced developer, WikiClub Tech provides the resources, guidance, and community you need to succeed and grow continuously.
                  </li>
                  <li>
                    <strong>Continuous Growth:</strong> Whether you're a beginner or an experienced developer, WikiClub Tech provides the resources, guidance, and community you need to succeed and grow continuously.
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