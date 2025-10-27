import React, { useState } from "react";
import "./Team.css";
import Sidebar from "./Sidebar";
import Reeti from "../Images/Reeti.jpg";
import Neelima from "../Images/Neelima.png";
import Somya from "../Images/Somya.jpg";
import Arpita from "../Images/Arpita.jpg";
import Manvi from "../Images/Manvi.jpg";
import Shivaansh from "../Images/Shivaansh.png";
import Shiksha from "../Images/Shiksha.jpg";
import Adarsh from "../Images/Adarsh.jpg";
import Hridyesh from "../Images/Hridyesh.jpg";
import Sarthak1 from "../Images/Sarthak1.jpg";
import Suhani from "../Images/Suhani.jpg";
import Priyanshika from "../Images/Priyanshika.jpg";
import AmitSir from "../Images/AmitSir.jpg";
import WikiS from "../Images/WikiS.png";
import { Link } from "react-router-dom";

// Import the new WavyText component
import WavyText from './WavyText';

const facultyAdvisor = {
  name: "Dr. Amit Kumar Tiwari",
  description: "Dr. Amit Kumar Tiwari serves as the Head of the Computer Science and Engineering Department at United Institute of Technology (UIT), Prayagraj. With over 16 years of distinguished academic experience and a Ph.D. in Computer Science, he has been instrumental in establishing the department's research excellence and academic culture. His leadership has fostered innovation and technological advancement within the institution.",
  image: AmitSir,
  linkedin: "https://www.linkedin.com/in/dr-amit-kumar-tiwari-518654113/",
};

const founder = {
  name: "Hridyesh Gupta",
  description: "WikiClub Tech-UIT was established by Hridyesh Gupta as a culmination of his transformative journey within the Wikimedia ecosystem, evolving from an active contributor to a recognized community organizer. The club's founding represents a strategic initiative to create a comprehensive learning environment where students can develop expertise, collaborate effectively, and make meaningful contributions to open knowledge and open-source technologies. Under his visionary leadership, the organization has emerged as the premier hub for the WikiClub Tech India community across the North India region.",
  image: Hridyesh,
  linkedin: "https://www.linkedin.com/in/hridyesh-gupta/",
  github: "http://github.com/hridyesh-gupta",
};

const mentor = {
  name: "Sarthak Singh",
  description: "Sarthak Singh is a distinguished App Development Expert specializing in Flutter and Dart technologies. With over 4 years of active engagement in technology communities, he has achieved remarkable success in 20+ global hackathons. During his research internship at MNNIT, he contributed to multiple research publications and assumed leadership positions across 10+ technology communities. He has delivered numerous technical sessions on Flutter and mobile app development, sharing expertise and empowering the developer community through knowledge transfer and mentorship.",
  image: Sarthak1,
  linkedin: "http://www.linkedin.com/in/sarthak-singh-/",
  github: "https://github.com/SarthakSingh2003/",
};

const teamMembers = [
  {
    name: "Reeti Singh",
    title: "Envoy",
    description: "Leads community engagement initiatives and guides members through their Wikimedia and open-source journey. Focuses on building a robust, project-driven community ecosystem that fosters collaboration and knowledge sharing.",
    image: Reeti,
    linkedin: "http://www.linkedin.com/in/reeti-singh-09748b291",
    github: "http://github.com/Reeti14",
  },
  {
    name: "Shivaansh Singh",
    title: "Co-Envoy",
    description: "Pre-final year B.Tech student specializing in Android development and open-source contributions. Actively engaged in technology communities, bringing technical expertise and leadership to community initiatives.",
    image: Shivaansh,
    linkedin: "http://www.linkedin.com/in/shivaansh-singh",
    github: "https://github.com/ShivaanshSingh",
  },
  {
    name: "Adarsh Kesharwani",
    title: "Core Team (Technical)",
    description: "Full-stack web developer with a passion for open-source development. Proficient in React, Node.js, MongoDB, and modern version control systems, contributing to technical excellence and innovation within the community.",
    image: Adarsh,
    linkedin: "https://www.linkedin.com/in/adarsh-kesharwani-bba666315/",
    github: "https://github.com/Adarsh240-feb",
  },
  {
    name: "Manvi Kesarwani",
    title: "Core Team (Social Media)",
    description: "Social Media Lead responsible for content curation and community building across digital platforms. Drives strategic campaigns and enhances the organization's digital presence and engagement.",
    image: Manvi,
    linkedin: "https://www.linkedin.com/in/manvi-kesarwani-44a8b4306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Manvi-9791",
  },
  {
    name: "Arpita Jain",
    title: "Core Team (Management)",
    description: "Pre-final year B.Tech student serving as Management Lead. Coordinates organizational activities, fosters strategic partnerships, and drives initiatives that support sustainable club growth and development.",
    image: Arpita,
    linkedin: "https://www.linkedin.com/in/arpita-jain-5a3a28306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=andr",
    github: "https://github.com/Arpitajain2327",
  },
];

