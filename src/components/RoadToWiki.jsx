import React, { useState } from "react";
import "./RoadToWiki.css";
import "./HomePage.css";
import GroupWiki from "../Images/GroupWiki.png";
import WikiP from "../Images/WikiP.png";
import Card3 from "../Images/Card3.png";
import Card2 from "../Images/Card2.jpg";
import Card1 from "../Images/Card1.png";
import Sidebar from "./Sidebar";
import WikiL from "../Images/WikiL.png";
import { Link } from "react-router-dom";

const cardData = [
  {
    id: 1,
    title: "Drive Real-World Impact",
    image: Card1,
    description:
      "Develop leadership skills through event management, community building, and team coordination. Gain practical experience by empowering fellow students and creating measurable impact within the technology community ecosystem.",
    titleColorClass: "card-title-one",
  },
  {
    id: 2,
    title: "Master Technical Excellence",
    image: Card2,
    description:"Acquire proficiency in cutting-edge technologies and industry-standard open-source development methodologies. Establish yourself as a technical authority within your academic community while building a comprehensive portfolio that demonstrates your professional capabilities.",
    titleColorClass: "card-title-two",
  },
  {
    id: 3,
    title: "Build Professional Networks",
    image: Card3,
    description:
      "Expand your professional network through strategic connections with student leaders, industry mentors, and technology experts. Earn formal recognition for your leadership contributions and establish valuable relationships within the global tech community.",
    titleColorClass: "card-title-three",
  },
];

const navLinks = [];

