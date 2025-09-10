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
  { name: "FAQ", path: "/Question" },
];

const faqs = [
  {
    question: "How can I reset my password?",
    answer: "Go to your account settings and click 'Reset Password'. Follow the instructions sent to your email.",
  },
  {
    question: "Can I create more than one account?",
    answer: "No, each user is allowed only one account for security and privacy reasons.",
  },
  {
    question: "How can I subscribe to monthly newsletter?",
    answer: "You can subscribe from your profile page or at the bottom of our homepage.",
  },
  {
    question: "Do you store credit card information securely?",
    answer: "Yes, we use industry-standard encryption to store all sensitive information.",
  },
  {
    question: "What payment systems do you work with?",
    answer: "We support Visa, MasterCard, PayPal, and UPI.",
  },
];

function faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
                    <div className="faq-answer">{faq.answer}</div>
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

export default faq;