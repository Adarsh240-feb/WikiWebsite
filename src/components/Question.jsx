import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "./Question.css";
import WikiL from "../Images/WikiL.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "#" },
];

const faqs = [
  {
    question: "What are the basics of Wiki?",
    answer:
      "Essential training resources for developers include the Wikimedia Developer Ecosystem, MediaWiki Databases, and APIs. These resources are considered very important for understanding the basics of Wiki. You can learn more about these topics through the provided training resources.",
    reference: "https://youtu.be/OaEObj1gYzE?si=DqqnMqAxNi3DmxcE",
  },
  {
    question: "How do I create a Wikimedia developer account?",
    answer:
      "To create a Wikimedia developer account, you need to visit the dedicated account creation page. This process also involves setting up accounts on Phabricator for project management and Gerrit for code review.",
    reference: "https://www.mediawiki.org/wiki/Developer_account",
  },
  {
    question: "How do I make an account on Gerrit?",
    answer:
      "To create a Gerrit account, you must first have a Wikimedia developer account. After that, navigate to the Gerrit settings page to begin the registration process. You will also need to add your SSH key to authenticate and interact with repositories.",
    reference: "https://www.mediawiki.org/wiki/Gerrit/Getting_started",
  },
  {
    question: "How do I push changes on Gerrit?",
    answer:
      "To push changes on Gerrit, first, ensure your local repository is up-to-date. Then, use the `git add` command to stage your changes and `git commit -m 'Your message'` to commit them. Finally, push your changes for review using `git push origin HEAD:refs/for/master`.",
    reference: "https://www.mediawiki.org/wiki/Gerrit/Tutorial",
  },
  {
    question: "How do I test my SSH key?",
    answer:
      "You can test your SSH key to ensure it is properly configured and can connect to Gerrit by running the command `ssh -p 29418 your_gerrit_username@gerrit.wikimedia.org` in your terminal or Git Bash. A successful connection message indicates a proper setup.",
    reference: "https://www.mediawiki.org/wiki/Gerrit/Tutorial/SSH_Authentication",
  },
];

function FAQ() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      {/* Hamburger menu for mobile/tablet */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="container">
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
        </aside>
        <main className="main-content">
          <div className="faq-container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div className="faq-item" key={idx}>
                  <button className="faq-question" onClick={() => toggleFAQ(idx)}>
                    {faq.question}
                    <span className="faq-arrow">{openIndex === idx ? "▲" : "▼"}</span>
                  </button>
                  {openIndex === idx && (
                    <div className="faq-answer">
                      {faq.answer}
                      {/* Add the reference link here */}
                      {faq.reference && (
                        <p className="faq-reference">
                          Reference:{" "}
                          <a href={faq.reference} target="_blank" rel="noopener noreferrer">
                            {faq.reference}
                          </a>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default FAQ;