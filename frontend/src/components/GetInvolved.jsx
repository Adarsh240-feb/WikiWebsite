import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import "./GetInvolved.css";

const skillPaths = [
  {
    id: "writing",
    icon: "✍️",
    title: "Writing & Research",
    short: "Improve encyclopaedia articles using reliable published sources.",
    tag: "No Coding Required",
    time: "10–15 mins",
    difficulty: "Beginner Friendly",
    project: "Wikipedia",
    destLabel: "Encyclopaedia articles with verifiability and neutrality.",
    summary:
      "You do not need to write entire articles from scratch. You can start by correcting grammar, adding inline citations from reliable published books or journals, clarifying ambiguous phrasing, and participating in article talk page discussions.",
    steps: [
      "Find a topic you are passionate about that needs inline citations.",
      "Check reliable secondary sources (books, news, academic publications).",
      "Add neutral, fact-checked sentences with proper citation templates.",
    ],
    proTip: "Start with small copy-edits and citation fixes before creating an article from scratch.",
    actionText: "Read Wikipedia's Five Pillars",
    actionUrl: "https://en.wikipedia.org/wiki/Wikipedia:Five_pillars",
    anchor: "#rules",
    tone: "green",
  },
  {
    id: "photography",
    icon: "📸",
    title: "Photography & Media",
    short: "Share original photographs, diagrams, and historical documents.",
    tag: "Media & Camera",
    time: "5–10 mins",
    difficulty: "Beginner Friendly",
    project: "Wikimedia Commons",
    destLabel: "Free media repository used by all Wikimedia projects.",
    summary:
      "Contribute photographs you took yourself, technical diagrams you created, or media clearly in the public domain. Never upload images copied from search engines or social media. Commons media is released under verifiable free licenses (CC BY-SA, CC BY, or Public Domain).",
    steps: [
      "Take high-resolution educational photographs (monuments, flora, campus, events).",
      "Verify you own 100% of the copyright (no third-party art/posters in frame).",
      "Upload using the Commons Upload Wizard and choose CC BY-SA 4.0.",
    ],
    proTip: "Always give descriptive file names and categorize images so editors worldwide can find them.",
    actionText: "Learn What You Can Upload",
    actionUrl: "https://commons.wikimedia.org/wiki/Commons:First_steps/Contributing/en",
    anchor: "#commons-flow",
    tone: "green",
  },
  {
    id: "data",
    icon: "📊",
    title: "Structured Data & Facts",
    short: "Organise multilingual statements and machine-readable items.",
    tag: "Data & Logic",
    time: "15 mins",
    difficulty: "Intermediate",
    project: "Wikidata",
    destLabel: "The central structured, linked knowledge database.",
    summary:
      "Help link facts across projects: add birth dates, coordinates, identifiers, academic references, and translations to Wikidata items. Wikidata powers Wikipedia infoboxes and external research engines worldwide.",
    steps: [
      "Search for an existing item (e.g. an author, river, or open-source library).",
      "Add missing statements (P-properties like 'educated at' or 'official website').",
      "Attach a reliable reference URL confirming the statement.",
    ],
    proTip: "Statements on Wikidata are language-independent and power search algorithms worldwide.",
    actionText: "Explore Wikidata Introduction",
    actionUrl: "https://www.wikidata.org/wiki/Wikidata:Introduction",
    anchor: "#ecosystem",
    tone: "blue",
  },
  {
    id: "proofreading",
    icon: "📖",
    title: "Texts & Proofreading",
    short: "Preserve public-domain books and historical source manuscripts.",
    tag: "Literature & History",
    time: "20 mins",
    difficulty: "Beginner Friendly",
    project: "Wikisource",
    destLabel: "Free-content library of source texts and translations.",
    summary:
      "Transcribe and proofread scanned pages of public-domain books, historical speeches, poetry, and regional literature so they are searchable, accessible, and preserved forever.",
    steps: [
      "Pick a scanned book project from the Wikisource Index.",
      "Compare the scanned page image on the left with the OCR text on the right.",
      "Correct typo discrepancies and mark the page as proofread (yellow to green).",
    ],
    proTip: "Great for literature lovers who want to preserve regional works in Hindi or English.",
    actionText: "Explore Wikisource Proofreading",
    actionUrl: "https://en.wikisource.org/wiki/Wikisource:Proofreading",
    anchor: "#ecosystem",
    tone: "blue",
  },
  {
    id: "bugs",
    icon: "🐛",
    title: "Bug Reporting & Testing",
    short: "Spot software glitches and write reproducible bug tasks.",
    tag: "QA & Testing",
    time: "15 mins",
    difficulty: "Intermediate",
    project: "Phabricator",
    destLabel: "Wikimedia's software issue tracking and planning platform.",
    summary:
      "When software behaves unexpectedly, searching existing tasks and submitting a precise, reproducible bug report with browser logs and screenshots is an invaluable technical contribution.",
    steps: [
      "Search Phabricator first to make sure the bug hasn't already been reported.",
      "Document OS, browser version, exact URL, and step-by-step reproduction.",
      "Tag the appropriate project tag (e.g. #MediaWiki-extensions or #Vector).",
    ],
    proTip: "Never say 'it doesn't work'—include screenshots, error logs, and exact steps.",
    actionText: "Read How to Report a Bug",
    actionUrl: "https://www.mediawiki.org/wiki/Bugreport",
    anchor: "#gerrit",
    tone: "red",
  },
  {
    id: "coding",
    icon: "💻",
    title: "Programming & Code Review",
    short: "Submit code improvements and bugfixes through Gerrit review.",
    tag: "Code & Upstream",
    time: "Sprint Track",
    difficulty: "Advanced Developer",
    project: "Gerrit & MediaWiki",
    destLabel: "Open-source wiki engine and Git code review system.",
    summary:
      "Clone MediaWiki core or extensions, set up your developer environment, write focused patches with tests, and submit them via git-review for peer code review by experienced maintainers.",
    steps: [
      "Create a Wikimedia developer account and upload your public SSH key.",
      "Clone the repo and install git-review.",
      "Write clean code following MediaWiki coding standards and submit via git-review.",
    ],
    proTip: "Preserve the Change-Id hook in your commit message so Gerrit can track revisions.",
    actionText: "Follow Gerrit Tutorial",
    actionUrl: "https://www.mediawiki.org/wiki/Gerrit/Tutorial/en",
    anchor: "#gerrit",
    tone: "blue",
  },
  {
    id: "beginner",
    icon: "🌱",
    title: "Completely New to Wikimedia",
    short: "Start with curated orientation and hands-on club workshops.",
    tag: "Start Here",
    time: "5 mins",
    difficulty: "All Welcome",
    project: "WikiClub Tech UIT Guidance",
    destLabel: "Student-led onboarding and mentorship at UIT Prayagraj.",
    summary:
      "You are in the right place! WikiClub Tech UIT hosts interactive workshops, Road to Wiki cohort mentorship, and sprint sessions to guide you through your very first edit or upload step-by-step.",
    steps: [
      "Explore the 5 foundational pillars below.",
      "Take our quick 5-question orientation quiz.",
      "Connect with our campus leads at the next UIT sprint session.",
    ],
    proTip: "No prior experience or technical background is needed. Curiosity is the only prerequisite.",
    actionText: "Meet the Team & Connect",
    actionUrl: "/Team",
    anchor: "#rules",
    tone: "green",
  },
];

