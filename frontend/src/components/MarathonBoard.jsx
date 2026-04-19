import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './ContributionMeter.css'; // Reusing the same tables styling
import './HomePage.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import WikiL from '../Images/WikiL.png';
import WikiS from '../Images/WikiS.png';

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    // Reading from the marathonContributions collection based on App Script snapshot
    const contributionsRef = collection(db, 'marathonContributions');
    const q = query(contributionsRef, orderBy("timestamp", "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contributionsMap = {};
      const newContributionsList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        
        // Exact names based on App script payload
        const contributorEmail = data.contributorEmail || '';
        const contributorName = data.contributorName || 'Unknown';
        const collegeName = data.collegeName || 'N/A';
        const taskLink = data.taskLink || '';
        const contributionType = data.contributionType || 'Other';
        const status = data.contributionStatus || 'Not Merged';
        
        // Use email or name as the mapped ID
        const uidKey = contributorEmail.trim() ? contributorEmail : contributorName;

        if (!contributionsMap[uidKey]) {
          contributionsMap[uidKey] = {
            name: contributorName, 
            collegeName: collegeName, 
            total: 0,
            merged: 0,
            notMerged: 0,
            firstContributionTimestamp: data.timestamp
          };
        }
        
        // Only update name if it was previously missing or Unknown
        if ((!contributionsMap[uidKey].name || contributionsMap[uidKey].name === 'Unknown') && contributorName !== 'Unknown' && contributorName !== '') {
            contributionsMap[uidKey].name = contributorName;
        }

        // Only update collegeName if it was previously missing or N/A
        if ((!contributionsMap[uidKey].collegeName || contributionsMap[uidKey].collegeName === 'N/A') && collegeName !== 'N/A' && collegeName !== '') {
            contributionsMap[uidKey].collegeName = collegeName;
        }
        
        // Update the counts
        contributionsMap[uidKey].total++;
        if (status.toLowerCase().includes('merged') && !status.toLowerCase().includes('not merged') || status.toLowerCase() === 'completed' || status.toLowerCase() === 'done') {
          contributionsMap[uidKey].merged++;
        } else {
          contributionsMap[uidKey].notMerged++;
        }

        newContributionsList.push({
            contributorName,
            collegeName,
            taskLink,
            contributionType,
            timestamp: data.timestamp
        });
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

  const getTrophy = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏆';
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
            <h2>🔥 Marathon Leaderboard</h2>
            {leaderboardData.length > 0 ? (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Participant</th>
                    <th>College Name</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((contributor, index) => (
                    <tr key={index} className="leaderboard-row">
                      <td data-label="Rank">{getTrophy(index + 1)} {index + 1}</td>
                      <td data-label="Participant">{contributor.name}</td>
                      <td data-label="College Name">{contributor.collegeName}</td>
                      <td data-label="Progress">
                        <strong>Total:</strong> {contributor.total} | 
                        <strong> Merged:</strong> {contributor.merged} | 
                        <strong> Pending:</strong> {contributor.notMerged}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No marathon submissions recorded yet. Participate and submit the form!</p>
            )}
          </div>
          
          <div className="contribution-list-container">
            <h2>Recent Marathon Activity</h2>
            <div className="contribution-form-container">
              <h3>Submit a Contribution</h3>
              <p>If you want to record a contribution, please use the official submission form:</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSd_eOhNwEe9CVkgYMIUAWfI1xwNrS3BBJX6U-4O7XJeogriXg/viewform?usp=sharing&ouid=109865086956954570848" target="_blank" rel="noopener noreferrer" className="submit-contribution-link">Open Contribution Form</a>
            </div>
            {contributionsList.length > 0 ? (
              <ul>
                {contributionsList.map((contrib, index) => (
                  <li key={index} className="contribution-list-item">
                    <span className="list-item-header">
                      <strong>{contrib.contributorName}</strong>
                    </span>
                    <span className="list-item-details">
                      {contrib.taskLink && contrib.taskLink !== '#' && contrib.taskLink !== 'N/A' ? (
                        <a 
                           href={contrib.taskLink.startsWith('http') ? contrib.taskLink : `https://${contrib.taskLink}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                        >
                          Task Link
                        </a>
                      ) : (
                        <span>Task Link N/A</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent activity at this time.</p>
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
          <Link to="/MarathonBoard" className="footer-link2">Marathon Board</Link>
          <Link to="/Team" className="footer-link3">Team</Link>
        </div>
      </footer>
    </>
  );
};

export default MarathonBoard;
