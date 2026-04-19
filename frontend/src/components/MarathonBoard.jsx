import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './ContributionMeter.css';
import './HomePage.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import WikiL from '../Images/WikiL.png';
import WikiS from '../Images/WikiS.png';

/* ─────────────────────────────────────────────
   SVG ICONS & 3D ELEMENTS
───────────────────────────────────────────── */
const LightningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 2px 4px rgba(230, 57, 70, 0.4))' }}>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#lightningGrad)" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
    <defs>
      <linearGradient id="lightningGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--wiki-red)" />
        <stop offset="1" stopColor="var(--wiki-green)" />
      </linearGradient>
    </defs>
  </svg>
);

const FlameIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 3px 5px rgba(230, 57, 70, 0.5))', marginRight: '10px' }}>
    <path d="M12 2C12 2 5 9.462 5 14.5C5 18.089 8.134 21 12 21C15.866 21 19 18.089 19 14.5C19 9.462 12 2 12 2ZM12 17.5C10.619 17.5 9.5 16.381 9.5 15C9.5 13.619 12 10.5 12 10.5C12 10.5 14.5 13.619 14.5 15C14.5 16.381 13.381 17.5 12 17.5Z" fill="url(#flameGrad)" />
    <defs>
      <linearGradient id="flameGrad" x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F4A261" />
        <stop offset="1" stopColor="var(--wiki-red)" />
      </linearGradient>
    </defs>
  </svg>
);

const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px', filter: 'drop-shadow(0px 2px 3px rgba(255,255,255,0.3))' }}>
    <path d="M12 2.5C12 2.5 6 7 6 14C6 14 6 18 4 20L12 18L20 20C18 18 14 18 14 14C18 7 12 2.5 12 2.5ZM12 12C10.895 12 10 11.105 10 10C10 8.895 10.895 8 12 8C13.105 8 14 8.895 14 10C14 11.105 13.105 12 12 12ZM8.5 16C8.5 16 9 19 12 21.5C15 19 15.5 16 15.5 16L8.5 16Z" fill="#fff" />
  </svg>
);

const TrophyIcon = ({ color1, color2, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ filter: `drop-shadow(0px 4px 6px ${color2}60)` }}>
    <path d="M19 4H5C4.447 4 4 4.447 4 5V8C4 10.761 6.239 13 9 13H15C17.761 13 20 10.761 20 8V5C20 4.447 19.553 4 19 4ZM12 15C9.239 15 7 12.761 7 10V6H17V10C17 12.761 14.761 15 12 15ZM13 20H11V16H13V20ZM16 22H8V20H16V22Z" fill={`url(#trophyGrad-${color1})`} />
    <defs>
      <linearGradient id={`trophyGrad-${color1}`} x1="12" y1="4" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor={color1} />
        <stop offset="1" stopColor={color2} />
      </linearGradient>
    </defs>
  </svg>
);

const IsometricCube = ({ color }) => (
  <svg width="40" height="40" viewBox="0 0 120 120" style={{ filter: `drop-shadow(0 10px 10px ${color}50)` }}>
    <path d="M60 15 L105 40 L105 90 L60 115 L15 90 L15 40 Z" fill={`${color}15`} stroke={color} strokeWidth="6" strokeLinejoin="round" />
    <path d="M15 40 L60 65 L105 40" fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round" />
    <path d="M60 65 L60 115" fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round" />
  </svg>
);

/* Avatar Generator */
const Avatar = ({ name, color }) => (
  <div style={{ width: 50, height: 50, borderRadius: '50%', background: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '900', boxShadow: `0 4px 10px ${color}50`, zIndex: 5 }}>
    {name ? name.charAt(0).toUpperCase() : '?'}
  </div>
);