const contentProjects = [
  {
    name: "Wikipedia",
    role: "Free Encyclopaedic Knowledge",
    tag: "Encyclopaedia",
    difficulty: "Beginner Friendly",
    bestFor: "Researchers, writers, fact-checkers",
    desc: "Collaborative articles in over 300 languages written with neutral point of view and verifiable citations.",
    url: "https://en.wikipedia.org/wiki/Main_Page",
  },
  {
    name: "Wikimedia Commons",
    role: "Free Media Repository",
    tag: "Media & Photos",
    difficulty: "Beginner Friendly",
    bestFor: "Photographers, illustrators, graphic designers",
    desc: "Over 100 million freely usable photographs, educational illustrations, videos, and historical audio files.",
    url: "https://commons.wikimedia.org/wiki/Main_Page",
  },
  {
    name: "Wikidata",
    role: "Structured Knowledge Base",
    tag: "Linked Data",
    difficulty: "Intermediate",
    bestFor: "Data analysts, developers, cataloguers",
    desc: "Machine-readable, multilingual linked data enabling queries across billions of open statements and references.",
    url: "https://www.wikidata.org/wiki/Wikidata:Main_Page",
  },
  {
    name: "Wikisource",
    role: "Free Source Documents",
    tag: "Digital Library",
    difficulty: "Beginner Friendly",
    bestFor: "Literature lovers, proofreaders, translators",
    desc: "Digital library preserving out-of-copyright books, historical treaties, and source literature.",
    url: "https://wikisource.org/wiki/Main_Page",
  },
  {
    name: "Wiktionary",
    role: "Collaborative Dictionary",
    tag: "Linguistics",
    difficulty: "Beginner Friendly",
    bestFor: "Language enthusiasts, linguists, translators",
    desc: "Comprehensive multilingual dictionary with definitions, etymologies, pronunciations, and quotations.",
    url: "https://en.wiktionary.org/wiki/Wiktionary:Main_Page",
  },
  {
    name: "Wikibooks",
    role: "Open Textbooks",
    tag: "Education",
    difficulty: "Intermediate",
    bestFor: "Educators, student course creators",
    desc: "Free open-content textbooks, study manuals, and educational guides written by educators and learners.",
    url: "https://en.wikibooks.org/wiki/Main_Page",
  },
];

const techTools = [
  {
    name: "Phabricator",
    role: "Task Tracker & Planning",
    tag: "Issue Tracking",
    difficulty: "Intermediate",
    bestFor: "Bug hunters, project managers, QA testers",
    desc: "The central project management tool where bug reports, feature requests, and sprint boards live. Not for editing articles.",
    url: "https://phabricator.wikimedia.org/",
  },
  {
    name: "Gerrit",
    role: "Code Review Engine",
    tag: "Code Review",
    difficulty: "Advanced Developer",
    bestFor: "Software contributors, Git developers",
    desc: "Web-based code review system for Git repositories. Maintainers review patch sets (+1, +2) before code is merged.",
    url: "https://gerrit.wikimedia.org/",
  },
  {
    name: "MediaWiki",
    role: "Open-Source Wiki Platform",
    tag: "Core Engine",
    difficulty: "Advanced Developer",
    bestFor: "PHP, JS, CSS, and API developers",
    desc: "The PHP & JavaScript software powering Wikipedia, with thousands of extensions, skins, APIs, and tools.",
    url: "https://www.mediawiki.org/wiki/MediaWiki",
  },
  {
    name: "Wikimedia Developer Portal",
    role: "Developer Onboarding Hub",
    tag: "Docs & Guides",
    difficulty: "All Levels",
    bestFor: "Anyone wanting to build bots, tools, or patches",
    desc: "Official guide to technical accounts, architecture conventions, code conventions, and good first issues.",
    url: "https://developer.wikimedia.org/contribute/overview/",
  },
];

