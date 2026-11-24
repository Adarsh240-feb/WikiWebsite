import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "./PageHero";
import QueryForm from "./QueryForm";
import WikiDeveloperBook from "../data/WikiDeveloperBook.pdf";
import "./Question.css";

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
    answer: (
      <>
        <p>The standard workflow involves:</p>
        <ul className="faq-points">
          <li>Ensure your local repository is synchronized with the latest changes.</li>
          <li>Stage your modifications using <code>git add</code>.</li>
          <li>Commit changes with a descriptive message using <code>git commit -m 'Your message'</code>.</li>
          <li>Push changes for review using <code>git push origin HEAD:refs/for/master</code>.</li>
        </ul>
        <p>This process ensures proper code review and integration.</p>
      </>
    ),
    reference: WikiDeveloperBook,
  },
  {
    question: "How do I verify my SSH key configuration for Gerrit?",
    answer: (
      <>
        <ul className="faq-points">
          <li>
            Test your SSH key configuration by executing{" "}
            <code>ssh -p 29418 your_shell_username@gerrit.wikimedia.org</code> in your terminal or
            Git Bash.
          </li>
          <li>
            A successful connection response confirms that your SSH key is properly configured and
            you can interact with Gerrit repositories.
          </li>
          <li>
            This verification step is essential before attempting to push code changes.
          </li>
        </ul>
      </>
    ),
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

function referenceLabel(ref) {
  if (typeof ref === "string" && ref.endsWith(".pdf")) return "Wikimedia Developer Guide (PDF)";
  if (typeof ref === "string" && ref.includes("youtu")) return "Video walkthrough (YouTube)";
  return "Reference";
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <div className="faq-page">
      <section className="events-page-hero">
        <div className="wrap events-page-hero__inner">
          <div className="events-page-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              HELP & DIRECT CHAPTER CONTACT
            </span>
            <h1>Knowledge Base & Chapter Connect.</h1>
            <p className="events-page-hero__lede">
              Practical answers to questions regarding MediaWiki development, Gerrit SSH setups,
              and a direct inquiry form to connect with the WikiClub Tech UIT team.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>{faqs.length}</strong>
              <span>Developer Guides</span>
            </div>
            <div className="page-hero__stat">
              <strong>UIT</strong>
              <span>Prayagraj, UP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="faq-layout">
            <div className="faq-panel">
              <div className="section-head">
                <p className="eyebrow">Knowledge base</p>
                <h2 className="section-title">Wikimedia developer FAQ.</h2>
                <p className="section-lede">
                  Practical answers to the questions we hear most at our sessions. Click any
                  question to expand it.
                </p>
              </div>

              <div className="faq-list">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
                      <h3 className="faq-item__heading">
                        <button
                          type="button"
                          className="faq-question"
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${index}`}
                          id={`faq-button-${index}`}
                          onClick={() => toggle(index)}
                        >
                          <span className="faq-question__num">{String(index + 1).padStart(2, "0")}</span>
                          <span className="faq-question__text">{faq.question}</span>
                          <span className="faq-arrow" aria-hidden="true" />
                        </button>
                      </h3>
                      <div
                        className="faq-answer"
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-button-${index}`}
                        hidden={!isOpen}
                      >
                        <div className="faq-answer__inner">
                          {faq.answer}
                          {faq.reference && (
                            <p className="faq-reference">
                              <i className="fa-solid fa-book-open" aria-hidden="true" /> Reference:{" "}
                              <a
                                href={faq.reference}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {referenceLabel(faq.reference)}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="contact-rail">
              <div className="contact-card">
                <p className="eyebrow">Still stuck?</p>
                <h2>Talk to the chapter.</h2>
                <p>
                  Reach the team directly for mentoring, event details, collaborations or
                  documentation help.
                </p>

                <ul className="contact-card__list">
                  <li>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    <a href="mailto:gkmwin563@gmail.com">gkmwin563@gmail.com</a>
                  </li>
                  <li>
                    <i className="fa-brands fa-instagram" aria-hidden="true" />
                    <a
                      href="https://www.instagram.com/wikiclubtech.uit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @wikiclubtech.uit
                    </a>
                  </li>
                  <li>
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                    <a
                      href="https://www.linkedin.com/company/wikitech-uit/?originalSubdomain=in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      wikitech-uit
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    <span>United Institute of Technology, Naini, Prayagraj</span>
                  </li>
                </ul>

                <div className="contact-card__actions">
                  <Link to="/OurEvents" className="btn btn--primary btn--sm">
                    See upcoming sessions
                  </Link>
                  <a
                    href="https://meta.wikimedia.org/wiki/WikiClub_Tech/WikiClub_Tech_UIT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary btn--sm"
                  >
                    Meta-Wiki ↗
                  </a>
                </div>
              </div>

              <div className="contact-tip">
                <i className="fa-solid fa-lightbulb" aria-hidden="true" />
                <p>
                  <strong>Quick tip:</strong> before asking, search Phabricator for a matching
                  task — many beginner issues already have a mentor attached.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="contact">
        <div className="wrap">
          <div className="query-layout">
            <div className="query-intro">
              <p className="eyebrow eyebrow--green">Contact form</p>
              <h2 className="section-title">Send us a message.</h2>
              <p className="section-lede">
                Your question lands in the chapter's review queue. Share as much context as you can
                — links, screenshots or the task you are working on all help.
              </p>

              <ul className="check-list query-intro__list">
                <li>Mentorship for your first Wikimedia contribution</li>
                <li>Workshop, hackathon and event requests</li>
                <li>Collaboration or partnership enquiries</li>
                <li>Feedback on this website or chapter programmes</li>
              </ul>

              <p className="query-intro__note">
                Prefer email? Write to <a href="mailto:gkmwin563@gmail.com">gkmwin563@gmail.com</a>.
              </p>
            </div>

            <div className="query-card">
              <QueryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
