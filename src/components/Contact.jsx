import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; 
import WikiMainLogo from "../Images/WikiMainLogo.png";
import WikiS from "../Images/WikiS.png";
import WikiL from "../Images/WikiL.png";
import WikiI from "../Images/WikiI.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "#" },
];

function Contact() {
  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <div className="logo-section">
            <div className="logo-placeholder">
              <img
                src={WikiL}
                alt="WikiClub Tech Logo"
                className="logo-image"
              />
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
        <main className="main-content">
            </main>
      </div>
    </>
  );
}   

export default Contact;