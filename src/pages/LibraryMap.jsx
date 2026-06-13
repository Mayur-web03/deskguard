import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { seats as initialSeats, getStats } from "../data/seats"
import Navbar from "../components/Navbar"
import SeatMap from "../components/SeatMap"
import HeatMap from "../components/HeatMap"
import { useNavigate } from "react-router-dom"
import BookingConfirmed from "../components/BookingConfirmed"
import StreakLeaderboard from "../components/StreakLeaderboard"
import LeaderboardModal from "../components/LeaderboardModal"
import OnboardingTour from "../components/OnboardingTour"
import toast from "react-hot-toast"

const bookingHistory = [
  { seat: "C3", date: "Today",     time: "3:15 PM",  duration: "2h 15m", status: "Active"    },
  { seat: "B2", date: "Yesterday", time: "10:00 AM", duration: "3h 00m", status: "Completed" },
  { seat: "A4", date: "12 Jun",    time: "1:30 PM",  duration: "1h 45m", status: "Completed" },
  { seat: "D3", date: "10 Jun",    time: "9:00 AM",  duration: "4h 00m", status: "Completed" },
  { seat: "C1", date: "9 Jun",     time: "2:00 PM",  duration: "0h 50m", status: "Abandoned" },
]

const filterTagMap = {
  "Quiet Zone":    "Quiet Zone",
  "Window Seat":   "Window",
  "Power Outlet":  "Outlet",
  "Computer Desk": "Computer Desk",
  "Group Study":   "Group Study",
  "Accessible":    "Accessible",
}

