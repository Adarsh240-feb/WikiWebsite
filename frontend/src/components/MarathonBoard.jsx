import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import PageHero from "./PageHero";
import "./MarathonBoard.css";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd_eOhNwEe9CVkgYMIUAWfI1xwNrS3BBJX6U-4O7XJeogriXg/viewform?usp=sharing&ouid=109865086956954570848";

const avatarTones = ["var(--wm-blue)", "var(--wm-green)", "var(--wm-red)", "var(--wm-blue-dark)"];

function initials(name = "?") {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

function PodiumCard({ member, rank }) {
  if (!member) {
    return (
      <article className={`podium-card podium-card--${rank} podium-card--empty`}>
        <span className="podium-card__rank">#{rank}</span>
        <div className="podium-card__avatar" aria-hidden="true">
          ?
        </div>
        <span className="podium-card__empty-text">Awaiting contenders</span>
      </article>
    );
  }

  return (
    <article className={`podium-card podium-card--${rank}`}>
      <span className="podium-card__rank">
        <i
          className={
            rank === 1
              ? "fa-solid fa-trophy"
              : rank === 2
              ? "fa-solid fa-medal"
              : "fa-solid fa-award"
          }
          aria-hidden="true"
        />
        Rank #{rank}
      </span>
      <div className="podium-card__avatar" aria-hidden="true">
        {initials(member.name)}
      </div>
      <h3>{member.name}</h3>
      <p className="podium-card__college">{member.collegeName || "College not listed"}</p>
      <div className="podium-card__stats">
        <div>
          <strong>{member.merged}</strong>
          <span>Merged</span>
        </div>
        <div>
          <strong>{member.notMerged}</strong>
          <span>Pending</span>
        </div>
      </div>
    </article>
  );
}

const MarathonBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [contributionsList, setContributionsList] = useState([]);

  useEffect(() => {
    const contributionsRef = collection(db, "marathonContributions");
    const q = query(contributionsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contributionsMap = {};
      const newContributionsList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const contributorEmail = data.contributorEmail || "";
        const contributorName = data.contributorName || "Unknown";
        const collegeName = data.collegeName || "N/A";
        const taskLink = data.taskLink || "";
        const status = data.contributionStatus || "Not Merged";

        const uidKey = contributorEmail.trim() ? contributorEmail : contributorName;

        if (!contributionsMap[uidKey]) {
          contributionsMap[uidKey] = {
            name: contributorName,
            collegeName,
            total: 0,
            merged: 0,
            notMerged: 0,
            firstContributionTimestamp: data.timestamp,
          };
        }
        if (
          (!contributionsMap[uidKey].name || contributionsMap[uidKey].name === "Unknown") &&
          contributorName !== "Unknown" &&
          contributorName !== ""
        ) {
          contributionsMap[uidKey].name = contributorName;
        }
        if (
          (!contributionsMap[uidKey].collegeName || contributionsMap[uidKey].collegeName === "N/A") &&
          collegeName !== "N/A" &&
          collegeName !== ""
        ) {
          contributionsMap[uidKey].collegeName = collegeName;
        }

        contributionsMap[uidKey].total++;
        if (
          (status.toLowerCase().includes("merged") &&
            !status.toLowerCase().includes("not merged")) ||
          status.toLowerCase() === "completed" ||
          status.toLowerCase() === "done"
        ) {
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

  const top3 = leaderboardData.slice(0, 3);
  const remainingList = leaderboardData.slice(3);

  const totals = leaderboardData.reduce(
    (acc, contributor) => {
      acc.merged += contributor.merged;
      acc.total += contributor.total;
      return acc;
    },
    { merged: 0, total: 0 }
  );

  return (
    <div className="marathon-page">
      <section className="events-page-hero">
        <div className="wrap events-page-hero__inner">
          <div className="events-page-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              CAMPUS SPRINT TRACKER
            </span>
            <h1>Open-Source Marathon Board.</h1>
            <p className="events-page-hero__lede">
              Standings and contribution records from the WikiClub Tech – UIT Open-Source Marathon sprints.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>{leaderboardData.length}</strong>
              <span>Participants Ranked</span>
            </div>
            <div className="page-hero__stat">
              <strong>{totals.merged}</strong>
              <span>Merged Patches</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="season-strip">
            <span className="season-strip__badge">
              <i className="fa-solid fa-flag-checkered" aria-hidden="true" /> Season complete
            </span>
            <p>
              The marathon submission window has closed. Final standings below are frozen from the
              verified record; new general contributions belong on the community leaderboard.
            </p>
            <Link to="/ContributionMeter" className="season-strip__link">
              Contribution leaderboard →
            </Link>
          </div>

          <div className="board-layout">
            <div className="board-main">
              <div className="section-head section-head--split">
                <div>
                  <p className="eyebrow">Standings</p>
                  <h2 className="section-title">The podium.</h2>
                </div>
                <span className="chip chip--red">Final results</span>
              </div>

              {leaderboardData.length > 0 ? (
                <>
                  <div className="podium">
                    <PodiumCard member={top3[1]} rank={2} />
                    <PodiumCard member={top3[0]} rank={1} />
                    <PodiumCard member={top3[2]} rank={3} />
                  </div>

                  {remainingList.length > 0 && (
                    <div className="marathon-list">
                      <div className="marathon-list__head">
                        <span>Rank</span>
                        <span>Participant</span>
                        <span>Progress</span>
                        <span>Merged</span>
                      </div>
                      {remainingList.map((contributor, index) => {
                        const rank = index + 4;
                        const progress =
                          contributor.total > 0
                            ? Math.round((contributor.merged / contributor.total) * 100)
                            : 0;
                        return (
                          <div className="marathon-row" key={contributor.email}>
                            <span className="marathon-row__rank">#{rank}</span>
                            <div className="marathon-row__person">
                              <span
                                className="marathon-row__avatar"
                                style={{
                                  background: avatarTones[index % avatarTones.length],
                                }}
                                aria-hidden="true"
                              >
                                {initials(contributor.name)}
                              </span>
                              <span>
                                <strong>{contributor.name}</strong>
                                <span>{contributor.collegeName}</span>
                              </span>
                            </div>
                            <div className="marathon-row__progress">
                              <span className="merge-rate__bar">
                                <span style={{ width: `${progress}%` }} />
                              </span>
                              <span className="marathon-row__pct">{progress}%</span>
                            </div>
                            <div className="marathon-row__counts">
                              <strong>{contributor.merged}</strong>
                              <span>{contributor.notMerged} pending</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-state">
                  <i className="fa-solid fa-flag-checkered" aria-hidden="true" />
                  <h3>No marathon submissions recorded</h3>
                  <p>
                    Submissions from the season will appear here after verification. Meanwhile,
                    track ongoing contributions on the community leaderboard.
                  </p>
                  <Link className="btn btn--primary" to="/ContributionMeter">
                    Open leaderboard →
                  </Link>
                </div>
              )}

              <div className="board-note">
                <i className="fa-solid fa-circle-info" aria-hidden="true" />
                <p>
                  Standings count merged patches first, then total submissions, with ties broken by
                  who submitted first. Progress bars show the share of a participant's patches that
                  were merged.
                </p>
              </div>
            </div>

            <aside className="board-aside">
              <div className="submit-card">
                <span className="submit-card__icon">
                  <i className="fa-solid fa-rocket" aria-hidden="true" />
                </span>
                <h2>Log a contribution</h2>
                <p>
                  The season has ended, but the form stays open so verified work can still be
                  recorded for the chapter archive.
                </p>
                <a
                  className="btn btn--primary btn--block"
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open marathon form ↗
                </a>
                <ul className="submit-card__notes">
                  <li>Share the pull request or patch link.</li>
                  <li>Mention the project and task you worked on.</li>
                  <li>Verified entries are added by the core team.</li>
                </ul>
              </div>

              <Link to="/ContributionMeter" className="aside-link">
                <span>
                  <strong>Community leaderboard</strong>
                  <span>All-time contribution ranking</span>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow eyebrow--green">Activity log</p>
              <h2 className="section-title">Recent marathon work.</h2>
            </div>
            <span className="chip chip--green">{contributionsList.length} entries</span>
          </div>

          {contributionsList.length > 0 ? (
            <ul className="activity-list">
              {contributionsList.map((contrib, index) => {
                const hasLink =
                  contrib.taskLink && contrib.taskLink !== "#" && contrib.taskLink !== "N/A";
                const href = hasLink
                  ? contrib.taskLink.startsWith("http")
                    ? contrib.taskLink
                    : `https://${contrib.taskLink}`
                  : null;
                return (
                  <li className="activity-item" key={`${contrib.contributorName}-${index}`}>
                    <span
                      className="activity-item__avatar"
                      style={{ background: avatarTones[index % avatarTones.length] }}
                      aria-hidden="true"
                    >
                      {initials(contrib.contributorName)}
                    </span>
                    <div className="activity-item__body">
                      <p>
                        <strong>{contrib.contributorName || "Contributor"}</strong>
                        <span className="activity-item__college">Marathon submission</span>
                      </p>
                      <div className="activity-item__meta">
                        {href ? (
                          <a
                            className="activity-item__task"
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                            View task
                          </a>
                        ) : (
                          <span className="activity-item__task activity-item__task--empty">
                            Task link not provided
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="empty-state empty-state--compact">
              <i className="fa-solid fa-clock-rotate-left" aria-hidden="true" />
              <h3>Nothing logged yet</h3>
              <p>Marathon submissions will be listed here as they are verified.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MarathonBoard;
