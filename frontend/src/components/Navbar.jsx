import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../Images/WikiL.png";

const primaryLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/About" },
  { name: "Events", to: "/OurEvents" },
  { name: "Gallery", to: "/Gallery" },
  { name: "Achievements", to: "/Achievements" },
  { name: "Team", to: "/Team" },
  { name: "Get Involved", to: "/get-involved" },
];

function linkClass({ isActive }) {
  return `nav__link${isActive ? " is-active" : ""}`;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}${open ? " nav--open" : ""}`}>
      <div className="nav__accent" aria-hidden="true" />
      <div className="wrap nav__inner">
        <Link to="/" className="nav__brand" aria-label="WikiClub Tech UIT — home">
          <img src={logo} alt="WikiClub Tech UIT" className="nav__logo" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {primaryLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__mobile" hidden={!open}>
        <nav className="wrap nav__mobile-inner" aria-label="Mobile">
          {primaryLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