function LibraryMap() {
  const [seats,              setSeats]              = useState(initialSeats)
  const [confirmedSeat,      setConfirmedSeat]      = useState(null)
  const [showBookingDetails, setShowBookingDetails] = useState(false)
  const [activeFilter,       setActiveFilter]       = useState("All Seats")
  const [showLeaderboard,    setShowLeaderboard]    = useState(false)
  const [showOnboarding,     setShowOnboarding]     = useState(
    () => !localStorage.getItem("deskguard_toured")
  )
  const navigate = useNavigate()

  const stats            = getStats(seats)
  const occupancyPercent = Math.round((stats.occupied / stats.total) * 100)

  const filteredSeats =
    activeFilter === "All Seats"
      ? seats
      : seats.filter((s) => s.tags?.includes(filterTagMap[activeFilter]))

  const recommendedSeat =
    seats.find((s) => s.recommended && s.status === "free") ||
    seats.find((s) => s.status === "free")

  const handleCheckin = (seatId) => {
  setSeats((prev) =>
    prev.map((s) => (s.id === seatId ? { ...s, status: "occupied" } : s))
  )
  const booked = seats.find((s) => s.id === seatId)
  setConfirmedSeat(booked)
  localStorage.setItem("currentSeat", seatId)  // ← add this line
  toast.success(`✅ Checked in to Seat ${seatId}!`)
}

  const closeConfirmation = () => {
    const seatId = confirmedSeat?.id
    setConfirmedSeat(null)
    if (seatId) navigate(`/session/${seatId}`)
  }

  const handleTourDone = () => {
    localStorage.setItem("deskguard_toured", "true")
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar role="student" />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Live Desk Availability &amp; Instant Booking
            </h1>
            <p className="text-gray-400 text-sm">
              Choose your perfect seat and book in seconds.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-gray-900/60 border border-gray-800 rounded-xl px-3 py-2"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-green-400 text-xs font-semibold">LIVE</span>
            <span className="text-gray-500 text-xs">• Updates every minute</span>
          </motion.div>
        </motion.div>

        {/* ── Filter Chips ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All Seats", "Quiet Zone", "Window Seat", "Power Outlet", "Computer Desk", "Group Study", "Accessible"].map((f, i) => (
            <motion.button
              key={f}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                activeFilter === f
                  ? "bg-green-500/10 border-green-500/40 text-green-400"
                  : "bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* ── Two Column Layout ── */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          {/* ── Main Column ── */}
          <div className="space-y-6">

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Seats", value: stats.total,    color: "text-blue-400",   border: "border-blue-500/20",   bg: "bg-blue-500/5"   },
                { label: "Available",   value: stats.free,     color: "text-green-400",  border: "border-green-500/20",  bg: "bg-green-500/5"  },
                { label: "Occupied",    value: stats.occupied, color: "text-red-400",    border: "border-red-500/20",    bg: "bg-red-500/5"    },
                { label: "Away",        value: stats.away,     color: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/5" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className={`${s.bg} border ${s.border} rounded-xl px-4 py-3`}
                >
                  <p className="text-gray-500 text-xs mb-1">{s.label}</p>
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 300 }}
                    className={`text-2xl font-bold ${s.color}`}
                  >
                    {s.value}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            {/* Occupancy Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Current Occupancy</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-green-400 font-semibold"
                >
                  {occupancyPercent}%
                </motion.span>
              </div>
              <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${occupancyPercent}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                />
              </div>
            </motion.div>

            {/* Seat Map */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SeatMap seats={filteredSeats} onCheckin={handleCheckin} />
            </motion.div>

            {/* Recommended Seat Bar */}
            <AnimatePresence>
              {recommendedSeat && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="bg-gray-900/60 border border-purple-500/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <motion.span
                      animate={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
                      className="text-2xl"
                    >
                      🪑
                    </motion.span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-bold text-lg">{recommendedSeat.id}</span>
                        <motion.span
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-purple-400 text-xs font-semibold bg-purple-500/10 border border-purple-500/30 rounded-full px-2 py-0.5"
                        >
                          ⭐ RECOMMENDED
                        </motion.span>
                      </div>
                      <p className="text-gray-400 text-sm">{recommendedSeat.tags?.join(" • ")}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <motion.span
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                          className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"
                        />
                        <span className="text-green-400 text-xs">Available Now</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleCheckin(recommendedSeat.id)}
                    className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg shadow-green-500/20 whitespace-nowrap"
                  >
                    📅 Book This Seat
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Insights */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { accent: "text-green-400", border: "border-green-500/20", bg: "bg-green-500/5", label: "🟢 BEST TIME",   value: "8:00 AM",                          sub: "Lowest occupancy throughout the day"   },
                { accent: "text-red-400",   border: "border-red-500/20",   bg: "bg-red-500/5",   label: "🔴 PEAK HOURS",  value: "1:00 PM",                          sub: "Maximum seat demand observed"          },
                { accent: "text-blue-400",  border: "border-blue-500/20",  bg: "bg-blue-500/5",  label: "💡 SMART PICK",  value: `Seat ${recommendedSeat?.id ?? "—"}`, sub: "Quiet zone • Window side • High availability" },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className={`${card.bg} border ${card.border} rounded-xl p-4`}
                >
                  <p className={`${card.accent} text-xs font-semibold mb-1`}>{card.label}</p>
                  <h3 className="text-white text-xl font-bold">{card.value}</h3>
                  <p className="text-gray-500 text-xs mt-1">{card.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <HeatMap />
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5"
            >
              <h3 className="text-white font-semibold mb-4">How DeskGuard Works</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { step: "1️⃣", text: "Select any available seat from the live map."             },
                  { step: "2️⃣", text: "Check in and start your study session."                   },
                  { step: "3️⃣", text: "Receive reminders before your seat is marked abandoned."  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="flex gap-3 text-sm"
                  >
                    <span>{item.step}</span>
                    <span className="text-gray-400">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">

            {/* My Booking */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">📋 My Booking</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBookingDetails(true)}
                  className="text-green-400 text-xs font-medium hover:underline"
                >
                  View Details
                </motion.button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <p className="text-gray-500 text-xs mb-1">Current Seat</p>
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    className="text-green-400 font-bold text-xl"
                  >
                    C3
                  </motion.p>
                  <p className="text-gray-500 text-[11px] mt-1">Quiet • Window • Outlet</p>
                </div>
                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <p className="text-gray-500 text-xs mb-1">Time Remaining</p>
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
                    className="text-green-400 font-bold text-xl"
                  >
                    02:15:30
                  </motion.p>
                  <p className="text-gray-500 text-[11px] mt-1">Ends at 5:30 PM</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 transition text-white text-sm font-medium py-2 rounded-lg"
                >
                  ⏱ Extend Session
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition text-red-400 text-sm font-medium py-2 rounded-lg"
                >
                  ⏏ Check Out
                </motion.button>
              </div>
            </motion.div>

            {/* Recommendation */}
            {recommendedSeat && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-gray-900/60 border border-purple-500/30 rounded-2xl p-5"
              >
                <h3 className="text-white font-semibold mb-3">⭐ Recommendation</h3>
                <p className="text-purple-300 text-sm font-medium mb-3">
                  Why {recommendedSeat.id} is perfect for you
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    "Usually low traffic at this time",
                    "Near power outlet",
                    "Quiet zone with fewer disruptions",
                    "Window seat for natural light",
                  ].map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex gap-2"
                    >
                      <span className="text-green-400">✓</span> {tip}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Streak + Leaderboard */}
            <StreakLeaderboard onViewFull={() => setShowLeaderboard(true)} />

            {/* Library Status */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5"
            >
              <h3 className="text-white font-semibold mb-4">📡 Library Status</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <p className="text-gray-500 text-xs mb-1">Live Occupancy</p>
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                    className="text-green-400 font-bold text-lg"
                  >
                    {occupancyPercent}% ↗
                  </motion.p>
                  <p className="text-gray-500 text-[11px] mt-1">+5% vs yesterday</p>
                </div>
                <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-3">
                  <p className="text-gray-500 text-xs mb-1">Next Peak</p>
                  <p className="text-red-400 font-bold text-lg">⏰ 1:00 PM</p>
                  <p className="text-gray-500 text-[11px] mt-1">High crowd expected</p>
                </div>
              </div>
            </motion.div>

            {/* Pro Tip */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5"
            >
              <h3 className="text-yellow-400 font-semibold mb-2">💡 Pro Tip</h3>
              <p className="text-gray-400 text-sm">
                Arrive by 12:30 PM to get the best seat before the crowd increases!
              </p>
            </motion.div>

          </div>
        </div>

        {/* ── Modals ── */}

        {/* Booking Confirmed */}
{confirmedSeat && (
  <BookingConfirmed seat={confirmedSeat} onClose={closeConfirmation} />
)}
        {/* Booking History */}
        <AnimatePresence>
          {showBookingDetails && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                onClick={() => setShowBookingDetails(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed inset-0 z-[61] flex items-center justify-center px-4"
              >
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto custom-scroll w-full max-w-md">

                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-white">Booking History</h2>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowBookingDetails(false)}
                      className="text-gray-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 transition"
                    >
                      ✕
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    {bookingHistory.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                        className="bg-gray-950/60 border border-gray-800 rounded-xl p-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-white font-semibold text-sm">Seat {b.seat}</p>
                          <p className="text-gray-500 text-xs">{b.date} • {b.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-xs mb-1">{b.duration}</p>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            b.status === "Completed" ? "bg-green-500/10 text-green-400 border border-green-500/30"
                            : b.status === "Active"  ? "bg-blue-500/10  text-blue-400  border border-blue-500/30"
                            :                          "bg-gray-500/10  text-gray-400  border border-gray-500/30"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowBookingDetails(false)}
                    className="w-full mt-5 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2.5 rounded-xl transition"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Leaderboard */}
        <AnimatePresence>
          {showLeaderboard && (
            <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
          )}
        </AnimatePresence>

        {/* Onboarding Tour */}
        <AnimatePresence>
          {showOnboarding && <OnboardingTour onDone={handleTourDone} />}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default LibraryMap