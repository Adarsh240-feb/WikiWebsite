import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import WikiMainLogo from "../Images/WikiMainLogo.png";
import WikiL from "../Images/WikiL.png";
import WikiI from "../Images/WikiI.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "/Question" },
];

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="container">
        {/* The conditional class needs to be on the sidebar itself */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}> 
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
          <section className="hero-section">
            <div className="hero-content">
              <img
                src={WikiMainLogo}
                alt="WikiClub Tech Logo"
                className="hero-logo-large"
              />
              <div></div>
            </div>
            <div className="hero-image">
              <img
                src="https://www.transparenttextures.com/patterns/cubes.png"
                alt="Background"
                className="background-image"
              />
              <div className="overlay"></div>
            </div>
          </section>

          <section className="about-section">
            <div className="section-title">
              WikiClub Tech : Where Open Source Meets Open Knowledge
            </div>
            <div className="section-content">
              WikiClub Tech is a vibrant, student-led community and dedicated to open knowledge, open-source, and collaborative technologies.
              Through engaging workshops, Wikimedia sessions, and hands-on learning, we empower students to innovate, build skills, and contribute to the global open knowledge movement.
            </div>
            <a
              href="https://wikimediafoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="clickable-image-link"
            >
              <img
                src={WikiI}
                alt="Call to action"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </a>
          </section>
        </main>
      </div>

      <footer className="footer-wiki">
        <div className="footer-left">
          <img
            src={WikiL}
            alt="WikiClub Tech Logo"
            className="footer-logo"
          />
          <div className="wiki-logo">
          </div>
        </div>
        <div className="footer-right">
          <Link to="/RoadToWiki" className="footer-link1">Road To Wiki Program</Link>
          <Link to="#" className="footer-link2">About Us </Link>
          <Link to="#" className="footer-link3">FAQ</Link>
        </div>
      </footer>
    </>
  );
}
export default HomePage;