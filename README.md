<div align="center">

# 🚀 DevUps

**Gamified coding productivity — track, compete, and grow.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/devups/pulls)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

DevUps is a MERN-stack browser extension that unifies your LeetCode, Codeforces, and GitHub activity into one gamified dashboard — complete with XP scoring, real-time leaderboards, streak tracking, and friend challenges.

[Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Architecture](#architecture) · [API Docs](#api-reference) · [Contributing](#contributing)

</div>

---

## ✨ Features

- **Daily Coding Dashboard** — fetch today's LeetCode challenge, track your streak, and monitor solved problem history at a glance
- **XP Scoring Engine** — earn XP for every problem solved, contest participated in, and GitHub commit pushed
- **Friend Competitions** — create weekly or monthly challenges, compare XP scores, and settle who's the better coder
- **Contest Tracker** — upcoming and live contests from LeetCode and Codeforces with countdowns and rating history
- **GitHub Analytics** — contribution heatmaps, commit graphs, language breakdowns, and repo activity unified with your DSA progress
- **Real-Time Leaderboards** — live rankings powered by Socket.io that update the moment anyone earns XP
- **Achievement Badges** — milestone rewards for streaks, contest ranks, and contribution goals
- **Chrome Extension** — a lightweight popup giving you stats and reminders without leaving your current tab

---

## 🧠 XP System

| Action | XP Earned |
|---|---|
| Solve Easy problem | +5 XP |
| Solve Medium problem | +15 XP |
| Solve Hard problem | +35 XP |
| Contest participation | +10 XP |
| Top 10% contest rank | +50 XP |
| Daily streak bonus | +5 XP/day |
| GitHub contribution | +2 XP/commit |

---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Zustand (state management)
- Recharts (data visualization)
- Socket.io client

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- GitHub OAuth 2.0
- node-cron (background sync jobs)

**Browser Extension**
- Chrome Extension API (Manifest V3)
- React popup

**External APIs**
- LeetCode GraphQL API
- Codeforces REST API
- GitHub REST API

---

## 📁 Project Structure

```
devups/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # L1 — UI components
│       ├── hooks/           # L2 — custom hooks
│       ├── store/           # L3 — Zustand stores
│       ├── api/             # L4 — Axios API layer
│       ├── pages/           # Route-level pages
│       └── utils/           # XP calculator, helpers
│
├── server/                  # Express backend
│   └── src/
│       ├── controllers/     # Request handlers
│       ├── routes/          # API route definitions
│       ├── models/          # Mongoose schemas
│       ├── middleware/       # Auth, rate limit, validation
│       ├── services/        # LeetCode, GitHub, CF, XP logic
│       └── jobs/            # Cron sync jobs
│
└── extension/               # Chrome extension (MV3)
    ├── popup/               # React popup UI
    ├── background/          # Service worker
    └── content/             # LeetCode page injection
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- A GitHub OAuth App ([create one here](https://github.com/settings/developers))

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/devups.git
cd devups
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devups
JWT_SECRET=your_jwt_secret_here
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd client
npm install
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

```bash
npm run dev
```

### 4. Load the Chrome extension

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `extension/` folder from this repo

---

## 🔌 API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register with username + password |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/github` | Initiate GitHub OAuth |
| GET | `/api/auth/github/callback` | GitHub OAuth callback |

### User

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/profile` | Get current user profile |
| PUT | `/api/user/profile` | Update LeetCode / GitHub username |
| GET | `/api/user/:id` | Get public profile by ID |

### XP & Leaderboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/xp/history` | XP event log for current user |
| GET | `/api/leaderboard/global` | Top 100 users by XP |
| GET | `/api/leaderboard/friends` | Leaderboard filtered to friends |

### Contests

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/contests/upcoming` | Upcoming LeetCode + CF contests |
| GET | `/api/contests/history` | User's contest participation history |

### Challenges

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/challenges` | Create a friend challenge |
| GET | `/api/challenges/:id` | Get challenge details + rankings |
| GET | `/api/challenges/active` | All active challenges for current user |

---

## ⚡ Socket Events

| Event | Direction | Payload |
|---|---|---|
| `xp:updated` | Server → Client | `{ userId, newXP, source }` |
| `leaderboard:refresh` | Server → Client | Updated top-N list |
| `contest:reminder` | Server → Client | `{ contestName, startsIn }` |
| `challenge:score` | Server → Client | `{ challengeId, rankings }` |
| `friend:activity` | Server → Client | `{ userId, action }` |

---

## 🗄 Data Models

### User
```js
{
  username: String,
  email: String,
  passwordHash: String,
  leetcodeUsername: String,
  githubUsername: String,
  codeforcesHandle: String,
  xp: Number,
  streak: Number,
  lastActiveDate: Date,
  friends: [ObjectId],
  badges: [String]
}
```

### XPEvent
```js
{
  userId: ObjectId,
  source: String,       // 'leetcode' | 'github' | 'codeforces' | 'streak'
  action: String,       // 'solve_easy' | 'contest_participation' | ...
  amount: Number,
  metadata: Object,
  createdAt: Date
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📋 Roadmap

- [ ] LeetCode daily challenge sync
- [ ] GitHub contribution heatmap
- [ ] XP scoring engine
- [ ] Friend system + challenges
- [ ] Real-time leaderboard (Socket.io)
- [ ] Chrome extension popup
- [ ] Codeforces contest tracker
- [ ] Achievement badge system
- [ ] Mobile-responsive dashboard
- [ ] Email / push notifications

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ for competitive programmers and DSA grinders everywhere.

⭐ Star this repo if DevUps helps your coding journey!

</div>
