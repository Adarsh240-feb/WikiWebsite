import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import WikiMainLogo from "../Images/optimized/WikiMainLogo.webp";
import WikiI from "../Images/optimized/WikiI.webp";
import WikiL from "../Images/optimized/WikiL.webp";
import WikiS from "../Images/optimized/WikiS.webp";
import Sidebar from "./Sidebar"; 
import WikiMainLogoM from "../Images/optimized/WikiMainLogoM.webp"; 
import OptimizedImage from "./OptimizedImage";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Contribution Board", path: "/ContributionMeter" },
  { name: "Marathon Board", path: "/MarathonBoard" },
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
                className="hero-logo-large desktop-logo"
                width="800"
                height="200"
                fetchpriority="high"
              />
              <img
                src={WikiMainLogoM}
                alt="WikiClub Tech Phone Logo"
                className="hero-logo-large phone-logo"
                width="400"
                height="400"
                fetchpriority="high"
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
              <OptimizedImage
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
            loading="lazy"
            decoding="async"
            width="50"
            height="50"
          />
          <div className="wiki-logo">
          </div>
        </div>
        <div className="footer-right">
          <Link to="/About" className="footer-link1">About Us</Link>
          <Link to="/RoadToWiki" className="footer-link2">Road To Wiki Program</Link>
          <Link to="/ContributionMeter" className="footer-link3">Contribution Board</Link>
          <Link to="/MarathonBoard" className="footer-link2">Marathon Board</Link>
          <Link to="/Team" className="footer-link3">Team</Link>
          <Link to="/Question" className="footer-link2">FAQ</Link>
        </div>
      </footer>
    </>
  );
}

export default HomePage;