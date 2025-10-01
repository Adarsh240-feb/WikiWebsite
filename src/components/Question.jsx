import React, { useState } from "react";
import "./HomePage.css";
import "./Question.css";
import Sidebar from "./Sidebar";
import WikiDeveloperBook from "./../data/WikiDeveloperBook.pdf";
import WikiS from "../Images/WikiS.png";
import { Link } from "react-router-dom";
import QueryForm from "./QueryForm";

const faqs = [
  {
    question: "What are the fundamental concepts of Wikimedia development?",
    answer:
      "Wikimedia development encompasses several core areas: the Wikimedia Developer Ecosystem, MediaWiki database architecture, REST and Action APIs, and contribution workflows. These foundational concepts are essential for understanding how to effectively contribute to Wikimedia projects. Our comprehensive training resources cover all these areas in detail.",
    reference: "https://youtu.be/OaEObj1gYzE?si=DqqnMqAxNi3DmxcE",
  },
  {
    question: "How do I create a Wikimedia developer account?",
    answer:
      "To establish your presence in the Wikimedia development community, visit the official Wikimedia developer account creation page. This process includes setting up accounts on Phabricator for project management and task tracking, as well as Gerrit for code review and version control. These accounts work together to provide a complete development workflow.",
    reference: WikiDeveloperBook,
  },
  {
    question: "How do I set up a Gerrit account for code contributions?",
    answer:
      "After creating your Wikimedia developer account, navigate to the Gerrit settings page to complete your Gerrit registration. You'll need to configure your SSH key for secure authentication and repository access. This setup is crucial for contributing code to Wikimedia projects and participating in the code review process.",
    reference: WikiDeveloperBook,
  },
  {
    question: "What is the proper workflow for submitting code changes to Gerrit?",
    answer:
      "The standard workflow involves: 1) Ensuring your local repository is synchronized with the latest changes, 2) Staging your modifications using `git add`, 3) Committing changes with a descriptive message using `git commit -m 'Your message'`, and 4) Pushing changes for review using `git push origin HEAD:refs/for/master`. This process ensures proper code review and integration.",
    reference: WikiDeveloperBook,
  },
  {
    question: "How do I verify my SSH key configuration for Gerrit?",
    answer:
      "Test your SSH key configuration by executing `ssh -p 29418 your_gerrit_username@gerrit.wikimedia.org` in your terminal or Git Bash. A successful connection response confirms that your SSH key is properly configured and you can interact with Gerrit repositories. This verification step is essential before attempting to push code changes.",
  },
  {
    question: "What programming languages and technologies are used in Wikimedia development?",
    answer:
      "Wikimedia projects primarily use PHP for MediaWiki core, JavaScript for frontend interactions, Python for various tools and utilities, and SQL for database operations. Familiarity with these technologies, along with Git version control and the Wikimedia development workflow, will help you contribute effectively to the ecosystem.",
  },
  {
    question: "How can I get started with my first Wikimedia contribution?",
    answer:
      "Begin by exploring the 'Good First Issues' on Phabricator, which are specifically designed for newcomers. Start with documentation improvements, bug fixes, or small feature additions. Join our community discussions, attend our workshops, and don't hesitate to ask questions. We provide mentorship and guidance throughout your contribution journey.",
  },
];

function FAQ() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const getReferenceLabel = (ref) => {
    if (ref && typeof ref === "string" && ref.endsWith(".pdf")) {
      return ref.split("/").pop();
    }
    return ref;
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="pageContainer">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className="mainContentContainer">
          <div className="faq-container">
            <h2 className="faq-title">
              <span className="faq-word-1">Frequently</span>{" "}
              <span className="faq-word-2">Asked</span>{" "}
              <span className="faq-word-3">Questions</span>
            </h2>
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div
                  className="faq-item"
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <button className="faq-question" type="button">
                    {faq.question}
                    <span className="faq-arrow">{hoveredIndex === idx ? "−" : "+"}</span>
                  </button>
                  <div className={`faq-answer ${hoveredIndex === idx ? "open" : ""}`}>
                    {faq.answer}
                    {faq.reference && (
                      <p className="faq-reference">
                        Reference:{" "}
                        <a href={faq.reference} target="_blank" rel="noopener noreferrer">
                          <b>{getReferenceLabel(faq.reference)}</b>
                        </a>
                      </p>
                    )}
                    {faq.repo && (
                      <p className="faq-reference">
                        <RepoIcon />
                        <a href={faq.repo} target="_blank" rel="noopener noreferrer">
                          Repository
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 2. RENDER THE NEW DYNAMIC SECTION HERE */}
          <QueryForm />
          
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

export default FAQ;