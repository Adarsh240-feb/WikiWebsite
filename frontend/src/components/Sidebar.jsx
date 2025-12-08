import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import WikiL from "../Images/WikiL.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "WikiClub Tech [IN]", path: "https://www.wikiclubtech.org/", external: true },
  { name: "Contribution Board", path: "/ContributionMeter" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "/Question" }
];

function Sidebar({ sidebarOpen, closeSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const forceScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const containers = document.querySelectorAll('main,.main-content,.mainContentContainer,.Team-content,.content-wrapper,.pageContainer,.container');
    containers.forEach((node) => {
      try { if (node && typeof node.scrollTop === 'number') node.scrollTop = 0; } catch (_) {}
    });
  };

  const handleNavClick = (path, e) => {
    // Always close the sidebar first
    if (typeof closeSidebar === 'function') closeSidebar();
    // If we're already on the same route, prevent re-navigation and just scroll to top
    if (location && location.pathname === path) {
      e.preventDefault();
      // Defer to allow sidebar close reflow
      setTimeout(forceScrollTop, 0);
      return;
    }
    // For navigation to a different route, let the router handle it and also scroll after
    setTimeout(forceScrollTop, 0);
  };
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
          link.external ? (
            <a
              href={link.path}
              className="nav-item external-link interactive"
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeSidebar}
            >
              {link.name}
            </a>
          ) : (
            <Link
              to={link.path}
              className="nav-item interactive"
              key={idx}
              onClick={(e) => handleNavClick(link.path, e)}
            >
              {link.name}
            </Link>
          )
        ))}
      </nav>
      <div className="sidebar-separator" />
      <div className="sidebar-social-media-icons">
        <a className="interactive" href="https://www.instagram.com/wikiclubtech.uit/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a className="interactive" href="https://www.linkedin.com/company/wikitech-uit/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="#" // Default href, actual action handled by onClick
          aria-label="Email WikiClub Tech"
          className="interactive"
          onClick={handleEmailClick}
        >
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