/* ─────────────────────────────────────────────
   GLOBAL CSS STYLES
───────────────────────────────────────────── */
const marathonCSS = `
  :root {
    --wiki-red: #E63946;
    --wiki-green: #2A9D8F;
    --wiki-blue: #1D3557;
  }

  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes floatUp3D {
    0% { transform: translateY(50px) rotateX(0deg) rotateY(0deg) scale(0.8); opacity: 0; }
    20% { opacity: 0.5; }
    80% { opacity: 0.5; }
    100% { transform: translateY(-180px) rotateX(180deg) rotateY(360deg) scale(1.1); opacity: 0; }
  }
  
  @keyframes floatUpText {
    0% { transform: translateY(50px) scale(0.9); opacity: 0; }
    20% { opacity: 0.4; }
    80% { opacity: 0.4; }
    100% { transform: translateY(-150px) scale(1.1); opacity: 0; }
  }
  
  @keyframes auraPulse {
    0% { box-shadow: 0 0 30px rgba(29, 53, 87, 0.1), inset 0 0 20px rgba(29, 53, 87, 0.05); }
    50% { box-shadow: 0 0 70px rgba(42, 157, 143, 0.25), inset 0 0 40px rgba(42, 157, 143, 0.1); }
    100% { box-shadow: 0 0 30px rgba(230, 57, 70, 0.1), inset 0 0 20px rgba(230, 57, 70, 0.05); }
  }

  @keyframes coreHover3D {
    0% { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(0px); }
    50% { transform: perspective(1000px) rotateX(-2deg) rotateY(5deg) translateY(-12px); }
    100% { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(0px); }
  }

  @keyframes spinOrbit {
    0% { transform: rotateZ(0deg) rotateX(65deg) rotateY(0deg); }
    100% { transform: rotateZ(360deg) rotateX(65deg) rotateY(360deg); }
  }
  @keyframes spinOrbitReverse {
    0% { transform: rotateZ(360deg) rotateX(-50deg) rotateY(0deg); }
    100% { transform: rotateZ(0deg) rotateX(-50deg) rotateY(-360deg); }
  }

  @keyframes panGrid {
    0% { background-position: 0 0; }
    100% { background-position: 0 40px; }
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* HERO SECTION */
  .mh-hero-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px 90px; 
    background-color: #ffffff;
    background-image: radial-gradient(#cbd5e1 2px, transparent 2px);
    background-size: 40px 40px;
    animation: panGrid 20s linear infinite;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 2rem;
    overflow: hidden;
    perspective: 1200px;
  }

  .mh-hero-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, transparent 20%, #ffffff 80%);
    pointer-events: none;
    z-index: 0;
  }

  .mh-particle-cube {
    position: absolute;
    z-index: 1;
    opacity: 0;
    animation: floatUp3D linear infinite;
    pointer-events: none;
    transform-style: preserve-3d;
  }
  
  .mh-particle-text {
    position: absolute;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 800;
    font-size: 1.4rem;
    z-index: 1;
    opacity: 0;
    animation: floatUpText linear infinite;
    pointer-events: none;
    text-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .mh-hero-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    font-weight: 900;
    font-size: 2.6rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: linear-gradient(270deg, var(--wiki-blue), var(--wiki-green), var(--wiki-red), var(--wiki-blue));
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientText 6s ease infinite;
    margin-bottom: 60px;
    z-index: 2;
  }

  .core-system {
    position: relative;
    width: 300px;
    height: 300px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    animation: coreHover3D 8s ease-in-out infinite;
  }

  .orbit-ring-1 {
    position: absolute;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    border: 2px dashed var(--wiki-blue);
    opacity: 0.3;
    animation: spinOrbit 25s linear infinite;
    transform-style: preserve-3d;
    pointer-events: none;
  }
  .orbit-ring-2 {
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    border: 3px dotted var(--wiki-green);
    opacity: 0.4;
    animation: spinOrbitReverse 20s linear infinite;
    transform-style: preserve-3d;
    pointer-events: none;
  }

  .countdown-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(8px);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .countdown-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #ffffff;
    animation: auraPulse 6s infinite alternate ease-in-out;
    z-index: -1;
    transform: translateZ(-10px);
  }
  
  .core-system:hover .countdown-wrapper {
    transform: scale(1.05) translateZ(20px);
    box-shadow: 0 0 80px rgba(42, 157, 143, 0.35), inset 0 0 40px rgba(42, 157, 143, 0.15);
  }
  .core-system:hover { animation-play-state: paused; }

  .countdown-svg {
    transform: rotate(-90deg) translateZ(10px);
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .countdown-circle-bg {
    fill: none;
    stroke: #f8fafc;
    stroke-width: 8;
  }

  .countdown-circle-progress {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s linear;
  }

  .countdown-labels {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transform: translateZ(25px);
  }
  
  .countdown-time-main {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: var(--wiki-blue);
    line-height: 1.1;
    text-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  
  .countdown-time-sub {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  /* Glassmorphic Authentic Ticker */
  .tech-ticker-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    border-top: 1px solid rgba(203, 213, 225, 0.5);
    padding: 12px 0;
    overflow: hidden;
    display: flex;
    white-space: nowrap;
    z-index: 3;
    box-shadow: 0 -4px 15px rgba(0,0,0,0.02);
  }

  .tech-ticker-track {
    display: inline-block;
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--wiki-blue);
    animation: marquee 40s linear infinite;
  }

  .ticker-item { margin: 0 40px; opacity: 0.8; }
  .ticker-highlight { color: var(--wiki-green); }
  .ticker-red { color: var(--wiki-red); }

  .submit-contribution-btn-magic {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: bold;
    color: #ffffff !important;
    background: linear-gradient(90deg, var(--wiki-blue), var(--wiki-green), var(--wiki-red), var(--wiki-blue));
    background-size: 300% 300%;
    border-radius: 30px;
    text-decoration: none;
    animation: gradientText 5s ease infinite;
    box-shadow: 0 4px 15px rgba(42, 157, 143, 0.3);
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
    margin-top: 10px;
  }
  .submit-contribution-btn-magic:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 25px rgba(230, 57, 70, 0.4);
  }

  /* ─────────────────────────────────────────────
     NEW: 3D PODIUM & LEADERBOARD STYLES
  ───────────────────────────────────────────── */
  .podium-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 15px;
    margin: 40px 0;
    min-height: 260px;
    perspective: 1000px;
  }

  .podium-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 28%;
    border-radius: 16px 16px 0 0;
    padding: 20px;
    position: relative;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
  }
  .podium-step:hover {
    transform: translateY(-10px) translateZ(10px);
  }

  .podium-1 { 
    height: 240px; 
    background: linear-gradient(to top, rgba(255,215,0,0.02), rgba(255,215,0,0.15));
    border-top: 5px solid #FFD700;
    z-index: 3;
    transform: translateZ(20px);
  }
  .podium-2 { 
    height: 190px; 
    background: linear-gradient(to top, rgba(192,192,192,0.02), rgba(192,192,192,0.15));
    border-top: 5px solid #C0C0C0;
    z-index: 2;
  }
  .podium-3 { 
    height: 160px; 
    background: linear-gradient(to top, rgba(205,127,50,0.02), rgba(205,127,50,0.15));
    border-top: 5px solid #CD7F32;
    z-index: 1;
  }

  .podium-info {
    text-align: center;
    margin-top: 10px;
  }
  .podium-name { font-size: 1.1rem; font-weight: 800; color: var(--wiki-blue); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;}
  .podium-stat { font-size: 0.85rem; color: #64748b; font-weight: 600; margin-top: 4px; }
  .podium-merged { color: var(--wiki-green); font-weight: 800; font-size: 1rem;}

  .premium-leaderboard {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  .premium-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    padding: 16px 24px;
    border-radius: 16px;
    border: 1px solid #eaeaea;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .premium-row:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  }

  .row-left { display: flex; align-items: center; gap: 20px; }
  .rank-number { font-size: 1.5rem; font-weight: 900; color: #cbd5e1; width: 30px; text-align: center; }

  .participant-info h4 { margin: 0; font-size: 1.1rem; color: var(--wiki-blue); font-weight: 700; }
  .participant-info p { margin: 0; font-size: 0.85rem; color: #888; }

  /* Visual Progress Bar for List */
  .progress-container {
    display: flex;
    align-items: center;
    gap: 15px;
    min-width: 200px;
  }
  .progress-bar-bg {
    flex-grow: 1;
    height: 8px;
    background: #f1f5f9;
    border-radius: 10px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--wiki-green), var(--wiki-blue));
    border-radius: 10px;
    transition: width 1s ease-out;
  }
  .progress-stats { display: flex; flex-direction: column; align-items: flex-end; }
  .progress-stats span { font-size: 0.8rem; font-weight: 700; }
  .stat-merged { color: var(--wiki-green); }
  .stat-pending { color: var(--wiki-red); font-size: 0.7rem; }

  @media (max-width: 768px) {
    .premium-row { flex-direction: column; align-items: flex-start; gap: 16px; }
    .progress-container { width: 100%; }
    .mh-hero-badge { font-size: 1.6rem; }
    .orbit-ring-1, .orbit-ring-2 { display: none; }
    .podium-wrapper { align-items: center; flex-direction: column; gap: 20px; min-height: auto; }
    .podium-step { width: 100%; border-radius: 16px; border-top: none; border-left: 5px solid; height: auto !important; padding: 15px; flex-direction: row; justify-content: space-between; transform: none !important;}
    .podium-1 { border-left-color: #FFD700; }
    .podium-2 { border-left-color: #C0C0C0; }
    .podium-3 { border-left-color: #CD7F32; }
  }
`;

