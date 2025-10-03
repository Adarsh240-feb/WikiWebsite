import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import './ContributionMeter.css';
import './HomePage.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import WikiL from '../Images/WikiL.png';
import WikiS from '../Images/WikiS.png';

// Navigation links for the sidebar
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/About" },
  { name: "Road To Wiki Program", path: "/RoadToWiki" },
  { name: "Contact", path: "/Contact" },
  { name: "Team", path: "/Team" },
  { name: "FAQ", path: "/Question" },
];

const ContributionMeter = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [contributionsList, setContributionsList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const contributionsRef = collection(db, 'contributions');
    const q = query(contributionsRef, orderBy("timestamp", "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contributionsMap = {};
      const newContributionsList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const contributorEmail = data.contributorEmail;
        const contributorName = data.contributorName;
        const status = data.contributionStatus;
        
        // Use email as the single unique key
        // If this is the first time we see this email, store the name and timestamp
        if (!contributionsMap[contributorEmail]) {
          contributionsMap[contributorEmail] = {
            name: contributorName, // Store the name from the very first entry
            total: 0,
            merged: 0,
            notMerged: 0,
            firstContributionTimestamp: data.timestamp
          };
        }
        
        // Only update the counts, the name remains the same as the first entry
        contributionsMap[contributorEmail].total++;
        if (status === 'Merged') {
          contributionsMap[contributorEmail].merged++;
        } else {
          contributionsMap[contributorEmail].notMerged++;
        }

        newContributionsList.push(data);
      });

      const sortedContributors = Object.entries(contributionsMap)
        .map(([email, counts]) => ({ email, ...counts }))
        .sort((a, b) => {
          if (b.merged !== a.merged) {
            return b.merged - a.merged;
          }
          if (b.total !== a.total) {
            return b.total - a.total;
          }
          return new Date(a.firstContributionTimestamp) - new Date(b.firstContributionTimestamp);
        });
      
      setLeaderboardData(sortedContributors);
      setContributionsList(newContributionsList.reverse());
    });

    return () => unsubscribe();
  }, []);

  // Contribution form state
  const [formInput, setFormInput] = useState({
    contributorName: '',
    contributorEmail: '',
    contributionType: 'Code',
    taskId: '',
    contributionStatus: 'Not Merged',
  });
  const [formMessage, setFormMessage] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
    setFormMessage(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormMessage(null);

    const { contributorName, contributorEmail, contributionType, taskId, contributionStatus } = formInput;
    if (!contributorName || !contributorEmail || !contributionType) {
      setFormMessage({ type: 'error', text: 'Please fill name, email and contribution type.' });
      return;
    }

    setIsSubmittingForm(true);
    try {
      const contributionsRef = collection(db, 'contributions');
      await addDoc(contributionsRef, {
        contributorName: contributorName,
        contributorEmail: contributorEmail,
        contributionType: contributionType,
        taskId: taskId || null,
        contributionStatus: contributionStatus,
        timestamp: serverTimestamp(),
      });

      setFormMessage({ type: 'success', text: 'Thank you — your contribution was recorded.' });
      setFormInput({ contributorName: '', contributorEmail: '', contributionType: 'Code', taskId: '', contributionStatus: 'Not Merged' });
    } catch (err) {
      console.error('Error saving contribution:', err);
      setFormMessage({ type: 'error', text: 'Failed to submit. Please try again later.' });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const getTrophy = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏆';
    }
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="container">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          closeSidebar={closeSidebar}
          navLinks={navLinks}
          wikiLogo={WikiL}
        />
        <main className="main-content">
          <div className="contribution-meter-container">
            <h2>🏆 Contribution Leaderboard</h2>
            {leaderboardData.length > 0 ? (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Contributor</th>
                    <th>Contributions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((contributor, index) => (
                    <tr key={contributor.email} className="leaderboard-row">
                      <td data-label="Rank">{getTrophy(index + 1)} {index + 1}</td>
                      <td data-label="Contributor">{contributor.name}</td>
                      <td data-label="Contributions">
                        <strong>Total:</strong> {contributor.total} | 
                        <strong> Merged:</strong> {contributor.merged} | 
                        <strong> Not Merged:</strong> {contributor.notMerged}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No contributions recorded yet. Be the first to make an impact!</p>
            )}
          </div>
          
          <div className="contribution-list-container">
            <h2>Latest Contributions</h2>
            <div className="contribution-form-container">
              <h3>Submit a Contribution</h3>
              <form className="contribution-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <input type="text" name="contributorName" placeholder="Your name" value={formInput.contributorName} onChange={handleInputChange} required />
                  <input type="email" name="contributorEmail" placeholder="Email" value={formInput.contributorEmail} onChange={handleInputChange} required />
                </div>
                <div className="form-row">
                  <select name="contributionType" value={formInput.contributionType} onChange={handleInputChange}>
                    <option>Code</option>
                    <option>Documentation</option>
                    <option>Design</option>
                    <option>Localization</option>
                    <option>Other</option>
                  </select>
                  <input type="text" name="taskId" placeholder="Task ID (optional)" value={formInput.taskId} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                  <select name="contributionStatus" value={formInput.contributionStatus} onChange={handleInputChange}>
                    <option>Not Merged</option>
                    <option>Merged</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-contribution-btn" disabled={isSubmittingForm}>{isSubmittingForm ? 'Submitting...' : 'Submit Contribution'}</button>
                </div>
                {formMessage && (
                  <p className={`form-message ${formMessage.type === 'success' ? 'success' : 'error'}`}>{formMessage.text}</p>
                )}
              </form>
            </div>
            {contributionsList.length > 0 ? (
              <ul>
                {contributionsList.map((contrib, index) => (
                  <li key={index} className="contribution-list-item">
                    <span className="list-item-header">
                      <strong>{contrib.contributorName}</strong> ({contrib.contributionType}) 
                    </span>
                    <span className="list-item-details">
                      fixed task: 
                      <a href={`https://phabricator.wikimedia.org/${contrib.taskId}`} target="_blank" rel="noopener noreferrer">
                        {contrib.taskId}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent contributions to display at this time.</p>
            )}
          </div>
        </main>
      </div>
      <footer className="footer-wiki">
        <div className="footer-left">
          <img
            src={WikiS}
            alt="WikiClub Tech Logo"
            className="footer-logo"
          />
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
};

export default ContributionMeter;