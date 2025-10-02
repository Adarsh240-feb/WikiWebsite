# 🌍 WikiClubTechUIT

**WikiClubTechUIT** is a community-driven platform built using the **MERN stack** and **Vite**, dedicated to collecting, organizing, and sharing technical knowledge. Our goal is to create a comprehensive and accessible wiki resource, powered by the collective efforts of our contributors.

---

## ✨ Features

* **Fast & Modern UI:** Built with **React** and powered by **Vite** for a snappy, modern user experience.
* **Intuitive Wiki Editor:** Simple interface for creating and updating technical articles.
* **Article Versioning:** Full history tracking for all content changes.
* **🚀 Contribution Leaderboard:** A dynamic leaderboard to publicly recognize and celebrate our top contributors, fostering friendly competition and active community involvement.
* **Robust Backend:** Powered by Node.js and Express for reliable API services.

---

## 💻 Technology Stack

WikiClubTechUIT is built with a powerful, modern stack, combining front-end speed with a scalable back-end infrastructure.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Front-end** | **React** | Core component-based UI library. |
| **Tooling** | **Vite** | Blazing-fast bundler and development server. |
| **Server** | **Node.js** | JavaScript runtime environment for the server. |
| **API Framework** | **Express** | Minimalist, fast, unopinionated web framework for Node.js. |
| **Database** | **MongoDB** | NoSQL document database for flexible data storage. |
| **Authentication/Hosting** | **Firebase** | Used for user authentication, real-time data needs, and/or file storage. |
| **Code Quality** | **ESLint** | Code quality and static analysis tool. |

> Note: The frontend reads the API base URL from `frontend/.env` (VITE_API_URL) and `frontend/.env.production`.
> During development Vite's proxy is configured in `frontend/vite.config.js` to forward `/api/*` to the backend (see `target` there).