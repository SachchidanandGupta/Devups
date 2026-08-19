# DevUps

**Gamified developer productivity — track, compete, and grow.**

DevUps is a MERN-stack web platform that unifies your LeetCode, Codeforces, and GitHub activity into one gamified dashboard — XP scoring, real-time leaderboards, streaks, and friend-vs-friend coding contests.

Live: [devups.vercel.app](https://devups.vercel.app)

[Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Project Structure](#project-structure) · [Roadmap](#roadmap)

---

## Features

- **Dashboard** — daily LeetCode challenge, streak tracking, and solved-problem history at a glance
- **XP Engine** — earn XP for solving problems, contest performance, GitHub activity, and daily streaks — with a level system that scales cost per level
- **Friend Contests** — invite friends to a timed contest with a shared problem set; scores are tracked by target-crossing time, total XP, solve count, and last-update time (in that tiebreak order) to determine a winner
- **Explore by Topic** — browse a self-hosted database of ~3000 LeetCode problems by tag, difficulty, and title/number search — used when building a contest's problem set
- **Real-Time Activity Terminal** — a live, Socket.io-powered feed of what's happening: globally, for you, for your friends, or scoped to a specific contest — styled as a terminal log
- **Live Leaderboard** — global rankings that update the moment anyone earns XP
- **Friend System** — mutual friend requests, online/offline presence, and a searchable friends list
- **Profile Pages** — GitHub contribution heatmap, XP history ledger, contest history with rank, and per-platform stats
- **Auto-Sync Crons** — background jobs sync LeetCode solves, Codeforces submissions and rating changes, and GitHub commits/PRs on a schedule, and award XP automatically
- **Email Verification & Password Reset** — link-based flows (not OTP), sent via the Gmail API over HTTPS

---

## XP System

| Action                     | XP Earned |
| --------------------------- | --------- |
| Solve Easy problem          | +10 XP    |
| Solve Medium problem        | +25 XP    |
| Solve Hard problem          | +50 XP    |
| Top 10% external contest rank| +60 XP   |
| Top 25% external contest rank| +30 XP   |
| Daily streak bonus          | +10 XP/day|
| GitHub commit                | +3 XP    |
| GitHub pull request          | +15 XP   |
| Codeforces "amazing" rating jump | +120 XP |

XP requirements increase 10% per level.

---

## Tech Stack

**Frontend**
- React + Vite
- Zustand (state management)
- Socket.io client
- Strict 4-layer architecture: `api → store → hook → component`
- Brutalist terminal design system — pure black background, electric green (`#00ff88`) sole accent, JetBrains Mono, zero border-radius

**Backend**
- Node.js + Express (CommonJS)
- MongoDB + Mongoose
- Socket.io
- JWT authentication with httpOnly cookies
- node-cron background sync jobs
- Gmail API (via `googleapis`, OAuth2) for transactional email

**External APIs / Data Sources**
- LeetCode (custom GraphQL calls; problem catalog self-hosted from a seeded dataset since LeetCode's search query was blocked)
- Codeforces official REST API (`user.rating`, submissions)
- GitHub GraphQL API (contributions, commits, PRs)

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```
devups/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # UI components
│       ├── hooks/           # custom hooks (layer 2)
│       ├── store/           # Zustand stores (layer 3)
│       ├── api/              # Axios API layer (layer 4)
│       ├── pages/            # route-level pages
│       └── utils/
│
└── server/                  # Express backend
    └── src/
        ├── controllers/      # request handlers
        ├── routes/           # API route definitions
        ├── models/           # Mongoose schemas
        ├── middleware/        # auth, validation
        ├── services/          # LeetCode / GitHub / Codeforces / XP / mail logic
        └── jobs/              # cron sync jobs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- A Google Cloud project with the Gmail API enabled (for sending verification/reset emails via OAuth2)

### 1. Clone the repository

```bash
git clone https://github.com/SachchidanandGupta/Devups.git
cd Devups
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173

GITHUB_TOKEN=your_github_token

GMAIL_USER=your_gmail_address
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_REFRESH_TOKEN=your_google_oauth_refresh_token
```

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## Roadmap

- [ ] Browser extension (lightweight popup for stats without leaving the current tab)
- [ ] Achievement badges
- [ ] LeetCode contest achievement tracking (currently Codeforces-only, since LeetCode's equivalent API is unofficial)
- [ ] Global/season contests open to all users, not just invited friends

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push and open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

Built for developers who'd rather compete than just grind alone.