const importantRules = [
  {
    num: "01",
    title: "Five Pillars",
    desc: "Wikipedia is an encyclopaedia; it is written from a neutral point of view; it is free content; editors should treat one another with civility; and it has policies rather than rigid dogmatic rules.",
    badge: "Core Philosophy",
  },
  {
    num: "02",
    title: "Neutral Point of View (NPOV)",
    desc: "Articles must represent all significant viewpoints fairly and in proportion to reliable published sources. Never write promotional copy, advertising, or personal opinion as fact.",
    badge: "Tone & Voice",
  },
  {
    num: "03",
    title: "Verifiability (V)",
    desc: "Readers must be able to verify information using reliable independent sources. The burden of proof rests on the editor adding or restoring challenged content.",
    badge: "Citations",
  },
  {
    num: "04",
    title: "No Original Research (NOR)",
    desc: "Do not publish unpublished facts, theories, or original syntheses. Summarise what reliable secondary sources have already published without creating novel conclusions.",
    badge: "Secondary Sources",
  },
  {
    num: "05",
    title: "Reliable Sources (RS)",
    desc: "Prefer peer-reviewed academic journals, reputable news organisations, and established publishing houses. Social media posts, forum comments, and personal blogs are generally not reliable.",
    badge: "Trust & Quality",
  },
  {
    num: "06",
    title: "Conflict of Interest (COI)",
    desc: "If writing about yourself, your college, club, or employer, disclose your relationship openly on your user page and propose changes on the article's Talk page rather than directly editing.",
    badge: "Transparency",
  },
];

const doDontComparisons = [
  {
    topic: "Article Wording & Tone",
    doText: "Write neutral, objective sentences citing verified books or news: 'The department was founded in 2012 and offers accredited degrees.'",
    dontText: "Write subjective puffery or promotional marketing: 'The department is the best and most revolutionary in the state!'",
  },
  {
    topic: "Image Uploads to Commons",
    doText: "Upload photos you personally snapped with your own camera or phone, specifying a CC BY-SA 4.0 license.",
    dontText: "Never upload photos found on Google Images, Instagram, Pinterest, or college promotional websites.",
  },
  {
    topic: "Campus & College Edits (COI)",
    doText: "Disclose your student affiliation on your user page and suggest updates with reliable citations on the Talk page.",
    dontText: "Never create an article about yourself, a classmate, or a college event as promotional PR.",
  },
];

const quizQuestions = [
  {
    q: "Can I upload a photograph from Google Images to Wikimedia Commons because it is available online?",
    options: [
      { text: "Yes, anything indexed on Google Images is free to reuse.", correct: false },
      { text: "No. You must either be the creator, have verifiable free license permission, or prove it is public domain.", correct: true },
      { text: "Yes, as long as you put the link where you downloaded it in the caption.", correct: false },
    ],
    explanation: "Being visible online does NOT mean it is free to reuse. Commons requires works to be under verifiable free licenses (like CC BY-SA) or in the public domain.",
    policyUrl: "https://commons.wikimedia.org/wiki/Commons:Licensing",
  },
  {
    q: "Can you publish your own unpublished theory on Wikipedia if it sounds completely logical?",
    options: [
      { text: "No. Wikipedia strictly forbids Original Research; claims must summarise published reliable sources.", correct: true },
      { text: "Yes, original scientific discoveries should be published on Wikipedia first.", correct: false },
      { text: "Yes, provided at least two classmates review it.", correct: false },
    ],
    explanation: "Wikipedia's 'No Original Research' policy prohibits novel syntheses or unverified theories. Every substantive claim requires reliable secondary citations.",
    policyUrl: "https://en.wikipedia.org/wiki/Wikipedia:No_original_research",
  },
  {
    q: "Is Gerrit where you write and edit encyclopaedia articles?",
    options: [
      { text: "Yes, Gerrit is the default wiki visual editor.", correct: false },
      { text: "No. Gerrit is a Git code review system for reviewing software patches to MediaWiki.", correct: true },
      { text: "Yes, for articles related to technology only.", correct: false },
    ],
    explanation: "Gerrit is exclusively used for software development and Git code reviews, not for encyclopaedic article writing.",
    policyUrl: "https://www.mediawiki.org/wiki/Gerrit",
  },
  {
    q: "In Wikimedia Gerrit code review, does a +1 vote from a reviewer mean the code is merged?",
    options: [
      { text: "Yes, +1 merges the patch immediately into the repository.", correct: false },
      { text: "No, +1 means 'looks good to me', but maintainer approval (+2) is required to merge.", correct: true },
      { text: "No, you must have +5 to merge.", correct: false },
    ],
    explanation: "In Gerrit, +1 indicates supportive peer review, but only an authorized repository maintainer's +2 vote permits the automated merger into the main branch.",
    policyUrl: "https://www.mediawiki.org/wiki/Gerrit/How_Gerrit_works/en",
  },
  {
    q: "Do you need to know how to code to contribute meaningfully to Wikimedia projects?",
    options: [
      { text: "Yes, all contributors must submit patches in PHP or JavaScript.", correct: false },
      { text: "No. Writing, proofreading, photography, translating, data entry, and community organizing are equally vital.", correct: true },
      { text: "Yes, but HTML is acceptable.", correct: false },
    ],
    explanation: "The Wikimedia movement is vast! Content research, translation, media uploads, copy-editing, and structured data are the foundation of free knowledge.",
    policyUrl: "https://meta.wikimedia.org/wiki/Wikimedia_projects",
  },
];

