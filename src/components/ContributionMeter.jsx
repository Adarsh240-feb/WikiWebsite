import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './ContributionMeter.css';
import './HomePage.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import WikiL from '../Images/WikiL.png';

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
  // State for the leaderboard data (sorted contributors)
  const [leaderboardData, setLeaderboardData] = useState([]);
  // State for the raw list of all contributions
  const [contributionsList, setContributionsList] = useState([]);
  // State to manage sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  // Function to close the sidebar
  const closeSidebar = () => setSidebarOpen(false);

  // useEffect hook to fetch and listen for real-time data from Firestore
  useEffect(() => {
    const contributionsRef = collection(db, 'contributions');
    // Fetch all contributions, sorted by timestamp to handle ties correctly
    const q = query(contributionsRef, orderBy("timestamp", "asc"));
    
    // onSnapshot sets up a real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // contributionsMap will count merged and total contributions for each person
      const contributionsMap = {};
      // newContributionsList will store all the documents
      const newContributionsList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const contributor = data.contributorName;
        const status = data.contributionStatus;
        
        // Initialize the contributor's data if they don't exist in the map
        if (!contributionsMap[contributor]) {
          contributionsMap[contributor] = {
            total: 0,
            merged: 0,
            notMerged: 0,
          };
        }
        
        // Increment the total count and the specific status count
        contributionsMap[contributor].total++;
        if (status === 'Merged') {
          contributionsMap[contributor].merged++;
        } else {
          contributionsMap[contributor].notMerged++;
        }

        newContributionsList.push(data);
      });

      // Convert the map to an array and sort it for the leaderboard
      const sortedContributors = Object.entries(contributionsMap)
        .map(([name, counts]) => ({ name, counts }))
        .sort((a, b) => {
          // Primary sort by merged contributions (descending)
          if (b.counts.merged !== a.counts.merged) {
            return b.counts.merged - a.counts.merged;
          }
          
          // Secondary sort by total contributions (descending) for ties in merged count
          if (b.counts.total !== a.counts.total) {
            return b.counts.total - a.counts.total;
          }

          // Tertiary sort by timestamp (ascending) for ties in both merged and total count
          const firstContribA = newContributionsList.find(c => c.contributorName === a.name);
          const firstContribB = newContributionsList.find(c => c.contributorName === b.name);
          return new Date(firstContribA.timestamp) - new Date(firstContribB.timestamp);
        });
// Logic of the sorting function:

//That - sign in JavaScript is a mathematical operator used for subtraction. In the sorting function, it's used to compare two numbers to determine their order.

// Here's how it works in your code:

// When you sort an array, the .sort() method takes a function that compares two elements, let's call them a and b.

// If the function returns a negative number, a is placed before b.

// If the function returns a positive number, b is placed before a.

// If the function returns zero, the order of a and b doesn't change relative to each other.

// In your code, the sorting function is b.counts.merged - a.counts.merged.

// If Contributor B has more merged contributions than Contributor A, b.counts.merged - a.counts.merged will be a positive number. This tells the sort function to place Contributor B before Contributor A.

// If Contributor A has more merged contributions, the result will be a negative number. This places Contributor A before Contributor B.

// By subtracting a from b, the sorting function effectively creates a descending order (highest number first). This is a common and efficient trick in JavaScript to sort numbers from largest to smallest.

      // Update the state with the sorted data
      setLeaderboardData(sortedContributors);
      setContributionsList(newContributionsList);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to get the correct trophy emoji based on rank
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

  // Main component JSX
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
            <h2>🏆 Contribution Leaderboard 🏆</h2>
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
                    <tr key={index} className="leaderboard-row">
                      <td data-label="Rank">{getTrophy(index + 1)} {index + 1}</td>
                      <td data-label="Contributor">{contributor.name}</td>
                      <td data-label="Contributions">
                          <strong>Total:</strong> {contributor.counts.total} | 
                          <strong> Merged:</strong> {contributor.counts.merged} | 
                          <strong> Not Merged:</strong> {contributor.counts.notMerged}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No contributions yet. Be the first to add one!</p>
            )}
          </div>
          
          <div className="contribution-list-container">
            <h2>Latest Contributions</h2>
            {contributionsList.length > 0 ? (
              <ul>
                {contributionsList.map((contrib, index) => (
                  <li key={index} className="contribution-list-item">
                    <span className="list-item-header">
                      <strong>{contrib.contributorName}</strong> ({contrib.contributionType}) 
                    </span>
                    <span className="list-item-details">
                      fixed task: 
                      <a href={`https://phabricator.wikimedia.org/T${contrib.taskId}`} target="_blank" rel="noopener noreferrer">
                        T{contrib.taskId}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No individual contributions to display.</p>
            )}
          </div>
        </main>
      </div>
      <footer className="footer-wiki">
        <div className="footer-left">
          <img
            src={WikiL}
            alt="WikiClub Tech Logo"
            className="footer-logo"
          />
        </div>
        <div className="footer-right">
          <Link to="/RoadToWiki" className="footer-link1">Road To Wiki Program</Link>
          <Link to="/Contact" className="footer-link2">Contact</Link>
          <Link to="/Team" className="footer-link3">Team</Link>
          <Link to="/About" className="footer-link1">About Us </Link>
          <Link to="/Question" className="footer-link2">FAQ</Link>
        </div>
      </footer>
    </>
  );
};

export default ContributionMeter;