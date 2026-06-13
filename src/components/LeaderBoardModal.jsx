import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const podiumData = [
  { rank: 2, name: "Liam Patel", sessions: 52, hours: 215, extensions: 15, tag: "Group Study (Accessible)", avatar: "👨" },
  { rank: 1, name: "Jane Doe", sessions: 58, hours: 235, extensions: 18, tag: "Quiet Zone (C3)", avatar: "👤", isStar: true },
  { rank: 3, name: "Olivia Chen", sessions: 51, hours: 200, extensions: 12, tag: "Computer Desk (Power Outlet)", avatar: "👩" },
]

const tableData = [
  { rank: 1, name: "Noah Smith", sessions: 58, hours: 235, avg: "4h 3min", ext: 18, zone: "Quiet Zone", icon: "🚪" },
  { rank: 2, name: "Emma Wilson", sessions: 52, hours: 215, avg: "3h 58min", ext: 15, zone: "Accessible", icon: "♿" },
  { rank: 3, name: "Olivia Chen", sessions: 51, hours: 200, avg: "3h 8min", ext: 12, zone: "Quiet Zone", icon: "🚪" },
  { rank: 4, name: "Noah Smith", sessions: 48, hours: 180, avg: "4h 3min", ext: 12, zone: "Accessible", icon: "♿" },
  { rank: 5, name: "Emma Wilson", sessions: 45, hours: 160, avg: "3h 58min", ext: 12, zone: "Accessible", icon: "♿" },
  { rank: 10, name: "User (Jane Doe)", sessions: 30, hours: 110, avg: "4h 3min", ext: 10, zone: "Quiet Zone", icon: "🚪", you: true },
  { rank: 11, name: "Liam Patel", sessions: 28, hours: 100, avg: "3h 50min", ext: 8, zone: "Quiet Zone", icon: "🚪" },
]