const officialDocs = [
  {
    title: "Wikipedia: Five Pillars",
    cat: "Wikipedia",
    desc: "The fundamental five principles governing the world's largest open encyclopaedia.",
    url: "https://en.wikipedia.org/wiki/Wikipedia:Five_pillars",
  },
  {
    title: "Neutral Point of View Policy",
    cat: "Wikipedia",
    desc: "How to present all significant viewpoints fairly and without editorial bias.",
    url: "https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view",
  },
  {
    title: "Verifiability Guidelines",
    cat: "Wikipedia",
    desc: "Requirements for direct supporting citations and reliable secondary sources.",
    url: "https://en.wikipedia.org/wiki/Wikipedia:Verifiability",
  },
  {
    title: "Conflict of Interest Policy",
    cat: "Wikipedia",
    desc: "Guidance on editing topics where you have personal, organizational, or academic ties.",
    url: "https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest",
  },
  {
    title: "Commons Licensing Policy",
    cat: "Commons",
    desc: "Permitted licenses, CC BY-SA, public domain criteria, and why fair-use is prohibited.",
    url: "https://commons.wikimedia.org/wiki/Commons:Licensing",
  },
  {
    title: "How to Report a Bug (MediaWiki)",
    cat: "Technical",
    desc: "Writing actionable, reproducible bug reports with environment details and logs.",
    url: "https://www.mediawiki.org/wiki/Bugreport",
  },
  {
    title: "Gerrit Git Tutorial for Beginners",
    cat: "Technical",
    desc: "Setting up SSH keys, git-review, commit messages, and the Change-Id workflow.",
    url: "https://www.mediawiki.org/wiki/Gerrit/Tutorial/en",
  },
  {
    title: "Universal Code of Conduct (UCoC)",
    cat: "Conduct",
    desc: "Expected behaviour, mutual respect, and harassment prevention across all spaces.",
    url: "https://foundation.wikimedia.org/wiki/UCoC",
  },
];

