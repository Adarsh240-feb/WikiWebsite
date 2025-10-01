import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import WikiMainLogo from "../Images/WikiMainLogo.png";
import WikiI from "../Images/WikiI.png";
import WikiL from "../Images/WikiL.png";
import WikiS from "../Images/WikiS.jpg";
import Sidebar from "./Sidebar"; 
import WikiMainLogoM from "../Images/WikiMainLogoM.png"; 

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
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="container">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          closeSidebar={closeSidebar}
          navLinks={navLinks}
          wikiLogo={WikiL}
        />
        <main className="main-content">
          <section className="hero-section">
            <div className="hero-content">
              {/* Add two image tags for the two logos */}
              <img
                src={WikiMainLogo}
                alt="WikiClub Tech Logo"
                className="hero-logo-large desktop-logo" // Add a new class for the desktop logo
              />
              <img
                src={WikiMainLogoM}
                alt="WikiClub Tech Phone Logo"
                className="hero-logo-large phone-logo" // Add a new class for the phone logo
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
              WikiClub Tech: Where Open Source Meets Open Knowledge
            </div>
            <div className="section-content">
              WikiClub Tech is a dynamic, student-led community dedicated to advancing open knowledge, open-source development, and collaborative technologies. 
              Through comprehensive workshops, hands-on Wikimedia sessions, and practical learning experiences, we empower students to innovate, develop essential skills, 
              and make meaningful contributions to the global open knowledge ecosystem. Our mission is to bridge the gap between academic learning and real-world 
              open-source contributions, fostering the next generation of technology leaders and knowledge creators.
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
            src={WikiS}
            alt="WikiClub Tech Logo"
            className="footer-logo"
          />
          <div className="wiki-logo">
          </div>
        </div>
        <div className="footer-right">
          <Link to="/About" className="footer-link1">About Us</Link>
          <Link to="/RoadToWiki" className="footer-link2">Road To Wiki Program</Link>
          <Link to="/ContributionMeter" className="footer-link3">Contribution Board</Link>
          <Link to="/Team" className="footer-link2">Team</Link>
          <Link to="/Question" className="footer-link3">FAQ</Link>
        </div>
      </footer>
    </>
  );
}

export default HomePage;