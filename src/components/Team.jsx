import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Team.css";
import WikiL from "../Images/WikiL.png";
import Reeti from "../Images/Reeti.jpg";
import Neelima from "../Images/Neelima.png";
import Atharva from "../Images/Atharva.jpg";
import Somya from "../Images/Somya.jpg";
import Arpita from "../Images/Arpita.jpg";
import Manvi from "../Images/Manvi.jpg";
import Shivaansh from "../Images/Shivaansh.png";
import Shiksha from "../Images/Shiksha.jpg";
import Adarsh from "../Images/Adarsh.jpg";
import Hridyesh from "../Images/Hridyesh.jpg";
import Sarthak from "../Images/Sarthak.jpg";
import Suhani from "../Images/Suhani.jpg";
import Priyanshika from "../Images/Priyanshika.jpg";
import AmitSir from "../Images/AmitSir.png";
const facultyAdvisor = {
  name: "Dr. Amit Kumar Tiwari",
  description: "Dr. Amit Kumar Tiwari is an Associate Professor in the Department of Computer Science and Engineering at the University Institute of Technology, RGPV, Bhopal. With a Ph.D. in Computer Science and Engineering from MANIT Bhopal, he has over 15 years of teaching experience and more than 10 years of research experience. His research interests include Data Mining, Machine Learning, and Natural Language Processing. Dr. Kumar has published over 30 research papers in reputed international journals and conferences and has been recognized with several awards for his contributions to the field of computer science.",
  image: AmitSir, 
  linkedin: "https://www.linkedin.com/in/dr-amit-kumar-tiwari-518654113/", 
};

const founder = {
  name: "Hridyesh Gupta",
  description: "WikiClub Tech-UIT was founded by Hridyesh Gupta as part of his journey in the Wikimedia ecosystem, where he grew from contributor to community organizer. Establishing the club marked a step in creating a dedicated space for students to learn, collaborate, and contribute to open knowledge and open-source technologies. Under his leadership, the club today stands as the hub for the WikiClub Tech India community in the North India region.",
  image: Hridyesh,
  linkedin: "https://www.linkedin.com/in/hridyesh-gupta/",
  github: "http://github.com/hridyesh-gupta",
};

const mentor = {
  name: "Sarthak Singh",
  description: "I’m an App Development Expert specializing in Flutter and Dart. With over 4 years of active involvement in tech communities, I’ve participated in and won 20+ global hackathons. During my internship at MNNIT , I contributed to publishing research papers and took on leadership roles in 10+ tech communities. I’ve also delivered multiple sessions on Flutter and app development, sharing knowledge and empowering fellow developers. That’s a bit about me!",
  image: Sarthak,
  linkedin: "http://www.linkedin.com/in/sarthak-singh-/",
  github: "https://github.com/SarthakSingh2003/",
};

