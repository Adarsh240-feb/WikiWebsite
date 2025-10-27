import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
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
        const collegeName = data.collegeName; 
        const status = data.contributionStatus;
        // 👇 ADDED: Retrieve gerritTaskLink from Firestore data
        const gerritTaskLink = data.gerritTaskLink; 
        
        // Use email as the single unique key
        if (!contributionsMap[contributorEmail]) {
          contributionsMap[contributorEmail] = {
            name: contributorName, 
            college: collegeName, 
            total: 0,
            merged: 0,
            notMerged: 0,
            firstContributionTimestamp: data.timestamp
          };
        }
        
        // Update the counts
        contributionsMap[contributorEmail].total++;
        if (status === 'Merged') {
          contributionsMap[contributorEmail].merged++;
        } else {
          contributionsMap[contributorEmail].notMerged++;
        }

        // Add to the detailed list, keeping all submission data
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
      // Reverse the list so the latest contributions appear at the top
      setContributionsList(newContributionsList.reverse()); 
    });

    return () => unsubscribe();
  }, []);


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
                    <th>College</th>
                    <th>Contributions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((contributor, index) => (
                    <tr key={contributor.email} className="leaderboard-row">
                      <td data-label="Rank">{getTrophy(index + 1)} {index + 1}</td>
                      <td data-label="Contributor">{contributor.name}</td>
                      <td data-label="College">{contributor.college || 'N/A'}</td>
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
              <p>If you want to record a contribution, please use the official submission form:</p>
              <a href="https://docs.google.com/forms/d/16lUH40i3TMquCMBHplGhkFGtAWRcEFZgDo05FDpSo0s/viewform?edit_requested=true" target="_blank" rel="noopener noreferrer" className="submit-contribution-link">Open Contribution Form</a>
            </div>
            {contributionsList.length > 0 ? (
              <ul>
                {contributionsList.map((contrib, index) => (
                  <li key={index} className="contribution-list-item">
                    <span className="list-item-header">
                      <strong>{contrib.contributorName}</strong> ({contrib.collegeName || 'N/A'}) ({contrib.contributionType}) 
                    </span>
                    <span className="list-item-details">
                      fixed task:
                      {contrib.taskId ? (
                        (() => {
                          const rawId = String(contrib.taskId || '');
                          const tid = rawId.trim();
                          if (!tid) return <span> N/A</span>;
                          const taskUrl = `https://phabricator.wikimedia.org/${encodeURIComponent(tid)}`;
                          return (
                            <>
                              {' '}
                              <a href={taskUrl} target="_blank" rel="noopener noreferrer">
                                {tid}
                              </a>
                            </>
                          );
                        })()
                      ) : (
                        <span> N/A</span>
                      )}
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