import React from "react";
import { useState } from "react"; // Make sure useState is imported
import "./About.css";
import "./HomePage.css";
import WikiD from "../Images/WikiD.jpg";
import WikiH from "../Images/WikiH.jpg";
import Sidebar from "./Sidebar";
import WikiS from "../Images/WikiS.jpg";
import { Link } from "react-router-dom";

function About() {
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
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="main-content">
          <section className="about-section">
            <div className="section-header">
              <h2 className="heading">Who We Are ? </h2>
            </div>
            <div className="content-with-image">
              <div className="text-content">
                <ul className="program-details-list">
                  <li>
                    <strong>Innovation Hub:</strong> We are a premier student-led technology community at United Institute of Technology, creating a dedicated space for fostering open knowledge, collaborative development, and technological innovation.
                  </li>
                  <li>
                    <strong>Practical Learning:</strong> Our educational philosophy centers on experiential learning through hands-on projects, real-world applications, and collaborative development environments that prepare students for industry challenges.
                  </li>
                  <li>
                    <strong>Mentorship & Professional Development:</strong> We provide comprehensive mentorship opportunities, professional portfolio development, and networking platforms that connect students with industry experts and fellow technology professionals.
                  </li>
                  <li>
                    <strong>Continuous Growth:</strong> Our community supports every stage of your professional journey, offering structured guidance, resources, and collaborative opportunities for both emerging developers and experienced professionals.
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
                    The exclusive <b>WikiClub Tech Hub</b> in Uttar Pradesh, serving as the regional leader and coordinator for all WikiClub Tech initiatives across the state from our base at UIT.
                  </li>
                  <li>
                    A comprehensive learning ecosystem that transcends traditional classroom boundaries, integrating cutting-edge technology, open knowledge principles, and industry-relevant project experiences.
                  </li>
                  <li>
                    We develop essential future-ready competencies including technical leadership, collaborative problem-solving, and professional open-source contribution methodologies.
                  </li>
                  <li>
                    Our community serves as a transformative platform where students evolve into skilled contributors, innovative thinkers, and impactful change-makers in the technology sector.
                  </li>
                  <li>
                    We provide unparalleled global exposure through direct collaboration with Wikimedia Foundation and international open-source communities, significantly enhancing professional development and career advancement opportunities.
                  </li>
                </ul>
              </div>
            </div>
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

export default About;