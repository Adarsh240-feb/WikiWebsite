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
    title: "Create Real-World Change",
    image: Card1,
    description:
      "Lead events, build community, and coordinate teams. You'll gain hands-on experience by empowering your peers and making a real impact on the local tech community's growth.",
    titleColorClass: "card-title-one",
  },
  {
    id: 2,
    title: "Boost Your Tech Skills",
    image: Card2,
    description:"Master core technologies and key open-source development practices. Become a technical expert on your campus and build a strong portfolio that showcases your abilities.",
    titleColorClass: "card-title-two",
  },
  {
    id: 3,
    title: "Connect & Grow Professionally",
    image: Card3,
    description:
      "Expand your professional circle by networking with student leaders, mentors, and industry experts. Get formal recognition for your leadership and contributions within the tech community.",
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
              <h1 className="programHeading">Road to Wiki Program -Cohort 1</h1>
              <ul className="programPoints">
                <li>
                  <b>Program Overview:</b> A 2-3 month, cohort-based program
                  created by WikiClub Tech [IN] and the Wikimedia Foundation to
                  teach students open-source contribution skills.
                </li>
                <li>
                  <b>Selection Process:</b> A rigorous two-stage selection process
                  resulted in 48 students being chosen from over 260 applicants
                  across more than seven colleges.
                </li>
                <li>
                  <b>Timeline:</b> The program started on September 27, 2024, with
                  a virtual onboarding and a "Developer Playbook" guide.
                </li>
                <li>
                  <b>Curriculum:</b> The program included hands-on projects, such
                  as a MediaWiki installation, and expert-led masterclasses.
                </li>
                <li>
                  <b>Culmination Event:</b> A two-day graduation event took place
                  from February 27-28 in Gurgaon, sponsored by the Wikimedia
                  Foundation and WikiClub Tech-UIT.
                </li>
                <li>
                  <b>Major Highlight:</b> Participants visited the Meta office in
                  Gurugram, where they presented their projects and witnessed a
                  patch being officially merged into Phabricator.
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
              <h2 className="applyHeading">Road to Wiki Program - Cohort 2 </h2>
              <p className="applyDescription">
                Road to Wiki Tech is a unique cohort-based learning opportunity that combines learning, hands-on experience, and mentorship to provide students with a comprehensive approach to technology and open-source contributions. This program is designed to empower students with the skills to contribute effectively to the Wikimedia Foundation.
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
                <b>More Students, More Impact:</b> This time, the program will onboard a larger number of passionate learners.
              </li>
              <li>
                <b>Higher Quality Work:</b> With advanced projects and structured guidance, the contributions will be more impactful and meaningful.
              </li>
              <li>
                <b>Bigger Rewards:</b> As the projects scale up, the rewards and recognition for participants will also be greater.
              </li>
              <li>
                <b>Advance Cohort Opportunity:</b> Top performers from Cohort 2 will unlock the Advance Cohort, where they can earn a **₹20,000 stipend**.
              </li>
              <li>
                <b>Refined Selection Process:</b> The application process is now more streamlined to identify genuinely committed students, ensuring personalized guidance for all selected participants.
              </li>
            </ul>
          </div>
          
          <div className="program-structure-section">
            <h2>Program Structure</h2>
            <div className="structure-point">
              <h3>1. Learning Sessions</h3>
              <p>
                Students will kickstart their journey with a series of learning sessions covering essential topics:
              </p>
              <ul>
                <li>
                  <b>Software Development:</b> Gain a solid foundation in coding and software engineering principles.
                </li>
                <li>
                  <b>Data Science:</b> Learn how to analyze and interpret complex data sets.
                </li>
                <li>
                  <b>Project Management:</b> Understand the best practices for managing and delivering successful projects.
                </li>
              </ul>
            </div>
            
            <div className="structure-point">
              <h3>2. Hands-on Projects</h3>
              <p>
                Following the learning sessions, students will participate in hands-on projects where they can apply their newly acquired skills to real-world challenges. These projects will be focused on contributing to Wikimedia projects, allowing students to make a tangible impact.
              </p>
            </div>
            
            <div className="structure-point">
              <h3>3. Mentorship</h3>
              <p>
                Throughout the program, students will be guided by industry professionals who are experts in their fields. Our mentors will:
              </p>
              <ul>
                <li>
                  Provide personalized guidance and feedback.
                </li>
                <li>
                  Support their growth and skill development.
                </li>
                <li>
                  Help them navigate challenges and make meaningful contributions.
                </li>
              </ul>
            </div>
          </div>
          <div className="program-structure-section">
            <h2>Rewards & more...</h2>
            <div className="structure-point">
              <p>
                We believe in recognizing and rewarding our participants' efforts. Here's what students can earn through their contributions:
              </p>
              <ul>
                <li>
                  <b>Certificates:</b>  Earn a formal certificate that validates your contributions and achievements.
                </li>
                <li>
                  <b>Stipends:</b>We offer stipends to our most dedicated and impactful contributors.
                </li>
                <li>
                  <b>Learning & Growth:</b>  Get practical, real-world experience by contributing to live open-source projects.
                </li>
                <li>
                  <b>Travel Support:</b>Our top contributors will receive full travel support to attend our next conference, hackathon, and other exclusive events.
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