/* ─────────────────────────────────────────────
   RADIAL COUNTDOWN COMPONENT
───────────────────────────────────────────── */
const RadialCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const getTargetDate = () => {
      const now = new Date();
      const target = new Date();
      const currentDay = now.getDay();
      const daysToSunday = currentDay === 0 ? 0 : 7 - currentDay;
      target.setDate(now.getDate() + daysToSunday);
      target.setHours(23, 59, 59, 999);
      return target;
    };
    const targetDate = getTargetDate().getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calcOffset = (value, max, radius) => {
    const circumference = 2 * Math.PI * radius;
    return circumference - (value / max) * circumference;
  };

  return (
    <div className="countdown-wrapper">
      <svg className="countdown-svg">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle className="countdown-circle-bg" cx="150" cy="150" r="130" />
        <circle className="countdown-circle-progress" cx="150" cy="150" r="130" stroke="var(--wiki-red)" strokeDasharray={2 * Math.PI * 130} strokeDashoffset={calcOffset(timeLeft.s, 60, 130)} filter="url(#glow)" />
        <circle className="countdown-circle-bg" cx="150" cy="150" r="110" />
        <circle className="countdown-circle-progress" cx="150" cy="150" r="110" stroke="var(--wiki-green)" strokeDasharray={2 * Math.PI * 110} strokeDashoffset={calcOffset(timeLeft.m, 60, 110)} filter="url(#glow)" />
        <circle className="countdown-circle-bg" cx="150" cy="150" r="90" />
        <circle className="countdown-circle-progress" cx="150" cy="150" r="90" stroke="var(--wiki-blue)" strokeDasharray={2 * Math.PI * 90} strokeDashoffset={calcOffset(timeLeft.h, 24, 90)} filter="url(#glow)" />
        <circle className="countdown-circle-bg" cx="150" cy="150" r="70" />
        <circle className="countdown-circle-progress" cx="150" cy="150" r="70" stroke="#F4A261" strokeDasharray={2 * Math.PI * 70} strokeDashoffset={calcOffset(timeLeft.d, 7, 70)} filter="url(#glow)" />
      </svg>
      <div className="countdown-labels">
        <div className="countdown-time-main">{String(timeLeft.d).padStart(2, '0')}:{String(timeLeft.h).padStart(2, '0')}</div>
        <div className="countdown-time-sub">Days &nbsp; Hrs</div>
        <div style={{ height: '10px' }}></div>
        <div className="countdown-time-main" style={{ fontSize: '1.4rem' }}>{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}</div>
        <div className="countdown-time-sub" style={{ fontSize: '0.7rem' }}>Mins &nbsp; Secs</div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   NAV LINKS & MARATHON BOARD COMPONENT
───────────────────────────────────────────── */
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "/Question" },
  { name: "Contribution Board", path: "/ContributionMeter" },
  { name: "Marathon Board", path: "/MarathonBoard" }
];

const MarathonBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [contributionsList, setContributionsList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const contributionsRef = collection(db, 'marathonContributions');
    const q = query(contributionsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contributionsMap = {};
      const newContributionsList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const contributorEmail = data.contributorEmail || '';
        const contributorName = data.contributorName || 'Unknown';
        const collegeName = data.collegeName || 'N/A';
        const taskLink = data.taskLink || '';
        const status = data.contributionStatus || 'Not Merged';

        const uidKey = contributorEmail.trim() ? contributorEmail : contributorName;

        if (!contributionsMap[uidKey]) {
          contributionsMap[uidKey] = { name: contributorName, collegeName, total: 0, merged: 0, notMerged: 0, firstContributionTimestamp: data.timestamp };
        }
        if ((!contributionsMap[uidKey].name || contributionsMap[uidKey].name === 'Unknown') && contributorName !== 'Unknown' && contributorName !== '') {
          contributionsMap[uidKey].name = contributorName;
        }
        if ((!contributionsMap[uidKey].collegeName || contributionsMap[uidKey].collegeName === 'N/A') && collegeName !== 'N/A' && collegeName !== '') {
          contributionsMap[uidKey].collegeName = collegeName;
        }

        contributionsMap[uidKey].total++;
        if ((status.toLowerCase().includes('merged') && !status.toLowerCase().includes('not merged')) || status.toLowerCase() === 'completed' || status.toLowerCase() === 'done') {
          contributionsMap[uidKey].merged++;
        } else {
          contributionsMap[uidKey].notMerged++;
        }

        newContributionsList.push({ contributorName, taskLink, timestamp: data.timestamp });
      });

      const sortedContributors = Object.entries(contributionsMap)
        .map(([email, counts]) => ({ email, ...counts }))
        .sort((a, b) => {
          if (b.merged !== a.merged) return b.merged - a.merged;
          if (b.total !== a.total) return b.total - a.total;
          return new Date(a.firstContributionTimestamp) - new Date(b.firstContributionTimestamp);
        });

      setLeaderboardData(sortedContributors);
      setContributionsList(newContributionsList.reverse());
    });
    return () => unsubscribe();
  }, []);

  const tickerContent = (
    <>
      <span className="ticker-item">git clone <span className="ticker-highlight">https://gerrit.wikimedia.org/...</span></span>
      <span className="ticker-item">git checkout -b <span className="ticker-highlight">bugfix/T123456</span></span>
      <span className="ticker-item">git commit -m <span className="ticker-highlight">"Fix database prefix issue"</span></span>
      <span className="ticker-item"><span className="ticker-red">git review</span></span>
      <span className="ticker-item"><span className="ticker-highlight">✓ Patchset 1 uploaded</span></span>
      <span className="ticker-item"><span className="ticker-highlight">✓ Code-Review +2</span></span>
      <span className="ticker-item"><span className="ticker-highlight">✓ Merged to master</span></span>
    </>
  );

  // Safe Podium Extraction
  const top3 = leaderboardData.slice(0, 3);
  const remainingList = leaderboardData.slice(3);

  // Helper to render a podium step safely
  const renderPodiumStep = (user, rankClass, color1, color2, iconSize, avatarColor) => {
    if (!user) return <div className={`podium-step ${rankClass}`} style={{ opacity: 0.1 }}></div>;
    return (
      <div className={`podium-step ${rankClass}`}>
        <Avatar name={user.name} color={avatarColor} />
        <div style={{ marginTop: '-15px', zIndex: 10 }}>
          <TrophyIcon color1={color1} color2={color2} size={iconSize} />
        </div>
        <div className="podium-info">
          <h4 className="podium-name">{user.name}</h4>
          <p className="podium-stat">Merged: <span className="podium-merged">{user.merged}</span></p>
          <p className="podium-stat" style={{ fontSize: '0.75rem' }}>Pending: {user.notMerged}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{marathonCSS}</style>
      <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>

      <div className="container">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navLinks={navLinks} wikiLogo={WikiL} />
        <main className="main-content">

          {/* ── HERO SECTION ── */}
          <div className="mh-hero-section">
            <div className="mh-particle-cube" style={{ left: '10%', top: '25%', animationDuration: '7s', animationDelay: '0s' }}><IsometricCube color="var(--wiki-green)" /></div>
            <div className="mh-particle-cube" style={{ left: '85%', top: '20%', animationDuration: '8.5s', animationDelay: '1s' }}><IsometricCube color="var(--wiki-red)" /></div>
            <div className="mh-particle-cube" style={{ left: '20%', top: '65%', animationDuration: '7.5s', animationDelay: '2s' }}><IsometricCube color="var(--wiki-blue)" /></div>
            <div className="mh-particle-cube" style={{ left: '80%', top: '75%', animationDuration: '9s', animationDelay: '3s' }}><IsometricCube color="var(--wiki-green)" /></div>

            <div className="mh-particle-text" style={{ color: 'var(--wiki-blue)', left: '15%', top: '45%', animationDuration: '6s', animationDelay: '0.5s' }}>&lt;/&gt;</div>
            <div className="mh-particle-text" style={{ color: 'var(--wiki-red)', left: '75%', top: '40%', animationDuration: '8s', animationDelay: '1.5s' }}>&#123; &#125;</div>
            <div className="mh-particle-text" style={{ color: 'var(--wiki-green)', left: '25%', top: '80%', animationDuration: '7s', animationDelay: '2.5s' }}>git merge</div>
            <div className="mh-particle-text" style={{ color: 'var(--wiki-red)', left: '8%', top: '60%', animationDuration: '6.5s', animationDelay: '0s' }}>//</div>
            <div className="mh-particle-text" style={{ color: 'var(--wiki-blue)', left: '88%', top: '65%', animationDuration: '9s', animationDelay: '1.2s' }}>[ + ]</div>
            <div className="mh-particle-text" style={{ color: 'var(--wiki-green)', left: '65%', top: '20%', animationDuration: '7.5s', animationDelay: '3.5s' }}>git push</div>

            <h1 className="mh-hero-badge"><LightningIcon />Open-Source Marathon<LightningIcon /></h1>

            <div className="core-system">
              <div className="orbit-ring-1"></div>
              <div className="orbit-ring-2"></div>
              <RadialCountdown />
            </div>

            <div className="tech-ticker-container">
              <div className="tech-ticker-track">
                {tickerContent}{tickerContent}{tickerContent}
              </div>
            </div>
          </div>

          {/* ── PODIUM LEADERBOARD UI ── */}
          <div className="contribution-meter-container" style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '0 20px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', fontSize: '1.8rem', color: 'var(--wiki-blue)', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
              <FlameIcon /> Marathon Leaderboard
            </h2>

            {leaderboardData.length > 0 ? (
              <>
                {/* TOP 3 3D PODIUM */}
                <div className="podium-wrapper">
                  {/* Rank 2 (Left) */}
                  {renderPodiumStep(top3[1], "podium-2", "#C0C0C0", "#A0A0A0", 40, "var(--wiki-blue)")}
                  {/* Rank 1 (Center) */}
                  {renderPodiumStep(top3[0], "podium-1", "#FFDF00", "#D4AF37", 54, "var(--wiki-red)")}
                  {/* Rank 3 (Right) */}
                  {renderPodiumStep(top3[2], "podium-3", "#CD7F32", "#A0522D", 32, "var(--wiki-green)")}
                </div>

                {/* RANK 4+ PROGRESS LIST */}
                {remainingList.length > 0 && (
                  <div className="premium-leaderboard">
                    {remainingList.map((contributor, index) => {
                      const rank = index + 4;
                      const progressPercentage = contributor.total > 0 ? Math.round((contributor.merged / contributor.total) * 100) : 0;

                      return (
                        <div key={index} className="premium-row">
                          <div className="row-left">
                            <span className="rank-number">#{rank}</span>
                            <div className="participant-info">
                              <h4>{contributor.name}</h4>
                              <p>{contributor.collegeName}</p>
                            </div>
                          </div>

                          {/* Animated Visual Progress Bar */}
                          <div className="progress-container">
                            <div className="progress-bar-bg">
                              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <div className="progress-stats">
                              <span className="stat-merged">{contributor.merged} Merged</span>
                              <span className="stat-pending">{contributor.notMerged} Pending</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '16px', marginTop: '20px', border: '1px dashed #cbd5e1' }}>
                <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>No marathon submissions recorded yet. The race is wide open!</p>
              </div>
            )}
          </div>

          {/* ── RECENT ACTIVITY ── */}
          <div className="contribution-list-container" style={{ marginTop: '40px' }}>
            <h2>Recent Marathon Activity</h2>
            <div className="contribution-form-container" style={{ textAlign: 'center', padding: '30px 10px' }}>
              <h3 style={{ marginBottom: '10px' }}>Ready to Merge Your Work?</h3>
              <p style={{ marginBottom: '20px', color: '#555' }}>Log your PRs and open-source contributions here to climb the leaderboard!</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSd_eOhNwEe9CVkgYMIUAWfI1xwNrS3BBJX6U-4O7XJeogriXg/viewform?usp=sharing&ouid=109865086956954570848" target="_blank" rel="noopener noreferrer" className="submit-contribution-btn-magic">
                Open Contribution Form <RocketIcon />
              </a>
            </div>

            {contributionsList.length > 0 ? (
              <ul style={{ marginTop: '20px' }}>
                {contributionsList.map((contrib, index) => (
                  <li key={index} className="contribution-list-item">
                    <span className="list-item-header"><strong>{contrib.contributorName}</strong></span>
                    <span className="list-item-details">
                      {contrib.taskLink && contrib.taskLink !== '#' && contrib.taskLink !== 'N/A' ? (
                        <a href={contrib.taskLink.startsWith('http') ? contrib.taskLink : `https://${contrib.taskLink}`} target="_blank" rel="noopener noreferrer">Task Link</a>
                      ) : (<span>Task Link N/A</span>)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (<p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>Waiting for the first spark of activity...</p>)}
          </div>
        </main>
      </div>

      <footer className="footer-wiki">
        <div className="footer-left"><img src={WikiS} alt="WikiClub Tech Logo" className="footer-logo" /></div>
        <div className="footer-right">
          <Link to="/About" className="footer-link1">About Us</Link>
          <Link to="/RoadToWiki" className="footer-link2">Road To Wiki Program</Link>
          <Link to="/ContributionMeter" className="footer-link3">Contribution Board</Link>
          <Link to="/MarathonBoard" className="footer-link2">Marathon Board</Link>
          <Link to="/Team" className="footer-link3">Team</Link>
        </div>
      </footer>
    </>
  );
};

export default MarathonBoard;