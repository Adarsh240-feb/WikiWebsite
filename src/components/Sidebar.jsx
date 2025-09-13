import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import WikiL from "../Images/WikiL.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
    { name: "Contribution Meter", path: "/ContributionMeter" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "/Question" }
];

function Sidebar({ sidebarOpen, closeSidebar }) {
  const handleEmailClick = (e) => {
    const emailAddress = "kesharwaniadarsh24@gmail.com";
    const subject = "Inquiry from WikiClub Tech site";
    const body = "Hi WikiClub Tech Team,\n\n";

    // Detect if on a mobile/tablet device
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|webOS|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent) || window.innerWidth < 1024;
    if (isMobile) {
      // For mobile, use mailto to open native app
      window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      e.preventDefault(); // Prevent default anchor behavior
    } else {
      // For desktop, open Gmail Web compose in a new tab
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank", "noopener noreferrer");
      e.preventDefault(); // Prevent default anchor behavior
    }
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="logo-section">
        <div className="logo-placeholder">
          <img src={WikiL} alt="WikiClub Tech Logo" className="logo-image" />
        </div>
      </div>
      <nav className="nav-links">
        {navLinks.map((link, idx) => (
          <Link
            to={link.path}
            className="nav-item"
            key={idx}
            onClick={closeSidebar}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="sidebar-separator" />
      <div className="sidebar-social-media-icons">
        <a href="https://www.instagram.com/wikiclubtech.uit/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/wikitech-uit/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="#" // Default href, actual action handled by onClick
          aria-label="Email WikiClub Tech"
          onClick={handleEmailClick}
        >
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