function LeaderboardModal({ onClose }) {
  const [tab, setTab] = useState("Top Weekly")
  const tabs = ["Top Weekly", "Top Monthly", "Top All Time"]

  const podiumOrder = [
    podiumData.find((p) => p.rank === 2),
    podiumData.find((p) => p.rank === 1),
    podiumData.find((p) => p.rank === 3),
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="fixed inset-0 z-[61] flex items-center justify-center px-4 py-6"
      >
        <div className="bg-gray-900 border border-green-500/20 rounded-2xl shadow-2xl shadow-green-500/10 w-full max-w-6xl max-h-[92vh] overflow-y-auto custom-scroll">

          {/* Header */}
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="text-2xl font-bold text-white">DeskGuard Leaderboard</h2>
                <p className="text-gray-500 text-xs mt-1">Library Map &nbsp;›&nbsp; Leaderboard</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-white transition text-xl w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-800"
              >
                ✕
              </motion.button>
            </div>

            {/* Tabs + Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
              <div className="flex bg-gray-800 rounded-xl p-1 relative">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors z-10"
                  >
                    {tab === t && (
                      <motion.div
                        layoutId="leaderboardTab"
                        className="absolute inset-0 bg-green-500 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={tab === t ? "text-white" : "text-gray-400 hover:text-white"}>
                      {t}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition text-white text-sm font-medium px-4 py-2 rounded-xl"
                >
                  📊 My Detailed Bookings
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition text-white text-sm font-medium px-4 py-2 rounded-xl"
                >
                  ⏷ Filters
                </motion.button>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-[1fr_280px] gap-6 p-6">

            {/* Left: Podium + Table */}
            <div>

              {/* Podium */}
              <div className="flex items-end justify-center gap-6 mb-10 mt-6">
                {podiumOrder.map((p, i) => {
                  const isFirst = p.rank === 1
                  const heights = { 1: "h-44", 2: "h-32", 3: "h-32" }
                  const colors = {
                    1: "from-yellow-400/30 to-yellow-600/10 border-yellow-400/40 shadow-yellow-400/20",
                    2: "from-gray-400/20 to-gray-600/5 border-gray-400/30 shadow-gray-400/10",
                    3: "from-orange-400/20 to-orange-600/5 border-orange-400/30 shadow-orange-400/10",
                  }
                  return (
                    <motion.div
                      key={p.rank}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
                      className="flex flex-col items-center"
                    >
                      {/* Avatar */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 260, damping: 18 }}
                        className="relative mb-3"
                      >
                        {isFirst && (
                          <div className="flex justify-center gap-1 mb-2 absolute -top-7 left-1/2 -translate-x-1/2 w-full">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="text-yellow-400 text-sm">★</span>
                          </div>
                        )}
                        <motion.div
                          animate={isFirst ? { boxShadow: ["0 0 20px rgba(250,204,21,0.3)", "0 0 40px rgba(250,204,21,0.5)", "0 0 20px rgba(250,204,21,0.3)"] } : {}}
                          transition={{ repeat: Infinity, duration: 2.5 }}
                          className={`rounded-full flex items-center justify-center text-4xl border-2 ${
                            isFirst ? "w-24 h-24 border-yellow-400 bg-gray-800" :
                            p.rank === 2 ? "w-20 h-20 border-gray-400 bg-gray-800" :
                            "w-20 h-20 border-orange-400 bg-gray-800"
                          }`}
                        >
                          {p.avatar}
                        </motion.div>
                        {isFirst && (
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-800 border border-yellow-400/40 rounded-full px-3 py-0.5 text-yellow-400 text-[10px] font-semibold whitespace-nowrap">
                            Jane Doe (Top Star)
                          </div>
                        )}
                      </motion.div>

                      <span className="text-gray-500 text-3xl font-bold mb-2">{p.rank}</span>

                      {/* Podium block */}
                      <div className={`bg-gradient-to-b ${colors[p.rank]} border rounded-t-2xl ${heights[p.rank]} w-44 shadow-lg flex flex-col items-center justify-start pt-4 px-3`}>
                        <p className={`font-bold text-center ${isFirst ? "text-white text-lg" : "text-gray-200 text-base"}`}>
                          {p.name}
                        </p>
                        <p className="text-gray-400 text-xs text-center mt-2 leading-relaxed">
                          {p.sessions} Sessions • {p.hours} Hours • {p.extensions} Extensions
                          {p.tag && <> • {p.tag}</>}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Table */}
              <div className="overflow-x-auto custom-scroll">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 text-xs border-b border-gray-800">
                      <th className="text-left font-medium pb-3 pl-2">Rank</th>
                      <th className="text-left font-medium pb-3">Student</th>
                      <th className="text-right font-medium pb-3">Total Sessions</th>
                      <th className="text-right font-medium pb-3">Total Hours</th>
                      <th className="text-right font-medium pb-3">Avg Duration</th>
                      <th className="text-right font-medium pb-3">Extensions Used</th>
                      <th className="text-right font-medium pb-3 pr-2">Favorite Zone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                        className={`border-b border-gray-800/60 ${row.you ? "bg-green-500/5 border border-green-500/30 rounded-xl" : ""}`}
                      >
                        <td className="py-3 pl-2 text-gray-400 font-semibold">{row.rank}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-sm">👤</span>
                            <span className={row.you ? "text-green-400 font-semibold" : "text-white"}>{row.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right text-gray-300">{row.sessions}</td>
                        <td className="py-3 text-right text-gray-300">{row.hours}</td>
                        <td className="py-3 text-right text-gray-300">{row.avg}</td>
                        <td className="py-3 text-right text-gray-300">{row.ext}</td>
                        <td className="py-3 pr-2 text-right">
                          <span className="inline-flex items-center gap-1.5 text-gray-300">
                            {row.icon} {row.zone}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Stats sidebar */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-950/60 border border-gray-800 rounded-2xl p-5"
              >
                <p className="text-gray-400 text-xs font-semibold mb-4 tracking-wide">MY PERFORMANCE STATISTICS</p>

                <div className="space-y-4">
                  {[
                    { label: "My Ranking", value: "10" },
                    { label: "Sessions", value: "30" },
                    { label: "Total Hours", value: "110" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                    >
                      <p className="text-gray-500 text-xs mb-1">{s.label}</p>
                      <p className="text-white font-bold text-2xl">{s.value}</p>
                    </motion.div>
                  ))}

                  <div className="border-t border-gray-800 pt-4 space-y-3">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Best Time to Visit:</p>
                      <p className="text-green-400 font-semibold text-sm">8:00 AM</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Hours to Top 10 Entry:</p>
                      <p className="text-white text-sm">0h, <span className="text-gray-400">already in</span></p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Hours to Top 3:</p>
                      <p className="text-white text-sm"><span className="font-semibold">90h</span> <span className="text-gray-400">more to beat Olivia</span></p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Next Milestone:</p>
                      <p className="text-white text-sm">Rank 9: Beat Emma Wilson in 10 sessions</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-5 bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2.5 rounded-xl text-sm"
                >
                  Compare to Leaders
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LeaderboardModal