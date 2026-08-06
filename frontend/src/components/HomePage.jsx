import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import WikiMainLogo from "../Images/WikiMainLogo.png";
import WikiI from "../Images/WikiI.png";
import WikiL from "../Images/WikiL.png";
import Sidebar from "./Sidebar"; 
import WikiMainLogoM from "../Images/WikiMainLogoM.png"; 
import OptimizedImage from "./OptimizedImage";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Achievements", path: "/Achievements" },
  { name: "Our Events", path: "/OurEvents" },
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
    </>
  );
}

export default HomePage;