const teamMembers = [
  {
    name: "Reeti Singh",
    title: "Envoy",
    description: "As the Envoy for WikiClub Tech, I guide our members into the interconnected worlds of Wikimedia and open source. My primary focus is to cultivate a strong, project-based community where we can transform ideas into reality, whether it's by improving Wikipedia articles or developing new open-source tools to aid knowledge sharing. I am passionate about fostering collaboration and innovation, ensuring that our club not only contributes to the Wikimedia ecosystem but also empowers each member to grow their skills and make a meaningful impact.",
    image: Reeti,
    linkedin: "http://www.linkedin.com/in/reeti-singh-09748b291",
    github: "http://github.com/Reeti14",
  },
  {
    name: "Shivaansh Singh",
    title: "Co-Envoy",
    description: "Shivaansh Singh is a pre-final year B.Tech CSE (AI & ML) student with a strong focus on Android development using Flutter, Dart, and Firebase. He has a solid foundation in Java, Python, and OOP, along with experience in graphic design using Adobe Creative Suite. He actively contributes to open source through the Wikimedia ecosystem and is an alumnus of the Road to Wiki Cohort 1. He currently serves as the GDG Organizer at UIT, Wiki Club Tech Co-Envoy (U.P. Region), and Graphic Designer & Management Co-Lead at TEDxUIT.",
    image: Shivaansh,
    linkedin: "http://www.linkedin.com/in/shivaansh-singh",
    github: "https://github.com/ShivaanshSingh",
  },
  {
    name: "Adarsh Kesharwani",
    title: "Core Team (Technical)",
    description: "A pre-final year B.Tech student specializing in Web Development, with a strong passion for Open Source Contributions. I have a solid foundation in HTML, CSS, JavaScript, and NodeJS, with hands-on experience in frameworks and libraries like React.js and Tailwind CSS. My skills also include database management using MongoDB and Firebase. I'm proficient in Git, Gerrit, and Phabricator for version control and have a keen interest in building scalable, real-world solutions.",
    image: Adarsh,
    linkedin: "https://www.linkedin.com/in/adarsh-kesharwani-bba666315/",
    github: "https://github.com/Adarsh240-feb",
  },
  {
    name: "Manvi Kesarwani",
    title: "Core Team (Social Media)",
    description: "I am the Social Media Lead at WikiClub Tech, where I bridge creativity with technology to amplify our digital presence. My role revolves around curating engaging content, building strong online communities, and driving impactful campaigns that showcase the spirit of innovation within our club. From strategizing posts to analyzing reach, I ensure our social platforms reflect the energy, knowledge, and collaborative vision of WikiClub Tech. Passionate about digital storytelling and trends, I strive to make every interaction on our platforms meaningful and inspiring for tech enthusiasts and learners alike.",
    image: Manvi,
    linkedin: "https://www.linkedin.com/in/manvi-kesarwani-44a8b4306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Manvi-9791",
  },
  {
    name: "Arpita Jain",
    title: "Core Team (Management)",
    description: "I am Arpita Jain, a pre-final year B.Tech CSE student at UIT, passionate about technology, innovation, and community building. As the Management Lead at WikiClub Tech, I play a crucial role in orchestrating our club's activities, ensuring seamless coordination among team members, and driving our mission to make technology and knowledge accessible to all. My responsibilities include strategic planning, event organization, and fostering partnerships that enhance our club's impact. With a keen eye for detail and a commitment to excellence, I strive to create an environment where creativity and collaboration thrive, empowering our members to achieve their fullest potential.",
    image: Arpita,
    linkedin: "https://www.linkedin.com/in/arpita-jain-5a3a28306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=andr",
    github: "https://github.com/Arpitajain2327",
  },
];

const volunteers = [
  { name: "Atharva Gupta", affiliation: "Content Creation", image: Atharva, linkedin: "https://www.linkedin.com/in/atharva-gupta-tech?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "https://github.com/Atharva005pro" },
  { name: "Somya Yadav", affiliation: "Social Media ", image: Somya, linkedin: "https://www.linkedin.com/in/somya-yadav-0b2948360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "https://github.com/somsomya" },

  { name: "Shiksha", affiliation: "Designing", image: Shiksha, linkedin: "https://in.linkedin.com/in/shiksha-10504b358", github: "https://github.com/shiksha-28" },
  { name: "Neelima Srivastava", affiliation: "Event Coordinator", image: Neelima, linkedin: "https://www.linkedin.com/in/neelima-srivastav-b71636370", github: "https://github.com/th-neelimaa" },

  { name: "Suhani Shukla", affiliation: "Event Coordinator", image: Suhani, linkedin: "http://www.linkedin.com/in/suhani-shukla-945193285", github: "https://github.com/SUHANI005" },
  { name: "Priyanshika Upadhyay", affiliation: "Event Coordinator", image: Priyanshika, linkedin: "https://www.linkedin.com/in/priyanshika-upadhyay-a87a26332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "https://github.com/Priyanshika1111" },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "#" },
];

function Team() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const openModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedVolunteer(null);
  };

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <div className="logo-section">
            <div className="logo-placeholder">
              <img src={WikiL} alt="WikiClub Tech Logo" className="logo-image" />
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

        <main className="Team-content">
          <h1>Meet Our Team</h1>
          <p>
            We are a group of passionate volunteers dedicated to building and empowering the wiki and open knowledge community in Prayagraj.
          </p>
          <div className="separator-line"></div>

          {/* New FacultyAdvisor Section */}
          <h2 className="section-heading">Faculty Advisor</h2>
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

          {/* New Founder Section */}
          <h2 className="section-heading">Founder</h2>
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

          {/* New Mentor Section */}
          <h2 className="section-heading">Mentor</h2>
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

          <h2 className="section-heading">Core Team</h2>
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

          <h2 className="section-heading">Volunteers</h2>

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
    </>
  );
}

export default Team;