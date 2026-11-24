import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import PageHero from "./PageHero";
import "./ContributionMeter.css";

const FORM_URL =
  "https://docs.google.com/forms/d/16lUH40i3TMquCMBHplGhkFGtAWRcEFZgDo05FDpSo0s/viewform?edit_requested=true";

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

const ContributionMeter = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [contributionsList, setContributionsList] = useState([]);

  useEffect(() => {
    const contributionsRef = collection(db, "contributions");
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

        if (!contributionsMap[contributorEmail]) {
          contributionsMap[contributorEmail] = {
            name: contributorName,
            college: collegeName,
            total: 0,
            merged: 0,
            notMerged: 0,
            firstContributionTimestamp: data.timestamp,
          };
        }

        contributionsMap[contributorEmail].total++;
        if (status === "Merged") {
          contributionsMap[contributorEmail].merged++;
        } else {
          contributionsMap[contributorEmail].notMerged++;
        }

        newContributionsList.push(data);
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

  const totals = leaderboardData.reduce(
    (acc, contributor) => {
      acc.contributions += contributor.total;
      acc.merged += contributor.merged;
      return acc;
    },
    { contributions: 0, merged: 0 }
  );

  return (
    <div className="meter-page">
      <section className="events-page-hero">
        <div className="wrap events-page-hero__inner">
          <div className="events-page-hero__copy">
            <span className="eyebrow eyebrow--light" style={{ textTransform: "uppercase" }}>
              COMMUNITY LEADERBOARD · LIVE
            </span>
            <h1>Every Contribution Moves Knowledge Forward.</h1>
            <p className="events-page-hero__lede">
              A live, public record of patches and pull requests submitted by WikiClub Tech – UIT
              contributors across campus and national programs.
            </p>
          </div>

          <div className="page-hero__aside">
            <div className="page-hero__stat">
              <strong>{leaderboardData.length}</strong>
              <span>Contributors Ranked</span>
            </div>
            <div className="page-hero__stat">
              <strong>{totals.merged}</strong>
              <span>Patches Merged</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="board-layout">
            <div className="board-main">
              <div className="section-head section-head--split">
                <div>
                  <p className="eyebrow">Ranking</p>
                  <h2 className="section-title">Contribution leaderboard.</h2>
                </div>
                <span className="chip chip--blue">
                  <span className="live-dot" aria-hidden="true" /> Live data
                </span>
              </div>

              {leaderboardData.length > 0 ? (
                <div className="board-table-wrap">
                  <table className="board-table">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Contributor</th>
                        <th scope="col">Total</th>
                        <th scope="col">Merged</th>
                        <th scope="col">Pending</th>
                        <th scope="col">Merge rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((contributor, index) => {
                        const rank = index + 1;
                        const mergeRate =
                          contributor.total > 0
                            ? Math.round((contributor.merged / contributor.total) * 100)
                            : 0;
                        return (
                          <tr
                            key={contributor.email}
                            className={rank <= 3 ? `is-top is-top-${rank}` : ""}
                          >
                            <td>
                              <span className="rank-badge">{rank}</span>
                            </td>
                            <td>
                              <div className="board-person">
                                <span
                                  className="board-person__avatar"
                                  style={{
                                    background: avatarTones[index % avatarTones.length],
                                  }}
                                  aria-hidden="true"
                                >
                                  {initials(contributor.name)}
                                </span>
                                <span className="board-person__meta">
                                  <strong>{contributor.name || "Contributor"}</strong>
                                  <span>{contributor.college || "College not listed"}</span>
                                </span>
                              </div>
                            </td>
                            <td data-label="Total">
                              <strong>{contributor.total}</strong>
                            </td>
                            <td data-label="Merged">
                              <strong className="text-green">{contributor.merged}</strong>
                            </td>
                            <td data-label="Pending">
                              <span className="text-muted">{contributor.notMerged}</span>
                            </td>
                            <td>
                              <div className="merge-rate">
                                <span className="merge-rate__bar">
                                  <span style={{ width: `${mergeRate}%` }} />
                                </span>
                                <span className="merge-rate__value">{mergeRate}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fa-solid fa-trophy" aria-hidden="true" />
                  <h3>The board is wide open</h3>
                  <p>
                    No contributions have been recorded yet. Submit your first patch and claim the
                    top spot.
                  </p>
                  <a
                    className="btn btn--primary"
                    href={FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Submit a contribution ↗
                  </a>
                </div>
              )}

              <div className="board-note">
                <i className="fa-solid fa-circle-info" aria-hidden="true" />
                <p>
                  Ranking order: most merged patches, then most total submissions, then earliest
                  first contribution. Data syncs in real time from the chapter's verification
                  sheet.
                </p>
              </div>
            </div>

            <aside className="board-aside">
              <div className="submit-card">
                <span className="submit-card__icon">
                  <i className="fa-solid fa-code-pull-request" aria-hidden="true" />
                </span>
                <h2>Record a contribution</h2>
                <p>
                  Worked on a Wikimedia bug, documentation page or tool? Log it through the official
                  form so reviewers can verify and rank it.
                </p>
                <a
                  className="btn btn--primary btn--block"
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open contribution form ↗
                </a>
                <ul className="submit-card__notes">
                  <li>Use the same email for every submission.</li>
                  <li>Attach the Gerrit change or Phabricator task link.</li>
                  <li>Merged changes count the most toward rank.</li>
                </ul>
              </div>

              <Link to="/MarathonBoard" className="aside-link">
                <span>
                  <strong>Open-Source Marathon</strong>
                  <span>Season board &amp; podium</span>
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
              <p className="eyebrow eyebrow--green">Activity</p>
              <h2 className="section-title">Latest contributions.</h2>
            </div>
            <span className="chip chip--green">{contributionsList.length} entries</span>
          </div>

          {contributionsList.length > 0 ? (
            <ul className="activity-list">
              {contributionsList.map((contrib, index) => {
                const rawId = String(contrib.taskId || "").trim();
                const taskUrl = rawId
                  ? `https://phabricator.wikimedia.org/${encodeURIComponent(rawId)}`
                  : null;
                return (
                  <li className="activity-item" key={`${contrib.contributorEmail || contrib.contributorName}-${index}`}>
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
                        <span className="activity-item__college">
                          {contrib.collegeName || "College not listed"}
                        </span>
                      </p>
                      <div className="activity-item__meta">
                        {contrib.contributionType && (
                          <span className="chip chip--neutral">{contrib.contributionType}</span>
                        )}
                        {contrib.contributionStatus && (
                          <span
                            className={`chip ${
                              contrib.contributionStatus === "Merged"
                                ? "chip--green"
                                : "chip--red"
                            }`}
                          >
                            {contrib.contributionStatus}
                          </span>
                        )}
                        {taskUrl ? (
                          <a
                            className="activity-item__task"
                            href={taskUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-solid fa-bug" aria-hidden="true" /> {rawId}
                          </a>
                        ) : (
                          <span className="activity-item__task activity-item__task--empty">
                            No task ID
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
              <h3>No recent contributions</h3>
              <p>New submissions will appear here automatically after verification.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContributionMeter;