const Card = ({ title, image, description, titleColorClass }) => (
  <div className="card">
    <img src={image} alt={title} className="card-image" />
    <div className="card-content">
      <h3 className={`card-title ${titleColorClass}`}>{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  </div>
);

function RoadToWiki() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="pageContainer">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

        <div className="mainContentContainer">
          <div className="topContentWrapper">
            <div className="textWrapper">
              <h1 className="programHeading">Road to Wiki Program - Cohort 1</h1>
              <ul className="programPoints">
                <li>
                  <b>Program Overview:</b> A comprehensive 2-3 month cohort-based educational program developed through collaboration between WikiClub Tech [IN] and the Wikimedia Foundation, designed to provide students with professional open-source contribution skills and industry-relevant experience.
                </li>
                <li>
                  <b>Selection Process:</b> Our rigorous two-stage selection process evaluated over 260 applicants from seven+ institutions, resulting in the selection of 48 highly qualified students who demonstrated exceptional potential and commitment to open-source development.
                </li>
                <li>
                  <b>Program Timeline:</b> The program commenced on September 27, 2024, featuring a comprehensive virtual onboarding experience and access to our detailed "Developer Playbook" resource guide for continuous learning support.
                </li>
                <li>
                  <b>Curriculum Design:</b> The program integrates practical, hands-on projects including MediaWiki installation and configuration, complemented by expert-led masterclasses delivered by industry professionals and Wikimedia Foundation contributors.
                </li>
                <li>
                  <b>Graduation Ceremony:</b> A prestigious two-day graduation event was held from February 27-28 in Gurgaon, sponsored by the Wikimedia Foundation and WikiClub Tech-UIT, celebrating the achievements and contributions of our cohort participants.
                </li>

              </ul>
            </div>
            <div className="imageWrapper">
              <img
                src={GroupWiki}
                alt="Road to Wiki Program"
                className="programImage"
              />
            </div>
          </div>

          <div className="cardsContainer">
            <h2 className="highlightsHeading">Graduation Ceremony Highlights</h2>
            <div className="cards-grid">
              {cardData.map((card) => (
                <Card
                  key={card.id}
                  title={card.title}
                  image={card.image}
                  description={card.description}
                  titleColorClass={card.titleColorClass}
                />
              ))}
            </div>
          </div>
          
          <div className="applySection">
            <div className="applyTextWrapper">
              <h2 className="applyHeading">Road to Wiki Program - Cohort 2</h2>
              <p className="applyDescription">
                Road to Wiki Tech represents an innovative cohort-based educational initiative that integrates structured learning, practical experience, and professional mentorship to deliver a comprehensive approach to technology and open-source development. This program is specifically designed to equip students with the essential skills and knowledge required to make meaningful contributions to the Wikimedia Foundation and broader open-source ecosystem.
              </p>
            </div>
            <div className="applyFormWrapper">
              <div className="applyBox">
                <img src={WikiP} alt="WikiClub Tech Logo" className="applyImage" />
                <div className="applyBoxContent">
                </div>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdhllqy5J27BOytcHiELSH9amZVHED_qxgyYb7mSyCem1mpRg/viewform?pli=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="applyButton"
                >
                  Apply Now!
                </a>
              </div>
            </div>
          </div>

          <div className="whats-new-section">
            <h2>What's New in Cohort 2?</h2>
            <ul>
              <li>
                <b>Expanded Cohort Size:</b> Cohort 2 will accommodate a significantly larger number of dedicated learners, enabling broader impact and enhanced peer learning opportunities.
              </li>
              <li>
                <b>Enhanced Project Quality:</b> With advanced project frameworks and structured mentorship, participants will deliver more sophisticated and impactful contributions to the open-source ecosystem.
              </li>
              <li>
                <b>Increased Recognition:</b> As project complexity and scope expand, participants will receive enhanced rewards and professional recognition for their contributions and achievements.
              </li>
              <li>
                <b>Advanced Cohort Pathway:</b> Exceptional performers from Cohort 2 will gain access to our exclusive Advanced Cohort program, featuring a <b>₹20,000 stipend</b> and intensive mentorship opportunities.
              </li>
              <li>
                <b>Optimized Selection Process:</b> Our refined application and evaluation process ensures the identification of highly committed students, guaranteeing personalized guidance and support for all selected participants.
              </li>
            </ul>
          </div>
          
          <div className="program-structure-section">
            <h2>Program Structure</h2>
            <div className="structure-point">
              <h3>1. Comprehensive Learning Sessions</h3>
              <p>
                Participants will begin their journey with structured learning sessions covering fundamental and advanced topics essential for open-source development:
              </p>
              <ul>
                <li>
                  <b>Software Development:</b> Master core programming principles, software engineering methodologies, and industry-standard development practices.
                </li>
                <li>
                  <b>Data Science & Analytics:</b> Develop expertise in data analysis, interpretation, and visualization techniques for large-scale datasets.
                </li>
                <li>
                  <b>Project Management:</b> Acquire essential project management skills, including agile methodologies, version control, and collaborative development workflows.
                </li>
              </ul>
            </div>
            
            <div className="structure-point">
              <h3>2. Practical Project Implementation</h3>
              <p>
                Following the foundational learning phase, participants will engage in comprehensive hands-on projects that apply their acquired skills to real-world challenges. These projects are specifically designed to contribute to Wikimedia Foundation initiatives, enabling students to make measurable impact while building their professional portfolios.
              </p>
            </div>
            
            <div className="structure-point">
              <h3>3. Professional Mentorship Program</h3>
              <p>
                Throughout the program duration, participants will receive guidance from industry professionals and Wikimedia Foundation experts. Our mentorship program provides:
              </p>
              <ul>
                <li>
                  Personalized guidance and constructive feedback on technical contributions.
                </li>
                <li>
                  Professional development support and career advancement strategies.
                </li>
                <li>
                  Expert assistance in navigating complex challenges and maximizing contribution impact.
                </li>
              </ul>
            </div>
          </div>
          <div className="program-structure-section">
            <h2>Recognition & Rewards</h2>
            <div className="structure-point">
              <p>
                We are committed to recognizing and rewarding exceptional contributions from our participants. Here's what students can achieve through their dedication and impact:
              </p>
              <ul>
                <li>
                  <b>Professional Certificates:</b> Earn industry-recognized certificates that validate your technical contributions and professional achievements in open-source development.
                </li>
                <li>
                  <b>Performance-Based Stipends:</b> Our most dedicated and impactful contributors receive financial recognition through competitive stipend programs.
                </li>
                <li>
                  <b>Professional Development:</b> Gain invaluable real-world experience by contributing to live, production-level open-source projects that enhance your professional portfolio.
                </li>
                <li>
                  <b>Conference & Event Support:</b> Top contributors receive comprehensive travel and accommodation support to attend prestigious conferences, hackathons, and exclusive industry events.
                </li>
              </ul>
            </div>
            
          </div>
        </div>
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
          <Link to="/About" className="footer-link1">About Us</Link>
          <Link to="/RoadToWiki" className="footer-link2">Road To Wiki Program</Link>
          <Link to="/ContributionMeter" className="footer-link3">Contribution Board</Link>
          <Link to="/Team" className="footer-link2">Team</Link>
          <Link to="/Question" className="footer-link3">FAQ</Link>
        </div>
      </footer>
    </div>
  );
}
export default RoadToWiki;