const volunteers = [
  { name: "Somya Yadav", affiliation: "Social Media Management", image: Somya, linkedin: "https://www.linkedin.com/in/somya-yadav-0b2948360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "https://github.com/somsomya" },
  { name: "Shiksha", affiliation: "Visual Design & Branding", image: Shiksha, linkedin: "https://in.linkedin.com/in/shiksha-10504b358", github: "https://github.com/shiksha-28" },
  { name: "Neelima Srivastava", affiliation: "Event Coordination & Management", image: Neelima, linkedin: "https://www.linkedin.com/in/neelima-srivastav-b71636370", github: "https://github.com/th-neelimaa" },
  { name: "Suhani Shukla", affiliation: "Event Coordination & Management", image: Suhani, linkedin: "http://www.linkedin.com/in/suhani-shukla-945193285", github: "https://github.com/SUHANI005" },
  { name: "Priyanshika Upadhyay", affiliation: "Event Coordination & Management", image: Priyanshika, linkedin: "https://www.linkedin.com/in/priyanshika-upadhyay-a87a26332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "https://github.com/Priyanshika1111" },
];

const navLinks = [];

function Team() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedVolunteer(null);
  };

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

        <main className="Team-content">
          <h1>
            <span className="color-1">Meet</span>{" "}
            <span className="color-2">Our</span>{" "}
            <span className="color-3">Team</span>
          </h1>
          <p>
            We are a dedicated team of passionate professionals and volunteers committed to advancing the Wikimedia and open knowledge ecosystem in Prayagraj and beyond. Our diverse team brings together expertise in technology, education, and community development to create meaningful impact in the open-source world.
          </p>
          <div className="separator-line"></div>

          <WavyText text="Faculty Advisor" />
          <section className="faculty-card-container">
            <div className="faculty-description">
              <h3 className="faculty-name">{facultyAdvisor.name}</h3>
              <p>{facultyAdvisor.description}</p>
            </div>
            <div className="faculty-image-card">
              <div className="faculty-image-container">
                <img src={facultyAdvisor.image} alt={facultyAdvisor.name} className="founder-image" />
              </div>
              <div className="social-links">
                <a href={facultyAdvisor.linkedin} aria-label={`${facultyAdvisor.name}'s LinkedIn profile`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </section>

          <WavyText text="Founder" />
          <section className="founder-card-container">
            <div className="founder-description">
              <h3 className="founder-name">{founder.name}</h3>
              <p>{founder.description}</p>
            </div>
            <div className="founder-image-card">
              <div className="founder-image-container">
                <img src={founder.image} alt={founder.name} className="founder-image" />
              </div>
              <div className="social-links">
                <a href={founder.linkedin} aria-label={`${founder.name}'s LinkedIn profile`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href={founder.github} aria-label={`${founder.name}'s GitHub profile`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </section>

          <div className="separator-line"></div>

          <WavyText text="Mentor" />
          <section className="mentor-card-container">
            <div className="mentor-image-card">
              <div className="mentor-image-container">
                <img src={mentor.image} alt={mentor.name} className="mentor-image" />
              </div>
              <div className="social-links">
                <a href={mentor.linkedin} aria-label={`${mentor.name}'s LinkedIn profile`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href={mentor.github} aria-label={`${mentor.name}'s GitHub profile`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
            <div className="mentor-description">
              <h3 className="mentor-name">{mentor.name}</h3>
              <p>{mentor.description}</p>
            </div>
          </section>

          <div className="separator-line"></div>

          <WavyText text="Core Team" />
          <section className="team-cards-container">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="tcard-image-container">
                  <img src={member.image} alt={member.name} className="card-image" />
                </div>
                <h2 className="member-name">{member.name}</h2>
                <h3 className="member-title">{member.title}</h3>
                <p className="member-description">{member.description}</p>
                <div className="social-links">
                  <a href={member.linkedin} aria-label={`${member.name}'s LinkedIn profile`} target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href={member.github} aria-label={`${member.name}'s GitHub profile`} target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            ))}
          </section>

          <div className="separator-line"></div>

          <WavyText text="Volunteers" />
          <section className="volunteer-cards-container">
            {volunteers.map((volunteer, index) => (
              <div className="volunteer-card" key={index} onClick={() => openModal(volunteer)}>
                <div className="volunteer-image-container">
                  <img src={volunteer.image} alt={volunteer.name} className="volunteer-image" />
                </div>
                <h3 className="volunteer-name">{volunteer.name}</h3>
                <p className="volunteer-affiliation">{volunteer.affiliation}</p>
              </div>
            ))}
          </section>
        </main>
      </div>

      {selectedVolunteer && (
        <div className="Tmodal-overlay" onClick={closeModal}>
          <div className="Tmodal-content" onClick={(e) => e.stopPropagation()}>
            <button className="Tmodal-close-button" onClick={closeModal}>&times;</button>
            <div className="Tmodal-body">
              <div className="Tmodal-image-container">
                <img src={selectedVolunteer.image} alt={selectedVolunteer.name} className="Tmodal-image" />
              </div>
              <div className="Tmodal-details">
                <h2 className="Tmodal-name">{selectedVolunteer.name}</h2>
                <p className="Tmodal-affiliation">{selectedVolunteer.affiliation}</p>
                <div className="Tsocial-links Tmodal-social-links">
                  {selectedVolunteer.linkedin && (
                    <a href={selectedVolunteer.linkedin} aria-label={`${selectedVolunteer.name}'s LinkedIn profile`} target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  )}
                  {selectedVolunteer.github && (
                    <a href={selectedVolunteer.github} aria-label={`${selectedVolunteer.name}'s GitHub profile`} target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The footer is moved outside the conditional block to be always visible */}
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

export default Team;