export default function GetInvolved() {
  const [selectedSkill, setSelectedSkill] = useState("writing");
  const [ecoTab, setEcoTab] = useState("content"); // 'content' or 'tech'
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [docFilter, setDocFilter] = useState("All");

  // Interactive Checklist
  const [checklist, setChecklist] = useState({
    npov: true,
    sources: true,
    ownWords: true,
    copyright: true,
    summary: false,
    conduct: true,
  });

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const currentSkill = skillPaths.find((s) => s.id === selectedSkill) || skillPaths[0];

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (quizQuestions[activeQuizIndex].options[index].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (activeQuizIndex + 1 < quizQuestions.length) {
      setActiveQuizIndex((prev) => prev + 1);
    } else {
      setQuizDone(true);
    }
  };

  const handleResetQuiz = () => {
    setActiveQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizDone(false);
  };

  const filteredDocs =
    docFilter === "All" ? officialDocs : officialDocs.filter((d) => d.cat === docFilter);

  return (
    <main className="get-involved-page">
      {/* 1. Cinematic Contribution Hero with High-Contrast Red & White Buttons */}
      <section className="gi-hero">
        <div className="wrap gi-hero__inner">
          <div className="gi-hero__content">
            <div className="gi-hero__eyebrow">
              <span className="dot" aria-hidden="true" />
              START CONTRIBUTING · OPEN KNOWLEDGE LEARNING HUB
            </div>
            <h1>Your skills can help make knowledge open.</h1>
            <p className="gi-hero__lede">
              Write, photograph, research, translate, report a bug, or improve upstream code.
              There is a welcoming place for your curiosity at every skill level.
            </p>

            {/* High Visibility Hero Buttons: Pure White Primary + Accent Red Secondary */}
            <div className="gi-hero__ctas">
              <a href="#selector" className="btn btn-hero-white">
                Find My Contribution Path <span className="btn__arrow">↓</span>
              </a>
              <a href="#ecosystem" className="btn btn-hero-red">
                Explore Projects Map <span className="btn__arrow">→</span>
              </a>
            </div>

            <div className="gi-hero__reassurance">
              <span>🌱</span>
              <span>
                <strong>Zero Experience Needed:</strong> 70% of Wikimedia work is writing, photography, and proofreading.
              </span>
            </div>
          </div>

          {/* Clean, Interactive Quick-Start Orientation Card (Replaces the unnecessary SVG) */}
          <div className="gi-hero-card">
            <div className="gi-hero-card__header">
              <span className="gi-hero-card__badge">💡 QUICK ORIENTATION</span>
              <span className="gi-hero-card__status">UIT Chapter Guide</span>
            </div>
            <h3>Why contribute with us?</h3>
            <ul className="gi-hero-card__list">
              <li>
                <span className="gi-card-icon">⚡</span>
                <div>
                  <strong>No Coding Needed to Begin</strong>
                  <p>Start with citations, copy-editing, or taking campus landmark photos.</p>
                </div>
              </li>
              <li>
                <span className="gi-card-icon">🛡️</span>
                <div>
                  <strong>Safe & Reversible</strong>
                  <p>Every edit is version-controlled. You cannot accidentally break Wikipedia!</p>
                </div>
              </li>
              <li>
                <span className="gi-card-icon">⏱️</span>
                <div>
                  <strong>First Edit in 10 Minutes</strong>
                  <p>Quick, verified milestones guided by peer student mentors.</p>
                </div>
              </li>
              <li>
                <span className="gi-card-icon">🌍</span>
                <div>
                  <strong>Global Attribution</strong>
                  <p>Your work is read and cited by millions under free open licenses.</p>
                </div>
              </li>
            </ul>

            <div className="gi-hero-card__footer">
              <span>Jump straight to:</span>
              <div className="gi-hero-card__pills">
                <a href="#rules">Rules</a>
                <a href="#commons-flow">Copyright</a>
                <a href="#quiz">Quiz</a>
                <a href="#checklist">Checklist</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sticky Table of Contents Quick-Jump Bar for Effortless Reading */}
      <nav className="gi-toc" aria-label="Learning Hub Sections">
        <div className="wrap gi-toc__inner">
          <span className="gi-toc__label">Jump to Section:</span>
          <div className="gi-toc__links">
            <a href="#selector" className="gi-toc__chip">🎯 1. Skill Matcher</a>
            <a href="#ecosystem" className="gi-toc__chip">🗺️ 2. Projects Map</a>
            <a href="#rules" className="gi-toc__chip">⚖️ 3. Core Rules &amp; COI</a>
            <a href="#commons-flow" className="gi-toc__chip">📸 4. Commons Copyright</a>
            <a href="#gerrit" className="gi-toc__chip">💻 5. Dev Review Cycle</a>
            <a href="#quiz" className="gi-toc__chip">🧠 6. 5-Question Quiz</a>
            <a href="#checklist" className="gi-toc__chip">📋 7. Pre-Flight Checklist</a>
            <a href="#docs" className="gi-toc__chip">📚 8. Official Docs</a>
          </div>
        </div>
      </nav>

      {/* 3. Reassurance Strip: "Start with what you already love" */}
      <section className="gi-strip">
        <div className="wrap gi-strip__inner">
          <div className="gi-strip__heading">
            <span>✨</span> What do you enjoy? Choose your contribution superpower:
          </div>
          <div className="gi-strip__badges">
            <span className="gi-strip__badge">✍️ Writing &amp; Research</span>
            <span className="gi-strip__badge">📸 Photography &amp; Media</span>
            <span className="gi-strip__badge">📊 Data &amp; Facts</span>
            <span className="gi-strip__badge">📖 Proofreading</span>
            <span className="gi-strip__badge">🐛 Bug Testing</span>
            <span className="gi-strip__badge">💻 Software Development</span>
          </div>
        </div>
      </section>

      {/* 4. Interactive Skill Selector: "Find your contribution path" */}
      <section id="selector" className="gi-selector">
        <div className="wrap">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--green">STEP 1 · INTERACTIVE ONBOARDING</span>
              <h2 className="section-title">Find Your Contribution Pathway</h2>
              <p className="section-lede">
                Click any activity below to get an instant action passport with recommended projects,
                step-by-step guidance, and beginner pro-tips.
              </p>
            </div>
          </Reveal>

          <div className="gi-selector__grid">
            {skillPaths.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`gi-skill-btn${selectedSkill === item.id ? " is-active" : ""}`}
                onClick={() => setSelectedSkill(item.id)}
              >
                <div className="gi-skill-btn__top">
                  <span className="gi-skill-btn__icon">{item.icon}</span>
                  <span className="gi-skill-btn__tag">{item.tag}</span>
                </div>
                <div className="gi-skill-btn__text">
                  <strong>{item.title}</strong>
                  <span>{item.short}</span>
                </div>
                <div className="gi-skill-btn__meta">
                  <span>⏱️ {item.time}</span>
                  <span className="gi-skill-btn__diff">{item.difficulty}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Recommendation Action Passport */}
          <div className="gi-recommendation">
            <div className="gi-recommendation__header">
              <div>
                <span className="gi-recommendation__tag">RECOMMENDED DESTINATION</span>
                <h3 className="gi-recommendation__dest">{currentSkill.project}</h3>
                <span className="chip chip--green">{currentSkill.destLabel}</span>
              </div>
              <div className="gi-recommendation__badges">
                <span className="chip chip--blue">⏱️ {currentSkill.time}</span>
                <span className="chip chip--outline">{currentSkill.difficulty}</span>
              </div>
            </div>

            <p className="gi-recommendation__summary">{currentSkill.summary}</p>

            {/* 3-Step Action Plan */}
            <div className="gi-recommendation__steps">
              <h4>📋 3 Practical Steps to Start:</h4>
              <ol>
                {currentSkill.steps.map((st, i) => (
                  <li key={i}>
                    <strong>Step {i + 1}:</strong> {st}
                  </li>
                ))}
              </ol>
            </div>

            {/* Pro Tip Box */}
            <div className="gi-pro-tip">
              <span className="gi-pro-tip__icon">💡</span>
              <div>
                <strong>Student Pro-Tip:</strong> {currentSkill.proTip}
              </div>
            </div>

            <div className="gi-recommendation__action-row">
              <a
                href={currentSkill.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--lg"
              >
                {currentSkill.actionText} ↗
              </a>
              <a href={currentSkill.anchor} className="btn btn--secondary btn--lg">
                Explore Detailed Guidelines Below ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Wikimedia Ecosystem Explainer: Content Projects vs Technical Tools */}
      <section id="ecosystem" className="gi-ecosystem">
        <div className="wrap">
          <Reveal>
            <div className="section-head section-head--split">
              <div>
                <span className="eyebrow eyebrow--blue">STEP 2 · ECOSYSTEM ARCHITECTURE</span>
                <h2 className="section-title">Understanding the Wikimedia Landscape</h2>
                <p className="section-lede">
                  Beginners often confuse wiki content projects with developer tools.
                  Notice the difference: content projects are collaborative encyclopaedias and media repositories,
                  while Phabricator and Gerrit are technical collaboration systems.
                </p>
              </div>

              {/* Interactive Tab Switcher */}
              <div className="gi-eco-tabs" role="tablist">
                <button
                  type="button"
                  className={`gi-eco-tab${ecoTab === "content" ? " is-active" : ""}`}
                  onClick={() => setEcoTab("content")}
                >
                  📚 Knowledge Content ({contentProjects.length})
                </button>
                <button
                  type="button"
                  className={`gi-eco-tab${ecoTab === "tech" ? " is-active" : ""}`}
                  onClick={() => setEcoTab("tech")}
                >
                  ⚙️ Developer Tools ({techTools.length})
                </button>
              </div>
            </div>
          </Reveal>

          {/* Tab 1: Knowledge Content Projects */}
          {ecoTab === "content" && (
            <div className="gi-eco-zone animate-fade-in">
              <div className="gi-zone-banner gi-zone-banner--green">
                <span className="gi-zone-banner__tag">ZONE A: FREE KNOWLEDGE CONTENT</span>
                <p>
                  Where volunteer editors write, verify, fact-check, and illustrate encyclopaedic and educational resources for the public.
                </p>
              </div>
              <div className="gi-eco-grid">
                {contentProjects.map((p) => (
                  <div key={p.name} className="gi-project-card gi-project-card--content">
                    <div className="gi-project-card__top">
                      <span className="chip chip--green">{p.tag}</span>
                      <span className="gi-project-card__diff">{p.difficulty}</span>
                    </div>
                    <h3>{p.name}</h3>
                    <strong className="gi-project-card__role">{p.role}</strong>
                    <p>{p.desc}</p>
                    <div className="gi-project-card__meta">
                      <strong>Best For:</strong> {p.bestFor}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="gi-link">
                      Explore {p.name} Portal ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Technical Tools & Developer Spaces */}
          {ecoTab === "tech" && (
            <div className="gi-eco-zone animate-fade-in">
              <div className="gi-zone-banner gi-zone-banner--blue">
                <span className="gi-zone-banner__tag">ZONE B: DEVELOPER SYSTEMS &amp; INFRASTRUCTURE</span>
                <p>
                  Where software engineers, systems admins, and open-source contributors build, test, and review the open-source software powering wikis.
                </p>
              </div>
              <div className="gi-eco-grid">
                {techTools.map((t) => (
                  <div key={t.name} className="gi-project-card gi-project-card--tech">
                    <div className="gi-project-card__top">
                      <span className="chip chip--blue">{t.tag}</span>
                      <span className="gi-project-card__diff">{t.difficulty}</span>
                    </div>
                    <h3>{t.name}</h3>
                    <strong className="gi-project-card__role">{t.role}</strong>
                    <p>{t.desc}</p>
                    <div className="gi-project-card__meta">
                      <strong>Best For:</strong> {t.bestFor}
                    </div>
                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="gi-link">
                      Open {t.name} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Essential Rules & Practical DOs vs DON'Ts */}
      <section id="rules" className="gi-rules">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow eyebrow--green">STEP 3 · FOUNDATIONAL POLICIES</span>
              <h2 className="section-title">Rules That Matter Before You Edit</h2>
              <p className="section-lede">
                Wikimedia communities rely on trust, reliable sources, and mutual civility.
                Keep these verified foundational rules in mind for every edit.
              </p>
            </div>
          </Reveal>

          <div className="gi-rules-grid">
            {importantRules.map((rule) => (
              <div key={rule.num} className="gi-rule-card">
                <div className="gi-rule-card__top">
                  <div className="gi-rule-card__num">{rule.num}</div>
                  <span className="gi-rule-card__badge">{rule.badge}</span>
                </div>
                <h3>{rule.title}</h3>
                <p>{rule.desc}</p>
              </div>
            ))}
          </div>

          {/* Practical DOs vs DONTs Visual Guide */}
          <div className="gi-dodont-section">
            <h3 className="gi-dodont-heading">
              <span>⚖️</span> Practical DOs and DON'Ts for New Editors
            </h3>
            <div className="gi-dodont-grid">
              {doDontComparisons.map((item, idx) => (
                <div key={idx} className="gi-dodont-card">
                  <h4>{item.topic}</h4>
                  <div className="gi-do-box">
                    <span className="gi-do-icon">✅ DO:</span>
                    <p>{item.doText}</p>
                  </div>
                  <div className="gi-dont-box">
                    <span className="gi-dont-icon">❌ DON'T:</span>
                    <p>{item.dontText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conflict of Interest Warning Callout */}
          <div className="gi-coi-banner">
            <span className="gi-coi-icon">⚠️</span>
            <div>
              <h4>Important Campus Reminder on Conflict of Interest (COI)</h4>
              <p>
                A student writing about their own college, club, faculty, or personal project may have a Conflict of Interest.
                Never use Wikipedia as promotional PR. Disclose your connection openly on your user page and propose
                changes through the article Talk page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Commons Copyright Checkpoint (Step-by-Step Decision Pathway) */}
      <section id="commons-flow" className="gi-decision-tree-section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow eyebrow--red">STEP 4 · COMMONS COPYRIGHT CHECKPOINT</span>
              <h2 className="section-title">Can I Upload This Image?</h2>
              <p className="section-lede">
                90% of deleted uploads happen because users copy images from Google or social media.
                Follow this simple 3-step decision rule before uploading to Wikimedia Commons:
              </p>
            </div>
          </Reveal>

          <div className="gi-decision-tree">
            <div className="gi-dt-step gi-dt-step--1">
              <div className="gi-dt-step__header">
                <span className="gi-step-num">01</span>
                <div>
                  <strong>Did you take this photograph yourself?</strong>
                  <span>Check your camera or phone roll</span>
                </div>
              </div>
              <div className="gi-dt-paths">
                <div className="gi-dt-choice gi-dt-choice--green">
                  <strong>✅ YES:</strong>
                  <p>You own all rights! Proceed to Commons Upload Wizard and choose <strong>CC BY-SA 4.0</strong>.</p>
                </div>
                <div className="gi-dt-choice gi-dt-choice--orange">
                  <strong>⚠️ NO:</strong>
                  <p>You did NOT click it. Stop and ask: Do you have explicit written free-license proof?</p>
                </div>
              </div>
            </div>

            <div className="gi-dt-step gi-dt-step--2">
              <div className="gi-dt-step__header">
                <span className="gi-step-num">02</span>
                <div>
                  <strong>Is there verifiable free license evidence?</strong>
                  <span>CC BY-SA, CC BY, or Public Domain</span>
                </div>
              </div>
              <div className="gi-dt-paths">
                <div className="gi-dt-choice gi-dt-choice--green">
                  <strong>✅ YES:</strong>
                  <p>Provide the source URL and original photographer credit in the upload description.</p>
                </div>
                <div className="gi-dt-choice gi-dt-choice--red">
                  <strong>❌ NO:</strong>
                  <p><strong>STOP! Do not upload.</strong> Being visible online on Google does NOT make an image free.</p>
                </div>
              </div>
            </div>

            <div className="gi-dt-step gi-dt-step--3">
              <div className="gi-dt-step__header">
                <span className="gi-step-num">03</span>
                <div>
                  <strong>Is it within Commons educational scope?</strong>
                  <span>Encyclopaedic value for the public</span>
                </div>
              </div>
              <div className="gi-dt-paths">
                <div className="gi-dt-choice gi-dt-choice--green">
                  <strong>✅ YES:</strong>
                  <p>Monuments, campus architecture, technical diagrams, nature, species, and public lectures.</p>
                </div>
                <div className="gi-dt-choice gi-dt-choice--red">
                  <strong>❌ NO:</strong>
                  <p>Private selfies, holiday party photos, and screenshots of third-party copyrighted software.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Technical Contribution: Phabricator & Gerrit */}
      <section id="gerrit" className="section section--alt">
        <div className="wrap">
          <Reveal>
            <div className="section-head section-head--split">
              <div>
                <span className="eyebrow eyebrow--blue">STEP 5 · TECHNICAL WORKFLOW</span>
                <h2 className="section-title">Gerrit &amp; Phabricator Upstream Path</h2>
                <p className="section-lede">
                  How code flows from a reproducible bug report into a merged MediaWiki patch.
                </p>
              </div>
              <a
                href="https://www.mediawiki.org/wiki/Gerrit/Tutorial/en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--blue"
              >
                Official Gerrit Tutorial ↗
              </a>
            </div>
          </Reveal>

          <div className="gi-tech-grid">
            {/* Phabricator Bug Anatomy */}
            <div id="phabricator" className="gi-tech-card">
              <div className="gi-tech-card__badge chip chip--red">Phabricator Task Anatomy</div>
              <h3>Writing an Actionable Bug Report</h3>
              <p className="gi-tech-card__lede">
                Weak reports say <em>"The page does not work"</em>. A good bug task includes exact, numbered reproducible steps:
              </p>
              <ul className="gi-tech-list">
                <li><strong>1. Title:</strong> Specific summary including component name (e.g. <code>[Vector 2022] Search bar overlap</code>).</li>
                <li><strong>2. Environment:</strong> OS, browser version, screen size, and wiki project/language.</li>
                <li><strong>3. Steps to Reproduce:</strong> Step 1, Step 2, Step 3 (step-by-step actions).</li>
                <li><strong>4. Expected Result:</strong> What should happen according to specification.</li>
                <li><strong>5. Actual Result:</strong> What actually broke, with console error logs or screenshot.</li>
              </ul>
              <div className="gi-code-sample">
                <code># Example Task: [Echo] Notification badge does not clear on mobile Firefox 128</code>
              </div>
            </div>

            {/* Gerrit Patch Pathway */}
            <div className="gi-tech-card">
              <div className="gi-tech-card__badge chip chip--blue">Developer Code Review</div>
              <h3>Beginner-to-Patch Review Cycle</h3>
              <ol className="gi-tech-steps">
                <li>
                  <strong>1. Setup SSH:</strong> Create a Wikimedia Developer Account and register your public SSH key.
                </li>
                <li>
                  <strong>2. Clone &amp; Hook:</strong> Clone the repo and install <code>git-review</code> so the automated Change-Id hook is configured.
                </li>
                <li>
                  <strong>3. Branch:</strong> Create a focused branch for one specific bug or feature with unit tests.
                </li>
                <li>
                  <strong>4. Submit:</strong> Run <code>git review</code> to push your patchset into Gerrit.
                </li>
                <li>
                  <strong>5. Peer Review:</strong> Collaborators review (+1 vote) and request minor adjustments.
                </li>
                <li>
                  <strong>6. Merge (+2 Approval):</strong> A designated repository maintainer awards <strong>+2</strong>, merging the patch upstream!
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive Quick Rules Quiz */}
      <section id="quiz" className="gi-quiz">
        <div className="wrap">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--green">STEP 6 · TEST YOUR KNOWLEDGE</span>
              <h2 className="section-title">Quick Wikimedia Rules Check</h2>
              <p className="section-lede">
                A friendly 5-question check to verify your understanding before your first contribution.
              </p>
            </div>
          </Reveal>

          <div className="gi-quiz-container">
            {!quizDone ? (
              <>
                <div className="gi-quiz-progress">
                  <span>Question {activeQuizIndex + 1} of {quizQuestions.length}</span>
                  <div className="gi-quiz-bar">
                    <div
                      className="gi-quiz-bar__fill"
                      style={{ width: `${((activeQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                  <span>Score: {quizScore}</span>
                </div>

                <div className="gi-quiz-question">
                  {quizQuestions[activeQuizIndex].q}
                </div>

                <div className="gi-quiz-options">
                  {quizQuestions[activeQuizIndex].options.map((opt, idx) => {
                    let optClass = "gi-quiz-opt";
                    if (selectedOption !== null) {
                      if (opt.correct) optClass += " is-correct";
                      else if (selectedOption === idx) optClass += " is-wrong";
                    }
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={optClass}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={selectedOption !== null}
                      >
                        <span style={{ fontWeight: 600 }}>{String.fromCharCode(65 + idx)}.</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="gi-quiz-feedback">
                    <strong>
                      {quizQuestions[activeQuizIndex].options[selectedOption].correct
                        ? "✅ Correct!"
                        : "ℹ️ Learning Note:"}
                    </strong>{" "}
                    {quizQuestions[activeQuizIndex].explanation}
                    <div style={{ marginTop: "10px" }}>
                      <a
                        href={quizQuestions[activeQuizIndex].policyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--brand-green)" }}
                      >
                        Read Official Policy Source ↗
                      </a>
                    </div>
                  </div>
                )}

                {selectedOption !== null && (
                  <div className="gi-quiz-nav">
                    <button type="button" className="btn btn--primary" onClick={handleNextQuestion}>
                      {activeQuizIndex + 1 < quizQuestions.length ? "Next Question →" : "See Final Score →"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <span style={{ fontSize: "3.5rem" }}>🎉</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", margin: "14px 0" }}>
                  Quiz Completed!
                </h3>
                <p style={{ fontSize: "1.15rem", color: "var(--ink-soft)" }}>
                  You scored <strong>{quizScore}</strong> out of <strong>{quizQuestions.length}</strong>!
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--muted)", maxWidth: "52ch", margin: "12px auto 24px" }}>
                  You understand the essential foundations: copyright safety, verifiability, neutrality,
                  and the clear distinction between content projects and developer tools.
                </p>
                <button type="button" className="btn btn--secondary" onClick={handleResetQuiz}>
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. Interactive Pre-Flight Contribution Checklist */}
      <section id="checklist" className="gi-checklist">
        <div className="wrap">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--green">STEP 7 · READY TO PUBLISH?</span>
              <h2 className="section-title">Pre-Flight Contribution Checklist</h2>
              <p className="section-lede">
                Verify these 6 criteria before publishing an edit or uploading media:
              </p>
            </div>
          </Reveal>

          {/* Interactive Readiness Status */}
          <div className="gi-checklist-status">
            <div className="gi-checklist-status__info">
              <strong>Publication Readiness:</strong>
              <span>
                {checkedCount === 6
                  ? "🎉 6 of 6 Verified — Fully Ready to Publish!"
                  : `${checkedCount} of 6 criteria verified`}
              </span>
            </div>
            <div className="gi-checklist-status__bar">
              <div
                className="gi-checklist-status__fill"
                style={{
                  width: `${(checkedCount / 6) * 100}%`,
                  background: checkedCount === 6 ? "var(--brand-green)" : "#e6a23c",
                }}
              />
            </div>
          </div>

          <div className="gi-checklist-box">
            <label className={`gi-checklist-item${checklist.npov ? " is-checked" : ""}`}>
              <input
                type="checkbox"
                checked={checklist.npov}
                onChange={() => toggleCheck("npov")}
              />
              <span>
                <strong>1. Neutral Point of View:</strong> Is the wording objective, factual, and free from promotional praise or advertising tone?
              </span>
            </label>

            <label className={`gi-checklist-item${checklist.sources ? " is-checked" : ""}`}>
              <input
                type="checkbox"
                checked={checklist.sources}
                onChange={() => toggleCheck("sources")}
              />
              <span>
                <strong>2. Reliable Published Sources:</strong> Does every factual statement cite a verifiable book, peer-reviewed paper, or reliable news source?
              </span>
            </label>

            <label className={`gi-checklist-item${checklist.ownWords ? " is-checked" : ""}`}>
              <input
                type="checkbox"
                checked={checklist.ownWords}
                onChange={() => toggleCheck("ownWords")}
              />
              <span>
                <strong>3. Own Words:</strong> Did you write the sentences yourself without copy-pasting copyrighted text from third-party websites?
              </span>
            </label>

            <label className={`gi-checklist-item${checklist.copyright ? " is-checked" : ""}`}>
              <input
                type="checkbox"
                checked={checklist.copyright}
                onChange={() => toggleCheck("copyright")}
              />
              <span>
                <strong>4. Verifiable Copyright:</strong> If uploading media, did you personally create it or verify its free license and public domain status?
              </span>
            </label>

            <label className={`gi-checklist-item${checklist.summary ? " is-checked" : ""}`}>
              <input
                type="checkbox"
                checked={checklist.summary}
                onChange={() => toggleCheck("summary")}
              />
              <span>
                <strong>5. Concise Edit Summary:</strong> Did you write a clear, brief summary explaining what changed and why?
              </span>
            </label>

            <label className={`gi-checklist-item${checklist.conduct ? " is-checked" : ""}`}>
              <input
                type="checkbox"
                checked={checklist.conduct}
                onChange={() => toggleCheck("conduct")}
              />
              <span>
                <strong>6. Code of Conduct:</strong> Have you treated other volunteer contributors with respect, patience, and good faith?
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* 11. Official Documentation Library */}
      <section id="docs" className="gi-docs">
        <div className="wrap">
          <Reveal>
            <div className="section-head section-head--split">
              <div>
                <span className="eyebrow eyebrow--green">STEP 8 · AUTHORITATIVE SOURCES</span>
                <h2 className="section-title">Official Wikimedia Documentation</h2>
                <p className="section-lede">
                  All external documentation opens directly on official Meta-Wiki, Wikipedia, Commons, or MediaWiki servers.
                </p>
              </div>

              <div className="gi-docs-filter">
                {["All", "Wikipedia", "Commons", "Technical", "Conduct"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`btn btn--sm${docFilter === cat ? " btn--primary" : " btn--secondary"}`}
                    onClick={() => setDocFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="gi-docs-grid">
            {filteredDocs.map((doc) => (
              <div key={doc.title} className="gi-doc-item">
                <div>
                  <span className="chip" style={{ marginBottom: "8px" }}>{doc.cat}</span>
                  <h4>{doc.title}</h4>
                  <p>{doc.desc}</p>
                </div>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  Open Official Document ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Local Guidance CTA & Disclaimer */}
      <section id="contact" className="gi-cta">
        <div className="wrap">
          <Reveal>
            <h2>Not sure where to begin? Start with WikiClub Tech UIT.</h2>
            <p>
              Tell us what you enjoy—writing, photography, design, or coding—and our student mentors
              will guide you through your very first verified contribution.
            </p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link to="/Team" className="btn btn--light btn--lg">
                Meet the Mentors &amp; Team
              </Link>
              <Link to="/Question" className="btn btn--outline-light btn--lg">
                Ask a Question / Join Next Workshop
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="gi-disclaimer">
        <div className="wrap">
          <strong>Educational Notice:</strong> The explanations on this page are simplified onboarding summaries.
          Wikimedia project policies, licensing standards, and community guidelines are governed by official consensus.
          Always consult the authoritative policy pages linked above before publishing critical edits.
        </div>
      </div>
    </main>
  );
}
