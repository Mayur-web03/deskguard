# 🪑 DeskGuard — Library Seat Booking & Anti-Hoarding System

> **WebForge 2026** · Manipal University Jaipur

---

## 🚨 The Problem

Students reserve library desks with their bags and disappear for hours — leaving actual students with nowhere to study. There's no fair, trackable system to manage desk occupancy in real time.

**DeskGuard fixes this.**

---

## 💡 What It Does

A web portal with a **live color-coded library map** that shows real-time desk availability:

| Color | Status |
|-------|--------|
| 🟢 Green | Free — available to book |
| 🔴 Red | Occupied — someone is actively studying |
| 🟡 Yellow | Away — seat held for up to 20 minutes |
| ⚫ Grey | Abandoned — auto-released, ready to rebook |

### Key Features
- **Live Seat Map** — visual floor plan with real-time status updates
- **Instant Booking** — check in to any available seat in one click
- **Away Mode** — pause your session for up to 20 minutes (bathroom, water, etc.)
- **"Still Here?" Prompt** — every 2 hours, students must confirm presence
- **Auto-Release** — no response = seat automatically marked abandoned and freed
- **Librarian Dashboard** — view all abandoned desks and manually reset them
- **Streak Leaderboard** — gamified study streaks to encourage consistent library use
- **Onboarding Tour** — guided walkthrough for first-time users
- **Dark / Light Mode** — theme toggle for comfort

---

## ⚙️ The Engineering Challenge

All desk timers run **server-side — never in the browser.**

A background job sweeps the database every minute and auto-expires desks whose check-in or Away timer has run out. This prevents students from simply closing the browser tab to avoid being marked absent.

```
Browser (React) → API (Node.js) → Timer State (Redis/PostgreSQL)
                                 ↑
                     Background Sweep Job (every 60s)
```

---

## 🛠️ Tech Stack

### Frontend
- **React** — component-based UI
- **Vite** — lightning-fast dev server and build tool
- **Tailwind CSS** — utility-first styling with dark mode support
- **Framer Motion** — smooth animations and transitions
- **React Router DOM** — client-side routing
- **react-hot-toast** — toast notifications
- **canvas-confetti** — booking confirmation celebration 🎉

### Backend *(planned)*
- **Node.js / Python** — REST API
- **Redis or PostgreSQL** — timer state management
- **Background Job** — sweeps DB every 60 seconds for expired sessions

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/deskguard.git

# Navigate into the project
cd deskguard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
deskguard/
├── public/
├── src/
│   ├── components/
│   │   ├── BookingConfirmed.jsx    # Confetti booking modal
│   │   ├── GlowCursor.jsx          # Custom cursor effect
│   │   ├── HeatMap.jsx             # Occupancy heatmap
│   │   ├── LeaderBoardModal.jsx    # Full leaderboard modal
│   │   ├── LibraryBackground.jsx   # Animated SVG background
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── OnboardingTour.jsx      # First-time user guide
│   │   ├── SeatMap.jsx             # Live seat grid + floor plan
│   │   ├── SeatPopup.jsx           # Seat detail popup
│   │   ├── StatCard.jsx            # Stats display card
│   │   ├── StillHerePopup.jsx      # Activity check prompt
│   │   ├── StreakLeaderboard.jsx   # Sidebar streak widget
│   │   ├── ThemeToggle.jsx         # Dark/light mode toggle
│   │   └── Toast.jsx               # Custom toast component
│   ├── context/
│   │   └── ThemeContext.jsx        # Global theme state
│   ├── pages/
│   │   ├── ActiveSession.jsx       # Active seat session page
│   │   ├── ForgotPassword.jsx      # Password recovery
│   │   ├── LibrarianDashboard.jsx  # Admin/librarian view
│   │   ├── LibraryMap.jsx          # Main student map page
│   │   └── Login.jsx               # Login page
│   ├── data/
│   │   └── seats.js                # Seat data and helpers
│   └── styles/
│       └── index.css               # Global styles
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 👥 Team

**Team WebForge** · WebForge 2026 · Manipal University Jaipur

---

## 📄 License

This project was built for **WebForge 2026 Hackathon** at Manipal University Jaipur.

---

<div align="center">
  <strong>Built with ❤️ by Team WebForge</strong><br/>
  <sub>DeskGuard — Because your bag doesn't need a library seat. You do.</sub>
</div>
